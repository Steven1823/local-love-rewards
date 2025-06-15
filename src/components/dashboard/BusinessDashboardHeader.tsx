
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessDashboardHeaderProps {
  onBack: () => void;
}

const BusinessDashboardHeader = ({ onBack }: BusinessDashboardHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-black">Business Dashboard</h1>
              <p className="text-gray-600">Manage your loyalty program</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardHeader;
