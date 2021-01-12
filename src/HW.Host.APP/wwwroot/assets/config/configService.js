/*
 * 站点配置信息服务
 * Author：Mr.Fang
 * QQ：2875616188
 * Version：1.1.0
 * WebSite：https://fanghua.host
 * Time：2020.3.27
 */

/**配置信息 */
var appConfiguration = {
    // 站点信息
    ProjectInfo: {
        // 站点名称
        Project_Name: "Mr.Fang 网络 - HW",
        // 站点版本
        Version: "V1.1.0",
        // 站点Url
        Url: "https://hw.fanghua.host",
        // APIUrl
        // ApiRequestUrl: "http://192.168.6.88:2000",
        ApiRequestUrl: "https://hwapi.fanghua.host",
        // 对象资源Url
        ObjstorageUrl: "https://objstorage.fanghua.host/",
        // 备案信息
        RecordInfo: "陇ICP备2020003856号",
        // 提示框头部信息
        InfoHeader: "【Mr.Fang网络 - HW】温馨提示：",
    }
};

/**配置文件 */
var appConfigFile = {
    // JS文件信息
    JSFileInfo: {
        // 站点配置信息JS文件
        AppConfigurationJSFile: this.appConfiguration.ProjectInfo.Url +
            "/assets/config/configService.js",
        // 默认jQuery文件
        JQueryJSFile: this.appConfiguration.ProjectInfo.Url +
            "/assets/plugins/jquery/jquery-3.5.1.min.js",
        // Http请求服务配置JS文件
        HttpRequestSeiverJSFile: this.appConfiguration.ProjectInfo.Url +
            "/assets/httpService/httpRequestService.js",
        // HttpRequestSeiverJSFile: "assets/httpService/httpRequestService.js",
        // 音乐播放器信息
        MusicsPlayerJS:
            '<script id="ilt" key="98ffa0f27310403e85637d328e6ba248" src="https://player.ilt.me/player/js/player.js" ></script>',
        // Layer.js文件
        LayerJSFile: this.appConfiguration.ProjectInfo.Url +
            "/assets/plugins/layer/layer.js",
        // 默认JS文件
        DefaultJSFile: [],
    }
}

var headHtml = document.getElementsByTagName("head").item(0);

var webSiteDate = new Date();

/**
 * window.onload 重复加载
 * @param {*} func window.onload 加载的方法
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 加载站点Title信息
 */
function LoadWebSiteTitle() {
    // 设置Title加站点名称
    var webSiteTitle = document.getElementsByTagName("title").item(0);
    webSiteTitle.text =
        appConfiguration.ProjectInfo.Project_Name + " - " + webSiteTitle.text;
}

/**
 * 加载备案信息
 */
function LoadRecordInfo() {
    // 备案信息
    var webSiteFooter = document.getElementById("footer");
    if (webSiteFooter) {
        webSiteFooter.innerHTML =
            '<small class="copyright">Copyright&nbsp;&copy 2019 - ' + this.webSiteDate.getFullYear() + '&nbsp;&nbsp;<a href="https://fanghua.host">' + this.appConfiguration.ProjectInfo.Project_Name + '</a>&nbsp;&nbsp;版权所有&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://beian.miit.gov.cn/" target="_blank">' + this.appConfiguration.ProjectInfo.RecordInfo + '</a></small>';
    }
}

/**加载jQuery文件 */
function loadJQuery() {
    var script = document.createElement("script");
    script.async = false;
    //script.type = "text/javascript";
    script.src = this.appConfigFile.JSFileInfo.JQueryJSFile;
    headHtml.appendChild(script);
    console.log("jQuery JS文件加载成功！");
}

/**加载Layer文件 */
function loadLayer() {
    // 加载Layer.JS默认加载jQuery.JS文件
    this.loadJQuery();
    var script = document.createElement("script");
    script.async = false;
    //script.type = "text/javascript";
    script.src = this.appConfigFile.JSFileInfo.LayerJSFile;
    headHtml.appendChild(script);
    console.log("Layer JS文件加载成功！");
}

