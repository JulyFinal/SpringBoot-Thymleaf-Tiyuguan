//
// 封装ios、android端统一的原生功能调用以及callback方法
//  Created by 邵智敬 on 2014年07月27日23:48:14.
//



//通过在DOM中新建一个iframe的方式向客户端传递参数，传递完成后移除iframe。
function openCustomURLinIFrame(src)
{
    var rootElm = document.documentElement;
    var newFrameElm = document.createElement("IFRAME");
    newFrameElm.setAttribute("src",src);
    rootElm.appendChild(newFrameElm);
    //移除iframe
    newFrameElm.parentNode.removeChild(newFrameElm);
}

//拼接调用原生功能的字符串，刷新url
function callNativeFunction(functionName, args, successCallback, errorCallback)
{
    var url = "js2ios://";

    var callInfo = {};
    callInfo.functionname = functionName;
    if (successCallback)
    {
        callInfo.success = successCallback;
    }
    if (errorCallback)
    {
        callInfo.error = errorCallback;
    }
    if (args)
    {
        callInfo.args = args;
    }

    url += JSON.stringify(callInfo)

    openCustomURLinIFrame(url);
}



//默认的成功回调函数
var onSuccess = function(ret)
{
    var obj = JSON.parse(ret);
    //$("#result").html(obj.result);
}

//默认的调用失败回调函数
function onError (ret)
{
    if (ret)
    {
        var obj = JSON.parse(ret);
		alert(obj.error);
    }
}

//Native调用本地的函数显示错误内容
function onDefaultCallNativeFunctionError(ret)
{
	if (ret){
		alert(ret);
     }
}

//全局调用返回主页接口
function callNativeReturnHome(){
	callNativeFunction("returnHome", [""], "onSuccess", "onError");
}

function showLoading(){
	$('#progressBar').show();
}

function hideLoading(){
	$('#progressBar').hide();	
}