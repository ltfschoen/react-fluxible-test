/**
 *  This file contains ES5 since not transpiled by Babel performs the following.
 *  1. Sets Node environment variable
 *  2. Registers Babel to transpile code for testing
 *  3. Disables Webpack-specific features that Mocha does not understand.
 *  4. Requires jsdom so we can test via in-memory DOM in Node
 *  5. Sets up global vars that mimic a browser.
 */

/* eslint-disable no-var*/

/**
 *  This setting ensures .babelrc dev config (which includes
 *  hot module reloading code) does not apply for tests.
 *  Do not set it to the following with production version code since:
 *  1. No PropType validation warnings appear when code runs in prod mode.
 *  2. No detailed error messages appear during tests in prod mode.
 */
process.env.NODE_ENV = 'test';

// Register Babel so it transpiles ES6 to ES5 before running tests.
require('babel-register')();
//
// // Disable Webpack-specific features for tests as Mocha not compatible with them.
// require.extensions['.css'] = function () {return null;};
// require.extensions['.png'] = function () {return null;};
// require.extensions['.jpg'] = function () {return null;};

// Configure JSDOM and set global variables to simulate browser environment for tests.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function(property) {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;  // eslint-disable-line no-undef
