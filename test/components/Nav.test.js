import React from 'react';
import {assert} from 'chai';
import expect from 'expect';
import Nav from '../../components/Nav';

const props = {};
const context = {};

describe ('Nav Component', () => {
    it('should exist', () => {
        assert.isDefined(Nav);
    });
    it('should have correct title', () => {
        var input = [{
            name: 'Title 1',
            content: 'Content belongs to title 1'
        },{
            name: 'Title 2',
            content: 'Content belongs to title 2',
            showOnLoad: true
        }];

        var accordion = TestUtils.renderIntoDocument( <Accordion data={input}/> );
        var contents = TestUtils.scryRenderedDOMComponentsWithClass(accordion, 'accordion-content');
        expect(contents.length).toEqual(1);
        expect(contents[0].textContent).toEqual('Content belongs to title 2');
    });
});
