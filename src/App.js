import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import './App.css';
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
            displayThumbnails: false,
            fetching: false,
            renderVideoContainer: false,
            sideWidgetStyle: {
                "display": "none",
                "backgroundColor": "red",
            }
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.changeVideo = this.changeVideo.bind(this);
        this.thumbnail = this.thumbnail.bind(this);
        this.addSideWidget = this.addSideWidget.bind(this);
        this.hideVideo = this.hideVideo.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderVideoContainer = this.renderVideoContainer.bind(this);
        this.homePage = this.homePage.bind(this);
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

        }).
            then(() => {
                this.setState({ renderSideWidget: true });
            }).then(() => {

                const sideWidgetElement = document.querySelector(".sideWidget");

                sideWidgetElement.style.display = "none";

                this.setState({ displayThumbnail: true});
               // this.changeVideo("");
            })
    }

    renderVideoContainer() {
        if (this.state.renderVideoContainer === false) {
            this.setState({ renderVideoContainer: true });
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
        console.log("add sideWidget()");

        for (let i = 0; i < this.state.Videos.length; i++) {
            const canvas = document.getElementById('canvas' + i);
            const video = document.getElementById(this.state.Videos[i].Video);
       //     console.log("video: ",video);
       //     console.log("canvas: ",canvas);
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth / 8, video.videoHeight / 16);
            
        }
        if (this.state.fetching === false) {
            this.setState({ fetching: true });
        }
    }

    changeVideo(videoName) {

        const sideWidgetElement = document.querySelector(".sideWidget");

        sideWidgetElement.style.display = "block";

        console.log("videoname " + videoName)
        if (videoName !== "") {
            console.log("videoName: ", videoName);
            this.setState({ video: videoName }
                , () => {
                    console.log("App video: " + this.state.video);
                    console.log(this.state.Videos);
                },
                () => {
                    this.setState({ renderVideoContainer: true });
                }
            );
        } else {
            this.setState({ video: "" });
            console.log("No video");
        }
    }

    homePage() {
        const sideWidgetElement = document.querySelector(".sideWidget");

        sideWidgetElement.style.display = "none";
        this.forceUpdate();
    }


    render() {
        const { haku, vidit } = this.state;

        return (
            <React.Fragment>
                  {this.state.fetching === false &&
                    <React.Fragment>
                    {this.fetchData()}
                    </React.Fragment>
                } 



                <Router>
                    <ul>
                        <li><Link onClick={() => this.homePage()} to="/" >Etusivu</Link></li>
                        <li><Link onClick={() => this.changeVideo("")} to={`/${this.state.video}`} >Katso kissavideoita</Link></li>
                    </ul>
                    <div className="sideWidget">
                        <SideWidget style={this.state.sideWidgetStyle} Videos={this.state.Videos} changeVideo={this.changeVideo} />
                        {this.state.renderSideWidget === true &&
                            <div>
                                {this.addSideWidget()}
                            </div>
                        }
                    </div>
                    <Route exact path="/" render={(props) => (
                        <Home {...props} title={"home"} />
                    )} />
                    {/*  {this.renderVideoContainer === true && */}
                        <Route path={`/${this.state.video}`} render={(props) => (
                            <VideoContainer {...props} video={this.state.video} />
                     )} /> 
              {/*   }*/}
                </Router>
             
            </React.Fragment>
        );
    }
}

export default App;
