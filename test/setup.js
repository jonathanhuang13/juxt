require('should');
require('babel-core/register')({
  presets: ['es2015', 'node6', 'stage-0'],
  plugins: ['transform-async-to-generator', 'transform-runtime'],
});