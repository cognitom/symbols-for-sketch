# Symbols for Sketch

![Webfonts](images/webfonts.png)

This repo contains a set of templates to make a symbol font (icon font) with [Sketch](http://bohemiancoding.com/sketch). What to do is ...

0. Setup Tools
0. Draw Icons
0. Gulp!

Just 3 steps! Enjoy making your original fonts ;-)

![Screenshot of Template](images/template.png)


## Requirements

- Mac
- [Sketch 3](http://bohemiancoding.com/sketch) and [Sketch Tools](http://bohemiancoding.com/sketch/tool/)
- [Node.js](http://nodejs.org/)
- [gulp.js](http://gulpjs.com/)


## Setup Tools

### Sketch and Sketch Tools

You haven't got Sketch yet? Visit [App Store](https://itunes.apple.com/jp/app/sketch-3/id852320343?l=en&mt=12). It's worth more than its price tag.

Download [Sketch Tools](http://sketchtool.bohemiancoding.com/sketchtool-latest.zip). Then extract it and save these 2 files into `/usr/local/bin`.

- sketchtool
- sketchtool resources.bundle

To open `/usr/local/bin`, you can use "Go > Go to Folder..." menu command in Finder.

![Go > Go to Folder... in Finder](images/finder.png)


### Node.js and gulp.js

You need some command line environments. But don't worry. Almost all will be done through GUI.

Go to [http://nodejs.org/](http://nodejs.org/) and click the INSTALL link.

![Node.js](images/nodejs.png)

Open the file downloaded and install it into your mac.

![Install Node.js](images/install-node.png)

Open Terminal.app. You may find it at `/Applications/Utilities/Terminal.app` as you know. Type the command below to install gulp.

```bash
$ sudo npm install -g gulp
```

![$ sudo npm install -g gulp](images/install-gulp.png)


### Download this repo

Download [this repo from GitHub](https://github.com/cognitom/symbols-for-sketch/archive/master.zip). Extract it into the folder you like. e.g. `/Users/yourname/Documents/your_icons`

Move to the folder in Terminal.app

```bash
$ cd /Users/yourname/Documents/your_icons
```

Install some tools into the folder.

```bash
$ npm install
```

We use these plugin for gulp.js, FYI.

- [gulp-sketch](https://github.com/cognitom/gulp-sketch)
- [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont)


## Draw Icons

It's time to draw your icons!

- symbol-font-14px.sketch (default)
- symbol-font-16px.sketch

There're two templates. Difference between these are just grid size. The template contains 32 artboards to draw each icon. Of cause you can add more artboards if you need.


### Name convention

The name of the artboard is important. It define the name of not only the glyph but also the class of CSS.

- `icon_name`: The character code will be assign automatically
- `uF701-icon_name`: You can assign the code manually

![The name of artboard](images/sample.png)


## Usage

After saving your Sketch file, go to your terminal.

```bash
$ gulp symbols [options]
```

The fonts, CSS, and HTML will be in the given `-l` directory or default of 'dist'
if none is provided.

### Cleanup

If you want to delete everything in a given distribution directory.

```bash
$ gulp clean-dist [options]
```

### Options

You can customize the output with the following options.

```
-d, --sketchDoc    [string] The path to the Sketch document to use. Default is
                   'symbol-font-14px.sketch'. The default Sketch doc is in this repo.

-n, --name         [string] This will be the name of the font. Default is 'symbols'.

-c, --className    [string] The class used in the generated CSS and HTML. Default is 's'.

-l, --location     [string] Where the files will be saved. Default is 'dist' in
                   the current working directory. This will be created if it does
                   not already exist.

-t, --template     [string] Lodash template for html/css. "fontawesome", "foundation"
                   or custom. Default is 'fontawesome'.

--no-sample        [boolean] Pass this if you don't want the sample.html generated.

--no-css           [boolean] Pass this if you don't want the CSS generated.

--forceClean       [boolean] For use with the `clean-dist` task. Allows for directories
                   outside the current working directory to be cleaned. You will see
                   an error if you try to use the clean task for external dirs without
                   this.
```

You can see all the options, descriptions, and defaults on the command line using:

```
gulp -h
```

## CSS Styles

You can choose CSS Style templates, and make your own with [lodash template](http://lodash.com/docs#template).


#### (1) like Font Awesome

- respect to: [Font Awesome](http://fontawesome.io/)
- template: `css/fontawesome-style.css`

```html
<span class="s s-your_icon"></span>
```


#### (2) like Foundation

- respect to: [Foundation Icon Font 3](http://zurb.com/playground/foundation-icon-fonts-3)
- template: `css/foundation-style.css`

```html
<span class="s-your_icon"></span>
```
