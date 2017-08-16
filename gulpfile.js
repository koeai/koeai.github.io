const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');

const src = 'src/**/';
const dst = path.join('./');

gulp.task('sass', () => {
	gulp.src(path.join(src, '*.scss'))
		.pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
		.pipe(sass.sync())
		.pipe(autoprefixer())
		.pipe(gulp.dest(dst));
});

gulp.task('pug', () => {
	gulp.src(path.join(src, '*.pug'))
		.pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
		.pipe(pug({}))
		.pipe(gulp.dest(dst));
});

gulp.task('webserver', () => {
	gulp.src(dst)
        .pipe(webserver({
            host: 'localhost',
            port: 6280,
            livereload: false
        }));
});

gulp.task('watch', () => {
	gulp.run('webserver');
	gulp.run('sass');
	gulp.run('pug');
	gulp.watch(path.join(src, '*.scss'), ['sass']);
	gulp.watch(path.join(src, '*.pug'), ['pug']);
});

gulp.task('default', ['sass', 'pug']);