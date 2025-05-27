import { useState, useEffect } from "react";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerLookup from "@/components/CustomerLookup";
import BusinessOwnerSetup from "@/components/BusinessOwnerSetup";
import BusinessTypes from "@/components/BusinessTypes";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MobileAppSection from "@/components/MobileAppSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import confetti from 'canvas-confetti';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'business-setup' | 'business-dashboard' | 'customer-lookup'>('landing');
  const [businessPhone, setBusinessPhone] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Tunza Rewards - Simple Loyalty Platform";
  }, []);

  const handleBusinessSetupComplete = (phone: string) => {
    setBusinessPhone(phone);
    setCurrentView('business-dashboard');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerWowMoment = () => {
    triggerConfetti();
    const element = document.activeElement;
    if (element) {
      element.classList.add('animate-bounce-gentle');
      setTimeout(() => {
        element.classList.remove('animate-bounce-gentle');
      }, 2000);
    }
  };

  if (currentView === 'business-setup') {
    return (
      <BusinessOwnerSetup
        onBack={() => setCurrentView('landing')}
        onComplete={handleBusinessSetupComplete}
      />
    );
  }

  if (currentView === 'business-dashboard') {
    return (
      <BusinessDashboard
        businessPhone={businessPhone}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'customer-lookup') {
    return (
      <CustomerLookup
        phoneNumber=""
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero 
        onStartSetup={() => {
          setCurrentView('business-setup');
          triggerWowMoment();
        }}
        onCheckRewards={() => {
          setCurrentView('customer-lookup');
          triggerWowMoment();
        }}
      />
      <FeatureSection onTriggerWowMoment={triggerWowMoment} />
      <BusinessTypes />
      <HowItWorksSection onTriggerWowMoment={triggerWowMoment} />
      <TestimonialsSection onTriggerWowMoment={triggerWowMoment} />
      <MobileAppSection onTriggerWowMoment={triggerWowMoment} />
      <FinalCTA 
        onStartSetup={() => {
          setCurrentView('business-setup');
          triggerWowMoment();
        }}
        onCheckRewards={() => {
          setCurrentView('customer-lookup');
          triggerWowMoment();
        }}
      />
      <Footer />

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .bg-300% { background-size: 300% 300%; }
        `}
      </style>
    </div>
  );
};

export default Index;
