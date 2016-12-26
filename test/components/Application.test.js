import {BaseStore} from 'fluxible/addons';
import {createMockComponentContext} from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import ApplicationStore from '../../stores/ApplicationStore';

// Actions fired from component that could be overriden using Mockery library
let testAction = function (actionContext, payload, done) {
    let appStore = actionContext.getStore(ApplicationStore).getPageTitle() + payload;
    actionContext.dispatch('NAVIGATE_SUCCESS', appStore);
    actionContext.executeAction(testAction, appStore, done);
    done();
};

// Mock of ApplicationStore overrides actual store
class MockApplicationStore extends BaseStore {
    constructor (dispatcher) {
        super(dispatcher);
        this.pageTitle = 'Home';
    }
    handlePageTitle (payload) {
        this.pageTitle = payload;
        this.emitChange();
    }
    getPageTitle () {
        return this.pageTitle;
    }
}
// Matches the actual ApplicationStore.storeName
MockApplicationStore.storeName = 'ApplicationStore';
MockApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle'
};

describe('Application Component', function () {
    let componentContext;
    let React;
    let ReactDOM;
    let ReactTestUtils;
    let provideContext;
    let connectToStores;
    let ApplicationComponent;

    beforeEach(function (done) {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        componentContext = createMockComponentContext({
            stores: [MockApplicationStore]
        });
        jsdom.env('<html><body></body></html>', [], function (err, window) {
            global.window = window;
            global.document = window.document;
            global.navigator = window.navigator;

            // React must be required after window is set
            React = require('react');
            ReactDOM = require('react-dom');
            ReactTestUtils = require('react-addons-test-utils');
            provideContext = require('fluxible-addons-react/provideContext');
            connectToStores = require('fluxible-addons-react/connectToStores');

            // The component being tested
            ApplicationComponent = React.createClass({
                contextTypes: {
                    executeAction: React.PropTypes.func.isRequired
                },
                onClick: function () {
                    this.context.executeAction(testAction, 'PageTitle');
                },
                render: function () {
                    return <button onClick={this.onClick}>{this.props.pageTitle}</button>;
                }
            });
            // Wrap with context provider and store connector
            ApplicationComponent = provideContext(connectToStores(ApplicationComponent, [ApplicationStore], function (context, props) {
                return {
                    pageTitle: context.getStore(ApplicationStore).getPageTitle()
                };
            }));
            done();
        });
    });

    afterEach(function () {
        delete global.window;
        delete global.document;
        delete global.navigator;
        mockery.disable();
    });

    it('should call context executeAction when context provided via React context', function (done) {
        let component = ReactTestUtils.renderIntoDocument(
            <ApplicationComponent context={componentContext} />
        );
        let node = ReactDOM.findDOMNode(component);
        assert.equal('Home', node.innerHTML);
        ReactTestUtils.Simulate.click(node);
        assert.equal('HomePageTitle', node.innerHTML);
        ReactTestUtils.Simulate.click(node);
        assert.equal('HomePageTitlePageTitle', node.innerHTML);
        done();
    });
});
