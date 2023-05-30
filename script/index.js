/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const { glob } = require('glob');
const { build } = require('vite');
const viteReact = require('@vitejs/plugin-react');

const loadAllFile = async () => {
  const files = await glob('./src/modules/**/*.client.tsx');

  build({
    plugins: [viteReact()],
    mode: 'development',
    build: {
      outDir: 'static/webSource/scripts',
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
        input: files[0],
      },
    },
  });
};
loadAllFile();

module.exports = {
  loadAllFile,
};
