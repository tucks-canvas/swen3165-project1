module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      files: [
        'lib/calculator.js',  // Implementation first
        'test/calculator.spec.js'  // Tests second
      ],
      browsers: ['Chrome'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher')
      ]
    });
  };