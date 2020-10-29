//设置开始时间
var year = 2017;
var month = 3;
var days = 6;

//得到当前时间
var date = new Date();
date.setTime(date.getTime());
date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getDate();
$("#currentTime").text("*" + date + ".");

var offsetX = $("#loveHeart").width() / 2;
var offsetY = $("#loveHeart").height() / 2 - 55;
var together = new Date();
together.setFullYear(year, month - 1, days);
together.setHours(0);
together.setMinutes(0);
together.setSeconds(0);
together.setMilliseconds(0);

if (!document.createElement('canvas').getContext) {
    var msg = document.createElement("div");
    msg.id = "errorMsg";
    msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
    document.body.appendChild(msg);
    $("#code").css("display", "none")
    $("#copyright").css("position", "absolute");
    $("#copyright").css("bottom", "10px");
    document.execCommand("stop");
} else {
    setTimeout(function () {
        startHeartAnimation();
    }, 5000);

    timeElapse(together);
    setInterval(function () {
        timeElapse(together);
    }, 500);

    adjustCodePosition();
    $("#code").typewriter();
}