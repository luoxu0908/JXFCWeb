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
window.apiSrc="http://web.tool8.cc/JXFC/BCMain/";
