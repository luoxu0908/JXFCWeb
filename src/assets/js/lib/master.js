class Master {
  constructor() {
    window.appName = '';
    window.appRootPath = '';
    window.apiSrc = '';
    window.pageName = '';

    this.setPath();
    this.getPageName();
    this.JSONPost();
  }

  setPath() {
    var hostname = location.hostname;
    var href = location.href;
    var match =  href.match(/(http|https):\/\/[A-Za-z0-9-_]+.[A-Za-z-_].[A-Za-z]+[.a-z]+?\/([A-Za-z0-9-_]+)\//);

    if (hostname.match(/localhost/)){
      window.appName = '';
      window.appRootPath = '/';
      window.apiSrc = '//localhost/VMS/';
    }
    else {
      if (href.length >= 3) {
        window.appName = match[2];
        window.appRootPath = '/' + appName + '/';
        window.apiSrc = window.appRootPath;
      }
    }
  } //SetPath

  getPageName() {
    return pageName = $('body').attr('id').replace('page-','');
  }


	JSONPost (){  return  window.JSONPost=function (URL, Data, options) {
		var Opt = $.extend({
			Cache: false, WaitDiv: 'plswait', WaitMsg: 'please wait...', Timeout: 300000, LoginDiv: 'logindiv', LoginURL: '', ShowErrMsg: true,  FailFN: false, DisableBtn: '', DisableBtnMsg: 'Please wait...', DisableOth: '.DisableOnJSONPost', LoginHideSuccessMsg: false, LoginSuccessCallbackFn: false
		}, window.JSONOpt, options);
		if (Opt.WaitDiv.length > 0) {
			var wait = $("#" + Opt.WaitDiv);
			var Cnt = (wait.data("Cnt") || 0) + 1;
			if (wait.length == 0) {
				if (Opt.WaitMsg.length == 0) { Opt.WaitMsg = "&nbsp;"; }
				//wait = $("<div class='wait_img wait_pos' style='display:none;'/>").attr("id", Opt.WaitDiv).html(Opt.WaitMsg).appendTo(document.body);
			}
			wait.data("Cnt", Cnt);
			if (!wait.is(":visible")) wait.slideDown();
		}

		URL=window.apiSrc+'/BCMain/'+URL;
		var jqxhr = $.ajax({
			url: URL, cache: Opt.Cache, type: "POST",
			data: { "data": JSON.stringify(Data), "WebPartKey":''},
			dataType: "json", timeout: Opt.Timeout,
			xhrFields: { withCredentials: true }
		})
		jqxhr.always(function (Data) {
			if (Opt.WaitDiv.length > 0) {
				var wait = $("#" + Opt.WaitDiv);
				wait.data("Cnt", (wait.data("Cnt") - 1));
				if (wait.data("Cnt") <= 0) { wait.slideUp(); }
			}
		});
		jqxhr.done(function (data, textStatus, jqXHR) {
		});
		jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
		});
		return jqxhr;
	}
}
}

export default Master;
