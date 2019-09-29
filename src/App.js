import React, { Component } from 'react';
import './App.css';
import Page from './custom_videoplayer/video.html';
import style from './custom_videoplayer/Main.css';

var htmlDoc = { __html: Page };

class App extends Component {

    componentDidMount() {

        const script = document.createElement("script");
        const jquery = document.createElement("script");

        script.src = "/Js/main.js";
        jquery.src = "/Js/jquery-1.10.2.min.js";

        script.async = true;
        jquery.async = true;

        document.body.appendChild(script);
        document.body.appendChild(jquery);
    }

    render(){
        return (
            <React.Fragment>
                <div style={style} dangerouslySetInnerHTML={htmlDoc} />
            </React.Fragment>
        );
    }
}

export default App;
