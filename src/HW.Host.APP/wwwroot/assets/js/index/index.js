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
        //isDisCL: true,
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
        tdPhoneModelName.attr("id", index);

        var tdPhoneModelcolour = $("<td/>");
        tdPhoneModelcolour.text(obj.phoneColour);

        var tdReceiveReturnTime = $("<td/>");
        tdReceiveReturnTime.text(obj.receiveReturnTime);

        var tdReceiveUserName = $("<td/>");
        tdReceiveUserName.text(obj.receiveUserName);
        tdReceiveUserName.attr("id", index);

        var tdReceiveTime = $("<td/>");
        tdReceiveTime.text(obj.receiveTime);

        var tdPhoneRemarks = $("<td/>");
        tdPhoneRemarks.text(obj.phoneRemarks);

        var tdOpt = $("<td/>");
        tdOpt.append($("<a href='JavaScript:void(0);' onclick='selectPhoneModelInfo(" + obj.id + ")'>查看详情 </a>"))
            .append($("<a href='JavaScript:void(0);' onclick='selectPhoneModelInfo(" + obj.id + ")'> 查看领取详情</a>"));

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

function selectPhoneModelInfo(id) {
    var phoneModel = phoneModelList[id];
    layer.open({
        //     type: 2,
        //     title: phoneModel.phoneName,
        //     area: ['360px', '720px'],
        //     closeBtn: 1,
        //     shadeClose: true,
        //     skin: 'phoneModelInfo',
        //     content: '<table id="tb" class="phoneModelInfo" style="width: 90%; text-align: center;" border="1" cellpadding="0" cellspacing="0">' +
        //         '<tr><td>Id<td><td>' + phoneModel.id + '<td></tr>' +
        //         '<tr><td>手机型号名称<td><td>' + phoneModel.phoneName + '<td></tr>' +
        //         '<tr><td>手机串码<td><td>' + phoneModel.phoneCode + '<td></tr>' +
        //         '<tr><td>颜色<td><td>' + phoneModel.phoneColour + '<td></tr>' +
        //         '<tr><td>外观成色<td><td>' + phoneModel.phoneFineness + '<td></tr>' +
        //         '<tr><td>手机价钱<td><td>' + phoneModel.phonePrice + '<td></tr>' +
        //         '<tr><td>手机内存详情<td><td>' + phoneModel.phoneRAM + '<td></tr>' +
        //         '<tr><td>手机是否归还（租赁）<td><td>' + phoneModel.phoneIsReturn == 0 ? "否" : "是" + '<td></tr>' +
        //             '<tr><td>手机租赁时间<td><td>' + phoneModel.phoneLeaseTime + '<td></tr>' +
        //             '<tr><td>手机归还时间<td><td>' + phoneModel.phoneReturnTime + '<td></tr>' +
        //             '<tr><td>手机备注<td><td>' + phoneModel.phoneRemarks + '<td></tr>' +
        //             '<tr><td>手机归还备注（租赁）<td><td>' + phoneModel.phoneReturnRemarks + '<td></tr>' +
        //             '<tr><td>手机领取是否归还<td><td>' + phoneModel.receiveIsReturn == 0 ? "否" : "是" + '<td></tr>' +
        //             '<tr><td>领取用户名称<td><td>' + phoneModel.receiveUserName + '<td></tr>' +
        //             '<tr><td>领取时间<td><td>' + phoneModel.receiveTime + '<td></tr>' +
        //             '<tr><td>领取归还时间<td><td>' + phoneModel.receiveReturnTime + '<td></tr>' +
        //             '<tr><td>领取备注<td><td>' + phoneModel.receiveRemarks + '<td></tr>' +
        //             '<tr><td>领取归还备注<td><td>' + phoneModel.returnRemarks + '<td></tr>' +
        //             '</table>'
        // });
        type: 2,
        area: ['360px', '500px'],
        skin: 'layui-layer-rim', //加上边框
        content: '<table id="tb" class="phoneModelInfo" style="width: 90%; text-align: center;" border="1" cellpadding="0" cellspacing="0">' +
            '<tr><td>Id<td><td>' + phoneModel.id + '<td></tr>' +
            '<tr><td>手机型号名称<td><td>' + phoneModel.phoneName + '<td></tr>' +
            '<tr><td>手机串码<td><td>' + phoneModel.phoneCode + '<td></tr>' +
            '<tr><td>颜色<td><td>' + phoneModel.phoneColour + '<td></tr>' +
            '<tr><td>外观成色<td><td>' + phoneModel.phoneFineness + '<td></tr>' +
            '<tr><td>手机价钱<td><td>' + phoneModel.phonePrice + '<td></tr>' +
            '<tr><td>手机内存详情<td><td>' + phoneModel.phoneRAM + '<td></tr>' +
            '<tr><td>手机是否归还（租赁）<td><td>' + phoneModel.phoneIsReturn == 0 ? "否" : "是" + '<td></tr>' +
                '<tr><td>手机租赁时间<td><td>' + phoneModel.phoneLeaseTime + '<td></tr>' +
                '<tr><td>手机归还时间<td><td>' + phoneModel.phoneReturnTime + '<td></tr>' +
                '<tr><td>手机备注<td><td>' + phoneModel.phoneRemarks + '<td></tr>' +
                '<tr><td>手机归还备注（租赁）<td><td>' + phoneModel.phoneReturnRemarks + '<td></tr>' +
                '<tr><td>手机领取是否归还<td><td>' + phoneModel.receiveIsReturn == 0 ? "否" : "是" + '<td></tr>' +
                '<tr><td>领取用户名称<td><td>' + phoneModel.receiveUserName + '<td></tr>' +
                '<tr><td>领取时间<td><td>' + phoneModel.receiveTime + '<td></tr>' +
                '<tr><td>领取归还时间<td><td>' + phoneModel.receiveReturnTime + '<td></tr>' +
                '<tr><td>领取备注<td><td>' + phoneModel.receiveRemarks + '<td></tr>' +
                '<tr><td>领取归还备注<td><td>' + phoneModel.returnRemarks + '<td></tr>' +
                '</table>'
    });
}

function selectPhoneModelReceiveInfo(id) {
    layer.msg(id);
}