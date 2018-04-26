//全选
function selectAll(nameVal)
{
	//获取复选框的form对象
	var formObj = $("form:has(:checkbox[name='"+nameVal+"'])");

	//根据form缓存数据判断批量全选方式
	if(formObj.data('selectType')=='none' ||formObj.data('selectType')==undefined)
	{
		$(":checkbox[name='"+nameVal+"']:not(:checked)").attr('checked','checked');
		formObj.data('selectType','all');
	}
	else
	{
		$(":checkbox[name='"+nameVal+"']").attr('checked','');
		formObj.data('selectType','none');
	}
}
//字符串验证
function validate(value,pattern)
{
	switch(pattern)
	{
//		case 'province':pattern = /^\+?[1-9][0-9]*$/i;	break;
//		case 'city':pattern = /^\+?[1-9][0-9]*$/i;	break;
//		case 'area':pattern = /^\+?[1-9][0-9]*$/i;	break;
//		case 'street':pattern = /^\+?[1-9][0-9]*$/i;	break;
		case 'province':pattern = /^[\w]*$/i;	break;
		case 'city':pattern = /^[\w]*$/i;	break;
		case 'area':pattern = /^[\w]*$/i;	break;
		case 'street':pattern = /^[\w]*$/i;	break;
		
		case 'required':pattern = /\S+/i;	break;
		case 'email':	pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)+$/i;	break;
		case 'qq':		pattern = /^[1-9][0-9]{4,}$/i;	break;
		case 'id':		pattern = /^\d{15}(\d{2}[0-9x])?$/i;	break;
		case 'ip':		pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;break;
		case 'zip':		pattern = /^\d{6}$/i;	break;
		case 'phone':	pattern = /^((\d{3,4})|\d{3,4}-)?\d{7,8}(-\d{3})*$/i;	break;
		case 'mobi':	pattern = /^[0-9]{8,11}$/i;	break;
		case 'url':		pattern = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))+(\/?\S*)?$/i;	break;
	}

    if (value.search(pattern) == -1)
    {
       	return false;
    }
    else
    {
		return true;
    }
}

/**
 * @brief 获取控件元素值的数组形式
 * @param string nameVal 控件元素的name值
 * @param string sort    控件元素的类型值:checkbox,radio,text,textarea,select
 * @return array
 */
function getArray(nameVal,sort)
{
	//要ajax的json数据
	jsonData = new Array;

	switch(sort)
	{
		case "checkbox":
		$('input:checkbox[name="'+nameVal+'"]:checked').each(
			function(i)
			{
				jsonData[i] = $(this).val();
			}
		);
		break;
	}
	return jsonData;
}

//弹出框
window.realAlert = window.alert;
window.alert = function(mess)
{
	art.dialog.tips(mess);
}

window.realConfirm = window.confirm;
//对话框
window.confirm = function(mess,bnYes,bnNo)
{
	if(bnYes == undefined && bnNo == undefined)
	{
		return eval("window.realConfirm(mess)");
	}
	else
	{
		art.dialog.confirm(
			mess,
			function(){eval(bnYes)},
			function(){eval(bnNo)}
		);
	}
}

/**
 * @brief 删除操作
 * @param object conf
	   msg :提示信息;
	   form:要提交的表单名称;
	   link:要跳转的链接地址;
 */
function delModel(conf)
{
	var yesFn = null;            //执行操作
	var msg   = '确定要删除么？';//提示信息

	if(conf)
	{
		if(conf.form)
			var yesFn = 'formSubmit("'+conf.form+'")';
		else if(conf.link)
			var yesFn = 'window.location.href="'+conf.link+'"';

		if(conf.msg)
			var msg   = conf.msg;
	}
	if(yesFn==null && document.forms.length >= 1)
		var yesFn = 'document.forms[0].submit();';

	if(yesFn!=null)
		window.confirm(msg,yesFn);
	else
		alert('删除操作缺少参数');
}

//根据表单的name值提交
function formSubmit(formName)
{
	$('form[name="'+formName+'"]').submit();
}

