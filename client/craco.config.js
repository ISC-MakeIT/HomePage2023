module.exports = {
  babel: {
    presets: [['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
    plugins: [
      '@emotion/babel-plugin',
      [
        'module-resolver',
        {
          alias: {
            '@src': 'src/',
            '@redux': 'src/redux',
            '@api': 'src/modules/api',
          },
        },
      ],
    ],
  },
};
