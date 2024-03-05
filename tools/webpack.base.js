// webpack.base.js
const path = require('path');
const { globSync } = require('glob');
const LicenseWebpackPlugin = require('webpack-license-plugin');

const getAllClientFiles = () => {
  const matchFiles = globSync(
    path.join(__dirname, '../src/modules/**/*.client.tsx'),
    {
      ignore: 'node_modules/**',
    },
  );

  const filePathWithRoutes = {};
  matchFiles.forEach((filePath) => {
    const mapName = filePath.split('/').pop().split('.').shift();
    filePathWithRoutes[mapName] = filePath;
  });
  return filePathWithRoutes;
};

module.exports = {
  entry: getAllClientFiles(),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'webSource/scripts/[name].js',
    clean: false,
    publicPath: '/webSource/',
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  plugins: [
    new LicenseWebpackPlugin({
      outputFilename: 'licenses.txt',
      perChunkOutput: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
