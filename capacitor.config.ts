import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Angular-Shop-Sublim',
  webDir: 'www',
  plugins: {
    SocialLogin: {
      google: {
        webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com'
      }
    }
  }
};

export default config;
