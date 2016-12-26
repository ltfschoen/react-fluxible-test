import {BaseStore} from 'fluxible/addons';
import {createMockActionContext} from 'fluxible/utils';
import assert from 'assert';
import ApplicationStore from '../../stores/ApplicationStore';

// Actions being tested
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

describe ('Application Store testAction', () => {
    let actionContext;
    beforeEach(function () {
        actionContext = createMockActionContext({
            stores: [MockApplicationStore]
        });
    });
    it('should dispatch pageTitle', function (done) {
        testAction(actionContext, 'PageTitle', function () {
            assert.equal(1, actionContext.dispatchCalls.length);
            assert.equal('NAVIGATE_SUCCESS', actionContext.dispatchCalls[0].name);
            assert.equal('HomePageTitle', actionContext.dispatchCalls[0].payload);
            assert.equal(1, actionContext.executeActionCalls.length);
            assert.equal('HomePageTitle', actionContext.executeActionCalls[0].payload);
            done();
        });
    });
});
