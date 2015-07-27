## term-color-theme

*(note: still a work in progress!)*

*Please see [this
issue](https://github.com/beaugunderson/term-color-theme/issues/1) to help with
suggesting default themes!*

Provides terminal color theme support to your module. A user can specify a
simple config in `~/.config/color-theme/config.json`. All keys in `config.json`
are optional, and `term-color-theme` defaults to dark background. Default
themes are provided for 8, 256, and true color in dark and light backgrounds.
`term-color-theme` will autodetect the correct color depth to use (8, 256, or
true color) and provide you with a set of functions to use to color text.

### Example config.json

```json
{
  "background": "dark",
  "theme": "gardener"
}
```

### Example usage

```js
var theme = require('theme');

// 'auto' here will look at the DISABLE_COLOR environment variable and also use
// the supports-color module to see if the terminal supports color; you can
// also force behavior by using 'always' and 'never'
theme.detectCapabilities('auto');

console.log(theme.primary('hello world'), theme.dim('subtle'));
```
