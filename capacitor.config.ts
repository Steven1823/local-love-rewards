
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.tunza.rewards',
  appName: 'Tunza Rewards',
  webDir: 'dist',
  server: {
    url: 'https://e8e05eda-ce23-4bd0-b7e7-14937a094cb3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP'
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#1a1a2e'
    }
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
