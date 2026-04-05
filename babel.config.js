module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Module-alise
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
        alias: {
          '@': ['./src'],
          '@assets': ['./src/assets'],
          '@components':['./src/components']
        },
      },
    ],
  ],
};
