const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const notifier = require('node-notifier');

const entryFolder = './dev/js/';
const entry = 'main.js';

module.exports = function() {

	$.gulp.task('js:libs', () => {
		return $.gulp.src([
			'node_modules/svg4everybody/dist/svg4everybody.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/swiper/dist/js/swiper.min.js',
			'node_modules/inputmask/dist/jquery.inputmask.bundle.js'
			])
			.pipe($.gp.concat('libs.min.js'))
			.pipe($.gp.uglifyjs())
			.pipe($.gulp.dest('./build/js/'));
	});


	// === gulp + js simple  ===
	// $.gulp.task('js', () => {
	// 	return $.gulp.src([
	// 					'./dev/js/*.js',
	// 					'!./dev/js/libs.min.js'
	// 					])
 //      .pipe($.gp.plumber({
	//      	errorHandler: function (error) {
	//        console.log(error.message);
	//        this.emit('end');
	//     }}))		
	// 		.pipe($.gp.concat('common.js'))
	// 		//.pipe($.gp.uglifyjs())
	// 		.pipe($.gulp.dest('./build/js/'))
	// 		.pipe($.browserSync.reload({
	// 			stream: true
	// 		}));
	// });

	// === gulp + webpack + babel  ===


	$.gulp.task('js:dev', () => {	
		return browserify({
			entries: [entryFolder + entry]
		})
		.transform(babelify, {  presets: ['env']} )
		.bundle()
    .on('error', function(err){
      // print the error (can replace with gulp-util)
    	console.warn(err.message);
      notifier.notify(err.message);
      this.emit('end');
    })				
		.pipe( source(entry) )
		.pipe( buffer() )
		.pipe($.gp.sourcemaps.init({ loadMaps: true }))		
		.pipe($.gp.sourcemaps.write('./'))
	  .pipe($.gp.rename('common.min.js'))		
		.pipe($.gulp.dest('./build/js/'))
		.pipe($.browserSync.reload({
			stream: true
		}))

	});


	$.gulp.task('js:build', () => {	
		return browserify({
			entries: [entryFolder + entry]
		})
		.transform(babelify, {  presets: ['env']} )
		.bundle()
    .on('error', function(err){
      // print the error (can replace with gulp-util)
      console.log(err.message);
      notifier.notify(err.message);
      this.emit('end');
    })				
		.pipe( source(entry) )
		.pipe( buffer() )
		.pipe($.gp.sourcemaps.init({ loadMaps: true }))		
		.pipe($.gp.uglifyjs())
		.pipe($.gp.sourcemaps.write('./'))
	  .pipe($.gp.rename('common.min.js'))		
		.pipe($.gulp.dest('./build/js/'))
		.pipe($.browserSync.reload({
			stream: true
		}))

	});

}