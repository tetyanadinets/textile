module.exports = function() {
		$.gulp.task('img:dev', () => {
				return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
						.pipe($.gulp.dest('./build/img/'));
		});

		$.gulp.task('img:build', () => {
				return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
						.pipe($.gp.tinypng('qtWz6Fa-fX7aspOkgoj7b2I6r-V6XjDL'))
						.pipe($.gulp.dest('./build/img/'));
		});

		$.gulp.task('fv:copy', () => {
				return $.gulp.src('./dev/static/img/favicons/**/*.*')
				.pipe($.gulp.dest('./build/img/favicons/'));
		});

		$.gulp.task('svg:copy', () => {
				return $.gulp.src('./dev/static/img/svg/**/*.svg')
						.pipe($.gulp.dest('./build/img/svg/'));
		});
};
