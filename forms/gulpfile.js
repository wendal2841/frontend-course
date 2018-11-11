var gulp         = require('gulp');
var less         = require('gulp-less');
var browserSync  = require('browser-sync');
var cleanCSS     = require('gulp-clean-css');


gulp.task('less', function() {
    gulp.src('./src/style/**/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch([
        './dist/*.html',
        './dist/css/*.css'
    ]).on('change', browserSync.reload);

    gulp.watch('./src/style/**/*.less', ['less']);
});


gulp.task('server',function(){
    browserSync({
        port: 9000,
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('default', ['watch', 'server']);