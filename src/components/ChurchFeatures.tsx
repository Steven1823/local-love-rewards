
import { Heart, Users, Calendar, HandHeart, BookOpen, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChurchFeatures = () => {
  const churchFeatures = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Attendance Rewards",
      description: "Members earn points for regular service attendance and special events",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <HandHeart className="h-6 w-6" />,
      title: "Volunteer Recognition", 
      description: "Reward community service, ministry work, and volunteer activities",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Bible Study Points",
      description: "Encourage participation in small groups and educational programs",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Event Participation",
      description: "Track engagement in concerts, retreats, and community gatherings",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Member Referrals",
      description: "Reward members who invite friends and family to join the community",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Custom Programs",
      description: "Design reward systems for youth groups, seniors, and special ministries",
      gradient: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Faith Communities
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Strengthen your congregation's engagement with meaningful rewards for participation and service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {churchFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-center text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChurchFeatures;
