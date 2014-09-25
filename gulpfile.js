var gulp = require('gulp');
var pipe = require('pipe/gulp');
var rimraf = require('gulp-rimraf');
var traceur = require('gulp-traceur');
var runSequence = require('run-sequence');
var mergeStreams = require('event-stream').merge;
var webserver = require('gulp-webserver');

var path = {
    src: ['./src/**/*.js'],
    srcCopy: ['./src/**/*.html'],
    deps: {
        'watchtower': './node_modules/watchtower/src/**/*.js',
        'expressionist': './node_modules/expressionist/src/**/*.js',
        'di': './node_modules/di/src/**/*.js',
        'rtts-assert': './node_modules/rtts-assert/src/**/*.js',
        'templating': './node_modules/templating/src/lib/**/*.js',
        'router': './node_modules/router/src/**/*.js'
    },
    depsCopy: [
        './bower_components/ratchet/dist/**/*.css',
        './bower_components/ratchet/dist/**/*.eot',
        './bower_components/ratchet/dist/**/*.svg',
        './bower_components/ratchet/dist/**/*.ttf',
        './bower_components/ratchet/dist/**/*.woff',
        './bower_components/fingerblast/dist/fingerblast.min.js',
        './bower_components/platform/platform.js',
        './bower_components/platform/platform.js.map',
        './node_modules/es6-shim/es6-shim.js',
        './node_modules/zone.js/zone.js',
        './node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/requirejs/require.js',
        './node_modules/route-recognizer/dist/route-recognizer.amd.js'
    ],
    output: 'dist'
};

gulp.task('rimraf', function() {
    return gulp.src([path.output], {read: false})
        .pipe(rimraf());
});

gulp.task('build_source', function() {
    var assetStream = gulp.src(path.srcCopy)
        .pipe(gulp.dest(path.output));
    var sourceStream = gulp.src(path.src)
        .pipe(traceur(pipe.traceur()))
        .pipe(gulp.dest(path.output));
    return mergeStreams(sourceStream, assetStream);
});

var createDepStream = function(prop) {
    return gulp.src(path.deps[prop])
        .pipe(traceur(pipe.traceur()))
        .pipe(gulp.dest(path.output + '/lib/' + prop));
};

gulp.task('build_deps', function() {
    var assetStream = gulp.src(path.depsCopy)
        .pipe(gulp.dest(path.output + '/lib/'));
    var depStreams = Object.keys(path.deps).map(createDepStream);
    var streams = depStreams.concat(assetStream);
    return mergeStreams.apply(null, streams);
});

gulp.task('build', function(done) {
    runSequence(
        'rimraf',
        ['build_source', 'build_deps'],
        done
    );
});

gulp.task('watch', ['build'], function() {
    gulp.watch([path.src, path.srcCopy], ['build_source']);
    var deps = Object.keys(path.deps).map(function(key) {
        return path.deps[key];
    });
    gulp.watch([deps], ['build_deps']);
});

gulp.task('serve', ['build'], function() {
    gulp.src('dist')
        .pipe(webserver({
            open: true
        }));
});