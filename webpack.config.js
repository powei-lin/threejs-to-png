const path = require('path');

module.exports = {
  mode: 'development',
  entry: './scene/js/scene.js',
  target: 'electron-renderer',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'scene'),
  }
};