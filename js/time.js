/*
=============================
Time
=============================
*/


var start = null;

/*
=============================
Main update
=============================
*/
function updateTime() {
    if (start === null)
        return;

    $('.voiceTime span').text((g.elapsedTime = calculateTime(start).substring(3, 8)));
};

/*
=============================
Calculate elapsed
=============================
*/
function calculateTime(st) {
    
    var totSec = (new Date - st) / 1000;  
    var hours = Math.floor(totSec / 3600);
    
    totSec = totSec % 3600;
    
    var minutes = Math.floor(totSec / 60);
    totSec = totSec % 60;

    var seconds = Math.floor(totSec);

    hours = timeString(hours);
    minutes = timeString(minutes);
    seconds = timeString(seconds);
    return hours + ":" + minutes + ":" + seconds;
};


/*
=============================
Start timing
=============================
*/
function startTiming() {
    start = new Date();
};


/*
=============================
To time - readable
=============================
*/
function timeString(num) {
    return (num < 10 ? "0" : "") + num;
};


/*
function ms2Time(ms) {
    var secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    hours = Math.floor(hours % 24);
    return hours + ":" + minutes + ":" + secs + "." + ms;  
}
*/