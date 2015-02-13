var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var cssmin = require('gulp-cssmin');
var newer = require('gulp-newer');
var port = process.env.port || 3000;

gulp.task('sass', function() {
    gulp.src('./app/src/scss/**/*.scss')
        .pipe(sass())
        .pipe(newer('./app/dist/css'))
        .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('sassprod', function() {
    gulp.src('./app/src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(newer('./app/dist'))
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('css', function() {
    gulp.src('./app/src/css/**/*.css')
        .pipe(newer('./app/dist/css'))
        .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('cssprod', function() {
    gulp.src('./app/src/scss/**/*.css')
        .pipe(cssmin())
        .pipe(newer('./app/dist/css'))
        .pipe(gulp.dest('./app/dis/css'));
});

gulp.task('browserify', function() {
    browserify('./app/src/js/app.js')
    .transform('reactify', { 'es6': true })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('browserifyprod', function() {
    browserify('./app/src/js/app.js')
    .transform('reactify', { 'es6': true })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'));
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
    gulp.watch('./app/index.html', ['html']);
    gulp.watch('./app/dist/**/*.js', ['js']);
    gulp.watch('./app/dist/**/*.css', ['css']);
    gulp.watch('./app/src/**/*.scss', ['sass']);
    gulp.watch('./app/src/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'sass']);
gulp.task('production', ['browserifyprod', 'sassprod']);
gulp.task('serve', ['browserify', 'sass', 'connect', 'open', 'watch']);
