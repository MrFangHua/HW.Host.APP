/*
 * 手机领取 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

// 下拉框数量
var selectIndex = 3;
var selectMaxIndex = 3;
var phoneModelList = {};
WaitJSLoadSuccess(function () {
    // 动态添加下拉框
    setSelect();
}, true, GetAllPhoneModel);

function GetAllPhoneModel() {
    // 得到所有手机型号
    httpRequest({
        method: "Get",
        url: "PhoneModelInfoService/GetAllPhoneModel",
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            phoneModelList = result.phoneModelList;
        }
    });
}

function setSelect() {
    $("#phoneSel").empty();
    for (let index = 0; index < selectIndex; index++) {
        var select = $("<select/>");
        select.attr("id", "sel" + index);
        select.attr("onChange", "SelChanage(" + index + ")");
        // if (index != 0) {
        //     select.attr("disabled", true);
        // }
        $.each(phoneModelList, function (i, obj) {
            var option = $("<option/>");
            option.text(obj.phoneName + "---" + obj.phoneColour + "---" + obj.phoneRAM + "---" + obj.phoneFineness + "---" + obj.phonePrice + "---" + obj.phoneCode);
            option.val(obj.id);
            if (obj.receiveIsReturn == 0) {
                option.attr("disabled", true);
            }
            select.append(option);
        });
        select.prepend($("<option/>").text("---请选择---").val("0").attr("selected", true));
        $("#phoneSel").append(select);
        if (index + 1 != selectIndex) {
            $("#phoneSel").append($("<br/>"));
        }
        BtnChanage();
    }
}

var SelectHistory = new Array();

function SelChanage(index) {
    // 获取div中所有select标签
    var option = $("#sel" + index + " option:selected");
    for (let i = 0; i < selectIndex; i++) {
        if (option.val() != 0 && i != index) {
            SelectHistory[i] = option.val();
            $("#sel" + i + " option[value='" + option.val() + "']").attr("disabled", true);
        } else {
            $("#sel" + i + " option[value='" + SelectHistory[i] + "']").attr("disabled", false);
        }
    }
}

function BtnChanage() {
    // 获取div中所有select标签
    var selList = $("#phoneSel select");
    if (selList.length == selectMaxIndex) {
        $("#deleteBtn").attr("style", "margin-left: 60%; font-size: 1.2rem;");
        $("#addBtn").hide();
    } else {
        $("#deleteBtn").attr("style", "margin-left: 5px; font-size: 1.2rem;");
        $("#addBtn").show();
    }
    if (selList.length <= 1) {
        $("#deleteBtn").hide();
    } else {
        $("#deleteBtn").show();
    }
}

function AddSel() {
    selectIndex++;
    setSelect();
}

function DeleteSel() {
    selectIndex--;
    setSelect();
}

function ReceivePhone() {
    var isSuccess = true;
    // 判断所有下拉框都选择了
    // 获取div中所有select标签
    var selList = $("#phoneSel select");
    $.each(selList, function (index, obj) {
        if (obj.value == 0) {
            isSuccess = false;
        }
    });
    if (isSuccess) {
        var modelList = [];
        var userId = uncompileStr(sessionStorage.getItem("UserId"));
        var receiveRemarks = $("#receiveRemarks").val();
        $.each(selList, function (index, obj) {
            modelList[index] = {
                "ReceiveUserID": userId,
                "ReceivePhoneModelID": obj.value,
                "ReceiveRemarks": receiveRemarks
            };
        });
        httpRequest({
            method: "post",
            url: "PhoneReceiveInfoService/AddPhoneReceiveInfo",
            data: modelList,
            isAuthorization: true
        }, function (result) {
            if (result.success) {
                $("#receivePhone").hide();
                layer.msg("领取成功，请手动关闭窗口~", null);
            }
        });
    } else {
        layer.msg("请选择要领取的手机型号，如若没有，请删除下拉框~");
    }
}