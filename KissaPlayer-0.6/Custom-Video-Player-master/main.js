const vid = document.getElementById('myVideo');

const fillBar = document.getElementById('fill');

const currentTime = document.getElementById('currentTime');

const volumeSlider = document.getElementById('volume');


function playOrPause(){
    
    if(vid.paused){
        vid.play();
        $("#playBtn").attr("src","Pause.png");
    }
    else{
        vid.pause();
        $("#playBtn").attr("src","Play.png");
    }
}

vid.addEventListener('timeupdate',function(){

    const position = vid.currentTime / vid.duration;

    fillBar.style.width = position * 100 +'%';
    
    convertTime(Math.round(vid.currentTime));  //convert decimal no into intiger
    
    if(vid.ended){
        $("#playBtn").attr("src","Play.png");
    }
});

function convertTime(seconds)
        {
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;

            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent = min + ":" + sec;
            
            totalTime(Math.round(vid.duration));
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
    
    vid.volume = volumeSlider.value;
    
    if(volumeSlider.value == 0){
        
        $("#speaker").attr("src","Mute.png");
    }
    else{
        $("#speaker").attr("src","Speaker.png");
    }
}




