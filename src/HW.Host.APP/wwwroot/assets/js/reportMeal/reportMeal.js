/*
 * 报餐页面 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

var CurrentIndex = 0;
var PageSize = 5;
var ReportMealInfoByUserId;
var CurrentReportMealInfoList;
var CurrentLunchCount;
var CurrentDinnerCount;
var NextReportMealInfoList;
var NextLunchCount;
var NextDinnerCount;
var checkMaxIndex = 5;
var checkIndex = 1;
// 添加
var MealList = {};

WaitJSLoadSuccess(function () {
    SetGetAllReportMealInfoByUserId();
    SetGetAllReportMealInfo();
}, true, Load);

function Load() {
    SetCheck();
    GetAllReportMealInfoByUserId();
    GetAllReportMealInfo();
}

function GetAllReportMealInfoByUserId() {
    httpRequest({
        method: "Get",
        url: "ReportMealInfoService/GetAllReportMealInfoByUserId",
        data: {
            "UserId": uncompileStr(sessionStorage.getItem("UserId"))
        },
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            ReportMealInfoByUserId = result.reportMealInfoList;
        }
    });
}

function GetAllReportMealInfo() {
    httpRequest({
        method: "Get",
        url: "ReportMealInfoService/GetAllReportMealInfo",
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            CurrentReportMealInfoList = result.currentReportMealInfoList;
            CurrentLunchCount = result.currentLunchCount;
            CurrentDinnerCount = result.currentDinnerCount;
            NextReportMealInfoList = result.nextReportMealInfoList;
            NextLunchCount = result.nextLunchCount;
            NextDinnerCount = result.nextDinnerCount;
        }
    });
}

function SetGetAllReportMealInfoByUserId() {
    layui.use('table', function () {
        var table = layui.table;

        //监听工具条
        table.on('tool(leftDownDivTB)', function (obj) {
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    httpRequest({
                        method: "Delete",
                        url: "ReportMealInfoService/DeleteReportMealInfo",
                        data: {
                            "Id": obj.data.id
                        },
                        isAuthorization: true
                    }, function (result) {
                        if (result.success) {
                            obj.del();
                            layer.msg("删除成功!", function () {
                                layer.close(index);
                            });
                        } else {
                            layer.msg("删除失败!", function () {
                                layer.close(index);
                            });
                        }
                    });
                });
            } else if (obj.event === 'edit') {
                layer.open({
                    type: 2,
                    title: "修改报餐信息",
                    area: ['500px', '400px'],
                    skin: 'layui-layer-rim', //加上边框
                    content: 'UpdatRreportMeal.html?Id=' + obj.data.id + '&Lunch=' + obj.data.lunch + '&Dinner=' + obj.data.dinner + '&ReportMealTime=' + obj.data.reportMealTime
                });
            }
        });

        table.render({
            elem: '#leftDownDivTB'
            , data: ReportMealInfoByUserId
            , width: 500
            , cellMinWidth: 80
            , cols: [[
                { field: 'reportMealTime', title: '报餐时间', align: 'center', sort: true }
                , { field: 'meal', title: '详情', align: 'center' }
                , { field: 'meal', title: '操作', align: 'center', toolbar: '#barDemo' }
            ]]
            , page: {
                layout: ['count', 'prev', 'page', 'next', 'skip']
                , groups: 3 //只显示 1 个连续页码
                , first: false //不显示首页
                , last: false //不显示尾页
                , count: ReportMealInfoByUserId.length
                , limit: PageSize
                , jump: function (obj, first) {
                    if (!first) {
                        CurrentIndex = obj.curr;
                    }
                }
            }
        });
    });
}

function SetGetAllReportMealInfo() {
    var currentDate = new Date();
    var currentReportMealTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    var nextDate = new Date();
    nextDate.setTime(nextDate.getTime() + 24 * 60 * 60 * 1000);
    var nextReportMealTime = nextDate.getFullYear() + "-" + (nextDate.getMonth() + 1) + "-" + nextDate.getDate();
    $("#currentReportMealInfoText").text("【" + currentReportMealTime + "】报餐信息：" + CurrentLunchCount + " 人中餐， " + CurrentDinnerCount + " 人晚餐");
    $("#nextReportMealInfoText").text("【" + nextReportMealTime + "】报餐信息：" + NextLunchCount + " 人中餐， " + NextDinnerCount + " 人晚餐");
    layui.use('table', function () {
        var table = layui.table;

        table.render({
            elem: '#rightDivCurrentTB'
            , data: CurrentReportMealInfoList
            // , width: 500
            , cellMinWidth: 80
            , cols: [[
                { field: 'reportMealTime', title: '报餐时间', align: 'center' }
                , { field: 'reportMealUserName', title: '员工姓名', align: 'center', sort: true }
                , { field: 'meal', title: '详情', align: 'center' }
            ]]
            , page: {
                layout: ['count', 'prev', 'page', 'next', 'skip']
                , groups: 3 //只显示 1 个连续页码
                , first: true //不显示首页
                , last: true //不显示尾页
                , count: CurrentReportMealInfoList.length
                , limit: 30
            }
        });
    });

    layui.use('table', function () {
        var table = layui.table;

        table.render({
            elem: '#rightDivNextTB'
            , data: NextReportMealInfoList
            // , width: 500
            , cellMinWidth: 80
            , cols: [[
                { field: 'reportMealTime', title: '报餐时间', align: 'center' }
                , { field: 'reportMealUserName', title: '员工姓名', align: 'center', sort: true }
                , { field: 'meal', title: '详情', align: 'center' }
            ]]
            , page: {
                layout: ['count', 'prev', 'page', 'next', 'skip']
                , groups: 3 //只显示 1 个连续页码
                , first: true //不显示首页
                , last: true //不显示尾页
                , count: NextReportMealInfoList.length
                , limit: 30
            }
        });
    });
}

function SetCheck() {
    $("#Meal").empty();
    var CheckHtml = '<label>报餐日期</label>' +
        '<input type="date" id="ReportMealTime" style="margin-right: 10px;">' +
        '<input type="checkbox" name="Lunch" id="Lunch" title="中餐">中餐' +
        '<input type="checkbox" style="margin-left: 10px;" name="Dinner" id="Dinner" title="晚餐">晚餐';
    for (let index = 0; index < checkIndex; index++) {
        var div = $("<div/>");
        div.attr("id", "MealCheck" + index);
        div.html(CheckHtml);
        $("#Meal").append(div);
        $("#Meal").append($("<br />"));
    }
    BtnChanage();
}

function BtnChanage() {
    var divList = $("#Meal div");
    if (divList.length == checkMaxIndex) {
        $("#deleteBtn").attr("style", "margin-left: 60%; font-size: 1.1rem;");
        $("#addBtn").hide();
    } else {
        $("#deleteBtn").attr("style", "margin-left: 5px; font-size: 1.1rem;");
        $("#addBtn").show();
    }
    if (divList.length <= 1) {
        $("#deleteBtn").hide();
    } else {
        $("#deleteBtn").show();
    }
}

function AddCheck() {
    checkIndex++;
    SetCheck();
}

function DeleteCheck() {
    checkIndex--;
    SetCheck();
}

function AddReportMeal() {
    var isSuccess = true;
    var divList = $("#Meal div");
    $.each(divList, function (index, obj) {
        if (!$("#MealCheck" + index + " #Lunch").prop("checked") &&
            !$("#MealCheck" + index + " #Dinner").prop("checked") ||
            $("#MealCheck" + index + " #ReportMealTime").val() == "") {
            isSuccess = false;
        }

    });
    if (isSuccess) {
        var modelList = [];
        var userId = uncompileStr(sessionStorage.getItem("UserId"));
        $.each(divList, function (index, obj) {
            modelList[index] = {
                "ReportMealUserId": userId,
                "ReportMealTime": $("#MealCheck" + index + " #ReportMealTime").val(),
                "Lunch": $("#MealCheck" + index + " #Lunch").prop("checked") ? 1 : 0,
                "Dinner": $("#MealCheck" + index + " #Dinner").prop("checked") ? 1 : 0
            };
        });
        httpRequest({
            method: "post",
            url: "ReportMealInfoService/AddReportMealInfo",
            data: modelList,
            isAuthorization: true
        }, function (result) {
            if (result.success) {
                layer.msg("报餐成功~", function () {
                    // 刷新页面
                    location.reload();
                });
            }
        });
    } else {
        layer.msg("报餐日期或报餐详情不能为空，请仔细填写再做提交~");
    }
}