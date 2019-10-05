import React, { Component } from 'react';
import Page from '../custom_videoplayer/video.html';
import style from '../custom_videoplayer/Main.css';

var htmlDoc = { __html: Page };

class VideoContainer extends Component {

    componentDidMount() {
        const video = window.document.getElementById('myVideo');

        video.src = "/Media/"+this.props.video;
        console.log(video);
        /*
        const oldScript = document.getElementById("vanillaJs");
        console.log(oldScript);
        const body = document.getElementsByTagName('body')[0];
        body.removeChild(oldScript);
        
        const script = document.createElement("script");
        script.src = "/Js/main.js";
        script.id = "vanillaJs";
        script.async = true;
        document.body.appendChild(script);
        */

        const script = document.createElement("script");

        script.src = "/Js/realoadScript.js";

        script.async = true;

        document.body.appendChild(script);

        this.forceUpdate();
    }

    render() {
        console.log("rendering .... " + this.props.video);
		return (
            <div>
                <div style={style} dangerouslySetInnerHTML={htmlDoc} />
                <h2>Video Container: {this.props.video}</h2> 
            </div>
			);
	}
}

export default VideoContainer;