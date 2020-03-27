global.$ = {
	path: {
		task: require('./gulp/paths/tasks.js')
	},
	gulp: require('gulp'),
	del: require('del'),
	fs: require('fs'),
	browserSync: require('browser-sync').create(),
	gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task('develop', $.gulp.series(
	'clean',
	'pug:start',
	$.gulp.parallel('styles:dev', 'styles:libs', 'pug', 'js:libs', 'js:dev', 'svg', 'img:dev', 'fonts','svg:copy')));

$.gulp.task('build', $.gulp.series(
	'clean',
	$.gulp.parallel('styles:build', 'styles:libs', 'pug', 'js:libs', 'js:build', 'svg', 'img:build', 'fonts','svg:copy')));

$.gulp.task('dev', $.gulp.series(
	'develop',
	$.gulp.parallel(
		'watch',
		'serve'
	)
));