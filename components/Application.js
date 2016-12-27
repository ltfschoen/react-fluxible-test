/*globals document*/

import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import pages from '../configs/routes';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        // Retrieve Plugin state value of 'bar' from component
        console.log("Fluxible Plugin called with props.context.getFoo() in ApplicationComponent returns: ", props.context.getFoo());
    }

    render() {
        var Handler = this.props.currentRoute.handler;

        return (
            <div>
                <Nav currentRoute={this.props.currentRoute} links={pages} />
                <Handler />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

// Plugin Custom Context Type 'foo' is registered in React Context for access even by children
Application = provideContext(Application, {
    getFoo: React.PropTypes.func
});

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
