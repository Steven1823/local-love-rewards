
import { Heart, Users, Calendar, HandHeart, BookOpen, Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BusinessTypes = () => {
  const businessTypes = [
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Cafés & Restaurants",
      description: "Reward regular customers with points for every purchase and special dining experiences",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Salons & Spas", 
      description: "Build client loyalty with points for services and referrals to new customers",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <HandHeart className="h-6 w-6" />,
      title: "Retail Stores",
      description: "Increase repeat purchases with rewards for shopping frequency and spending",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Professional Services",
      description: "Encourage client retention with loyalty points for appointments and referrals",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Organizations",
      description: "Reward member participation in events, volunteering, and community activities",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Fitness & Wellness",
      description: "Motivate members with points for class attendance, achievements, and milestones",
      gradient: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Perfect for Every Business
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            From small local businesses to large organizations, our platform adapts to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTypes.map((business, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-12 h-12 bg-gradient-to-r ${business.gradient} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {business.icon}
                </div>
                <CardTitle className="text-white text-lg">{business.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-center text-sm">{business.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessTypes;