//根据checkbox的name值检测checkbox是否选中
function checkboxCheck(boxName,errMsg)
{
	if($('input[name="'+boxName+'"]:checked').length < 1)
	{
		alert(errMsg);
		return false;
	}
	return true;
}

//倒计时
var countdown=function()
{
	var _self=this;
	this.handle={};
	this.parent={'second':'minute','minute':'hour','hour':""};
	this.add=function(id){
		_self.handle.id=setInterval(function(){_self.work(id,'second');},1000);
	};
	this.work=function(id,type){
		if(type=="")
			return false;

		var e=document.getElementById("cd_"+type+"_"+id);

		var value=parseInt(e.innerHTML);
		if( value == 0 && _self.work( id,_self.parent[type] )==false )
		{
			clearInterval(_self.handle.id);
			return false;
		}
		else
		{
			e.innerHTML = (value==0?59:(value-1));
			return true;
		}
	};
};

//切换验证码
function changeCaptcha(urlVal)
{
	var radom = Math.random();
	if( urlVal.indexOf("?") == -1 )
	{
		urlVal = urlVal+'/'+radom;
	}
	else
	{
		urlVal = urlVal + '&random'+radom;
	}
	$('#captchaImg').attr('src',urlVal);
}

/*加法函数，用来得到精确的加法结果
 *返回值：arg1加上arg2的精确结果
 */
function mathAdd(arg1,arg2)
{
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

/*减法函数
 *返回值：arg2减arg1的精确结果
 */
function mathSub(arg2,arg1)
{
	var r1,r2,m,n;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));
	//last modify by deeka
	//动态控制精度长度
	n=(r1>=r2)?r1:r2;
	return ((arg2*m-arg1*m)/m).toFixed(n);
}

/*乘法函数，用来得到精确的乘法结果
 *返回值：arg1乘以arg2的精确结果
 */
function mathMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

/*除法函数，用来得到精确的除法结果
 *返回值：arg1除以arg2的精确结果
 */
function mathDiv(arg1,arg2)
{
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}
/*实现事件页面的连接*/
function event_link(url)
{
	window.location.href = url;
}

/**
 * 站外分享
 *
 * @param string type 类别，如qq、kaixin、renren
 * @param string url 要分享的url
 * @param string title 名称，不填也可
 * @author walu
 */
function postShare(type,url,title)
{
	url=url || "";
	url=encodeURIComponent(url);

	title=title || "";
	title=encodeURI(title);

	desURL="";
	switch(type)
	{
		case 'qq':
			desURL='http://v.t.qq.com/share/share.php?url='+url+'&appkey=&site=&pic=&title='+title;
			break;
		case 'kaixin':
			desURL="http://www.kaixin001.com/repaste/share.php?rtitle="+title+"&rurl="+url;
			break;
		case 'renren':
			desURL="http://share.renren.com/share/buttonshare.do?title="+title+"&link="+url;
			break;
		case 'douban':
			desURL="http://www.douban.com/recommend/?url="+url+"&title="+title;
			break;
		case 'xinlang':
			desURL="http://v.t.sina.com.cn/share/share.php?title="+title+"&url="+url;
			break;
		default:break;
	}
	if(desURL)
	{
		window.open(desURL,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes,status=no');
	}
}



function lateCall(t,func)
{
	var _self = this;
	this.handle = null;
	this.func = func;
	this.t=t;

	this.execute = function()
	{
		_self.func();
		_self.stop();
	}

	this.stop=function()
	{
		clearInterval(_self.handle);
	}

	this.start=function()
	{
		_self.handle = setInterval(_self.execute,_self.t);
	}
}

function sys_alert(msg,ok) {
	var w = "auto";
	var h = "auto";
	if (msg.length <= 30) {
		w = "200px";
		h = "50px";
	}
	art.dialog({
		title:"",
	    content:msg,
	    width:w,
	    height:h
	},ok);
}

//防止退格键回退和回车键提交
function onKeyDown() { 
  if ( (event.altKey) || ((event.keyCode == 8) && 
  ((event.srcElement.type != "text" && 
  event.srcElement.type != "textarea" && 
  event.srcElement.type != "password") || event.srcElement.readOnly == true)) || 
  ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82)) )) 
  { 
    event.keyCode = 0; 
    event.returnValue = false; 
  }
  
  if(event.keyCode==13){
	return   false;
  }
}
document.onkeydown = onKeyDown;