/**加载Http请求服务配置JS文件 */
function loadHttpRequestServer() {
    // 加载Http请求服务默认加载Layer.JS文件
    this.loadLayer();
    var script = document.createElement("script");
    script.async = false;
    //script.type = "text/javascript";
    script.src = this.appConfigFile.JSFileInfo.HttpRequestSeiverJSFile;
    headHtml.appendChild(script);
    console.log("Http请求服务 JS文件加载成功！");
}

/**加载音乐播放器 */
function loadMusicsPlayer() {
    // 当访问设备为电脑或平板（宽度大于640）时再加载播放器
    if (window.screen.width > 640) {
        $("head").append(this.appConfigFile.JSFileInfo.MusicsPlayerJS);
    }
}

/**
 * Layer 加载层
 * @param {Function} onLoadFunc window.onload加载方法，在加载层关闭后执行
 */
function LayerLoad(onLoadFunc) {
    layer.load();
    setTimeout(function () {
        layer.closeAll('loading');
        onLoadFunc();
    }, 2000);
}

/**方法封装 */
/**
 * 错误信息提示
 * @param {any} msg
 */
function errorInfo(msg) {
    layer.msg(msg);
}
/**
 * 成功信息提示
 * @param {any} msg
 */
function successInfo(msg) {
    layer.msg(msg);
}
/**
 * 得到随机数（包括上限和下限）
 * @param {any} maxIndexOf 上限
 * @param {any} minIndexOf 下限
 */
function getRandom(maxIndexOf, minIndexOf) {
    // return parseInt(Math.random() * (maxIndexOf - minIndexOf) + minIndexOf);
    return Math.floor(Math.random() * (maxIndexOf - minIndexOf + 1)) + minIndexOf;
}
/**
 * 对字符串进行加密
 * @param {String} code 要加密的字符串
 */
function compileStr(code) {
    if (!code) {
        return null;
    }
    // 防止int类型传值进来报错
    code = code.toString();
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}

/**
 * 字符串进行解密
 * @param {String} code 要解密的字符串
 */
function uncompileStr(code) {
    // 防止int类型传值进来报错
    if (!code) {
        return null;
    }
    code = code.toString();
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}
/**
 * 拿到当前域名
 */
function HostUrl() {
    var url = windows.location.href;
    var urlStr = url.split("/");
    var urls = "";
    if (urlStr[2]) {
        urls = urlStr[0] + "//" + urlStr[2];
    }
    return urls;
}

/**
 * 判断页面JS加载定时器
 */
var _LoadInterval = -1;
/**
 * window.onload 执行的方法
 */
var _LoadFuncation = function () { };
/**
 * 再Layer加载层加载之前拿到数据的方法
 */
var _GetDataFunc = function () { };
/**
 * 是否加载Layer加载层
 */
var _IsLayerLoad = false;

/**
 * 等待JS加载成功
 * @param {Function} onLoadFunc window.onload 执行的方法
 * @param {Boolean} isLayerLoad 是否加载Layer加载层
 * @param {Function} getDataFunc 再Layer加载层加载之前拿到数据的方法
 */
function WaitJSLoadSuccess(onLoadFunc, isLayerLoad, getDataFunc) {
    _LoadFuncation = onLoadFunc ? onLoadFunc : _LoadFuncation;
    _IsLayerLoad = isLayerLoad != undefined ? isLayerLoad : _IsLayerLoad;
    _GetDataFunc = getDataFunc ? getDataFunc : _GetDataFunc;
    if (typeof jQuery != "undefined" && typeof layer != "undefined") {
        if (_IsLayerLoad) {
            _GetDataFunc();
            LayerLoad(_LoadFuncation);
        } else {
            _LoadFuncation();
        }
        if (_LoadInterval != -1) {
            clearInterval(_LoadInterval);
        }
    } else {
        _LoadInterval = setInterval("WaitJSLoadSuccess()", 300);
    }
}

loadHttpRequestServer();
addLoadEvent(LoadWebSiteTitle);
addLoadEvent(LoadRecordInfo);