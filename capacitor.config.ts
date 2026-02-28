import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.diptenzirveye.app",
  appName: "DiptenZirveye",
  webDir: "out",

  server: {
    url: "https://diptenzirveye.com",
    cleartext: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#0a0a0c",
      showSpinner: false,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "#0a0a0c",
      style: "LIGHT",
      overlaysWebView: false,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },

  android: {
    allowMixedContent: false,
    backgroundColor: "#0a0a0c",
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },

  ios: {
    contentInset: "automatic",
    backgroundColor: "#0a0a0c",
    preferredContentMode: "mobile",
    scheme: "DiptenZirveye",
  },
};

export default config;
