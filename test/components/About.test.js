import React from 'react';
import {assert} from 'chai';
import expect from 'expect';
import {shallow} from 'enzyme';
import About from '../../components/About';

const props = {};
const context = {};

describe ('About', () => {
    it('should exist', () => {
        assert.isDefined(About);
    });
    it('should have correct title', () => {
        const wrapper = shallow(<About {...props} />, context);
        expect(wrapper.find('h2').text()).toEqual('About');
    });
});
