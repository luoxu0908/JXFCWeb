window.parseQS=function () {
    var str = (window.location.search.substring(1) || "");
    if (str.length == 0) {
        str = (window.location.hash || "");
        var pos = str.indexOf('?');
        if (pos >= 0) {
            str = str.substr(pos + 1);
        } else {
            str = (str.substring(1) || "");
        }
    }
    return deparam(str);
};
function deparam(params){
    var o = {};
    if (!params) return o;
    var a = params.split('&');
    for (var i = 0; i < a.length; i++) {
        var pair = a[i].split('=');
        o[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return o;
};
getGUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
window.apiSrc="/JXFC/BCMain/";
window.WebPartKey='021cb7cca70748ff89795e3ad544d5eb';
window.ReqGUID='b4bbedbf-e591-4b7a-ad20-101f8f656277';

window.JSONPost = function (URL, Data, options) {
    var Opt = {
        Cache: false, WaitDiv: 'plswait', WaitMsg: 'please wait...', Timeout: 300000, LoginDiv: 'logindiv', LoginURL: '', ShowErrMsg: true, ReqGUID: getGUID, FailFN: false, DisableBtn: '', DisableBtnMsg: 'Please wait...', DisableOth: '.DisableOnJSONPost', LoginHideSuccessMsg: false, LoginSuccessCallbackFn: false
    };

    if ((window.apiSrc) && ((URL.substr(1, 4).toLowerCase() != "http") || (URL.substr(1, 1) != "/") || (URL.substr(1, 1) != "."))) { URL = window.BCBaseURL + URL; }
    Opt.URL = URL;
    var jqxhr = $.ajax({
        url: URL, cache: Opt.Cache, type: "POST",
        data: { "data": JSON.stringify(Data), "WebPartKey": getWebPartKey(), "ReqGUID": Opt.ReqGUID },
        dataType: "json", timeout: Opt.Timeout,
        xhrFields: { withCredentials: true }
    })
    jqxhr.always(function (Data) {
        // if (Opt.WaitDiv.length > 0) {
        //     // var wait = $("#" + Opt.WaitDiv);
        //     // wait.data("Cnt", (wait.data("Cnt") - 1));
        //     // if (wait.data("Cnt") <= 0) { wait.slideUp(); }
        // }
        // if (Opt.DisableOth) $(Opt.DisableOth).disable(false);
        // if (Opt.DisableBtn) $(Opt.DisableBtn).disable(false);
    });
    jqxhr.done(function (data, textStatus, jqXHR) {
        _ProcJSONRet(textStatus, data, jqXHR, Opt);
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
        var data = null;
        if (jqXHR.responseText) data = parseJSON(jqXHR.responseText);
        _ProcJSONRet(errorThrown, data, jqXHR, Opt);
    });
    return jqxhr;
}

function _ProcJSONRet(textStatus, data, jqXHR, Opt) {
    if (jqXHR.status != 0) { //exclude timeout or network errors
        var RetVal = 0, RetMsg = "";
        if ((data) && (data.d)) {
            RetVal = data.d.RetVal || 0; RetMsg = data.d.RetMsg || "";
        } else {
            if (textStatus) {
                try {
                    var S = textStatus.split(":", 2);
                    RetVal = parseInt(S[0], 10); RetMsg = (S.length > 1 ? S[1] : textStatus);
                } catch (e) {
                    RetVal = 404;
                    if (jqXHR.responseText) {
                        RetMsg = 'Request error (404A) - please check with support (The following info may help in tracing the issue: ' + Opt.URL + ', ' + Opt.ReqGUID + ')';
                    } else { //empty response - blocked or does not exist or false
                        RetMsg = 'Request error (404B) - please check with support (The following info may help in tracing the issue: ' + Opt.URL + ', ' + Opt.ReqGUID + ')';
                    }
                }
                if (jqXHR.responseText) {
                    try {
                        data = JSON.parse(jqXHR.responseText);
                        if ((data) && (data.d)) {
                            RetVal = data.d.RetVal || 0; RetMsg = data.d.RetMsg || "";
                        }
                    } catch (e) { } //Ignore
                } 
            } else {
                RetVal = 404; RetMsg = 'Request error (404C) - please check with support (The following info may help in tracing the issue: ' + Opt.URL + ', ' + Opt.ReqGUID + ')';
            }
        }
        if (RetVal == -1) { return; }
        else { //err
            if (typeof (Opt.FailFN) === "function") { Opt.FailFN(RetVal, RetMsg, data, Opt); }
            if (RetVal == 2) {
                if ((Opt.LoginDiv) && (Opt.LoginDiv.length > 0)) {
                    // $.fn.Mas_ShowLoginDiv(Opt.LoginDiv, Opt.LoginHideSuccessMsg, Opt.LoginSuccessCallbackFn);
                } else if ((Opt.LoginURL) && (Opt.LoginURL.length > 0)) {
                    window.location.replace(Opt.LoginURL);
                }
                return;
            }
            else if (Opt.ShowErrMsg) {
                if (RetMsg.length > 0) { alert(RetMsg); return; }
                else { alert('Request error - please check with support (The following info may help in tracing the issue: ' + Opt.URL + ', ' + Opt.ReqGUID + ')'); return; }
            }
        }
    } else { //timeout or network errors
        RetVal = 408; RetMsg = 'Request timeout or network error - please try again and check with support if it recurs (The following info may help in tracing the issue: ' + Opt.URL + ', ' + Opt.ReqGUID + ')';
        if (typeof (Opt.FailFN) === "function") { Opt.FailFN(RetVal, RetMsg, data, Opt); }
        if (Opt.ShowErrMsg) { alert(RetMsg); return; }
    }
}
getWebPartKey = function () { return parseCookie("IGWAS").WebPartKey || ''; };


parseCookie = function (CookieName) { return deparam(cookie(CookieName, { raw: true })); };

cookie = function (key, value, options) {
    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = {};
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [
                            encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                            options.expires ? '; expires=' + options.expires.toUTCString() : '',
                            options.path ? '; path=' + options.path : '',
                            options.domain ? '; domain=' + options.domain : '',
                            options.secure ? '; secure' : ''
        ].join(''));
    }
    // key and possibly options given, get cookie...
    options = value || {};
    var decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    var pairs = document.cookie.split('; ');

    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos >= 0) {
            var pair = [pairs[i].slice(0, pos), pairs[i].slice(pos + 1)];
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
    }
    return null;
};
function RebuidData(obj){
   return {
    'data': JSON.stringify(obj),
    'WebPartKey': getWebPartKey(),
    'ReqGUID': getGUID()
   }
}


