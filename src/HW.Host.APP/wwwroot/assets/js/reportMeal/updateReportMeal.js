/*
 * 修改报餐信息 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

var Id;
var Lunch;
var Dinner;
var ReportMealTime;

WaitJSLoadSuccess(function () {

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "Id") {
            Id = pair[1];
        }
        if (pair[0] == "Lunch") {
            Lunch = pair[1];
        }
        if (pair[0] == "Dinner") {
            Dinner = pair[1];
        }
        if (pair[0] == "ReportMealTime") {
            ReportMealTime = pair[1];
        }
    }
    $("#Time").text(ReportMealTime);
    $("#Lunch").attr("checked", Lunch != 0)
    $("#Dinner").attr("checked", Dinner != 0)
});

function Update() {
    if (!$("#Lunch").prop("checked") && !$("#Dinner").prop("checked")) {
        layer.msg("请至少选择一个，如果都不吃，请删除当天的报餐！", { icon: 7 });
        return false;
    }
    httpRequest({
        method: "Put",
        url: "ReportMealInfoService/UpdateReportMealInfo",
        data: {
            "Id": Id,
            "Lunch": $("#Lunch").prop("checked") ? 1 : 0,
            "Dinner": $("#Dinner").prop("checked") ? 1 : 0
        },
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            $("#Update").hide();
            layer.msg("修改成功，请手动关闭窗口~", null);
        }
    });
}