import gulp from 'gulp'
import gulpSass from "gulp-sass"
import nodeSass from "sass";
const sass = gulpSass(nodeSass);
import BS from 'browser-sync'
const browserSync = BS.create();
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename'
import clean from 'gulp-clean'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import ghPages from 'gulp-gh-pages'
const { src, dest, task, watch, series } = gulp;

const cleanFunc = () => src('dist/*', {read: false})
    .pipe(clean())

const buildCss = () => src('src/styles/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
        env: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat("styles.css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/styles'));

const imgMin = () => src('src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'))

const buildJs = () => src('src/js/**/*')
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'))

const startWatching = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('src/**/*').on('all', series(buildCss, buildJs, browserSync.reload));
}

task('dev', startWatching)
task('build', series(cleanFunc, buildCss, buildJs, imgMin))

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
