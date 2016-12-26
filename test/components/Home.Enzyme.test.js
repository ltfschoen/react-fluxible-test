import React from 'react';
import {assert} from 'chai';
import expect from 'expect';
import {shallow} from 'enzyme';
import Home from '../../components/Home';

const props = {};
const context = {};

describe ('Home Component with Shallow Rendering using Enzyme', () => {
    it('should exist', () => {
        assert.isDefined(Home);
    });
    it('should have correct title', () => {
        const wrapper = shallow(<Home {...props} />, context);
        expect(wrapper.find('h2').text()).toEqual('Home');
    });
});
