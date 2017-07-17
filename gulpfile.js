const gulp = require("gulp");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
//const filesExist = require('files-exist');

var rutas = {
    rhtml: "./src/*.html",
    rjs: "./src/assets/js/*.js",
    rscss: "./src/assets/scss/*.scss"
};

gulp.task("prepararHTML", function () {
    gulp.src(rutas.rhtml)
        .pipe(gulp.dest('public/'))
    console.log("html")
    
});

gulp.task("prepararJS", function () {
    gulp.src(rutas.rjs)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('public/assets/js/'))
    console.log("js")
});

gulp.task("prepararCSS", function () {
    gulp.src(rutas.rscss)
        .pipe(sass({
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css/'))
    console.log("css")
});

gulp.task('html-watch', ['prepararHTML'], function () {
    browserSync.reload();
});

gulp.task('js-watch', ['prepararJS'], function () {
    browserSync.reload();
});

gulp.task('sass-watch', ['prepararCSS'], function () {
    browserSync.reload();
});

gulp.task("watchChanges", function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
    console.log(rutas.rjs)
    gulp.watch(rutas.rhtml, ['html-watch'])
    gulp.watch(rutas.rjs, ['js-watch'])
    gulp.watch(rutas.rscss, ['sass-watch'])
});
