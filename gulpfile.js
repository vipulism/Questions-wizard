const { series, src, dest, watch, parallel  } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const browserSync =  require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');


  const path = {
      scripts:{
        src:'./src/js/*.js',
      dist: './dist/js/'},
      html:{
        src:'./src/*.html',
        dist:'./dist'
      },
      styles:{
        src:'./src/scss/style.scss',
        dist:'./dist/css'
      }
  }

 function wa(cb) {
    // body omitted
    browserSync.init({
        server:{
            baseDir:'./dist'
        }
    }) 
  watch(path.styles.src, styles);
  watch(path.scripts.src, scripts).on('change', browserSync.reload);
  watch(path.html.src, html).on('change', browserSync.reload);
}

function styles() {
 
  return src(path.styles.src)
  .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(dest(path.styles.dist))
    .pipe(browserSync.stream())
}

  
  
  function html() {
    // body omitted
    return src(path.html.src)
        .pipe(dest(path.html.dist))
        .pipe(browserSync.stream())
  }

   

  function scripts() {
    return src(path.scripts.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(path.scripts.dist))
        .pipe(browserSync.stream())
  }

  
  exports.default = wa;



  if (process.env.NODE_ENV === 'production') {
    //exports.build = series(minify);
  } else {
    //exports.build = series(livereload);
  }
  