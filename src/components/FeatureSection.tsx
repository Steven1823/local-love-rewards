
import { Heart, Users, Smartphone, Gift, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureSectionProps {
  onTriggerWowMoment: () => void;
}

const FeatureSection = ({ onTriggerWowMoment }: FeatureSectionProps) => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Churches & Ministries",
      description: "Reward faithful attendance, volunteer work, and community involvement",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Local Businesses",
      description: "Build customer loyalty with points for every purchase and visit",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Phone-Based Magic",
      description: "Works with any phone number - no apps or downloads required",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Flexible Rewards",
      description: "Customize rewards for your community's specific needs and values",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Analytics",
      description: "Track engagement and build stronger community connections",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Setup",
      description: "Get started in minutes with our simple setup process",
      gradient: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <section id="features" className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Perfect for Every Organization
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in">
            From small businesses to large churches, our platform adapts to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in cursor-pointer"
              onClick={onTriggerWowMoment}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 animate-glow`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
