const gulp = require("gulp");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

var rutas = {
    js: "./src/assets/js/*.js",
    scss: "./src/assets/scss/*.scss",
    html: "./src/*.html"
}

gulp.task("prepararHTML", function(){
    gulp.src(rutas.html)
    .pipe(gulp.dest('public'))
})

gulp.task("prepararJS", function () {
    gulp.src(rutas.js)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('public'))
})


gulp.task("prepararCSS", function () {
    gulp.src(rutas.scss)
        .pipe(sass({
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(gulp.dest('public'))
})

gulp.task("watchChanges", function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
    gulp.watch(rutas.scss, ['sass-watch'])
})

gulp.task('sass-watch', ['prepararCSS'], function () {
    browserSync.reload();
})
