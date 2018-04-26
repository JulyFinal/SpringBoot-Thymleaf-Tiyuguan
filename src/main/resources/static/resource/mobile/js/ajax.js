function ajax_error(json) {
	// 如果拦截器确认没有权限，返回错误页面
	if (json.error) {
		//先判断url中是否包含?
		var url=json.href;
		var regexp=/.*\.do\?.?/;
		if(regexp.test(url))	//如果url中包含?
		{
			url=url+"&msg=" + encodeURIComponent(json.error);
		}
		else
		{
			url=url+"?msg=" + encodeURIComponent(json.error);
		}
		
		window.location.href=url;
	}
}

// ajax的提示信息
function ajax_alert(json) {
	// 如果拦截器确认没有权限，返回错误页面
	if (json.error) {
		ajax_error(json);
		return;
	}
	
	var message = "";
	if (json.result === false || json.exception === true) {
		if (json.exception === true) {
			message = decodeURIComponent(json.msg).replace(/\+/g, " ");
		}
		else {
			message = json.msg;
		}
		
		alert(message);
	}
	else {
		message = json.msg;
		alert(message);
	}
}

// 同步Ajax取值共用方法
function ajaxSubmit(_url, _data) {
	var __response;
	$.ajax({
		type : "POST",
		url: _url,
		data : _data,
		dataType : "json",
		async: false,
		success: function (json) {
			if (json && json.error) {
				ajax_error(json);
				return;
			}
			__response = json;
		}
	});
	
	return __response;
}

// Ajax方法
function sys_ajaxPost(_url, _data, callback) {
	_data.is_ajax = 1;
	if (callback === undefined) {
		$.ajax({
			type : "POST",
			url : _url,
			data : _data,
			dataType : "json",
			success : function(msg) {
				ajax_alert(msg);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				ajax_alert(thrownError);
			}
		});
	} else {
		$.ajax({
			type : "POST",
			url : _url,
			data : _data,
			dataType : "json",
			success : callback,
			error : function(xhr, ajaxOptions, thrownError) {
				ajax_alert(thrownError);
			}
		});
	}
}
//Ajax方法
function sys_ajaxGet(url, data, callback) {
	if (callback === undefined) {
		if (data === undefined) {
			$.getJSON(url, function(json) {
				ajax_alert(json);
			});
		} else {
			$.getJSON(url, data, function(json) {
				ajax_alert(json);
			});
		}
	} else {
		$.getJSON(url, data, callback);
	}
}
