const gulp = require('gulp'); // pod zmienna gulp mamy obiekt gulp
const sass = require('gulp-sass'); // chcemy uzyc task do sassow
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const c = require('ansi-colors');
const notifier = require('node-notifier');


function showError(err){
    console.log(c.red(err.messageFormatted));

    notifier.notify({
        title: 'Błąd kompilacji',
        message: err.messageFormatted
    });

    this.emit('end');
}


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify:false,
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss') // pobieramy pliki. Kompilacja nie moze sie zaczynac od dowolnego pliku scss, tylko od glownego.
        .pipe(plumber({
            errorHandler : showError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" // nested, expanded, compact, compressed
        })) // wykonujemy dzialania na plikach
        .pipe(autoprefixer({ browsers: ['> 5%'], // to trzeba zmienic z tego last 2 version, bo bedzie blad
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css')) // gdzies zapisujemy
    // te pipy to jest jedna dluga linia, dlatego po tych pierwszych pipe'ach nie moze byc srednikow
        .pipe(browserSync.stream());
});


gulp.task('watch', function () { // watch bedzie obserwowal wszystkie pliki typu sass i jak cos zmieni to bedzie odpalal task sass
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', function () {
    console.log(c.yellow('----------------Rozpoczynam prace----------------'));
    gulp.start(['sass', 'browser-sync', 'watch']);
});

