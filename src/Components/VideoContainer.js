import React, { Component } from 'react';
import Page from '../custom_videoplayer/video.html';
import style from '../custom_videoplayer/Main.css';

var htmlDoc = { __html: Page };


class VideoContainer extends Component {

    componentDidMount() {

        const script = document.createElement("script");

        script.src = "/Js/realoadScript.js";

        script.async = true;

        document.body.appendChild(script);

        this.forceUpdate();
        
    }


    render() {
        if (this.props.video !== "") {
            console.log("rendering .... " + this.props.video);
            const video = window.document.getElementById('myVideo');
         //   console.log("video element; ", video);
            try {
                video.src = "/Media/" + this.props.video;
            } catch (err) {
                this.forceUpdate();
                }
        } else {
           // console.log("ei renderöi .... ");
        }
		return (
            <div>
                {this.props.video !== "" && 
                    <React.Fragment>
                <div style={style} dangerouslySetInnerHTML={htmlDoc} />
                    <h2>Video Container: {this.props.video}</h2> 
                </React.Fragment>
                    }
            </div>
			);
	}
}

export default VideoContainer;