function banBackSpace() {
	if ( (event.altKey) || ((event.keyCode == 8) && 
	((event.srcElement.type != "text" && 
	event.srcElement.type != "textarea" && 
	event.srcElement.type != "password") || event.srcElement.readOnly == true)) || 
	((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82)) )) 
	{ 
		event.keyCode = 0; 
		event.returnValue = false; 
	}
}

//打开窗口
function winOpen_maximize(url, sFeatures) {
	if (!sFeatures) {
		sFeatures = "top=0,left=0,toolbar=yes, menubar=yes,scrollbars=yes, resizable=yes,location=yes, status=yes";
	}
	var newwin = window.open(url, "", sFeatures);
	newwin.resizeTo(screen.width,screen.height);
}

//打开窗口
function showDialog(url, vArguments, sFeatures) {
	if (!sFeatures) {
		sFeatures = "dialogWidth:490px;dialogHeight:310px;scroll:no;status:no;";
	}
	return window.showModalDialog(url, vArguments, sFeatures);
}


/*
* 数据格式化
* @param val 要格式化的数据
* @param n 格式化后的小数位数
*/
function dataFormat(val, n) {
	if (isNaN(val)) return "";
	if (n == undefined || n == null || isNaN(n)) n = 2;
 
	return new Number(val).fixed(n);
}

Number.prototype.fixed=function(n){  
	with(Math)return   round(Number(this)*pow(10,n))/pow(10,n);
};


// 三位一撇的货币格式化
function formatCurrency(num) {
	var  money = dataFormat(num) + "";
	if (money == "") {
		return money;
	}
	
	money=money.replace(/0*(\d+)/,"$1");
	
	var str="";
	var items=money.split(".");
	str=items[0].split("").reverse().join("");
	str=str.replace(/(\d{3})(?=\d)/gi,"$1,");
	str=str.split("").reverse().join("");
	if(items.length>1)
	{
		str=str+"."+items[1];
	}
	return str;
}

// 使用正则表达式进行验证
function checkByRegExp(re, value) {	
	if(!re.test(value)) {
		return true;
	}
	return false;
}

// 验证正整数
function checkInt(value, fieldName) {
	var errorMsg = "请输入正整数";
	if (fieldName) {
		errorMsg = "【" + fieldName + "】" + errorMsg;
	}
	
	if (checkByRegExp(/^\d*[1-9]\d*$/, value)) {
		alert(errorMsg);
		return false;
	}
	
	return true;
}

//验证正浮点数
function checkFloat(value, fieldName) {
	var errorMsg = "请输入浮点数,10位有效数字保留两位小数";
	if (fieldName) {
		errorMsg = "【" + fieldName + "】" + errorMsg;
	}
	//if (checkByRegExp(/^((\d+\.\d*[1-9]\d*)||(\d*[1-9]\d*\.\d+)||(\d*[1-9]\d*))$/, value)) {	
	if (checkByRegExp(/^-?(([1-9]\d{0,7}\.\d{1,2})||([1-9]\d{0,7})||(0)||(0\.\d{1,2}))$/, value)) {
		alert(errorMsg);
		return false;
	}
	
	return true;
}
// 验证最大长度
function checkMaxlength(fieldId, ml) {
	var value = $("#" + fieldId).val();
	var errorMsg = "输入的内容不得超过" + ml + "个字符！";
	
	if ($("#" + fieldId).attr("showName")) {
		errorMsg = "【" + $("#" + fieldId).attr("showName") + "】" + errorMsg;
	}
	
	if(value.length > ml){
		alert(errorMsg);
		return false;
	}
	
	return true;
}
//价格搜索验证后面的数不得小于前面的数
function priceCheck(formId){
	
	var min_price = $("#"+formId+" input:eq(0)").val();
	var max_price = $("#"+formId+" input:eq(1)").val();
	if(parseFloat(min_price) > parseFloat(max_price)){
		realAlert("最小价格不得大于最大价格");
		return;
	}else{
		$("#"+formId).submit();
	}
};
