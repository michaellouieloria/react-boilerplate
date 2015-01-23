var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var port = process.env.port || 3000;

gulp.task('sass', function() {
    gulp.src('./app/src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('browserify', function() {
    gulp.src('./app/src/js/app.js')
        .pipe(browserify({ transform: 'reactify' }))
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: port,
        livereload: true
    });
});

gulp.task('open', function(){
    var options = {
        url: 'http://localhost:' + port,
    };
    gulp.src('./app/index.html').pipe(open('', options));
});

gulp.task('html', function () {
    gulp.src('./app/*.html').pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./app/dist/**/*.js').pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./app/dist/**/*.css').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/dist/**/*.js', ['js']);
    gulp.watch('app/dist/**/*.css', ['css']);
    gulp.watch('app/src/**/*.scss', ['sass']);
    gulp.watch('app/src/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);
gulp.task('serve', ['browserify', 'sass', 'connect', 'open', 'watch']);
