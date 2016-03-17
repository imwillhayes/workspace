var project = "app"
var gulp = require('gulp');
var express = require('express');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname + "/" + project));
	app.listen(4000);
});

gulp.task('lr', function() {
	bs.init(null, {
		proxy: "http://localhost:4000",
		port: 7000,
	});
})

gulp.task('styles', function() {
	return gulp.src(project + '/sass/*.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(gulp.dest(project + '/css/'))
});

gulp.task('imagemin', function() {
	return gulp.src(project + '/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}, {
				cleanupIDs: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(project + '/images'));
})

gulp.task('watch', function() {
	gulp.watch(project + '/sass/*.scss', ['styles']);
	gulp.watch(project + '/css/*.css', function() {
		bs.reload(project + '/css/*.css')
	});
	gulp.watch(project + '/*.html', bs.reload);
	gulp.watch(project + '/js/*.js', bs.reload);
});



gulp.task('default', ['express', 'styles', 'watch', 'lr', 'imagemin'])