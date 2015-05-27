var gulp = require('gulp');
var process = require('process');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    cache = require('gulp-cached'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-regex-replace'),
    reactConcat = require('gulp-react-concat');

var version = '1.0.0';

var minifyOpts = {

};

var imagesOpts = {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
};

var sassOpts = {
    includePaths: [
        'vendor/foundation/scss',
        'vendor/mindy-sass/mindy'
    ]
};

var dst = {
    js: 'dist/js',
    react: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    sass: 'css',
    audio: 'dist/mp3'
};

var paths = {
    react: [
        'components/local_storage.js',
        'vendor/react/react-with-addons.js',
        'vendor/react-router/build/global/ReactRouter.js',
        'components/react-mixins.js',
        'components/react-pager.js',
        'components/react-infinite.js',
        'jsx/components/**/*',
        'jsx/pages/*',
        'jsx/utils/*',
        'jsx/app.js',
        'jsx/index.js'
    ],
    js: [
        'vendor/jquery/dist/jquery.min.js',
        'vendor/fastclick/lib/fastclick.js',
        'vendor/foundation/js/foundation.min.js',

        'js/app.js'
    ],
    coffee: 'js/**/*.coffee',
    images: [
        'images/**/*'
    ],
    audio: [
        'mp3/**/*'
    ],
    sass: 'scss/**/*.scss',
    css: [
        'css/**/*.css'
    ]
};

gulp.task('react', function () {
    return gulp.src(paths.react)
        .pipe(react())
        .pipe(concat(version + '.app.all.js'))
        .pipe(gulp.dest(dst.react))
        .pipe(livereload());
});

gulp.task('coffee', function() {
    gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }).on('error', function(err) {
            console.log(err);
        }))
        .pipe(gulp.dest(dst.js))
});

gulp.task('js', ['coffee'], function() {
    return gulp.src(paths.js)
        // .pipe(uglify())
        .pipe(concat(version + '.all.js'))
        .pipe(gulp.dest(dst.js))
        .pipe(livereload());
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(changed(dst.images))
        .pipe(imagemin(imagesOpts))
        .pipe(gulp.dest(dst.images));
});

gulp.task('audio', function() {
    return gulp.src(paths.audio)
        .pipe(gulp.dest(dst.audio));
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass(sassOpts))
        .pipe(gulp.dest(dst.sass));
});

gulp.task('css', ['sass'], function() {
    return gulp.src(paths.css)
        .pipe(minifyCSS(minifyOpts))
        .pipe(concat(version + '.all.css'))
        .pipe(gulp.dest(dst.css))
        .pipe(livereload());
});

// Rerun the task when a file changes
gulp.task('watch', ['default'], function() {
    livereload.listen();

    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sass, ['css']);
    gulp.watch(paths.react, ['react']);
    gulp.watch(paths.audio, ['audio']);
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('react', 'js', 'css', 'images', 'audio');
});