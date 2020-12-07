/*
 * 检查管理员登录 JS文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

/**
 * 登陆超过30分钟，注销
 */
var _Expire_Time = 30 * 60 * 1000;
/**
 * 定时器
 */
var _InterVal_Handler = -1;
/**
 * 判断是否登陆
 */
function AdminIsLogin() {
    return Boolean(sessionStorage.getItem("AdminIsLogin"));
}
/**
 * 检查登陆信息
 */
(function () {
    if (AdminIsLogin()) {
        // 刷新最后使用时间
        sessionStorage.setItem("Nxgx_LastVisitTime", sessionStorage.getItem("Nxgx_LastVisitTime") ? sessionStorage.getItem("Nxgx_LastVisitTime") : new Date().getTime());
        _InterVal_Handler = setInterval(checkExpired, 10 * 1000);// 10秒钟检查一次，是否超时
    } else {
        // layer.msg("请先登录系统，在操作~", function () {
        //     // 跳转到登录页

        // });
        alert("请先登录管理系统，再操作~");
        document.location.href = "AdminLogin.html";
    }
})();
/**
 * 检查是否登录或登录是否过期
 */
function checkExpired() {
    var storeLastTime = sessionStorage.getItem("Nxgx_LastVisitTime") && _InterVal_Handler != -1 ? sessionStorage.getItem("Nxgx_LastVisitTime") : -1;
    if (storeLastTime == -1) {
        // 初始化了
        // 删除SessionStorage信息
        sessionStorage.clear();
        clearInterval(_InterVal_Handler);
        // 跳转首页
        layer.msg("由于您登录时间过长，已为您自动跳转到首页，请重新登录~", function () {
            document.location.href = "GuidPageIndex.html";
        });
    }
    else {
        if ((new Date()).getTime() - storeLastTime > _Expire_Time) {
            // 过期了
            // 删除SessionStorage信息
            sessionStorage.clear();
            clearInterval(_InterVal_Handler);
            // 跳转首页
            layer.msg("由于您登录时间过长，已为您自动跳转到首页，请重新登录~", function () {
                document.location.href = "GuidPageIndex.html";
            });
        }
    }
}