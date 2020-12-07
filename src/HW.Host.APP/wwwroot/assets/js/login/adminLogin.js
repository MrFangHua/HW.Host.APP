/*
 * 管理员登录页 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

WaitJSLoadSuccess(function () {
    var BGIndex = Math.floor(Math.random() * 100) + 1;
    document.getElementById("bg").style["background"] = "url(http://192.168.6.88:8888/assets/images/backGround/bg" + BGIndex + ".jpg)no-repeat";
    // 绑定登录按钮回车键
    document.onkeydown = function (e) {
        if (!e) {
            e = window.event;
        }
        if ((e.keyCode || e.which) == 13) {
            Login();
        }
    }
});
function Login() {
    if ($("#AdminName").val() == null || $("#AdminName").val() == "") {
        layer.msg($("#AdminName").prop("placeholder"), { icon: 7 });
        return false;
    }
    if ($("#AdminPwd").val() == null || $("#AdminPwd").val() == "") {
        layer.msg($("#AdminPwd").prop("placeholder"), { icon: 7 });
        return false;
    }
    httpRequest({
        method: "Post",
        url: "AdminService/AdminLogin",
        data: {
            "AdminName": $("#AdminName").val(),
            "AdminPwd": $("#AdminPwd").val()
        }
    }, function (result) {
        if (result.success) {
            sessionStorage.clear();
            sessionStorage.setItem("AdminIsLogin", "1");
            // 储存Token到SessionStorage中
            sessionStorage.setItem("CurrentToken", compileStr(result.resultInfo));
            sessionStorage.setItem("IsAdmin", "1");
            location.href = "AdminIndex.html";
        }
    });
}