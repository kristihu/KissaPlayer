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
            video: "",
            Videos: [],
            vidit: vidit,
            haku: '',
            renderSideWidget: false,
            fetching: false,
            lockAll: false,
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.changeVideo = this.changeVideo.bind(this);
        this.changeVideo2 = this.changeVideo2.bind(this);
        this.thumbnail = this.thumbnail.bind(this);
        this.addSideWidget = this.addSideWidget.bind(this);
        this.hideVideo = this.hideVideo.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.lockAll = this.lockAll.bind(this);
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

    }

    fetchData() {
        //Fetchaa videoiden nimet
        console.log("fetch1");
        fetch('/jsonContent/videos.json').then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({ Videos: json });
         //   console.log(this.state);
            
            return json;
        }).
            then((json) => {
                for (let i = 0; i < json.length; i++) {
                    //  this.thumbnail(json[i].Video);
                }
                this.setState({ renderSideWidget: true });
            });
    }

    lockAll() {
        if (this.state.lockAll === false) {
            this.setState({ fetching: true, lockAll: true });
        }
    }

    thumbnail(videoFromJson) {
        const canvas = document.getElementById('canvas');
        const video = document.getElementById(videoFromJson);
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

    hideVideo() {
        for (let i = 0; i < this.state.Videos.length; i++) {
            const video = document.getElementById(this.state.Videos[i].Video);
             video.style.display = "none";
        }
    }

    addSideWidget() {
        
  //      console.log("Add sidewidget()",this.state.Videos);
        for (let i = 0; i < this.state.Videos.length; i++) {
            const canvas = document.getElementById('canvas' + i);
            const video = document.getElementById(this.state.Videos[i].Video);
           // console.log(video);
          //  console.log(canvas);
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth / 8, video.videoHeight / 16);
           // canvas.addEventListener('click', this.changeVideo(this.state.Videos[i].Video));
            
        }
        if (this.state.fetching === false) {
            this.setState({ fetching: true });
        }
    }

    changeVideo(videoName) {
        this.setState({ video: videoName }
            , () => {
                console.log(this.state.video);
                console.log(this.state.Videos);
            }, () => {
                return (
                    <Link to={`/${this.state.video}`} />
                )
            });
    }

    changeVideo2() {
        this.setState({ video: "Cat Chilling.mp4" }
            , () => console.log(this.state), () => {
                return (
                    <Link to={`/${this.state.video}`} />
                )
            });
    }

    render() {
        const { haku, vidit } = this.state;
      /*  
        if (this.state.fetching === false) {
            { this.fetchData() }
        } else {
           // {this.lockAll()}
        }*/
        return (
            <React.Fragment>
                  {this.state.fetching === false &&
                    <React.Fragment>
                    {this.fetchData()}
                    </React.Fragment>
                } 
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
                        <li><Link onClick={this.changeVideo} to={`/${this.state.video}`} >changeVideo</Link></li>
                        <li> <Link onClick={this.changeVideo2} to={`/${this.state.video}`} >changeVideo2</Link></li>
                    </ul>
                    <Route exact path="/" render={(props) => (
                        <Home {...props} title={"home"} />
                    )} />
                    <Route path={`/${this.state.video}`} render={(props) => (
                        <VideoContainer {...props} video={this.state.video} />
                    )} />
                </Router>
                <div className="sideWidget">
                    <SideWidget Videos={this.state.Videos} changeVideo={this.changeVideo} />
                    {this.state.renderSideWidget === true &&
                        <div>
                        {this.addSideWidget()}   
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default App;
