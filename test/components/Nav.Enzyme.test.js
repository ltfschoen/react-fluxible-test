import React from 'react';
import {assert} from 'chai';
import expect from 'expect';
import {shallow} from 'enzyme';
import Nav from '../../components/Nav';

const props = {};
const context = {};

describe ('Nav with Shallow Rendering using Enzyme', () => {
    it('should exist', () => {
        assert.isDefined(Nav);
    });
    it('should have correct title', () => {
        const wrapper = shallow(<Nav {...props} />, context);
        expect(wrapper.props().links).to.be.defined;
    });
});
