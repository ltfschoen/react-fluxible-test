import React from 'react';
import ReactDOM from 'react-dom';
import {canUseDOM} from 'exenv';
import {Entity, Scene} from 'aframe-react';

export default class VR extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsRegistered: false
        };
    }

    getAframeScene = () => {
        this.reenablePageScrollWhenAframeComponentUsed();

        return (
            <Scene>
                <Entity geometry={{primitive: 'box'}}
                        material="color: red"
                        src="./images/devdiner.png"
                        position={[0, 0, -5]}
                        className="logo-entity"
                        rotate-on-tick
                />
                {/*<Entity bmfont-text={{text: 'HELLO WORLD'}} position="{[0, 1, -5]}"/>*/}
            </Scene>
        );
    };

    registerAframeHooks = () => {
        console.log("Registering A-Frame Hooks");
        if (window.AFRAME.components['rotate-on-tick'] == undefined) {
            window.AFRAME.registerComponent('rotate-on-tick', {
                tick: function (t, dt) {
                    // console.log("Tick Called:", this);
                    this.el.object3D.rotation.x += .0050;
                    this.el.object3D.rotation.y += .0025;
                }
            });
        }
        this.setState({
            eventsRegistered: true
        });
    };

    reenablePageScrollWhenAframeComponentUsed = () => {
        // Override classes used by A-Frame Scene to allow scrolling on VR page
        let aHtmlElement = document.getElementsByClassName("a-html")[0];
        let aBodyElement = document.getElementsByClassName("a-body")[0];

        if (aHtmlElement) aHtmlElement.setAttribute("style", "position: relative;");
        if (aBodyElement) aBodyElement.setAttribute("style", "overflow: auto;");
    };

    componentDidMount() {
        console.log("Flux context: ", window.context);

        this.registerAframeHooks();
    }

    render () {
        console.log("props: ", this.props);
        const { eventsRegistered } = this.state;
        return (
            <div className="aframe-react-scene">
                { canUseDOM && eventsRegistered == true
                    ? this.getAframeScene()
                    : null }
            </div>
        );
    }
}

