var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('script ', function() {
     // 找到文件
     gulp.src('src/*.js')
     // 压缩文件

     .pipe(uglify())
     // 另存压缩后的文件
     .pipe(gulp.dest('www/js'))
	})

gulp.watch('js/**/*.js', function(event) {
	console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
	})
