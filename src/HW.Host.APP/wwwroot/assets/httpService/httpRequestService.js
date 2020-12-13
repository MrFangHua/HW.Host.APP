/*
 * Http请求服务文件
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

/**
 * HTTP请求服务
 * @param {any} obj 请求方式、路径、参数、是否在控制台显示结果。实例：obj: {method:"get",url:"",data:{},dataType:"",isDisCL:"",isAuthorization:""};
 * @param {any} successFun 请求成功回调方法
 * @param {any} errorFun 请求失败回调方法
 * @param {any} async 是否异步，默认异步
 * @param {any} apiRequest 是否为API请求，默认为API请求
 */
function httpRequest(obj, successFun, errorFun, async = true, apiRequest = true) {
    // 创建 XMLHttpRequest 对象
    var xmlHttp = null;
    // 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    if (window.XMLHttpRequest) {
        // code for all new browsers
        xmlHttp = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
        // code for IES and IE6
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 判断是否支持请求
    if (xmlHttp == null) {
        info = "浏览器不支持xmlHttp请求，请更换更高级的浏览器再试试。";
        console.log(appConfiguration.ProjectInfo.InfoHeader + info);
        errorInfo(appConfiguration.ProjectInfo.InfoHeader + info);
    }
    // 请求方式，转换为大写
    var httpMethod = (obj.method || "Get").toUpperCase();
    // 数据类型
    xmlHttp.responseType = obj.dataType || "json";
    // url
    var httpUrl = obj.url || '';
    // 是否在控制台显示结果
    var httpIsDisCL = obj.isDisCL == null || obj.isDisCL == undefined || obj.isDisCL == '' && obj.isDisCL != true ? false : obj.isDisCL;
    // 是否为带权限请求
    var httpIsAuthorization = obj.isAuthorization == null || obj.isAuthorization == undefined || obj.isAuthorization == '' && obj.isAuthorization != true ? false : obj.isAuthorization;
    // 判断是否为API请求
    var httpApiRequest = apiRequest == null || apiRequest == undefined || apiRequest == '' && apiRequest != false ? true : apiRequest;
    if (httpApiRequest) {
        httpUrl = '' || appConfiguration.ProjectInfo.ApiRequestUrl + "/api/" + httpUrl;
    } else {
        httpUrl = '' || appConfiguration.ProjectInfo.Url + "/" + httpUrl;
    }
    // 异步请求
    var httpAsync = async == null || async == undefined || async == '' && async != false ? true : async;
    // get请求时参数处理
    if (httpMethod == "GET" || httpMethod == "DELETE") {
        // 请求体中的参数get请求参数格式为：?paraml=test&param2=test2
        var data = obj.data || {};
        var requestData = '';
        for (var key in data) {
            requestData += key + "=" + data[key] + "&";
        }
        if (requestData != '') {
            httpUrl += "?";
            requestData = requestData.substring(0, requestData.length - 1);
            httpUrl += requestData;
        }
    }
    // 请求接口
    xmlHttp.open(httpMethod, httpUrl, httpAsync);
    // 发送Token
    if (httpIsAuthorization) {
        xmlHttp.setRequestHeader("Authorization", uncompileStr(sessionStorage.getItem("CurrentToken")));
    }
    if (httpMethod == "GET") {
        xmlHttp.send(null);
    } else {
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(obj.data));
    }
    // onreadystatechange 是一个事件句柄。
    // 它的值(state_Change) 是一个函数的名称，当 XMLHttpRequest 对象的状态发生改变时，会触发此函数。状态从 0(uninitialized) 到 4(complete) 进行变化。仅在状态为 4 时，我们才执行代码
    xmlHttp.onreadystatechange = function () {
        // complete
        if (xmlHttp.readyState == 4) {
            if (httpIsDisCL) {
                console.log(xmlHttp);
            }
            if (xmlHttp.status == 200) {
                if (successFun != undefined) {
                    // 请求成功执行的回调函数
                    successFun(xmlHttp.response, xmlHttp);
                }
            } else {
                // 判断是否为401 Unauthorized错误，权限验证过期错误
                if (xmlHttp.status == 401 && xmlHttp.statusText == "Unauthorized" && _InterVal_Handler != -1) {
                    _InterVal_Handler = -1;
                    checkExpired();
                } else {
                    if (errorFun == undefined) {
                        layer.msg(xmlHttp.response.ResultInfo ? xmlHttp.response.ResultInfo : "系统错误，请联系管理员处理，或刷新页面试试~", function () { });
                    } else {
                        // 请求失败执行的回调函数
                        errorFun(xmlHttp, xmlHttp.status, xmlHttp.statusText);
                    }
                }
            }
        }
    }
}

/**添加访问日志 */
function addAccessHistoryLog() {
    httpRequest({
        method: "POST",
        url: "AccessHistoryLogAppService/CreateAccessHistoryLog",
        data: {
            deviceInfo: navigator.userAgent,
            url: currentUrlPath
        }
    }, function (res) {
    }, function () {
    });
}