'use strict';

var ansi256 = require('ansi-256-colors');
var chalk = require('chalk');
var config = require('./lib/config.js');
var path = require('path');
var supportsColor = require('supports-color');
var trueColor = require('term-true-color');

function loadPalette(palette) {
  var theme = path.resolve(__dirname, 'themes', config.theme, config.background,
    palette + '.json');

  exports.palette = require(theme);
}

exports.noop = function (string) {
  return string;
};

exports.palette = {};

exports.bold = exports.noop;
exports.italic = exports.noop;

exports.colorFn = exports.noop;

exports.disable = function () {
  exports.colorFn = exports.noop;
};

var colors = exports.colors = [
  'primary',
  'secondary',
  'highlight',
  'dim',

  'good',
  'neutral',
  'bad',

  'green',
  'yellow',
  'red'
];

// provided by the term-true-color module
exports.color16m = trueColor;

// provided by the ansi-256-colors module
exports.color256 = function (string, color) {
  return ansi256.fg.codes[parseInt(color, 10)] + string + ansi256.reset;
};

// provided by the chalk module
exports.color8 = function (string, color) {
  return chalk[color](string);
};

exports.detectCapabilities = function (color) {
  if (color === 'never' ||
      (color !== 'always' &&
       (process.env.DISABLE_COLOR || !supportsColor))) {
    exports.disable();

    return false;
  }

  var level = Math.max(1, (supportsColor && supportsColor.level) || 0);

  if (process.env.COLOR_16M) {
    level = 3;
  }

  if (color === 'always' || color === 'auto') {
    switch (level) {
      case 1:
        exports.colorFn = exports.color8;
        loadPalette('8');
        break;

      case 2:
        exports.colorFn = exports.color256;
        loadPalette('256');
        break;

      case 3:
        exports.colorFn = exports.color16m;
        loadPalette('true-color');
        break;

      default:
        exports.disable();

        return false;
    }

    exports.bold = chalk.bold;
    exports.italic = chalk.italic;

    return true;
  }

  return false;
};

colors.forEach(function (color) {
  exports[color] = function (string) {
    return exports.colorFn(string, exports.palette[color]);
  };
});
