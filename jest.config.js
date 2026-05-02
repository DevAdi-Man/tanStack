module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native|@react-navigation)/)"
    ],
    "setupFilesAfterEnv": ["<rootDir>/jest/setup.js"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        // Native Library Web Fallbacks
        "^@d11/react-native-fast-image$": "react-native-web/dist/exports/Image",
        "^react-native-linear-gradient$": "react-native-web-linear-gradient",
    }
};
