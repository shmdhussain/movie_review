var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');

var sourcemaps = require('gulp-sourcemaps');
// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

//Browser Sync reload task
gulp.task('browserSyncReload', browserSync.reload);

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        // .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
})

//babel tasks
gulp.task('js', function(){
    return gulp.src(['app/preCompileJs/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('app/js'));
});



// Watchers
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/preCompileJs/**/*.js', function() { runSequence('js', 'browserSyncReload') });
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref:castDetail', function() {
    return gulp.src(['app/castDetail/**/*.html'])
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist/castDetail'));
});

// Optimizing CSS and JavaScript 
gulp.task('useref:home', function() {
    return gulp.src(['app/**/*.html', '!app/castDetail/**/*.html'])
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg|webp)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})


// Copying cast detial HTML 
gulp.task('copyCastDetailHTML', function() {
    return gulp.src('app/castDetail/**/*.html')
        .pipe(gulp.dest('dist/castDetail'))
});



// Copying test data
gulp.task('copyTestData', function() {
    return gulp.src('app/data/**/*.json')
        .pipe(gulp.dest('dist/data'))
});

// Copying cast sw
gulp.task('copyServiceWorker', function() {
    return gulp.src('app/serviceworker_prod/serviceworker.js')
        .pipe(gulp.dest('dist'))
});

// Copying cast sw
gulp.task('copyManifest', function() {
    return gulp.src('app/manifest.json')
        .pipe(gulp.dest('dist'))
});

// Copying fav icons
gulp.task('copyFavIcons', function() {
    return gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist'))
});


// Cleaning 
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'js'], 'watch',
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass', 'js', 'useref:home', 'useref:castDetail', [  'images', 'fonts', 'copyTestData', 'copyServiceWorker', 'copyManifest', 'copyFavIcons'],
        callback
    )
})