module.exports = function () {
	$.gulp.task('styles:build', () => {
		return $.gulp.src(['./dev/styles/main.styl', './dev/styles/start.styl'])
			.pipe($.gp.stylus({
				'include css': true
			}))
			.pipe($.gp.autoprefixer({
				browsers: ['last 3 version']
			}))
			.pipe($.gp.csscomb())
			.pipe($.gp.csso())
			.pipe($.gulp.dest('./build/css/'))
	});

	$.gulp.task('styles:dev', () => {
		return $.gulp.src(['./dev/styles/main.styl', './dev/styles/start.styl'])
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.stylus({
				'include css': true
			}))
			.on('error', $.gp.notify.onError(function (error) {
				return {
					title: 'Stylus',
					message: error.message,
				};
			}))
			.pipe($.gp.autoprefixer({
				browsers: ['last 3 version']
			}))
						.pipe($.gp.sourcemaps.write())
			.pipe($.gulp.dest('./build/css/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('styles:libs', () => {
	return $.gulp.src('./dev/styles/libs.styl')
			.pipe($.gp.stylus({
				'include css': true
			}))    
		.pipe($.gulp.dest('./build/css/'))
	});

};
