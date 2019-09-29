const videoContainer = document.getElementById('main');

const controls = document.getElementById('controls');

const video = document.getElementById('myVideo');

const stopBtn = document.getElementById('stopBtn');

const currentTime = document.getElementById('currentTime');

const volumeSlider = document.getElementById('volume');

const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');

const fullscreen = document.getElementById('fs');

function playOrPause() {

    if (video.paused) {
        video.play();
        $("#playBtn").attr("src", "/Media/Pause.png");
    }
    else {
        video.pause();
        $("#playBtn").attr("src", "/Media/Play.png");
    }
}

function stop() {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
}

stopBtn.addEventListener('click', stop);

video.addEventListener('timeupdate', function () {
    if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
    progress.value = video.currentTime;

    convertTime(Math.round(video.currentTime));

    changeVolume();

    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

progress.addEventListener('click', function (e) {
    var percent = e.offsetX / this.offsetWidth;
    progress.value = percent / 100;
    video.currentTime = percent * video.duration;
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;

    totalTime(Math.round(video.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent += " / " + min + ":" + sec;
}

function changeVolume() {  

    video.volume = volumeSlider.value;

    if (volumeSlider.value == 0) {

        $("#speaker").attr("src", "/Media/Mute.png");
    }
    else {
        $("#speaker").attr("src", "/Media/Speaker.png");
    }
}

const fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

const exitHandler = function () {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        setVideoHeightAndWidthToNormal();
        controls.style.display = "block";
    }
}  

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

const setVideoHeightAndWidthToFull = function () {
    video.setAttribute('width', null);
    video.setAttribute('height', null);
}

const setVideoHeightAndWidthToNormal = function () {
    video.setAttribute('width', '625');
    video.setAttribute('height', '400');
}

const hideMouse = function () {
   // setTimeout(function () {
   //     controls.style.display = "none";
  //  }, 3000);
    let timeout = null;

    $(document).on('mousemove', function () {
        if (timeout !== null) {
            $("#controls").fadeIn("fast");
            console.log("controls näkyviin");
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            console.log("piilota controlost");
            $("#controls").fadeOut("slow");
        }, 2000);
    });
}



if (!fullScreenEnabled) {
    fullscreen.style.display = 'none';
}

const isFullScreen = function () {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

const handleFullscreen = function () {

    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setVideoHeightAndWidthToNormal();      
        setFullscreenData(false);  
    }
    else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        setVideoHeightAndWidthToFull();
        setFullscreenData(true);
        hideMouse();
    }
}

fullscreen.addEventListener('click', function (e) {
    handleFullscreen();
});

const setFullscreenData = function (state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
}

document.addEventListener('fullscreenchange', function (e) {
    setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
});
document.addEventListener('webkitfullscreenchange', function () {
    setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener('mozfullscreenchange', function () {
    setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener('msfullscreenchange', function () {
    setFullscreenData(!!document.msFullscreenElement);
});




