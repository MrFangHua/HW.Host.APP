/*
 * 引导页 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

/**背景图片信息 */
var backGroundImageData;
var backGroundImageMaxIndexOf = 100;
var backGroundImageMinIndexOf = 0;
/**文案信息 */
var copywritingInfoData;
/**引导页菜单信息 */
var guidePagesMenuInfoData;
window.onload = function () {
    loadMusicsPlayer();
    // 设置站点名称
    $("#webSiteName")[0].innerText = appConfiguration.ProjectInfo.Project_Name;

    getBackGroundImageInfo();
    getCopywritingInfo();
    getGuidePagesMenuInfo();
    dynamicChangeBackGroundImage();
}
window.ontouchmove = function () {
    return false;
}
window.onorientationchange = function () {
    document.body.scrollTop = 0;
}

/**得到背景图片信息 */
function getBackGroundImageInfo() {
    httpRequest({
        method: "GET",
        url: "BackGroundImageInfoService/GetAllBackGroundImageInfo"
    }, function (result) {
        backGroundImageData = result;
    });
}

/**得到文案信息 */
function getCopywritingInfo() {
    httpRequest({
        method: "GET",
        url: "CopywritingInfoService/GetAllCopywritingInfo"
    }, function (result) {
        copywritingInfoData = result;
        dynamicChangeCopywritingInfo();
    });
}

/**得到引导页菜单信息 */
function getGuidePagesMenuInfo() {
    httpRequest({
        method: "GET",
        url: "GuidePagesMenuInfoService/GetAllGuidePagesMenuInfo"
    }, function (result) {
        guidePagesMenuInfoData = result;
        // 动态添加引导菜单信息
        for (var i = 0; i < guidePagesMenuInfoData.length; i++) {
            $("#webSiteGuidePagesMenuInfo").append('<li><a href="' +
                guidePagesMenuInfoData[i].menuUrl +
                '" title="' +
                guidePagesMenuInfoData[i].menuName +
                '">' +
                guidePagesMenuInfoData[i].menuName +
                '</a></li>');
        }
    });
}

/**动态改变背景图片 */
function dynamicChangeBackGroundImage() {
    $("#bg").fadeOut(3000, function () {
        $("#bg").css("background-image",
            "url('" +
            backGroundImageData[getRandom(backGroundImageMaxIndexOf, backGroundImageMinIndexOf)].bgUrl + "')"
        ).fadeIn(3000);
    });
    setTimeout(dynamicChangeBackGroundImage, 1000 * 3600);
}

/**动态改变文案信息 */
function dynamicChangeCopywritingInfo() {
    $("#webSiteCopywriting")[0].innerText = copywritingInfoData[getRandom(copywritingInfoData.length, 0)].content;
    setTimeout(dynamicChangeCopywritingInfo, 1000 * 60);
}