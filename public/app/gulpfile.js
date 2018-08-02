var gulp = require('gulp')
var fs = require("fs")
var browserify = require('browserify')
var babelify = require('babelify')
var vueify = require('vueify')
var watchify = require('watchify')

var hmr = require('browserify-hmr');

var b;

gulp.task('default', function() {
    
    b = browserify({
            entries: ['./src/main.js'],
        })
        .plugin(watchify)
        .plugin(hmr)
        .on('update', function() {
            bundle()
        })
    // b.on('update', bundle);
    bundle();
    
    function bundle() {
        b.bundle().pipe(fs.createWriteStream("./dist/home.js"))
    }
})


