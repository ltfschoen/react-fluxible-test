import React from 'react';
import {assert} from 'chai';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import VR from '../../components/VR';

const props = {};
const context = {};

describe ('VR Component with Shallow Rendering using Enzyme', () => {

    before(() => {
    });

    it('should exist', () => {
        assert.isDefined(VR);
    });

    it('renders one <VR /> component', () => {
        const wrapper = mount(<VR {...props} />, context, () => {
            setTimeout(20);
        });
        expect(wrapper.find(VR)).to.have.length(1);
    });

    describe ('With A-Frame component rendered', () => {

        it('renders one <Scene /> component', () => {
            const wrapper = shallow(<VR />);
            expect(wrapper.find('a-scene')).to.have.length(1);
        });

        it('renders two <Entity /> components', () => {
            const wrapper = shallow(<VR />);
            expect(wrapper.find('a-entity')).to.have.length(2);
        });

        it('should have a-html class on HTML element', () => {
            const wrapper = shallow(<VR {...props} />, context);
            expect(wrapper.find('html').hasClass('a-html')).to.equal(true);
        });

        it('should override CSS of a-html class of HTML element to enable scroll', () => {
            const wrapper = shallow(<VR {...props} />, context);
            expect(wrapper.find('html').props('style')).to.eql({position: 'relative'});
        });

        it('should have a-body class on Body element', () => {
            const wrapper = shallow(<VR {...props} />, context);
            expect(wrapper.find('body').hasClass('a-body')).to.equal(true);
        });

        it('should override CSS of a-body class to Body element to enable scroll', () => {
            const wrapper = shallow(<VR {...props} />, context);
            expect(wrapper.find('body').props('style')).to.eql({overflow: 'auto'});
        });
    });
});
