
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Gift, Users, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatKsh } from "@/utils/currency";

interface CustomerReferralsProps {
  customerPhone: string;
}

interface ReferralData {
  code: string;
  used_count: number;
  referrals_made: Array<{
    referred_name: string;
    points_awarded: number;
    created_at: string;
  }>;
  total_points_earned: number;
}

const CustomerReferrals = ({ customerPhone }: CustomerReferralsProps) => {
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, [customerPhone]);

  const fetchReferralData = async () => {
    try {
      setLoading(true);

      // First get the customer ID from phone number
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('phone_number', customerPhone)
        .single();

      if (customerError || !customerData) {
        console.error('Customer not found:', customerError);
        setReferralData(null);
        return;
      }

      // Get customer's referral code
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('code, used_count')
        .eq('customer_id', customerData.id)
        .single();

      if (codeError && codeError.code !== 'PGRST116') {
        throw codeError;
      }

      if (!codeData) {
        setReferralData(null);
        return;
      }

      // Get referrals made by this customer with proper column hinting
      const { data: referralsData, error: referralsError } = await supabase
        .from('referrals')
        .select(`
          points_awarded,
          created_at,
          customers!referrals_referred_customer_id_fkey (
            name
          )
        `)
        .eq('referrer_customer_id', customerData.id)
        .order('created_at', { ascending: false });

      if (referralsError) throw referralsError;

      const referrals = referralsData?.map(ref => ({
        referred_name: ref.customers?.name || 'Unknown',
        points_awarded: ref.points_awarded || 0,
        created_at: ref.created_at
      })) || [];

      const totalPoints = referrals.reduce((sum, ref) => sum + ref.points_awarded, 0);

      setReferralData({
        code: codeData.code,
        used_count: codeData.used_count || 0,
        referrals_made: referrals,
        total_points_earned: totalPoints
      });

    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (referralData?.code) {
      navigator.clipboard.writeText(referralData.code);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const shareReferralCode = () => {
    if (referralData?.code) {
      const message = `🎉 Join me on Tunza Rewards and earn KES 15 bonus! Use my referral code ${referralData.code} when you make your first visit. I'll get KES 30 too! 💰`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Join Tunza Rewards & Earn Bonus!',
          text: message,
        });
      } else {
        // Fallback to WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  };

  // Convert points to KES (1 point = approximately KES 0.129)
  const pointsToKes = (points: number) => points * 0.129;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 animate-spin text-purple-500" />
          <div className="text-gray-600">Loading your referral rewards...</div>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return (
      <Card className="border-dashed border-2 border-purple-200">
        <CardContent className="text-center py-12">
          <Gift className="mx-auto h-16 w-16 text-purple-300 mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Earning Referral Rewards!</h3>
          <p className="text-gray-500 mb-4">Make your first visit to get your unique referral code</p>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
            <p className="text-sm font-medium text-purple-700">🎁 Earn KES 30 for each friend you refer!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Referral Code Card */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
            Your Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="p-8 bg-white rounded-xl shadow-sm border-2 border-dashed border-purple-300">
              <p className="text-4xl font-bold font-mono text-purple-600 mb-3 tracking-wider">
                {referralData.code}
              </p>
              <p className="text-gray-600 font-medium">Share this code with friends!</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={copyReferralCode} variant="outline" className="flex items-center border-purple-200 hover:bg-purple-50">
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              <Button onClick={shareReferralCode} className="flex items-center bg-green-600 hover:bg-green-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share on WhatsApp
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-green-600">{referralData.used_count}</p>
                <p className="text-sm text-gray-600 font-medium">Friends Referred</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-purple-600">{formatKsh(pointsToKes(referralData.total_points_earned))}</p>
                <p className="text-sm text-gray-600 font-medium">Total Earned</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced How It Works */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Gift className="h-5 w-5 mr-2" />
            How Referrals Work - Earn Real Money! 💰
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="font-medium">Share your referral code with friends</p>
                <p className="text-sm text-gray-600">Via WhatsApp, SMS, or any social platform</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="font-medium">They use your code when making their first visit</p>
                <p className="text-sm text-gray-600">Must enter code during registration or first purchase</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="font-medium">You both get rewarded instantly!</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 font-bold">You: KES 30</Badge>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">Friend: KES 15</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Referral History */}
      {referralData.referrals_made.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              Your Successful Referrals ({referralData.referrals_made.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralData.referrals_made.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">{referral.referred_name}</p>
                      <p className="text-sm text-green-600">
                        Joined on {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 font-bold">
                    +{formatKsh(pointsToKes(referral.points_awarded))}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerReferrals;
