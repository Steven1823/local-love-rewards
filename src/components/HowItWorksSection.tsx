
import { Zap, Smartphone, Gift } from "lucide-react";

interface HowItWorksSectionProps {
  onTriggerWowMoment: () => void;
}

const HowItWorksSection = ({ onTriggerWowMoment }: HowItWorksSectionProps) => {
  const steps = [
    {
      step: "1",
      title: "Quick Setup",
      description: "Register your business or church in under 5 minutes. Set your reward structure and you're ready to go.",
      icon: <Zap className="h-12 w-12" />
    },
    {
      step: "2", 
      title: "Members Join",
      description: "People simply provide their phone number - no apps, no cards, no complications.",
      icon: <Smartphone className="h-12 w-12" />
    },
    {
      step: "3",
      title: "Automatic Rewards",
      description: "Points are earned automatically with each visit or action. Rewards unlock instantly when thresholds are met.",
      icon: <Gift className="h-12 w-12" />
    }
  ];

  return (
    <section id="how-it-works" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 animate-fade-in">
          Simple. Powerful. Universal.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="animate-fade-in cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={onTriggerWowMoment}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold animate-glow">
                {step.step}
              </div>
              <div className="text-white mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/80 text-lg max-w-sm mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
