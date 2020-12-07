/*
 * 修改密码 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

WaitJSLoadSuccess(function () {
    var BGIndex = Math.floor(Math.random() * 100) + 1;
    document.getElementById("bg").style["background"] = "url(http://192.168.6.88:8888/assets/images/backGround/bg" + BGIndex + ".jpg)no-repeat";
});

function UpdatePwd() {
    if ($("#UserName").val() == null || $("#UserName").val() == "") {
        layer.msg($("#UserName").prop("placeholder"), { icon: 7 });
        return false;
    }
    if ($("#UserOldPwd").val() == null || $("#UserOldPwd").val() == "") {
        layer.msg($("#UserOldPwd").prop("placeholder"), { icon: 7 });
        return false;
    }
    if ($("#UserNewPwd").val() == null || $("#UserNewPwd").val() == "") {
        layer.msg($("#UserNewPwd").prop("placeholder"), { icon: 7 });
        return false;
    }
    httpRequest({
        method: "Put",
        url: "UserService/UpdateUserPwd",
        data: {
            "UserName": $("#UserName").val(),
            "UserOldPwd": $("#UserOldPwd").val(),
            "UserNewPwd": $("#UserNewPwd").val()
        }
    }, function (result) {
        if (result.success) {
            layer.msg("修改成功~", function () {
                location.href = "Login.html";
            });
        }
    });
}