
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import BusinessTypes from "@/components/BusinessTypes";
import HowItWorksSection from "@/components/HowItWorksSection";
import MobileAppSection from "@/components/MobileAppSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import confetti from 'canvas-confetti';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tunza Rewards - Simple Loyalty Platform";
  }, []);

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

  const handleGetStarted = () => {
    navigate("/auth");
    triggerWowMoment();
  };

  const handleCheckRewards = () => {
    navigate("/auth");
    triggerWowMoment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero 
        onStartSetup={handleGetStarted}
        onCheckRewards={handleCheckRewards}
      />
      <FeatureSection onTriggerWowMoment={triggerWowMoment} />
      <BusinessTypes />
      <HowItWorksSection onTriggerWowMoment={triggerWowMoment} />
      <MobileAppSection onTriggerWowMoment={triggerWowMoment} />
      <FinalCTA 
        onStartSetup={handleGetStarted}
        onCheckRewards={handleCheckRewards}
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
