var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")
const gulpSourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imageMin = require('gulp-imagemin')
var ghPages = require("gh-pages")

sass.compiler = require('node-sass')

gulp.task("sass", function(){
    return gulp.src("SRC/css/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCss({ 
                compatibility: 'ie8' 
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream())
})

gulp.task("html", function(){
    return gulp.src("SRC/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function(){
    return gulp.src("SRC/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
    return gulp.src("SRC/img/*")
        .pipe(imageMin())
        .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
    gulp.watch("SRC/*.html", ["html"]).on("change", browserSync.reload)
    gulp.watch("SRC/css/app.scss", ["sass"])
    gulp.watch("SRC/fonts/*", ["fonts"])
    gulp.watch("SRC/img/*", ["images"])
})

gulp.task("deploy", function(){
    ghPages.publish("dist")
})

gulp.task('default', ["html", "sass", "fonts", "images", "watch"])