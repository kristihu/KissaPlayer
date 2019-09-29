import React, { Component } from 'react';
import './App.css';
import Page from './custom_videoplayer/video.html';
import style from './custom_videoplayer/Main.css';

var htmlDoc = { __html: Page };


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: "asd",
        };
        this.changeVideo = this.changeVideo.bind(this);
        this.changeVideo2 = this.changeVideo2.bind(this);
    }

    componentDidMount() {

        const script = document.createElement("script");
        const jquery = document.createElement("script");

        script.src = "/Js/main.js";
        jquery.src = "/Js/jquery-1.10.2.min.js";

        script.id = "vanillaJs";

        script.async = true;
        jquery.async = true;

        document.body.appendChild(script);
        document.body.appendChild(jquery);
    }

    changeVideo() {

        var worker = new Worker('changeVideo.js');
    }

    changeVideo2() {

        const video = window.document.getElementById('myVideo');

        video.src = "/Media/looppivuori.mp4";
        this.setState({ video: "asd" });
    }

    render(){
        return (
            <React.Fragment>
                <div style={style} dangerouslySetInnerHTML={htmlDoc} />
                <ul>
                    <button onClick={this.changeVideo}>Video 1</button>
                    <button onClick={this.changeVideo2}>Video 2</button>
                </ul>
            </React.Fragment>
        );
    }
}

export default App;
