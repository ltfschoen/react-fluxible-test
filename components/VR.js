import React from 'react';
import ReactDOM from 'react-dom';
import {canUseDOM} from 'exenv';
import {Entity, Scene} from 'aframe-react';

export default class VR extends React.Component {

    getAframeScene = () => {
        return (
            <Scene>
                <Entity geometry={{primitive: 'box'}} material="color: red" position={[0, 0, -5]}/>
                {/*<Entity bmfont-text={{text: 'HELLO WORLD'}} position="{[0, 1, -5]}"/>*/}
            </Scene>
        );
    };

    reenablePageScrollWhenAframeComponentUsed = () => {
        // Override classes used by A-Frame Scene to allow scrolling on VR page
        let aHtmlElement = document.getElementsByClassName("a-html")[0];
        let aBodyElement = document.getElementsByClassName("a-body")[0];

        aHtmlElement.setAttribute("style", "position: relative;");
        aBodyElement.setAttribute("style", "overflow: auto;");
    };

    componentDidMount() {
        console.log("Flux context: ", window.context);

        this.reenablePageScrollWhenAframeComponentUsed();
    }

    render () {
        return (
            <div className="aframe-react-scene">
                { canUseDOM ? this.getAframeScene() : null }
            </div>
        );
    }
}

