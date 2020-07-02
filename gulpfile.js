var gulp = require('gulp')
var postCss = require('gulp-postcss')
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")
const gulpSourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imageMin = require('gulp-imagemin')
var ghPages = require("gh-pages")
var concat = require("gulp-concat")


gulp.task("css", function(){
    return gulp.src([
        "SRC/css/reset.css",
        "SRC/css/typography.css",
        "SRC/css/app.css"
    ])
        .pipe(sourcemaps.init())
        .pipe(
            postCss([
                require("autoprefixer"), 
                require("postcss-preset-env")({
                    stage: 1, 
                    browsers: ["IE 11", "last 2 versions"]
                })
            ])
        )
        .pipe(concat("app.css"))
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
    gulp.watch("SRC/css/*", ["css"])
    gulp.watch("SRC/fonts/*", ["fonts"])
    gulp.watch("SRC/img/*", ["images"])
})

gulp.task("deploy", function(){
    ghPages.publish("dist")
})

gulp.task('default', ["html", "css", "fonts", "images", "watch"])