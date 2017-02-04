/*global document, window */

import ReactDOM from 'react-dom';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';

const debugClient = debug('react-fluxible-test');
const dehydratedState = window.App; // Sent from the server.js

window.React = ReactDOM; // For chrome dev tool support

import 'aframe'; // A-Frame requires the 'window' object
// import 'aframe-bmfont-text-component'; // Requires A-Frame

// Expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('Rehydrating client-side of app (with same state as on server-side)');

/**
 *  Rehydrate client-side context state with same state as that on the server-side.
 *  @method `rehydrate(state, callback)` is signature of this function
 *  @param `state` param dehydratedState contains serialized object with dehydrated server-side state of
 *  the Fluxible instance expose by server.js.
 *  @param {Function} `callback` param is async to allow plugins to load necessary assets/data to bootstrap the app
 *  and receives params to cater for rehydration error (if any) and the newly created context that
 *  has been rehydrated to the server state.
 */
app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;

    const mountNode = document.getElementById('app');

    debugClient('React Rendering ApplicationComponent passing in ComponentContext via context Prop');
    ReactDOM.render(
        createElementWithContext(context),
        mountNode,
        () => debugClient('React Rendered')
    );
});
