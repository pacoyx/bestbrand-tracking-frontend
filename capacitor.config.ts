import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apptraskingbb.com',
  appName: 'bestbrand-tracking-frontend',
  webDir: 'dist/bestbrand-tracking-frontend/browser'
};

export default config;
// ng build
// npx cap copy android
// npx cap sync android
// npx cap open android
