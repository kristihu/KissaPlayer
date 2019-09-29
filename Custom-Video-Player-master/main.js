const video = document.getElementById('myVideo');

const currentTime = document.getElementById('currentTime');

const volumeSlider = document.getElementById('volume');

const progress = document.getElementById('progress');

const progressBar = document.getElementById('progress-bar');



function playOrPause(){
    
    if(video.paused){
        video.play();
        $("#playBtn").attr("src","Pause.png");
    }
    else{
        video.pause();
        $("#playBtn").attr("src","Play.png");
    }
}

function stop() {

    video.pause();
    video.currentTime = 0;
    progress.value = 0;
}

video.addEventListener('timeupdate', function () {
   
    progress.value = video.currentTime;

    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';

    convertTime(Math.round(video.currentTime));  //convert decimal no into intiger

   
});



video.addEventListener('timeupdate', function () {
    if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
    progress.value = video.currentTime;

    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});


progress.addEventListener('click', function (e) {
    const pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
    console.log("pos: ", pos + " video.duration: ", video.duration);
    video.currentTime = pos * video.duration;
});


function convertTime(seconds)
        {
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;

            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent = min + ":" + sec;
            
            totalTime(Math.round(video.duration));
        }
        
        function totalTime(seconds)
        {
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;

            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent += " / " + min + ":" + sec;
        }


function changeVolume(){
    
    video.volume = volumeSlider.value;
    
    if(volumeSlider.value == 0){
        
        $("#speaker").attr("src","Mute.png");
    }
    else{
        $("#speaker").attr("src","Speaker.png");
    }
}




