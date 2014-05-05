var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var fontName = 'symbols'; // set name of your symbol font

gulp.task('symbols', function(){
  gulp.src("symbol-font-14px.sketch") // you can also choose "symbol-font-16px.sketch"
  .pipe(sketch({
    export: 'artboards',
    formats: 'svg'
  }))
  .pipe(iconfont({ fontName: fontName }))
  .on('codepoints', function(codepoints) {
    gulp.src('templates/fontawesome-style.css')
    .pipe(consolidate('lodash', {
      glyphs: codepoints,
      fontName: fontName,
      fontPath: '../fonts/', // set path to font (from your CSS file if relative)
      className: 's' // set class name in your CSS
    }))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/css/')); // set path to export your CSS
  })
  .pipe(gulp.dest('dist/fonts/')); // set path to export your fonts
});