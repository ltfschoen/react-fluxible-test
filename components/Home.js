import React from 'react';
import ChildElement from './ChildElement';

export default class Home extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>Welcome to the site!</p>

                <ChildElement />
            </div>
        );
    }
}
