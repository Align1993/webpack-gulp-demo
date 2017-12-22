const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const watchPath = require('gulp-watch-path');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-minify-css');
const autoprefixer = require('gulp-less');
const less = require('gulp-autoprefixer');
const handleError = function (err) {
	var colors = gutil.colors
	console.log('\n')
	gutil.log(colors.red('Error!'))
	gutil.log('fileName: ' + colors.red(err.fileName))
	gutil.log('lineNumber: ' + colors.red(err.lineNumber))
	gutil.log('message: ' + err.message)
	gutil.log('plugin: ' + colors.yellow(err.plugin))
}
const combiner = require('stream-combiner2') // 捕获错误信息。
gulp.task('default', function () {
	gutil.log('message')
	gutil.log(gutil.colors.red('error'))
	gutil.log(gutil.colors.green('message:') + "some")
})
gulp.task('uglifyjs', function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('www/js'))
})
gulp.task('watchjs', function () {
	gulp.watch('./src/js/**/*.js',  function (event) {
		console.log(event);
		var paths = watchPath(event, 'src/', 'dist/')
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
		gutil.log('Dist ' + paths.distPath)
		var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
			])
		combined.on('error', handleError)
	
		})
})



gulp.task('watchcss', function () {
	gulp.watch('src/css/**/*.css', function (event) {
		var paths = watchPath(event, 'src/', 'dist/')
		gutil.log(gutil.colors.green(event.type) + " " + paths.srcPath)
		gutil.log('Dist' + paths.distPath)
		gulp.src(paths.srcPath)
		    .pipe(sourcemaps.init())
		    .pipe(autoprefixer({
		    	browsers: 'last 2 versions'
		    	}))
		    .pipe(minifycss())
		    .pipe(sourcemaps.write('./')) 
		    .pipe(gulp.dest(paths.distDir))
		})
	})
gulp.task('minifycss', function () {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'))
}) // 一次编译所有css文件

gulp.task('watchless', function () {
	gulp.watch('src/less/**/*.less',  function (event) {
		var paths = watchPath(event, 'src/less/', 'dist/css/')
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
		gutil.log('Dist ' + paths.distPath)
		var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
            	browsers: 'last 2 versions'
            	}),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
			])
		combined.on('error', handleError)
		})
	})

gulp.task('lesscss', function () {
	var combined = combiner.obj([
        gulp.src('src/less/**/*.less'),
        sourcemaps.init(),
        autoprefixer({
        	browsers: 'last 2 versions'
        	}),
        less(),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('dist/css/')
		])
	combined.on('error', handleError)
	})
gulp.task('default', ['watchjs', 'watchcss', 'watchless'])