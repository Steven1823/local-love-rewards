
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GeminiChat from "@/components/GeminiChat";

const GeminiPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">Gemini AI</h1>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg p-6">
          <GeminiChat />
        </div>
      </div>
    </div>
  );
};

export default GeminiPage;
