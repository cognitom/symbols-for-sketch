# for Android Apps

## Gulp!

```bash
$ cd variants/android
$ gulp symbols
```

Then check the `dist` directory. There'll be the font and XML files generated.

## Import icon fonts

### (1) Move font to Assest directory

![Android Assest](images/android-assets.png)

### (2) Move xml to res/value

![Android Value](images/android-value.png)

### (3) Android TextView use font

```java
Typeface font = Typeface.createFromAsset(getContext().getAssets(), "symbols.ttf");
textView.setTypeface(font);
textView.setText(R.string.add);
```

### (4) Demo

![Android Demo](images/android-demo.png)
