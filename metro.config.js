/* eslint-disable prettier/prettier */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'svg'],
  },
};

// Add asset linking for images
const customConfig = {
  assets: ['./src/Images/'],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config, customConfig);

