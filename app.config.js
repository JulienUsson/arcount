const pkg = require('./package.json')

module.exports = {
  expo: {
    name: "Bow'tir",
    slug: pkg.name,
    version: pkg.version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.julienusson.arcount',
      versionCode: parseInt(pkg.versionCode),
    },
    extra: {
      eas: {
        projectId: 'ccd86831-63ff-46d2-bbe9-f85d10f1a4fa',
      },
    },
  },
}
