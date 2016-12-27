/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
const env = process.env.NODE_ENV;

const debug = debugLib('react-fluxible-test');

const server = express();
server.use('/public', express['static'](path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());

// Request
server.use((req, res, next) => {
    /**
     *  Create new FluxibleContext instance http://fluxible.io/api/fluxible-context.html
     *  passing the contextOptions into the constructor.
     *  Dynamically modify the FluxibleContext instance each time it is created for a request by
     *  iterating over plugins and calling `plugContext` (that receives context options) on those that exist.
     *  Note: plug(plugins) allows modification to SubContexts for sharing custom app-wide context settings
     *  between server and client
     */
    // Object containing Context Settings
    const contextOptions = {
        // param provides access to app-level functions and Settings
        app: null,
        // Set a value to the Plugin context
        foo: 'bar'
    };

    const context = app.createContext(contextOptions);

    debug('Executing navigate action (with request url as payload, and anonymous function as callback)');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // Pass through to next middleware
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state (so it is available as dehydrated state in the client)');
        /**
         *   Note: `dehydrate(context)` returns serializable object containing the state of the Fluxible
         *   instance (and Fluxible Component instances passed to its properties) ready for sending
         *   the state of the app to the client. It calls any plugins with a `dehydrate` method.
         */
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        const htmlElement = React.createElement(HtmlComponent, {
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            /**
             *  Access to top-level component property of Fluxible instance shared by both server and client
             */
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        console.log("HTML element being rendered to the DOM is: ", htmlElement);
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup and state to the client');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
