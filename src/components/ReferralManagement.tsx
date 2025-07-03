
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Users, Share2, Trophy, Copy, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReferralCode {
  id: string;
  code: string;
  used_count: number;
  customer_name: string;
  customer_phone: string;
  customer_points: number;
}

interface Referral {
  id: string;
  referrer_name: string;
  referred_name: string;
  points_awarded: number;
  created_at: string;
  referral_code: string;
}

interface ReferralManagementProps {
  businessId: string;
  businessName: string;
}

const ReferralManagement = ({ businessId, businessName }: ReferralManagementProps) => {
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReferralData();
  }, [businessId]);

  const fetchReferralData = async () => {
    try {
      setLoading(true);

      // Fetch referral codes with customer data
      const { data: codesData, error: codesError } = await supabase
        .from('referral_codes')
        .select(`
          id,
          code,
          used_count,
          customers:customer_id (
            name,
            phone_number,
            points
          )
        `)
        .eq('customers.business_id', businessId);

      if (codesError) throw codesError;

      // Transform the data
      const transformedCodes = codesData?.map(code => ({
        id: code.id,
        code: code.code,
        used_count: code.used_count || 0,
        customer_name: code.customers?.name || 'Unknown Customer',
        customer_phone: code.customers?.phone_number || '',
        customer_points: code.customers?.points || 0
      })) || [];

      setReferralCodes(transformedCodes);

      // Fetch referral history
      const { data: referralsData, error: referralsError } = await supabase
        .from('referrals')
        .select(`
          id,
          points_awarded,
          created_at,
          referral_code,
          referrer:referrer_customer_id (
            name
          ),
          referred:referred_customer_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (referralsError) throw referralsError;

      const transformedReferrals = referralsData?.map(referral => ({
        id: referral.id,
        referrer_name: referral.referrer?.name || 'Unknown',
        referred_name: referral.referred?.name || 'Unknown',
        points_awarded: referral.points_awarded || 0,
        created_at: referral.created_at,
        referral_code: referral.referral_code
      })) || [];

      setReferrals(transformedReferrals);

    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Referral code copied to clipboard!');
  };

  const filteredCodes = referralCodes.filter(code =>
    code.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReferrals = referrals.length;
  const totalPointsAwarded = referrals.reduce((sum, ref) => sum + ref.points_awarded, 0);
  const activeReferrers = referralCodes.filter(code => code.used_count > 0).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading referral data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Points Awarded</p>
                <p className="text-2xl font-bold">{totalPointsAwarded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Referrers</p>
                <p className="text-2xl font-bold">{activeReferrers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Referral Codes</p>
                <p className="text-2xl font-bold">{referralCodes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Codes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Customer Referral Codes
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by customer name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredCodes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Share2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No referral codes found</p>
              <p className="text-sm">Referral codes are automatically created when customers make their first visit</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCodes.map((code) => (
                <div key={code.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{code.customer_name}</p>
                        <p className="text-sm text-gray-600">{code.customer_phone}</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        {code.customer_points} points
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-mono text-lg font-bold text-blue-600">{code.code}</p>
                      <p className="text-sm text-gray-600">
                        Used {code.used_count} time{code.used_count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => copyReferralCode(code.code)}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Recent Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No referrals yet</p>
              <p className="text-sm">Customers will earn points when they refer new customers</p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.slice(0, 10).map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="text-blue-600">{referral.referrer_name}</span> referred{' '}
                        <span className="text-green-600">{referral.referred_name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Code: {referral.referral_code} • {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className="bg-yellow-100 text-yellow-800">
                    +{referral.points_awarded} points
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagement;
