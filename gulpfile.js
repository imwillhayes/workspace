var project = "app"
var gulp = require('gulp');
var express = require('express');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");
var bs = require('browser-sync').create();

!function(){
	var argvs=process.argv;
	var _p=argvs.find(function(a){
		return /^--\$/.test(a);
	})

	if(_p){
		project=_p.slice(3)
	}

}()

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
		notify: false,
	});
	gulp.watch(project + '/sass/*.scss', ['styles']);
	gulp.watch(project + '/*.html', bs.reload);
	gulp.watch(project + '/js/*.js',['scripts'],bs.reload);
})

gulp.task('styles', function() {
	return gulp.src(project + '/sass/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(project + '/css/'))
		.pipe(bs.stream({once: true}))
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

gulp.task('scripts', function() {
	return gulp.src(project+"js/*.js")
		.pipe(babel())
		.pipe(gulp.dest(project+"js"));
})

gulp.task('watch', function() {
	
});



gulp.task('default', ['express', 'styles', 'watch', 'lr', 'imagemin'], function() {

})