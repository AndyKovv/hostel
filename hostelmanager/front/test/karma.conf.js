// Karma configuration
// Generated on 2016-03-29

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    preprocessors: {
      'src/app/**/*.html': ['ng-html2js']
    },

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],


       files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'https://maps.googleapis.com/maps/api/js?sensor=false',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-bootstrap/dist/ui-bootstrap.js',
      'bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'bower_components/angular-messages/angular-messages.min.js',
      'bower_components/angular-material/angular-material.min.js',
      'bower_components/angular-aria/angular-aria.min.js',
      'bower_components/angular-cookies/angular-cookies.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
      'bower_components/angular-ui-mask/dist/mask.min.js',
      'bower_components/ngQuickDate/dist/ng-quick-date.js',
      'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
      'bower_components/file-saver/FileSaver.min.js',
      'bower_components/angular-translate/angular-translate.min.js',



      'https://js.stripe.com/v2',

      // endbower
      'src/app/**/*.js',
      //'test/mock/**/*.js',
      'test/spec/**/*.js',
     '*.html',
      '*.html.ext',
      // if you wanna load template files in nested directories, you must use this
      'src/app/**/*.html'
    ],
     ngHtml2JsPreprocessor: {

      moduleName: 'templates'
    },

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
