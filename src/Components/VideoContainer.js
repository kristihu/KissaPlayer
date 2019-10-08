import React, { Component } from 'react';
import Page from '../custom_videoplayer/video.html';
import style from '../custom_videoplayer/Main.css';

const htmlDoc = { __html: Page };

class VideoContainer extends Component {

    render() {
        if (this.props.video !== "") {

            const video = window.document.getElementById('myVideo');
            const script = document.createElement("script");

            script.src = "/Js/realoadScript.js";

            script.async = true;

            document.body.appendChild(script);

            try {

                video.src = "/Media/" + this.props.video;
            } catch (err) {
                this.forceUpdate();
            }
        }
        return (
            <div>
                {this.props.video !== "" &&
                    <React.Fragment>
                        <div style={style} dangerouslySetInnerHTML={htmlDoc} />
                        <div className={"videoTitleContainer"}>
                            <h2>{this.props.video}</h2>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default VideoContainer;