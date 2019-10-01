import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Page from './custom_videoplayer/video.html';
import style from './custom_videoplayer/Main.css';
import VideoContainer from './VideoContainer';
import Home from './Home';


var htmlDoc = { __html: Page };


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: "No video yet",
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

        // var worker = new Worker('changeVideo.js');
        //  const video = window.document.getElementById('myVideo');

        //   video.src = "/Media/Pexels Videos 4703.mp4";
        this.setState({ video: "Pexels Videos 4703.mp4" });
    }

    changeVideo2() {

        //   const video = window.document.getElementById('myVideo');

        //  video.src = "/Media/looppivuori.mp4";
        this.setState({ video: "looppivuori.mp4" });
        return (
            <Link to={`/${this.state.video}`} />
        );
    }

    render() {
        return (
            <React.Fragment>
                <h2>{this.state.video}</h2>
                {/*   <div style={style} dangerouslySetInnerHTML={htmlDoc} /> 
                 <ul>
                    <button onClick={this.changeVideo}>Video 1</button>
                    <button onClick={this.changeVideo2}>Video 2</button>
                </ul>
               */}
                <Router>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link onClick={this.changeVideo} to={`/${this.state.video}`} >Pexels Videos</Link></li>
                        <li> <Link onClick={this.changeVideo2} to={`/${this.state.video}`} >Looppivuori</Link></li>
                    </ul>
                    <Route exact path="/" render={(props) => (
                        <Home {...props} title={"home"} />
                    )} />
                    {/* <Route path="/looppivuori.mp4" render={(props) => (
                        <VideoContainer {...props} video={this.state.video} />
                    )} />*/}
                    <Route path={`/${this.state.video}`} render={(props) => (
                        <VideoContainer {...props} video={this.state.video} />
                    )} />
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
