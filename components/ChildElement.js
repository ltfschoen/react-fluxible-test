import React, {Component, PropTypes} from 'react';

export default class ChildElement extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>ChildElement</h2>
                <p>This is a description of the child element.</p>
            </div>
        );
    }
}
