const fs = require('fs');
const path = require('path');

module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@': './src'
        }
      }
    ]
  ];

  const reanimatedPluginPath = path.join(
    __dirname,
    'node_modules',
    'react-native-reanimated',
    'plugin.js'
  );

  if (fs.existsSync(reanimatedPluginPath)) {
    plugins.push(reanimatedPluginPath);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
