import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Page from './custom_videoplayer/video.html';
import VideoContainer from './Components/VideoContainer';
import Home from './Views/Home';
import SideWidget from './Components/SideWidget';
const vidit = [
    {
            id:"1",
            vidi: "looppivuori.mp4"
    },
    {
            id:"2",
            vidi: "Pexels Videos 4703.mp4"
    },



]

function searchingFor(term){
    return function(x){
        return x.vidi.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: "No video yet",
            Videos: [],
            vidit: vidit,
            haku: '',
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.changeVideo = this.changeVideo.bind(this);
        this.changeVideo2 = this.changeVideo2.bind(this);
        this.thumbnail = this.thumbnail.bind(this);
        console.log(this.state.vidit)
    }
    searchHandler(event){
        this.setState({haku: event.target.value})
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

        //Fetchaa videoiden nimet
        fetch('/jsonContent/videos.json').then((response) => {
            return response.json();
        }).then((json) => {
            console.log("Json:", json);

            /*  for (let i = 0; i < json.length; i++) {
                  console.log("Json:", json[i].Video);
                  fetch('/Media/' + json[i].Video).then((response) => {
                      return response.blob();
                  }).then((blob) => {
                      console.log(blob);
                      json[i].blobData = blob;
                  });
              }*/
            this.setState({ Videos: json });
            console.log(this.state);

            return json;
        }).
            then((json) => {
                console.log("Json  2:", json);
                for (let i = 0; i < json.length; i++) {
                    this.thumbnail(json[i].Video);
                }
            });
    }

    thumbnail(videoFromJson) {
        const canvas = document.getElementById('canvas');
        const video = document.getElementById(videoFromJson);
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

    changeVideo() {

        this.setState({ video: "Pexels Videos 4703.mp4" });
    }

    changeVideo2() {

        this.setState({ video: "looppivuori.mp4" });
        return (
            <Link to={`/${this.state.video}`} />
        );
    }

    render() {
        const {haku, vidit} = this.state;
        return (
            <React.Fragment>
                <form><input type="text"
                             onChange={this.searchHandler}
                            value={haku}/></form>
                {
                    vidit.filter(searchingFor(haku)).map( vidit =>
                    <div><h3> {vidit.vidi}</h3></div>
                    )
                }
                <h2>{this.state.video}</h2>
                <h3>ebin</h3>
                <Router>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link onClick={this.changeVideo} to={`/${this.state.video}`} >Pexels Videos</Link></li>
                        <li> <Link onClick={this.changeVideo2} to={`/${this.state.video}`} >Looppivuori</Link></li>
                    </ul>
                    <div className="sideWidget">
                        <SideWidget Videos={this.state.Videos} />
                    </div>
                    <Route exact path="/" render={(props) => (
                        <Home {...props} title={"home"} />
                    )} />
                    <Route path={`/${this.state.video}`} render={(props) => (
                        <VideoContainer {...props} video={this.state.video} />
                    )} />
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
