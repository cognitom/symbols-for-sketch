var gulp = require("gulp");
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var yargs = require('yargs');
var args = yargs
  .usage('Create font files and CSS for the given Sketch file')
  .options('d', {
    alias: 'sketchDoc',
    default: 'symbol-font-14px.sketch'
  })
  .options('n', {
    alias: 'name',
    default: 'symbols'
  })
  .options('c', {
    alias: 'className',
    default: 's'
  })
  .options('l', {
    alias: 'location',
    default: 'dist'
  })
  .options('t', {
    alias: 'template',
    default: 'fontawesome'
  })
  .boolean('sample').default('sample', true)
  .boolean('css').default('css', true)
  .boolean('forceClean')
  .boolean('h').alias('h', 'help')
  .describe({
    'd': 'The path to the Sketch document to use.',
    'n': 'This will be the name of the font.',
    'c': 'The class used in the generated CSS and HTML.',
    'l': 'Where the files will be saved.',
    't': 'Lodash template. "fontawesome", "foundation" or custom.',
    'sample': 'Use --no-sample to not create HTML.',
    'css': 'Use --no-css to not create CSS'
  })
  .argv;

var template = args.template + '-style';

if (args.h) {
  yargs.showHelp();
}

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
          .pipe(gulp.dest(args.location + '/css/'));
      }

      if (args.sample) {
        gulp.src('templates/' + template + '.html')
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: 'sample' }))
          .pipe(gulp.dest(args.location + '/'));
      }
    })
    .pipe(gulp.dest(args.location + '/fonts/'));
});

gulp.task('watch', function () {
  gulp.watch('*.sketch/Data', ['symbols']);
});

// Delete everything in the dist directory.
// To remove files outside the current directory pass the --forceClean flag
gulp.task('clean-dist', function () {
  return gulp.src(args.location + '/*', {read: false})
    .pipe(clean({force: args.forceClean}));
});
