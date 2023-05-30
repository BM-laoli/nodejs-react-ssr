const gulp = require('gulp');
const myTask = require('./script/index.js');

gulp.task('read', myTask.loadAllFile);
