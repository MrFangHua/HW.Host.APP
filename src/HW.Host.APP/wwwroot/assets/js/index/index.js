/*
 * 首页 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

// 手机型号集合
var phoneModelList = [];
var tableFirstTrName;
var tableOpt;
var tb;

WaitJSLoadSuccess(function () {
    $("#tb tr:not(:first)").empty();
    SetAllPhoneModel();
}, true, GetAllPhoneModel);

function GetAllPhoneModel() {
    // 得到所有手机型号集合
    httpRequest({
        method: "Get",
        url: "PhoneModelInfoService/GetAllPhoneModelInfo",
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            phoneModelList = result.phoneModelList;
        }
    });
}

function SetAllPhoneModel() {
    $("#tb tr:not(:first)").empty();
    tb = $("#tb");
    // 赋值
    $.each(phoneModelList, function (index, obj) {
        var tr = $("<tr/>");
        var tdPhoneModelName = $("<td/>");
        tdPhoneModelName.text(obj.phoneName);

        var tdPhoneModelcolour = $("<td/>");
        tdPhoneModelcolour.text(obj.phoneColour);

        var tdReceiveReturnTime = $("<td/>");
        tdReceiveReturnTime.text(obj.receiveReturnTime);

        var tdReceiveUserName = $("<td/>");
        var tdReceiveTime = $("<td/>");
        if (obj.receiveIsReturn == 0) {
            tdReceiveUserName.text(obj.receiveUserName);
            tdReceiveTime.text(obj.receiveTime);
        }

        var tdPhoneRemarks = $("<td/>");
        tdPhoneRemarks.text(obj.phoneRemarks);

        var tdOpt = $("<td/>");
        tdOpt.append($("<a href='JavaScript:void(0);' onclick='selectPhoneModelInfo(" + index + ")'>查看详情 </a>"))
            .append($("<a href='JavaScript:void(0);' onclick='selectPhoneModelReceiveInfo(" + index + ")'> 查看领取详情</a>"));

        tr.append(tdPhoneModelName)
            .append(tdPhoneModelcolour)
            .append(tdReceiveReturnTime)
            .append(tdReceiveUserName)
            .append(tdReceiveUserName)
            .append(tdReceiveTime)
            .append(tdPhoneRemarks)
            .append(tdOpt);
        tb.append(tr);
    });
}

function selectPhoneModelInfo(index) {
    var phoneModel = phoneModelList[index];
    layer.open({
        type: 1,
        title: phoneModel.phoneName + " 详情信息",
        area: ['700px', '800px'],
        skin: 'layui-layer-rim', //加上边框
        content: '<center><table id="tb" class="phoneModelInfo" style="width: 90%; text-align: center;" border="1" cellpadding="0" cellspacing="0">' +
            '<tr><td>手机型号名称</td><td>' + phoneModel.phoneName + '</td></tr>' +
            '<tr><td>手机串码</td><td>' + phoneModel.phoneCode + '</td></tr>' +
            '<tr><td>颜色</td><td>' + phoneModel.phoneColour + '</td></tr>' +
            '<tr><td>外观成色</td><td>' + phoneModel.phoneFineness + '</td></tr>' +
            '<tr><td>手机价钱</td><td>' + phoneModel.phonePrice + '</td></tr>' +
            '<tr><td>手机内存详情</td><td>' + phoneModel.phoneRAM + '</td></tr>' +
            '<tr><td>手机是否归还（租赁）</td><td>' + (phoneModel.phoneIsReturn == 0 ? '否' : '是') + '</td></tr>' +
            '<tr><td>手机租赁时间</td><td>' + phoneModel.phoneLeaseTime + '</td></tr>' +
            '<tr><td>手机归还时间</td><td>' + phoneModel.phoneReturnTime + '</td></tr>' +
            '<tr><td>手机备注</td><td>' + phoneModel.phoneRemarks + '</td></tr>' +
            '<tr><td>手机归还备注（租赁）</td><td>' + phoneModel.phoneReturnRemarks + '</td></tr>' +
            '<tr><td>手机领取是否归还</td><td>' + (phoneModel.receiveIsReturn == 0 ? '否' : '是') + '</td></tr>' +
            '<tr><td>领取用户名称</td><td>' + phoneModel.receiveUserName + '</td></tr>' +
            '<tr><td>领取时间</td><td>' + phoneModel.receiveTime + '</td></tr>' +
            '<tr><td>领取归还时间</td><td>' + phoneModel.receiveReturnTime + '</td></tr>' +
            '<tr><td>领取备注</td><td>' + phoneModel.receiveRemarks + '</td></tr>' +
            '<tr><td>领取归还备注</td><td>' + phoneModel.returnRemarks + '</td></tr>' +
            '</table></center>'
    });
}

function selectPhoneModelReceiveInfo(index) {
    // 得到所有手机型号集合
    httpRequest({
        method: "Get",
        url: "PhoneReceiveInfoService/GetPhoneModelReceiveInfoByPhoneId",
        data: { PhoneId: phoneModelList[index].id },
        isAuthorization: true
    }, function (result) {
        if (result.success) {
            var phoneModelHTML = '<center><table id="tb" class="phoneModelReceiveInfo" style="margin:0px 5%; width: 150%; text-align: center;" border="1" cellpadding="0" cellspacing="0">' +
                '<tr><th style="width: 8%;">手机型号名称</th>' +
                '<th style="width: 8%;">手机串码</th>' +
                '<th style="width: 3%;">颜色</th>' +
                '<th style="width: 4%;">外观成色</th>' +
                '<th style="width: 4%;">手机价钱</th>' +
                '<th style="width: 4%;">手机内存详情</th>' +
                '<th style="width: 7%;">手机是否归还（租赁）</th>' +
                '<th style="width: 7%;">手机租赁时间</th>' +
                '<th style="width: 7%;">手机归还时间</th>' +
                '<th style="width: 5%;">手机备注</th>' +
                '<th style="width: 5%;">手机归还备注（租赁）</th>' +
                '<th style="width: 7%;">手机领取是否归还</th>' +
                '<th style="width: 7%;">领取用户名称</th>' +
                '<th style="width: 7%;">领取时间</th>' +
                '<th style="width: 7%;">领取归还时间</th>' +
                '<th style="width: 5%;">领取备注</th>' +
                '<th style="width: 5%;">领取归还备注</th></tr>';
            $.each(result.phoneModelList, function (index, obj) {
                phoneModelHTML += '<tr><td>' + obj.phoneName + '</td>' +
                    '<td>' + obj.phoneCode + '</td>' +
                    '<td>' + obj.phoneColour + '</td>' +
                    '<td>' + obj.phoneFineness + '</td>' +
                    '<td>' + obj.phonePrice + '</td>' +
                    '<td>' + obj.phoneRAM + '</td>' +
                    '<td>' + (obj.phoneIsReturn == 0 ? '否' : '是') + '</td>' +
                    '<td>' + obj.phoneLeaseTime + '</td>' +
                    '<td>' + obj.phoneReturnTime + '</td>' +
                    '<td>' + obj.phoneRemarks + '</td>' +
                    '<td>' + obj.phoneReturnRemarks + '</td>' +
                    '<td>' + (obj.receiveIsReturn == 0 ? '否' : '是') + '</td>' +
                    '<td>' + obj.receiveUserName + '</td>' +
                    '<td>' + obj.receiveTime + '</td>' +
                    '<td>' + obj.receiveReturnTime + '</td>' +
                    '<td>' + obj.receiveRemarks + '</td>' +
                    '<td>' + obj.returnRemarks + '</td></tr>';
            });
            phoneModelHTML += '</table></center>';
            layer.open({
                type: 1,
                title: "手机领取历史详情信息记录",
                area: ['1280px', '800px'],
                skin: 'layui-layer-rim', //加上边框
                maxmin: true,
                content: phoneModelHTML
            });
        }
    });
}

function ReceivePhone() {
    layer.open({
        type: 2,
        title: "领取手机",
        area: ['1280px', '800px'],
        skin: 'layui-layer-rim', //加上边框
        maxmin: true,
        content: 'ReceivePhone.html'
    });
}

function ReturnPhone() {
    layer.open({
        type: 2,
        title: "归还手机",
        area: ['1280px', '800px'],
        skin: 'layui-layer-rim', //加上边框
        maxmin: true,
        content: 'ReturnPhone.html'
    });
}