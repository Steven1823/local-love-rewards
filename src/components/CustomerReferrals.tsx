
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Gift, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

      // Get customer's referral code
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('code, used_count')
        .eq('customers.phone_number', customerPhone)
        .single();

      if (codeError && codeError.code !== 'PGRST116') {
        throw codeError;
      }

      if (!codeData) {
        setReferralData(null);
        return;
      }

      // Get referrals made by this customer
      const { data: referralsData, error: referralsError } = await supabase
        .from('referrals')
        .select(`
          points_awarded,
          created_at,
          referred:referred_customer_id (
            name
          )
        `)
        .eq('referral_code', codeData.code)
        .order('created_at', { ascending: false });

      if (referralsError) throw referralsError;

      const referrals = referralsData?.map(ref => ({
        referred_name: ref.referred?.name || 'Unknown',
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
    if (referralData?.code && navigator.share) {
      navigator.share({
        title: 'Join me and earn rewards!',
        text: `Use my referral code ${referralData.code} when you make your first visit and we both get bonus points!`,
      });
    } else {
      copyReferralCode();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Loading referral data...</div>
      </div>
    );
  }

  if (!referralData) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Gift className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500">No referral code available yet</p>
          <p className="text-sm text-gray-400">Make your first visit to get a referral code</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Your Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
              <p className="text-3xl font-bold font-mono text-blue-600 mb-2">
                {referralData.code}
              </p>
              <p className="text-gray-600">Share this code with friends!</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={copyReferralCode} variant="outline" className="flex items-center">
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              <Button onClick={shareReferralCode} className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{referralData.used_count}</p>
                <p className="text-sm text-gray-600">Friends Referred</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{referralData.total_points_earned}</p>
                <p className="text-sm text-gray-600">Bonus Points Earned</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            How Referrals Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-sm">Share your referral code with friends</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-sm">They use your code when making their first visit</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-sm">You get <Badge variant="secondary" className="mx-1">50 points</Badge> and they get <Badge variant="secondary" className="mx-1">25 points</Badge></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      {referralData.referrals_made.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Your Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralData.referrals_made.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{referral.referred_name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    +{referral.points_awarded} points
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
