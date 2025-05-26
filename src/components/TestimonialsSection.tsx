
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  onTriggerWowMoment: () => void;
}

const TestimonialsSection = ({ onTriggerWowMoment }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      name: "Pastor Michael Johnson",
      role: "Grace Community Church",
      content: "Our congregation engagement has increased by 40% since implementing Tunza. Members love earning points for attendance and volunteer work.",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Chen",
      role: "Sunny's Hair Salon",
      content: "Customer retention improved by 67% in just 3 months. The phone-based system is so simple that even my oldest clients love it.",
      avatar: "👩‍💼"
    },
    {
      name: "Rabbi David Goldman",
      role: "Temple Beth Shalom",
      content: "Tunza has transformed how we connect with our community. The simplicity is perfect for our diverse congregation.",
      avatar: "👨‍🎓"
    }
  ];

  return (
    <section id="testimonials" className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 animate-fade-in">
          Loved by Communities Everywhere
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in cursor-pointer"
              onClick={onTriggerWowMoment}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
