
-- Add name field to customers table if it doesn't exist (it already exists with default 'Customer')
-- Add referral system tables
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  used_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  referred_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  points_awarded INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(referred_customer_id) -- Ensure each customer can only be referred once
);

-- Add RLS policies for referral tables
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Policies for referral_codes
CREATE POLICY "Business owners can view referral codes for their customers"
  ON public.referral_codes FOR SELECT
  USING (customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Business owners can create referral codes for their customers"
  ON public.referral_codes FOR INSERT
  WITH CHECK (customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ));

-- Policies for referrals
CREATE POLICY "Business owners can view referrals for their customers"
  ON public.referrals FOR SELECT
  USING (referrer_customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ) OR referred_customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Business owners can create referrals for their customers"
  ON public.referrals FOR INSERT
  WITH CHECK (referrer_customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ) AND referred_customer_id IN (
    SELECT id FROM public.customers 
    WHERE business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  ));

-- Function to generate unique referral codes
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate a 6-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 6));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE referral_codes.code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create referral code when customer is created
CREATE OR REPLACE FUNCTION create_referral_code_for_customer()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.referral_codes (customer_id, code)
  VALUES (NEW.id, generate_referral_code());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_referral_code
  AFTER INSERT ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION create_referral_code_for_customer();

-- Function to process referral and award points
CREATE OR REPLACE FUNCTION process_referral(referral_code_input TEXT, new_customer_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  referrer_id UUID;
  referrer_business_id UUID;
  new_customer_business_id UUID;
BEGIN
  -- Get the referrer customer ID from the referral code
  SELECT customer_id INTO referrer_id
  FROM public.referral_codes
  WHERE code = referral_code_input;
  
  IF referrer_id IS NULL THEN
    RETURN FALSE; -- Invalid referral code
  END IF;
  
  -- Get business IDs to ensure both customers are from the same business
  SELECT business_id INTO referrer_business_id
  FROM public.customers WHERE id = referrer_id;
  
  SELECT business_id INTO new_customer_business_id
  FROM public.customers WHERE id = new_customer_id;
  
  IF referrer_business_id != new_customer_business_id THEN
    RETURN FALSE; -- Customers must be from the same business
  END IF;
  
  -- Check if this customer has already been referred
  IF EXISTS(SELECT 1 FROM public.referrals WHERE referred_customer_id = new_customer_id) THEN
    RETURN FALSE; -- Customer already referred
  END IF;
  
  -- Create referral record
  INSERT INTO public.referrals (referrer_customer_id, referred_customer_id, referral_code)
  VALUES (referrer_id, new_customer_id, referral_code_input);
  
  -- Award points to referrer (50 points)
  UPDATE public.customers 
  SET points = points + 50, updated_at = now()
  WHERE id = referrer_id;
  
  -- Award welcome bonus to new customer (25 points)
  UPDATE public.customers 
  SET points = points + 25, updated_at = now()
  WHERE id = new_customer_id;
  
  -- Update referral code usage count
  UPDATE public.referral_codes 
  SET used_count = used_count + 1
  WHERE code = referral_code_input;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
