var gulp = require("gulp");
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var args = require('yargs')
  .default('name', 'symbols')
  .default('template', 'fontawesome')
  .default('sketchDoc', 'symbol-font-14px.sketch')
  .default('dist', 'dist')
  .default('className', 's')
  .boolean('sample')
  .default('sample', true)
  .boolean('css')
  .default('css', true)
  .boolean('forceClean')
  .argv;

var template = args.template + '-style';

gulp.task('symbols', function () {
  gulp.src(args.sketchDoc)
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    .pipe(iconfont({ fontName: args.name }))
    .on('codepoints', function (codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: args.name,
        fontPath: '../fonts/',
        className: args.className
      };

      if (args.css) {
        gulp.src('templates/' + template + '.css')
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: args.name }))
          .pipe(gulp.dest(args.dist + '/css/'));
      }

      if (args.sample) {
        gulp.src('templates/' + template + '.html')
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: 'sample' }))
          .pipe(gulp.dest(args.dist + '/'));
      }
    })
    .pipe(gulp.dest(args.dist + '/fonts/'));
});

gulp.task('watch', function () {
  gulp.watch('*.sketch/Data', ['symbols']);
});

// Delete everything in the dist directory.
// To remove files outside the current directory pass the --forceClean flag
gulp.task('clean-dist', function () {
  return gulp.src(args.dist + '/*', {read: false})
    .pipe(clean({force: args.forceClean}));
});
