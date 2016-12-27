import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';

// Create new Fluxible instance using parameters passed to the constructor
let app = new Fluxible({
    // Optional param that stores top-level React component for accessing `context.getComponent()`
    component: Application,
    /**
     *  Optional param is app-level component handler that is called upon error in calling `executeAction`,
     *  since components cannot pass callbacks to `executeAction`. Override its default handling of throwing the error.
     */
    componentActionErrorHandler: function (context, payload, done) {
        // actionName can be used to help with debugging
        var name = payload.actionName;
        var err = payload.err;
        // Handle error by setting error state
        context.dispatch('APPLICATION_ERROR', err);
        done();
    }
});

// Register Stores available to the app to handle Actions and accessible via `getStore`
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

// Plugin
app.plug({
    // Required unique name property
    name: 'TestPlugin',

    /**
     * Called after context creation to dynamically create a context plugin
     * @method plugContext
     * @param {Object} options Options passed into createContext
     * @param {Object} context FluxibleContext instance
     * @param {Object} app Fluxible instance
     */
    plugContext: function (options, context, app) {
        // `options` is the same as what is passed into `Fluxible.createContext(options)`
        let foo = options.foo;

        // Returns a context plugin
        return {
            /**
             * Method called to allow modification of the component context
             * @method plugComponentContext
             * @param {Object} componentContext ComponentContext instance
             * @param {Object} context FluxibleContext instance
             * @param {Object} app Fluxible instance
             */
            plugComponentContext: function (componentContext, context, app) {
                componentContext.getFoo = function () {
                    return foo;
                };
            },
            //plugActionContext: function (actionContext, context, app) {}
            //plugStoreContext: function (storeContext, context, app) {}

            /**
             * Allows context plugin settings to be persisted between server and client.
             * Called on server to send data down to the client
             * @method dehydrate
             */
            dehydrate: function () {
                return {
                    foo: foo
                };
            },

            /**
             * Called on client to rehydrate the context plugin settings
             * @method rehydrate
             * @param {Object} state Object to rehydrate state
             */
            rehydrate: function (state) {
                foo = state.foo;
            }
        };
    },

    /**
     * Allows dehydration of application plugin settings
     * @method dehydrate
     */
    dehydrate: function () { return {}; },

    /**
     * Allows rehydration of application plugin settings
     * @method rehydrate
     * @param {Object} state Object to rehydrate state
     */
    rehydrate: function (state) {}
});

module.exports = app;
