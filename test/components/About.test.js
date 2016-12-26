import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import About from '../../components/About';

function setupShallowRenderer() {
    const props = {};
    const context = {};

    let aboutComponent = TestUtils.renderIntoDocument(<About {...props} />, {context: context});

    // Return functions for usage in tests
    return {
        aboutComponent
    };
}

function setupFullDOM() {
    const props = {};
    const context = {};

    // Instance of React Test Utils Renderer
    let renderer = TestUtils.createRenderer();

    // Render About Component, Props, and Context
    renderer.render(<About {...props} />, {context: context});

    // Retrieve output of rendering About Component
    let output = renderer.getRenderOutput();

    // Return functions for usage in tests
    return {
        props,
        output,
        renderer
    };
}

describe ('About Component with Shallow Rendering using TestUtils', () => {
    it('should exist', () => {
        assert.isDefined(About);
    });
    it('should have correct title', () => {
        const {aboutComponent} = setupShallowRenderer();
        let aboutNode = ReactDOM.findDOMNode(aboutComponent);
        let titleElem = TestUtils.findRenderedDOMComponentWithTag(aboutNode, 'h2');
        expect(titleElem.textContent).toEqual('About');
    });
});

describe ('About Component with Full DOM using TestUtils', () => {
    it('should exist', () => {
        assert.isDefined(About);
    });
    it('should have correct title', () => {
        const { output } = setupFullDOM();
        expect(output.type).toBe('div');
        let [ h2Elem ] = output.props.children; // Destructure first element from Props children
        expect(h2Elem.type).toBe('h2');
        expect(h2Elem.props.children).toEqual('About');
    });
});
