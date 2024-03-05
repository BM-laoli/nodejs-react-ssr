const { watch } = require('gulp');
const { spawn } = require('child_process');

function defaultTask(done) {
  watch('./src/**/*', { ignoreInitial: false }, (done) => {
    const child = spawn(
      'yarn',
      ['webpack', '-c', 'tools/webpack.dev.js', '--color'],
      {
        stdio: 'pipe',
        cwd: process.cwd(),
      },
    );

    child.stdout.pipe(process.stdout);
    child.stdout.on('data', (data) => {});

    done();
  });
}

module.exports = {
  defaultTask,
};
