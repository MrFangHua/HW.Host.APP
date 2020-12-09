var phoneModelList = {};
var modelList = [];
var phoneModelHTML;

WaitJSLoadSuccess(function () {
    $("#phoneInfo").html(phoneModelHTML);
}, true, GetPhoneReceiveInfo);

function GetPhoneReceiveInfo() {
    httpRequest({
        method: "Get",
        url: "PhoneReceiveInfoService/GetPhoneReceiveInfoByUserId",
        data: { UserId: uncompileStr(sessionStorage.getItem("UserId")) },
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            phoneModelList = result.phoneModelList;
            phoneModelHTML = '<table id="tb" class="phoneModelReceiveInfo" style="margin:0px 5%; width: 150%; text-align: center;" border="1" cellpadding="0" cellspacing="0">' +
                '<tr><th style="width: 8%;">手机型号名称</th>' +
                '<th style="width: 8%;">手机串码</th>' +
                '<th style="width: 3%;">颜色</th>' +
                '<th style="width: 4%;">外观成色</th>' +
                '<th style="width: 4%;">手机价钱</th>' +
                '<th style="width: 4%;">手机内存详情</th>' +
                '<th style="width: 7%;">手机租赁时间</th>' +
                '<th style="width: 5%;">手机备注</th>' +
                '<th style="width: 7%;">领取用户名称</th>' +
                '<th style="width: 7%;">领取时间</th>' +
                '<th style="width: 5%;">领取备注</th></tr>';
            $.each(result.phoneModelList, function (index, obj) {
                phoneModelHTML += '<tr><td>' + obj.phoneName + '</td>' +
                    '<td>' + obj.phoneCode + '</td>' +
                    '<td>' + obj.phoneColour + '</td>' +
                    '<td>' + obj.phoneFineness + '</td>' +
                    '<td>' + obj.phonePrice + '</td>' +
                    '<td>' + obj.phoneRAM + '</td>' +
                    '<td>' + obj.phoneLeaseTime + '</td>' +
                    '<td>' + obj.phoneRemarks + '</td>' +
                    '<td>' + obj.receiveUserName + '</td>' +
                    '<td>' + obj.receiveTime + '</td>' +
                    '<td>' + obj.receiveRemarks + '</td></tr>';
            });
            phoneModelHTML += '</table>';
        }
    });
}

function ReturnPhone() {
    var returnRemarks = $("#returnRemarks").val();
    $.each(phoneModelList, function (index, obj) {
        modelList[index] = {
            "Id": obj.id,
            "ReturnRemarks": returnRemarks
        };
    });
    httpRequest({
        method: "put",
        url: "PhoneReceiveInfoService/UpdatePhoneReceiveInfo",
        data: modelList,
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            layer.msg("归还成功，请手动关闭窗口~", function () {
                $("#returnPhone").hide();
            });
        }
    });
}