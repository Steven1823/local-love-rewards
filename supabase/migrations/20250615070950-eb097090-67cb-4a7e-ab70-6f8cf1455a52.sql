
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can create their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can delete their own businesses" ON public.businesses;

DROP POLICY IF EXISTS "Business owners can view their customers" ON public.customers;
DROP POLICY IF EXISTS "Business owners can create customers" ON public.customers;
DROP POLICY IF EXISTS "Business owners can update their customers" ON public.customers;
DROP POLICY IF EXISTS "Business owners can delete their customers" ON public.customers;

DROP POLICY IF EXISTS "Business owners can view visits to their business" ON public.visits;
DROP POLICY IF EXISTS "Business owners can create visits" ON public.visits;

DROP POLICY IF EXISTS "Business owners can view their messages" ON public.messages;
DROP POLICY IF EXISTS "Business owners can create messages" ON public.messages;

-- RLS Policies for businesses table
CREATE POLICY "Users can view their own businesses" ON public.businesses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own businesses" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own businesses" ON public.businesses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own businesses" ON public.businesses
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for customers table
CREATE POLICY "Business owners can view their customers" ON public.customers
  FOR SELECT USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can create customers" ON public.customers
  FOR INSERT WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can update their customers" ON public.customers
  FOR UPDATE USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can delete their customers" ON public.customers
  FOR DELETE USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for visits table
CREATE POLICY "Business owners can view visits to their business" ON public.visits
  FOR SELECT USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can create visits" ON public.visits
  FOR INSERT WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for messages table
CREATE POLICY "Business owners can view their messages" ON public.messages
  FOR SELECT USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can create messages" ON public.messages
  FOR INSERT WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Create indexes for better performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_customers_business_id ON public.customers(business_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_visits_customer_id ON public.visits(customer_id);
CREATE INDEX IF NOT EXISTS idx_visits_business_id ON public.visits(business_id);
CREATE INDEX IF NOT EXISTS idx_messages_business_id ON public.messages(business_id);

-- Create function to update customer stats after visit
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.customers 
  SET 
    total_visits = total_visits + 1,
    total_spent = total_spent + NEW.amount,
    points = points + NEW.points_earned,
    last_visit = NEW.visit_date,
    updated_at = NOW()
  WHERE id = NEW.customer_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger to avoid conflicts
DROP TRIGGER IF EXISTS update_customer_stats_trigger ON public.visits;
CREATE TRIGGER update_customer_stats_trigger
  AFTER INSERT ON public.visits
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();
