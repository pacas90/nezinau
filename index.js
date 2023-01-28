class CircleK {
    constructor() {
        
    }
    init() {
        document.querySelector("#win").style.transform = "translateY(0)";
        this.deviceTime();
        document.querySelector("#timer").style.left = screen.width / 2 - 50 + "px";
        this.countdown(5);
        this.showTimeAndDate();
        
    }
    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
          }
          return i;
    }
    deviceTime() {
        var self = this;
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = this.checkTime(m);
        document.getElementById('device-time').innerHTML = h + ":" + m;
        var t = setTimeout(function() {
            self.deviceTime();
        }, 500);
    }
    
    countdown(minutes) {
        var self = this;
        var seconds = 60;
        var mins = minutes
        function tick() { 
            var counter = document.getElementById("timer");
            var current_minutes = mins-1
            seconds--;
            counter.innerHTML = "0" + current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if( seconds > 0 ) {
                setTimeout(tick, 1000);
            } else {
                if(mins > 1){
                    self.countdown(mins-1);           
                }
            }
        }
        tick();
    }
    showTimeAndDate() {
        var date = new Date();
        var data = document.querySelector("#pasiemimo-data");
        var laikas = document.querySelector("#pasiemimo-laikas");
        laikas.innerHTML = date.getHours() + ":" + date.getMinutes();
        data.innerHTML = `${date.getDate()}-0${date.getMonth() + 1}-${date.getFullYear()}`;
    }
}

var ck = new CircleK();
document.querySelector("#start").onclick = () => {
    ck.init();
    var elem = document.documentElement;
    openFullscreen();
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { 
    document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { 
    document.documentElement.msRequestFullscreen();
    }
}