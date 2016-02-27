const
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  sketch = require('gulp-sketch'),
  iconfont = require('gulp-iconfont'),
  consolidate = require('gulp-consolidate')

/**
 * Font settings
 */
const
  // set name of your symbol font
  fontName = 'symbols'

/**
 * Recommended to get consistent builds when watching files
 * See https://github.com/nfroidure/gulp-iconfont
 */
const timestamp = Math.round(Date.now() / 1000)

gulp.task('symbols', () =>
  gulp.src('symbol-android-16px.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    .pipe(iconfont({
      fontName,
      formats: ['ttf'],
      timestamp,
      log: () => {} // suppress unnecessary logging
    }))
    .on('glyphs', function(glyphs) {
      const options = {
        glyphs: glyphs.map(mapGlyphs),
        fontName: fontName
      }
      gulp.src('android.xml')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: fontName }))
        .pipe(gulp.dest('dist/xml/')) // set path to export your xml
    })
    .pipe(gulp.dest('dist/fonts/')) // set path to export your fonts
)

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}
