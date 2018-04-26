function mobilerealAlert(msg, stickyflag){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'notice'
	});
}

function mobilerealError(msg, stickyflag){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'error'
	});
}


function mobilerealWarning(msg, stickyflag){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'warning'
	    	
	});
}

function mobilerealSuccess(msg, stickyflag){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'success'
	    	
	});
}


function mobilerealAlertWithCallback(msg, stickyflag, callback){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'notice',
	    close	 : callback
	});
}

function mobilerealErrorWithCallback(msg, stickyflag){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'error',
	    close	 : callback
	});
}


function mobilerealWarningWithCallback(msg, stickyflag, callback){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'warning',
	    close	 : callback
	});
}

function mobilerealSuccessWithCallback(msg, stickyflag, callback){
	$().toastmessage('showToast', {
	    text     : msg,
	    sticky   : stickyflag,
	    position : 'middle-center',
	    type     : 'success',
	    close	 : callback	    	
	});
}

function underConstrunction(){
	$().toastmessage('showToast', {
	    text     : '功能建设中，敬请期待！',
	    sticky   : false,
	    position : 'middle-center',
	    type     : 'notice'
	});
}

var spinner;

function showLoading(){
	if($('#spinnerdiv').length==0){
		var div = "<div id='spinnerdiv'></div>"; 
		$(document.body).append(div); 
	}
	spinner = Spinners.create('#spinnerdiv').center().play();
}

function hideLoading(){
	if($('#spinnerdiv').length>0){
		spinner.remove();
	}
}

function delModel(obj){
	underConstrunction();
	return;
}

function isJdType(shopCode){
	if(shopCode=="jdsd" || shopCode=="stpsd" || shopCode == "womai"){
		return true;
	}else{
		return false;
	}
}