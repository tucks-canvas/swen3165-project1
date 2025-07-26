module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'lib/calculator.js',
      'test/calculator.spec.js'
    ],
    browsers: ['ChromeHeadless'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    client: {
      clearContext: false
    },
    singleRun: true
  });
};