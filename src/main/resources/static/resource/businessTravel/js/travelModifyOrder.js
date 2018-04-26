var readAppUrl = readAppUrl||"/";
var writeAppUrl = writeAppUrl||"/";
var ctx = ctx||"/";
//机票类型
var airticketOperType={
		10:'订单生成',40:'出票',50:'已退票',60:'废票'
};
//酒店结算方式1.后付；2.个人现付；3.到店付款
var hotelPayType={
		1:'统一结算',2:'个人结算',3:'个人结算'
};
//机票结算方式10.现金；20.信用卡；30.借记卡；35.无磁无密支付；40.押金后付；50.月结后付
var airticketPayType={
		10:'个人结算',20:'个人结算',30:'个人结算',35:'个人结算',40:'个人结算',50:'统一结算'
};
//酒店状态 0.已预订，1.已确认，2.已取消，3.已离店，4.预订失败，5.noshow
var hotelStatus={	
		0:'预订中',1:'预订成功',2:'已取消',3:'已离店',4:'预订失败',5:'noshow',6:'已入住'
};
//值机状态 0未值机（建单时默认）； 1 已值机；2 需机场值机；3 已取消值机；
var checkInStatus={	
		0:'未值机',1:'已值机',2:'需机场值机',3:'已取消值机'
};
//航段状态：0 正常（下单时默认）；1 延误；2 取消；3 备降
var flightStatus={	
		0:'正常',1:'延误',2:'取消',3:'备降'
};
//获取全成指标
function getQCZB(id,selectedValue,selectedName,busiType){
	var str="";
	var str1="<option value=''>请选择</option>";
	if(busiType==null||busiType==""){
		$("#"+id).html(str1);
		return;
	}
	$.getJSON(readAppUrl+"/businessTravel/getAcstListBySegValue.do?r="+Math.random()+"&busiType="+busiType+"&"+commonParams+"&jsonpcallback=?", function(date){
		var tmpl;
		if(date.length==0 || date.length>1){//如果对应成本中心个数是0时,大于1时 默认显示请选择,只有1个时默认第一条.
			str="<option value=''>请选择</option>";
			$('#acst_code_desc').val("");
		}
		$.each(date,function(index,value){
			tmpl="";
			var optionValue=value.id+","+value.ACST_CODE;
			var ACST_NAME=value.ACST_NAME;
			if(optionValue==selectedValue){
				tmpl="selected='selected'";
				$('#acst_code_desc').val(ACST_NAME);
			}
			if(date.length==1){
				$('#acst_code_desc').val(ACST_NAME);
			}
			str+="<option value='"+optionValue+"' "+tmpl+" >"+value.ACST_NAME+"</option>";
		})
		$("#"+id).html(str);
	});
}

//获取专业
function getZY(id,selectedValue,selectedName,busiType){
	var str="";
	var str1="<option value=''>请选择</option>";
	if(busiType==null||busiType==""){
		$("#"+id).html(str1);
		return;
	}
	$.getJSON(readAppUrl+"/businessTravel/getSpecialtyList.do?r="+Math.random()+"&"+commonParams+"&busiType="+busiType+"&adminShopId="+adminShopId+"&jsonpcallback=?", function(date){
		var tmpl;
		var str="";
		if(date.length==0 || date.length>1){//如果对应专业个数是0时,大于1时 默认显示请选择,只有1个时默认第一条.
			str="<option value=''>请选择</option>";
		}
		$.each(date,function(index,value){
			tmpl="";
			var optionValue=value.id+","+value.code+","+value.value;
			var specialty_name=value.name;
			if(optionValue==selectedValue){
				tmpl="selected='selected'";
				$('#specialty_desc').val(specialty_name);
			}
			if(date.length==1){
				$('#specialty_desc').val(specialty_name);
			}
			str+="<option value='"+optionValue+"' "+tmpl+" >"+value.name+"</option>";
		})
		$("#"+id).html(str);
		
	});
}

//获取客户段
function getCustom(id,selectedValue,adminShopId,provinceNo){
	var str="";
	$.getJSON(readAppUrl+"/businessTravel/geCustom.do?adminShopId="+adminShopId+"&provinceNo="+provinceNo+"&r="+Math.random()+"&"+commonParams+"&jsonpcallback=?", function(datas){
		var tmpl;
		if(datas.length==0){//如果对应客户段数量为0时显示缺省.
			str="<option value='00'>缺省</option>";
			$('#custom_desc').val("缺省");
			$("#"+id).html(str);
			return;
		}
		$.each(datas,function(index,data){
			tmpl="";
			var optionValue=data.flex_value;
			var optionName=data.description;
			if(optionValue==selectedValue){
				tmpl="selected='selected'";
			}
			str+="<option value='"+optionValue+"' "+tmpl+" >"+optionName+"</option>";
		})
		$("#"+id).html(str);
	});
}

//弹出窗口工具类
function winOpen(url,option){
	var options={title: "",
	   		  width:600,
	   		  height:300,
	   		  lock:true,
	   		  padding: 0,
	   		  resize:false,
	   		 opacity:0.5,
	   		dblclick_hide:false //是否启用遮罩层点击事件
	   		};
	art.dialog.open(url, $.extend(options, option));
}
//使用插件封装alert
function artDialogAlert(content,option){
	var options ={
	        id: 'Alert',
	        icon: 'warning',
	        fixed: true,
	        lock: true,
	        content: content,
	        ok: true,
	        opacity:0
	    };
 return artDialog($.extend(options,option));
}
//为date增加format方法进行格式化公共方法
Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
}
//根据字符串 转换时间类型,部分浏览器不兼容new date(str)
function getDate(strDate) {  
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,  
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');  
    return date;  
} 
//只读属性的input 取消退格键的返回上一步js
document.onkeydown = function (e) {
    var ev = window.event || e;

    var src = ev.srcElement || ev.target;

    if (src.readOnly || !(src.tagName == "INPUT" || src.tagName == "TEXTAREA")) {

        return false;

    }
}
//true 是IE6
function isIE_6(){
	return !-[1,]&&!window.XMLHttpRequest;
}
//true 是Chrome
function isChrome(){
	return window.navigator.userAgent.indexOf("Chrome") !== -1;
}
//ajax 查询行程信息列表
function queryDistanceList(btraVelId,sStatus){
	var url = readAppUrl+"/businessTravel/queryDistance.do?btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	$.getJSON(url,null,function(data){
		var tableHtml="<tr>"
					 +"<th>序号</th>"
					 +"<th>出发城市（区县）</th>"
					 +"<th width=\"59px\"></th>"
					 +"<th>到达城市（区县）</th>";
		if(sStatus==0)
			tableHtml +="<th>操作</th></tr>";
		for(var i=0;i<data.length;i++){userInfo_table
			tableHtml+="<tr>"
					  +"<td>"+(i+1)+"</td>"
					  +"<td>"+data[i].startCname;
		if(data[i].startAname!=null && data[i].startAname!="")
			tableHtml+="（"+data[i].startAname+"）";
			tableHtml+=	"</td><td><div class=\"scxx_jt\"></div></td>"
					   +"<td>"+data[i].endCname;
		if(data[i].endAname!=null && data[i].endAname!="")
			tableHtml+="（"+data[i].endAname+"）";
			tableHtml+="</td>";
			tableHtml +="<td><a href=\"javascript:modifyDistance('"+data[i].id+"')\" class=\"noprint\">修改</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:deleteDistance('"+data[i].id+"','"+data[i].btraVelId+"','"+sStatus+"')\" class=\"noprint\">删除</a></td></tr>";
		}
		$("#disTanceTable").html(tableHtml);
		
	});
}	

//增加行程弹出窗口
function addDistance(btraVelId,sStatus){
	var url = readAppUrl+"/businessTravel/addDistanceIndex.do?operateType=allModify&"+commonParams+"&r="+Math.random()+"&btraVelId="+btraVelId+"&sStatus="+sStatus+"&jsonpcallback=?";
	var option={title:"增加行程"};
	winOpen(url,option);
}

//修改行程弹出窗口
function modifyDistance(id){
    var url = readAppUrl+"/businessTravel/updateDistanceIndex.do?operateType=allModify&id="+id+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    var option={title:"修改行程"};
	winOpen(url,option);
}

//删除行程
function deleteDistance(id,btraVelId,sStatus){
    var url = writeAppUrl+"/businessTravel/deleteModifyDistance.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    art.dialog.confirm("您确定要删除行程信息吗？",function() {
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			dataType : "json",
			success: function (data) {
				if(data.result){
					queryDistanceList(btraVelId,sStatus);
					getOrderLog(btraVelId);
				}
				else
					artDialogAlert(data.resultMessage);
			}
		});
	});
}


//ajax 查询其他信息列表
function queryOtherList(btraVelId,otherType,pStatus,bStatus){
	var  sStatus = startAndSubmitCheckStatus;
	var url = readAppUrl+"/businessTravel/queryOther.do?btraVelId="+btraVelId+"&otherType="+otherType+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	if(otherType==0){
		$.getJSON(url,null,function(data){
			var tableHtml="<tr>"
						 +"<th height=\"27\" align=\"center\" valign=\"middle\" class=\"qita_table_title\">序号</th>"
						 +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">类型</th>"
						 +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">姓名</th>"
						 +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">出差日期</th>"
						 +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">起止地点</th>"
						 +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">金额（含保险）</th>";
			if(bStatus!=1&&bStatus!=3){
				if((sStatus==1&&pStatus==3)||sStatus!=1){
					tableHtml+="<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">操作</th></tr>";
				}
			}
				
			for(var i=0;i<data.length;i++){
				tableHtml+="<tr>"
						  +"<td align=\"center\" valign=\"middle\" height=\"44\">"+(i+1)+"</td>"
						  +"<td align=\"center\" valign=\"middle\">"+data[i].trafficTool+"("+data[i].trafficLevel+")</td>"
						  +"<td align=\"center\" valign=\"middle\">"+data[i].personName+"</td>"
						  +"<td align=\"center\" valign=\"middle\">"+data[i].dateFrom+"</td>"
						  +"<td align=\"center\" valign=\"middle\">"+data[i].tripFrom+"&nbsp;-&nbsp;"+data[i].tripArive+"</td>"
						  +"<td align=\"center\" valign=\"middle\" class=\"qita_jg_font\">"+Number(data[i].totalPrice).toFixed(2)+"</td>";
				if(bStatus!=1&&bStatus!=3){
					if((sStatus==1&&pStatus==3)||sStatus!=1){
						tableHtml+="<td align=\"center\" valign=\"middle\"><a href=\"javascript:modifyOther('"+data[i].id+"','0')\" class=\"noprint\">修改</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:deleteOther('"+data[i].id+"','"+data[i].btraVelId+"','0','"+pStatus+"')\" class=\"noprint\">删除</a></td></tr>";
					}
				}
			}
			$("#otherTrafficTable").html(tableHtml);
			
		});
	}else{
		$.getJSON(url,null,function(data){
			var tableHtml="<tr>"
                         +"<th height=\"27\" align=\"center\" valign=\"middle\" class=\"qita_table_title\">序号</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">入住城市</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">酒店名称</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">姓名</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">住宿时间</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">金额</th>";
			if(bStatus!=1&&bStatus!=3){
				if((sStatus==1&&pStatus==3)||sStatus!=1){
					tableHtml+="<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">操作</th></tr>";
				}
			}
			for(var i=0;i<data.length;i++){
				tableHtml+="<tr>"
                          +"<td align=\"center\" valign=\"middle\" height=\"44\">"+(i+1)+"</td>"
                          +"<td align=\"center\" valign=\"middle\">"+data[i].tripArive+"</td>"
                          +"<td align=\"center\" valign=\"middle\">"+data[i].hotelName+"</td>"
                          +"<td align=\"center\" valign=\"middle\">"+data[i].personName+"</td>"
                          +"<td align=\"center\" valign=\"middle\">"+data[i].dateFrom+"&nbsp;至&nbsp;"+data[i].dateArive+"</td>"
                          +"<td align=\"center\" valign=\"middle\" class=\"qita_jg_font\">"+Number(data[i].totalPrice).toFixed(2)+"</td>";
				if(bStatus!=1&&bStatus!=3){
					if((sStatus==1&&pStatus==3)||sStatus!=1){
						tableHtml+="<td align=\"center\" valign=\"middle\"><a href=\"javascript:modifyOther('"+data[i].id+"','1')\" class=\"noprint\">修改</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:deleteOther('"+data[i].id+"','"+data[i].btraVelId+"','1','"+pStatus+"')\" class=\"noprint\">删除</a></td></tr>";
					}
				}
			}
			$("#otherHotelTable").html(tableHtml);
			
		});
	}
	
}
//增加其他信息弹出窗口
function addOther(index,btraVelId,pStatus){
	var url = readAppUrl+"/businessTravel/addOtherIndex.do?operateType=allModify&btraVelId="+btraVelId+"&pStatus="+pStatus+"&otherType="+index+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	var option;
	//交通
	if(index==0){
		option={title:"<div style=\"height:27px;padding-left:30px;background:url("+readAppUrl+"/resource/businessTravel/images/jiaotong.jpg) no-repeat left center\">交通</div>",
				width:550,
				height:360};
	//住宿
	}else if(index==1){
		option={title:"<div style=\"padding-left:35px;background:url("+readAppUrl+"/resource/businessTravel/images/zhusu.jpg) no-repeat left center\">住宿</div>",
				width:530,
				height:320};
	}
	winOpen(url,option);
}
//修改其他信息弹出窗口
function modifyOther(id,index){
    var url = readAppUrl+"/businessTravel/updateOtherIndex.do?operateType=allModify&id="+id+"&otherType="+index+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    var option;
    //交通
	if(index==0){
		option={title:"<div style=\"height:28px;padding-left:30px;background:url("+readAppUrl+"/resource/businessTravel/images/jiaotong.jpg) no-repeat left center\"><div style='padding-top:5px;'>交通</div></div>",
				width:550,
				height:360};
	//住宿
	}else if(index==1){
		option={title:"<div style=\"padding-left:35px;background:url("+readAppUrl+"/resource/businessTravel/images/zhusu.jpg) no-repeat left center\"><div style='padding-top:1px;'>住宿</div></div>",
				width:530,
				height:320};
	}
	winOpen(url,option);
}
//删除其他信息
function deleteOther(id,bid,index,pStatus){
    var url = writeAppUrl+"/businessTravel/deleteModifyOther.do?id="+id+"&btraVelId="+bid+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    art.dialog.confirm(index==0?"您确定要删除交通信息吗":"您确定要删除住宿信息吗？",function() {
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			dataType : "json",
			success: function (data) {
				if(data.result){
					queryOtherList(bid,index,pStatus);
					getOrderLog(bid);
				}
				else
					artDialogAlert(data.resultMessage);
			}
		});
	});
}

//ajax 查询个人补助信息列表
function queryPerallowanceList(btraVelId){
	var sStatus = startAndSubmitCheckStatus;
	var bss = bStatus;
	var pss = pStatus;
	var url = readAppUrl+"/businessTravel/queryPerallowanceList.do?btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	$.getJSON(url,null,function(data){
		var tableHtml="";
		for(var i=0;i<data.length;i++){
			tableHtml+="<div class=\"grbzxx_jpinfo_cont\" style=\"margin-top:10px;\">"
					   +"<div class=\"gr_jpinfo_NO\">"+(i+1)+"</div>"
                   	   +"<table cellspacing=\"0\" cellpadding=\"0\"><tr>"
                   	   +"<td width=\"6%\" height=\"65\" rowspan=\"2\" align=\"center\" valign=\"middle\" class=\"gr_name jp_border\">"+data[i].personName+"</td>"
                   	   +"<td width=\"43%\" class=\"jp_riqi_name jp_border\">"+data[i].dateFrom+"&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;"+data[i].dateArive+"</td>"
                   	   +"<td width=\"30%\" align=\"right\" valign=\"middle\" class=\"grbzxx_rmb jp_border\"><span>RMB："+(Number(data[i].trafficPriceTotal)+Number(data[i].foodPriceTotal)).toFixed(2)+"元</span></td>"
                   	   +"<td width=\"7%\" rowspan=\"2\" align=\"center\" valign=\"middle\">"
            tableHtml+="<p><a href=\"javascript:updatePerallowanceIndex('"+data[i].id+"')\" class=\"jp_gn_btn\" class=\"noprint\">修改</a></p>"
        							  +"<p><a href=\"javascript:deletePerallowance('"+data[i].id+"','"+data[i].btraVelId+"')\" class=\"jp_gn_btn\" class=\"noprint\">删除</a></p>";
			tableHtml+="</td></tr>"
                   	   +"<tr><td class=\"gr_name jp_border\" style=\"padding-left:10px;\">出差天数：&nbsp;"+data[i].days+"&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;交通补助："+data[i].trafficPrice+"元/天&nbsp;餐补："+data[i].foodPrice+"元/天</td>"
                   	   +"<td width=\"30%\" align=\"right\" valign=\"middle\" class=\"bzje_name jp_border\"><span>交通补助金额："+data[i].trafficPriceTotal+"元&nbsp;餐补金额："+data[i].foodPriceTotal+"元</span></td></tr></table></div>";
		}
		$("#perallowanceDiv").html(tableHtml);
		
	});
}	

//计算个人补助信息
function calculatePer(btraVelId){
	var isSystem = $("#isSystem").val();
	var gotoDate = $("#gotoDate").val();
	var backDate = $("#backDate").val();
	if(isSystem==null||isSystem==''||isSystem=='2'){artDialogAlert("请选择是否系统内出差！"); return;}
	if(gotoDate==null||gotoDate==''){artDialogAlert("请选择出发日期！"); return;}
	if(backDate==null||backDate==''){artDialogAlert("请选择返回日期！"); return;}
	var url = writeAppUrl+"/businessTravel/calculatePer.do?btraVelId="+btraVelId+"&isSystem="+isSystem+"&gotoDate="+gotoDate+"&backDate="+backDate+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		if(data.result){
			queryPerallowanceList(btraVelId);
			queryCostList(btraVelId,0);
			queryCostList(btraVelId,1);
		}else
			artDialogAlert(data.resultMessage);
	});	
}

//修改个人补助信息
function updatePerallowanceIndex(id){
	var isSystem = $("#isSystem").val();
    var url = writeAppUrl+"/businessTravel/updatePerallowanceIndex.do?operateType=allModify&id="+id+"&isSystem="+isSystem+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    var option={title:"个人补助信息",width:550,height:285};
	winOpen(url,option);
}

//删除个人补助信息
function deletePerallowance(id,btraVelId){
    var url = writeAppUrl+"/businessTravel/deleteModifyPerallowance.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    art.dialog.confirm("确定要删除个人补助信息吗？",function() {
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			dataType : "json",
			success: function (data) {
				if(data.result){
					queryPerallowanceList(btraVelId);
					queryCostList(btraVelId,0);
					queryCostList(btraVelId,1);
					getOrderLog(btraVelId);
				}else
					artDialogAlert("删除失败！！！");
			}
		});
	});
}

//ajax 查询费用情况信息列表
function queryCostList(btraVelId,accountStatus){
	var url = readAppUrl+"/businessTravel/queryCost.do?btraVelId="+btraVelId+"&accountStatus="+accountStatus+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	if(accountStatus==0){
		$.getJSON(url,null,function(data){
			var tableHtml="<tr style=\"background-color:#f4f9fd;border:1px solid #f4f9fd;\">"
                         +"<th height=\"24\" align=\"center\" valign=\"middle\" class=\"fy_table_title\">住宿</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">交通</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">合计</th></tr>";
			for(var i=0;i<data.length;i++){
				tableHtml+="<tr style=\"border:1px solid #f4f9fd;\">"
						  +"<td height=\"34\" align=\"center\" valign=\"middle\">￥"+Number(data[i].zs).toFixed(2)+"</td>"
						  +"<td align=\"center\" valign=\"middle\">￥"+Number(data[i].jt).toFixed(2)+"</td>"
						  +"<td align=\"center\" valign=\"middle\" style=\"color:red\">￥"+(Number(data[i].jt)+Number(data[i].zs)).toFixed(2)+"</td></tr>";
			}
			$("#unifiedCostTable").html(tableHtml);
			
		});
	}else if(accountStatus==1){
		$.getJSON(url,null,function(data){
			var tableHtml="<tr style=\"background-color:#f4f9fd;border:1px solid #f4f9fd;\">"
                		 +"<th height=\"24\" align=\"center\" valign=\"middle\" class=\"fy_table_title\">姓名</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">住宿</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">交通</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">交通补助</th>"
                         +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">餐补</th>"
			       		 +"<th align=\"center\" valign=\"middle\" class=\"fy_table_title\">合计</th></tr>";
			if(data==null||data.length==0){
				tableHtml+="<tr style=\"border:1px solid #f4f9fd;\"><td height=\"34\" align=\"center\" valign=\"middle\"></td>"
		  		  +"<td align=\"center\" valign=\"middle\">￥0.00</td>"
				  +"<td align=\"center\" valign=\"middle\">￥0.00</td>"
				  +"<td align=\"center\" valign=\"middle\">￥0.00</td>"
				  +"<td align=\"center\" valign=\"middle\">￥0.00</td>"
				  +"<td align=\"center\" valign=\"middle\" style=\"color:red\">￥0.00</td></tr>";
			}else{
				for(var i=0;i<data.length;i++){
					tableHtml+="<tr style=\"border:1px solid #f4f9fd;\"><td height=\"34\" align=\"center\" valign=\"middle\">"+data[i].empName+"</td>"
					  		  +"<td align=\"center\" valign=\"middle\">￥"+Number(data[i].zs).toFixed(2)+"</td>"
							  +"<td align=\"center\" valign=\"middle\">￥"+Number(data[i].jt).toFixed(2)+"</td>"
							  +"<td align=\"center\" valign=\"middle\">￥"+Number(data[i].jtbz).toFixed(2)+"</td>"
							  +"<td align=\"center\" valign=\"middle\">￥"+Number(data[i].cb).toFixed(2)+"</td>"
							  +"<td align=\"center\" valign=\"middle\" style=\"color:red\">￥"+(Number(data[i].jt)+Number(data[i].zs)+Number(data[i].jtbz)+Number(data[i].cb)).toFixed(2)+"</td></tr>";
				}
			}
			$("#personCostTable").html(tableHtml);
			
		});
	}
		
	
}

//计算费用情况信息
function calculateCost(btraVelId){
	var url = writeAppUrl+"/businessTravel/calculateCost.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		if(data.result){
			queryCostList(btraVelId,0);
			queryCostList(btraVelId,1);
		}else
			artDialogAlert(data.resultMessage);
	});	
}

//ajax 查询酒店订单信息列表
function queryOrderHotelList(btraVelId,txType){
	var url = readAppUrl+"/orderTickets/queryOrderHotel.do?btraVelId="+btraVelId+"&"+commonParams+"&txType="+txType+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		var tableHtml="";
		var peoNames = new Array();
		var peoPrices = new Array();
			for(var i= 0 ;i<data.length;i++){
				peoNames = data[i].peopleName.split(",");
				peoPrices = data[i].peoplePrice.split(",");
				tableHtml+="<div>&nbsp;&nbsp;keyID&nbsp;&nbsp;："+data[i].keyID+"<div>"
						  +"<div class=\"gr_jdinfo_cont\">"
	            	      +"<div class=\"gr_jdinfo_NO\">"+(i+1)+"</div>"
	            	      +"<div class=\"gr_jdinfo_table\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"
	            	      +"<tr>"
	            	      +"<td width=\"20%\"  class=\"jdgr_name jp_border\" align=\"center\" valign=\"middle\"  height=\"40\"><div >"+data[i].hotelName+"</div></td>"
	            	      +"<td width=\"28%\" class=\"jd_riqi_name jp_border\" height=\"25\">入住日期："+data[i].checkIn+"</td>"
	            	      +"<td width=\31%\" class=\"grbzxx_rmb jp_border\" align=\"right\" valign=\"middle\" ><span>RMB:"+Number(data[i].totalPrice).toFixed(2)+"</span>（"+hotelPayType[data[i].payType]+"）</td>";
	            	      
				 //先判断是否为取消中
				  if(data[i].cancelStatus==1){
					  tableHtml+="<td width=\"14%\" class=\"jp_border\"  align=\"center\" valign=\"middle\" rowspan=\"2\"  >状态：取消中</td>";
				  }else{
					  tableHtml+="<td width=\"14%\" class=\"jp_border\" align=\"center\" valign=\"middle\" rowspan=\"2\">状态："+hotelStatus[data[i].status]+"</td>";
				  }
			      
				  tableHtml+="<td width=\"12%\" align=\"center\" valign=\"middle\" rowspan=\"2\">"
					       +"<p><a href=\"javascript:void(0)\" class=\"jd_gn_btn\" onclick=\"updateHotelManoAndPrice('"+data[i].keyID+"','"+data[i].totalPrice+"','"+data[i].maNo+"','"+btraVelId+"')\" class=\"noprint\">修改信息</a></p>"
	      	    	       +"</td>"
				           +"</tr>"
	            	       +"<tr>"
	            	       +"<td class=\"jdgr_name jp_border\" height=\"35\" align=\"center\"><div>"+data[i].roomName+"</div></td>"
	            	       +"<td class=\"jd_riqi_name jp_border\" height=\"25\">离店日期："+data[i].checkOut+"</td>"
						   +"<td class=\"jp_border\" style=\"text-align: left;padding-left: 10px;\"  valign=\"middle\">";
	            	  for(var j = 0 ;j<peoNames.length;j++){
	            		  tableHtml+=peoNames[j]+"："+peoPrices[j]+"&nbsp;&nbsp;";
	            	  }
	            tableHtml+= "</td></tr></table></div></div>";
		}
		if(txType==1)
			$("#jdPhoneDiv").html(tableHtml);
		else
			$("#jdOnlineDiv").html(tableHtml);
		
	});
}	
//酒店信息修改人员均摊费用
function updateHotelPrice(keyID,plength,totalPrice,btraVelId){
	var oHeight = 210;
	if(plength == 1)
		oHeight = 190;
	var url = readAppUrl+"/orderTickets/updateHotelPrice.do?btraVelId="+btraVelId+"&keyID="+keyID+"&totalPrice="+totalPrice+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    var option={title:"酒店人员费用修改",width:340,height:oHeight};
	winOpen(url,option);
}

//酒店信息修改总价，移动到其它商旅单
function updateHotelManoAndPrice(keyID,totalPrice,maNo,btraVelId){
	var url = readAppUrl+"/orderTickets/updateHotelManoAndPrice.do?maNo="+maNo+"&keyID="+keyID+"&totalPrice="+totalPrice+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
    var option={title:"酒店信息修改",width:640,height:190};
	winOpen(url,option);
}

//电话可以移除的信息移除方法
function deletePhoneHotelNotNo(btraVelId,id){
	art.dialog.confirm("确定要执行移除操作吗？",function() {
		var url = writeAppUrl+"/orderTickets/deletePhoneHotelNotNo.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
		$.getJSON(url,function(data){
			if(data.result=="success"){
				queryOrderHotelList(btraVelId,1);
			}else{
				artDialogAlert(data.resultMessage);
			}
		});
	})
}
//在线预订酒店取消
function cancelHotelOnline(btraVelId,keyID){
	art.dialog.confirm("确定要执行取消操作吗？",function() {
		var url = writeAppUrl+"/btravelInterface/cancelHotel.do?btraVelId="+btraVelId+"&keyID="+keyID+"&r="+Math.random()+"&"+commonParams+"&jsonpcallback=?";
		$.getJSON(url,function(data){
			if(data.result){
				artDialogAlert(data.resultMessage);
				queryOrderHotelList(btraVelId,1);
				queryOrderHotelList(btraVelId,2);
			}else{
				artDialogAlert(data.resultMessage);
			}
		});
	});
}
//弹出增加人员信息窗口,type=2 只修改成本中心
function addUserInfo(btraVelId,userId){
	var str = "修改人员信息";
	if(userId==null || userId=="") str = "人员信息";
	var option = {title:str,width:500,height:260};
	var url = readAppUrl+"/businessTravel/userIndex.do?operateType=allModify&id="+btraVelId+"&userId="+userId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	winOpen(url,option);
	
}
//查询用户信息
function queryUserInfo(btraVelId,pendingStatus,startAndSubmitCheckStatus){
	var url = readAppUrl+"/businessTravel/selectUsers.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		var tableHtml="<tr><th>序号</th><th>员工姓名</th><th>员工编号</th><th>成本中心名称</th><th>成本中心编号</th><th>操作</th></tr>";
		for(var i=0;i<data.length;i++){
			var str="<a class=\"noprint\" href=\"javascript:addUserInfo('"+data[i].btraVelId+"','"+data[i].id+"')\">修改</a>&nbsp;&nbsp;&nbsp;<a class=\"noprint\" href=\"javascript:deleteUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','"+pendingStatus+"','"+startAndSubmitCheckStatus+"')\">删除</a>";
			
			var empNp = data[i].empNo==null? "":data[i].empNo;
			tableHtml+="<tr>"
					  +"<td>"+(i+1)+"</td>"
					  +"<td>"+data[i].empName+"</td>"
					  +"<td>"+empNp+"</td>"
					  +"<td style='color:#dd0303'>"+data[i].costunitName+"</td>"
					  +"<td>"+data[i].costunitNo+"</td>"
					  +"<td>"+str+"</td></tr>";
			
		}
		tableHtml+="<tr style='line-height:2em;height:25px'><td colspan='6'><div title='若需要享受《<差旅费管理办法>实施说明》第十五条所列城市住宿费上浮100元的待遇，暂时需要求差旅单上仅有1人。' style='font-size:12px;margin-left:15px;height:25px'>对于《<差旅费管理办法>实施说明》第十五条的解释</div></td></tr>"
		$("#userInfo_table").html(tableHtml);
			
	});
}
//删除用户信息
function deleteUserInfo(btraVelId,userId,pendingStatus,startAndSubmitCheckStatus){
	 art.dialog.confirm("您确定要删除用户信息吗?",function(){
		var url = writeAppUrl+"/businessTravel/deleteModifyUser.do?btraVelId="+btraVelId+"&userId="+userId+"&pendingStatus="+pendingStatus+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
		$.getJSON(url,null,function(data){
			if(data.result){
				queryUserInfo(btraVelId,pendingStatus,startAndSubmitCheckStatus);
				getOrderLog(btraVelId);
			}else{
				artDialogAlert(data.resultMessage);
			}
		});
	})
}	

//附件弹出窗口
function addAttachment(btraVelId){
	var option={title:"上传附件",width:500,height:300};
	winOpen(readAppUrl+"/btravelAttach/attachmentPage.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?",option);
}
//得到所有附件
function getAttachments(btraVelId){
	var url = readAppUrl+"/btravelAttach/attachListSet.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		var str="<tr><th>序号</th><th>文件名</th><th>操作</th></tr>";
		$.each(data.attachList,function(index,value){
			var id=value.id;
			str+="<tr><td>"+(index+1)+"</td><td>"+value.attachmentName+"</td>" +
					"<td class=\"noprint\">";
			if(data.isDisable=='0' || startAndSubmitCheckStatus=='0'){
				str+="<a href=\"javascript:deleteAttachment('"+id+"','"+value.attachmentPath+"','"+btraVelId+"')\">删除<a>&nbsp;&nbsp;";
			}
			str+="<a href=\"javascript:downloadAttachment('"+value.attachmentPath+"','"+value.attachmentName+"')\">下载</a></td></tr>";

		})
		$('#attachment_content').html(str);
	});
}
// 删除附件
function deleteAttachment(id,attachmentPath,btraVelId) {
	var url = writeAppUrl+"/btravelAttach/delete.do?id=" + id+"&btraVelId="+btraVelId+"&attachmentPath="+attachmentPath+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	art.dialog.confirm("您确定要删除附件信息吗？",function() {
		$.getJSON(url,function(data){
					if(data.result=="success"){
						artDialogAlert("删除成功!");
						getAttachments(btraVelId);
					}if(data.result=="isDisable"){
						artDialogAlert("商旅单已锁定禁止该操作!");
					}else{
						artDialogAlert("删除失败!");
					}
				});
			}
		);
}

//附件下载
function downloadAttachment(path, name) {
	var url = readAppUrl+"/btravelAttach/download.do?path=" + path + "&name=" + encodeURI(encodeURI(name))+"&"+commonParams+"&jsonpcallback=?";
	window.open(url);
}
//获取在线订购机票信息
function getOrderTickets(btraVelId){
	var url = readAppUrl+"/orderTickets/getOrderTickets.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		//alert(JSON.stringify(data));
		var str="";
		$.each(data,function(index,value){
			str+="<div class=\"gr_jpinfo\">"+
			"<div class=\"gr_jpinfo_title\">"+
			  "<span class=\"gr_jpinfo_NO\">"+(index+1)+"</span>"+
			  "<p class=\"gr_jpinfo_p\">  "+
					"票号："+value.ticketNumber+"&nbsp;&nbsp;";
			if(value.ifChange=='1'){
				str+= "<span class=\"gr_jpinfo_p_span\">(原票号："+value.oldTicketNo+")</span>&nbsp;&nbsp;";
			}
			str+="|&nbsp;&nbsp;状态：<span style=\"font:15px '微软雅黑';color:#00a60e;\">";
			str+=OrderTicketsStatus(value.flyStatus,value.ifChange,value.returnAndChangeStatus,value.operType,value.settlementStatus);
			if(null != value.oldPrice && value.oldPrice!=""){
				str+="</span><span title='原票价格 RMB:"+value.totalPrice+"'>&nbsp;&nbsp;|&nbsp;&nbsp;退票费：<span style=\"font:15px '微软雅黑';color:#f09745;\">RMB:"+value.totalPrice+"</span></span>";
			}else{
				str+="</span>&nbsp;&nbsp;|&nbsp;&nbsp;价格：<span style=\"font:15px '微软雅黑';color:#f09745;\">RMB:"+value.totalPrice+"</span>";
			}
			if(value.settlementStatus=='1') str+="<span style='color:red'>（费用不计）</span>";
			if(value.checkInStatus!=0){
				str+="&nbsp;&nbsp;|&nbsp;&nbsp;<span>值机状态："+checkInStatus[value.checkInStatus];
				if(value.checkInStatus==1)
					str+="&nbsp;&nbsp;&nbsp;&nbsp;座位："+value.checkinInfo;
				str+="</span>";
			}
			str+="</p>"+
			"</div>"+
			"<div class=\"gr_jpinfo_cont\">"+
			 " <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+
				 " <tr>"+
					"<td width=\"11%\" height=\"65\" rowspan=\"2\" align=\"center\" valign=\"middle\" class=\"gr_name jp_border\">"+value.passengerName+"</td>"+
					"<td width=\"28%\" class=\"jp_riqi_name jp_border\">"+getDate(value.flightDate).format("M月d日  hh:mm")+" <span class=\"gr_name\">起飞</span></td>"+
					"<td width=\"16%\" align=\"right\" rowspan=\"2\" valign=\"middle\" class=\"jp_gs_name\">"+value.boardPointName+"</td>"+
					"<td width=\"17%\" rowspan=\"2\" align=\"center\"><img src=\""+jsResourceUrl+"/resource/businessTravel/images/bg_right2.gif\" /></td>"+
					"<td width=\"16%\" align=\"left\"rowspan=\"2\" valign=\"middle\" class=\"jp_gs_name jp_border\">"+value.offpointName+"</td>"+
					"<td width=\"12%\" rowspan=\"2\" align=\"center\" valign=\"middle\">";
			if(value.oldkeyID==null || value.oldkeyID=='')
				str += "<p><a href=\"javascript:void(0)\" onclick=\"updateAirTicketMano('"+btraVelId+"','"+value.id+"','"+value.maNo+"','"+value.ticketNumber+"')\" class=\"jp_gn_btn noprint\">移动机票</a></p>";
			
			str+="</td>"+
				 " </tr>"+
				  "<tr>"+
					"<td class=\"gr_name jp_border\" style=\"padding-left:10px;\">"+value.carrierName+value.flightNo+"&nbsp;&nbsp; "+value.clazz+"&nbsp;&nbsp;"+value.classLevel+"</td>"+
					"<td align=\"right\" valign=\"middle\" class=\"jp_gs_name\"></td>"+
					"<td align=\"left\" valign=\"middle\" class=\"jp_gs_name jp_border\"></td>"+
				 " </tr>"+
			  "</table>"+
			"</div>";
			if(value.flightStatus!=0){
			   str+="<div class=\"gr_jpinfo_hb\">"+
					"<span>航班状态："+flightStatus[value.flightStatus]+"&nbsp;"+value.flightInfo+"</span>"+
					"</div>";
					
			}
		str+="</div>";
		})
		$('#index_OrderTickets').empty();
		$('#index_OrderTickets').append(str);
		
	});
}
//内部商城通知机票政企业务平台进行机票的退改签请求
function changeAirTicketInfo(btraVelId,id){
	 var url = writeAppUrl+"/businessTravel/changeAirTicketInfo.do?btraVelId="+btraVelId+"&id="+id+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	 var option={title:"修改机票信息",width:550,height:285};
	 winOpen(url,option);
}
//机票修改商旅单号
function updateAirTicketMano(btraVelId,id,maNo,ticketNo){
	 var url = writeAppUrl+"/orderTickets/updateAirTicketMano.do?maNo="+maNo+"&btraVelId="+btraVelId+"&id="+id+"&ticketNo="+ticketNo+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	 var option={title:"修改机票商旅单",width:640,height:170};
	 winOpen(url,option);
}
//获取电话在线预订机票(合作单位)
function getPhoneOrderTickets(btraVelId){
	var url = readAppUrl+"/orderTickets/getPhoneOrderTickets.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		var str="";
		$.each(data,function(index,value){
			str+="<div class=\"gr_jpinfo\">"+
			"<div class=\"gr_jpinfo_title\">"+
			  "<span class=\"gr_jpinfo_NO\">"+(index+1)+"</span>"+
			  "<p class=\"gr_jpinfo_p\">  "+
					"票号："+value.ticketNumber+"&nbsp;&nbsp;";
			if(value.ifChange=='1'){
				str+= "<span class=\"gr_jpinfo_p_span\">(原票号："+value.oldTicketNo+")</span>&nbsp;&nbsp;";
			}
			str+="|&nbsp;&nbsp;状态：<span style=\"font:15px '微软雅黑';color:#00a60e;\">";
			str+=OrderTicketsStatus(value.flyStatus,value.ifChange,value.returnAndChangeStatus,value.operType,value.settlementStatus);
			if(null != value.oldPrice && value.oldPrice!=""){
				str+="</span><span title='RMB:"+value.totalPrice+"'>&nbsp;&nbsp;|&nbsp;&nbsp;退票费：<span style=\"font:15px '微软雅黑';color:#f09745;\">RMB:"+value.totalPrice+"</span></span>";
			}else{
				str+="</span>&nbsp;&nbsp;|&nbsp;&nbsp;价格：<span style=\"font:15px '微软雅黑';color:#f09745;\">RMB:"+value.totalPrice+"</span>";
			}
			if(value.settlementStatus=='1') str+="<span style='color:red'>（费用不计）</span>";
			else str+="<span style='color:red'>（"+airticketPayType[value.payKind]+"）</span>";
			if(value.checkInStatus!=0){
				str+="&nbsp;&nbsp;|&nbsp;&nbsp;<span>值机状态："+checkInStatus[value.checkInStatus];
				if(value.checkInStatus==1)
					str+="&nbsp;&nbsp;&nbsp;&nbsp;座位："+value.checkinInfo;
				str+="</span>";
			}
			str+="</p>"+
			"</div>"+
			"<div class=\"gr_jpinfo_cont\">"+
			 " <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+
				 " <tr>"+
					"<td width=\"11%\" height=\"65\" rowspan=\"2\" align=\"center\" valign=\"middle\" class=\"gr_name jp_border\">"+value.passengerName+"</td>"+
					"<td width=\"28%\" class=\"jp_riqi_name jp_border\">"+getDate(value.flightDate).format("M月d日  hh:mm")+" <span class=\"gr_name\">起飞</span></td>"+
					"<td width=\"16%\" align=\"right\" rowspan=\"2\" valign=\"middle\" class=\"jp_gs_name\">"+value.boardPointName+"</td>"+
					"<td width=\"17%\" rowspan=\"2\" align=\"center\"><img src=\""+jsResourceUrl+"/resource/businessTravel/images/bg_right2.gif\" /></td>"+
					"<td width=\"16%\" align=\"left\"rowspan=\"2\" valign=\"middle\" class=\"jp_gs_name jp_border\">"+value.offpointName+"</td>"+
					"<td width=\"12%\" rowspan=\"2\" align=\"center\" valign=\"middle\">";
			 if(value.oldkeyID==null || value.oldkeyID=='')
					str += "<p><a href=\"javascript:void(0)\" onclick=\"updateAirTicketMano('"+btraVelId+"','"+value.id+"','"+value.maNo+"','"+value.ticketNumber+"')\" class=\"jp_gn_btn noprint\">移动机票</a></p>";
			 
			str+="</td>"+
				 " </tr>"+
				  "<tr>"+
					"<td class=\"gr_name jp_border\" style=\"padding-left:10px;\">"+value.carrierName+value.flightNo+"&nbsp;&nbsp; "+value.clazz+"&nbsp;&nbsp;"+value.classLevel+"</td>"+
					"<td align=\"right\" valign=\"middle\" class=\"jp_gs_name\"></td>"+
					"<td align=\"left\" valign=\"middle\" class=\"jp_gs_name jp_border\"></td>"+
				 " </tr>"+
			  "</table>"+
			"</div>";
			if(value.flightStatus!=0){
				   str+="<div class=\"gr_jpinfo_hb\">"+
						"<span>航班状态："+flightStatus[value.flightStatus]+"&nbsp;"+value.flightInfo+"</span>"+
						"</div>";
						
				}
			str+="</div>";
		"</div>";
		})
		$('#index_phoneOrderTickets').empty();
		$('#index_phoneOrderTickets').append(str);
		
	});
}
//校验机票状态
function OrderTicketsStatus(flyStatus,ifChange,returnAndChangeStatus,operType,settlementStatus){
	var str="";
	var currentOperType = airticketOperType[operType];
	if(operType==50 || operType==60) str="出票  ";
	if(flyStatus=='1' && returnAndChangeStatus=="11"){//起飞状态和未改签退票取消
		str="已起飞   ";
	}else{
		str+=currentOperType+" ";
	}
	 if(returnAndChangeStatus=="12"){//如果是退票中
		str+="退票中";
	}else if(returnAndChangeStatus=="22"){//如果是改签中
		str+="改签中";
	}else if(returnAndChangeStatus=="32"){//如果是取消中
		str+="取消中";
	}else if(returnAndChangeStatus=="13"){//如果是退票成功
		str+="已退票";
	}else if(returnAndChangeStatus=="23"){//如果是改签成功
		str+="已改签";
	}else if(returnAndChangeStatus=="33"){//如果是取消成功
		str+="已取消";
	}
	if(ifChange=="1" && returnAndChangeStatus=="13"){//如果是改签的票
		str=" 已改签  已退票";
	}
	return str;
}
//电话可以移除的信息移除方法
function phone_deleteTickets(btraVelId,id){
	art.dialog.confirm("确定要执行移除操作吗？",function() {
		var url = writeAppUrl+"/orderTickets/deletePhoneOrderTicketsNotNo.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
		$.getJSON(url,function(data){
			if(data.result=="success"){
				getPhoneOrderTickets(btraVelId);
			}else{
				artDialogAlert(data.resultMessage);
			}
		});
	})
}
//商旅单日志
function getOrderLog(btraVelId){
	var url = readAppUrl+"/businessTravel/getOrderLog.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	$.getJSON(url,function(data){
		//alert(JSON.stringify(data));
		var str="<tr>" +
		"<th>操作时间</th>" +
		"<th>操作人姓名</th>" +
		"<th>操作内容</th>" +
		"</tr>";
		$.each(data,function(index,value){
	    var contentStr = value.content;
	    if(contentStr.indexOf("业务主键keyID：")>-1)
	    	contentStr = contentStr.substr(0,contentStr.indexOf("业务主键keyID："));
			
	    	str+="<tr>" +
					"<td>"+value.inTime+"</td>";
		if(value.uid=="huangqi")
			str+="<td>系统管理员</td>";
		else
			str+="<td>"+value.name+"</td>";
			str+="<td align='left'>"+value.matter+contentStr+"</td>" +
					"</tr>";
		})
		$('#index_orderLog').html(str);
	});
}
//日志展开收缩功能
function isDisplay(){
		$('#index_orderLog_div').animate({height:'toggle'},"slow");
}
//退出
function exit() {
	art.dialog.confirm("您确定要关闭该页面吗? 关闭前请确保数据已提交以免造成数据丢失!",function() {
		try {
			window.opener= null;
			window.open("","_self");
			window.close();
		}
		catch(E){}
	})
}
//退出
function exit_notAlert() {
	try {
		window.opener= null;
		window.open("","_self");
		window.close();
	}
	catch(E){}
}
//验证加光标锁定位置
function artDialogAlertFocus(content,id){
	var options ={
	        id: 'Alert',
	        icon: 'warning',
	        fixed: true,
	        lock: true,
	        content: content,
	        ok: true,
	        opacity:0
	    };
 return artDialog(options,function(){$('#'+id).focus();});
}
//提交商旅单
function saveBTravel(){
	var message="确定要修改吗？";
	art.dialog.confirm(message,function() {
				var url = writeAppUrl+"/businessTravel/allModifyTravel.do?r="+Math.random()+"&jsonpcallback=?"+"&"+commonParams;
				$.post(url,$('#index_form').serialize(),function(data){
					if(data.result=="success"){
						reloadOpener();
						history.go(0);
					}else{
						realAlert(data.resultMessage);
					}
				},'json');
	});
}

//商旅单作废
function deleteBTravel(btraVelId){
	var url = writeAppUrl+"/businessTravel/deleteBTravel.do?btraVelId="+btraVelId+"&r="+Math.random()+"&jsonpcallback=?"+"&"+commonParams;
	art.dialog.confirm("确定要作废该商旅单吗？",function() {
		$.getJSON(url,function(data){
			if(data.result=="success"){
				reloadOpener();;
				artDialogAlert(data.resultMessage);
				exit_notAlert();
			}else{
				artDialogAlert(data.resultMessage);
			}
		});
	})
}
//打印处理
function indexPrint() {
//    try { PageSetup_Null();}
//    catch(e) {}
	$('.noprint').css('display','none');
	window.print();
	//$('.shenp_right').css('width',"440px");
	//$("#clv_center").jqprint();
	$('.noprint').css('display','block');
	//$('.shenp_right').css('width',"480px");	
}
function PageSetup_Null(){
	HKEY_Root="HKEY_CURRENT_USER";
	HKEY_Path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
	var head,foot,top,bottom,left,right;
	  var Wsh=new ActiveXObject("WScript.Shell");
	 HKEY_Key="header";
	//设置页眉（为空） 根据你自己要设置的填入
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
	 HKEY_Key="footer";
	//设置页脚（为空） 根据你自己要设置的填入
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
	 HKEY_Key="margin_bottom";
	//设置下页边距（0） 根据你自己要设置的填入
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0");
	 HKEY_Key="margin_left";
	//设置左页边距（0） 根据你自己要设置的填入
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"1");
	 HKEY_Key="margin_right";
	//设置右页边距（0）
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0");
	 HKEY_Key="margin_top";
	//设置上页边距（8）
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"1");
	
}
//滚动条事件
function scrollEven(){
	var xy =-122;
	if(isChrome()){
		var temp = $('body').scrollTop();
		if(temp>=159)	$('.right_menus').css("top",(xy+temp)+"px");
	}
	$(window).scroll(function(){
		var top = $(this).scrollTop();
		if(top>=159){
			$('.right_menus').css("top",(xy+top)+"px");
		}else{
			$('.right_menus').css("top","36px");
		}
	});
}
//判断屏幕分辨率
function screenWidth(){
	var index_css=document.getElementById("index_css");
	if (screen.width == 1024){
		index_css.setAttribute("href",jsResourceUrl+"/resource/businessTravel/css/style_1024_768.css");   //设置css引入样式表的路径
		$('#content').attr('cols','104');
		$('#busReason').attr('cols','104');
	}
	
}
//初始化页面隐藏与显示的信息
function initIsAfterwards(pendingStatus,isAfterwards){
	if(pendingStatus=='3'){
		isAfterwards_click('3',isAfterwards);
	}else{
		isAfterwards_click(pendingStatus,isAfterwards);
	}
}
//是否审批后补单 点击事件
function isAfterwards_click(pendingStatus,isAfterwards){
	if(isAfterwards=='0'){
		if(pendingStatus!="3"){
			$('#jp_info').hide();
			$('#jd_info').hide();
			$('#qt_info').hide();
			$('#grbzxx_infobox').hide();
			$('#fyqk').hide();
		}
		$('#isAfterwards_0').removeClass("isSpecial_NO");
		$('#isAfterwards_0').removeClass("noprint");
		$('#isAfterwards_0').addClass("isSpecial_OK");
		$('#isAfterwards_0 input').attr("name","isAfterwards");
		$('#isAfterwards_0 input').attr("id","isAfterwards");
		$('#isAfterwards_1').removeClass("isSpecial_OK");
		$('#isAfterwards_1').addClass("isSpecial_NO");
		$('#isAfterwards_1').addClass("noprint");
		$('#isAfterwards_1 input').attr("name","");
		$('#isAfterwards_1 input').attr("id","");
		$('#isAfterwardsCause_title').hide();
		$('#isAfterwardsCause').hide();
		$('#isAfterwardsCause').val("");
		if($('input:hidden[name=\'isSpecial\']').val()=='0' || $('input:hidden[name=\'isSpecial\']').val()==null)$('#hidden_cause_tr').hide();
	}else if(isAfterwards=='1'){
		if(pendingStatus!="3"){
			$('#jp_info').show();
			$('#jp_info_zx').hide();
			$('#jd_info').show();
			$('#jd_info_zx').hide();
			$('#qt_info').show();
			$('#grbzxx_infobox').show();
			$('#fyqk').show();
		}
		$('#hidden_cause_tr').show();
		$('#isAfterwards_1').removeClass("isSpecial_NO");
		$('#isAfterwards_1').removeClass("noprint");
		$('#isAfterwards_1').addClass("isSpecial_OK");
		$('#isAfterwards_1 input').attr("name","isAfterwards");
		$('#isAfterwards_1 input').attr("id","isAfterwards");
		$('#isAfterwards_0').removeClass("isSpecial_OK");
		$('#isAfterwards_0').addClass("isSpecial_NO");
		$('#isAfterwards_0').addClass("noprint");
		$('#isAfterwards_0 input').attr("name","");
		$('#isAfterwards_0 input').attr("id","");
		$('#isAfterwardsCause_title').show();
		$('#isAfterwardsCause').show();
	}
	
}
//在线订票或酒店参数提交方法
function orderTickets(btraVelId,type){
	if(pStatus !=3){
		artDialogAlert("只有审批通过的商旅单才可以使用该功能!");
		return;
	}
	var url = writeAppUrl+"/orderTickets/postRequestUrl.do?type="+type+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	var callBackUrl = "";
	if(type==1)
		callBackUrl = writeAppUrl+"/btravelInterface/anonymous/mgMallOrder.do";
	else if(type==2)
		callBackUrl = writeAppUrl+"/btravelInterface/anonymous/getHotelOrder.do";
	$.getJSON(url,function(data){
		if(data.result=="success"){
			$("#ClaimNo").val(data.content.ClaimNo);
			$("#Compid").val(data.content.Compid);
			$("#Deptname").val(data.content.Deptname);
			$("#Deptid").val(data.content.Deptid);
//			$("#ProjectNo").val(data.content.ProjectNo);
//			$("#ProjectName").val(data.content.ProjectName);
			$("#ApplyUserID").val(data.content.ApplyUserID);
			$("#ApplyDate").val(data.content.ApplyDate);
			$("#IfSpecial").val(data.content.IfSpecial);
			$("#StartDate").val(data.content.StartDate);
			$("#EndDate").val(data.content.EndDate);
			$("#RouteList").val(data.content.RouteList);
			$("#MembersnameList").val(data.content.MembersnameList);
			$("#MembersNoList").val(data.content.MembersNoList);
			$("#callbackUrl").val(callBackUrl);
			$("#RESERVED_1").val(data.content.RESERVED_1);
			$("#RESERVED_2").val(data.content.RESERVED_2);
			$("#RESERVED_3").val(data.content.RESERVED_3);
			$("#RESERVED_4").val(data.content.RESERVED_4);
			$("#RESERVED_5").val(data.content.RESERVED_5);
			$("#RESERVED_6").val(data.content.RESERVED_6);
			$("#RESERVED_7").val(data.content.RESERVED_7);
			$("#RESERVED_8").val(data.content.RESERVED_8);
			var formStr = $("#ticketsAndhotel_from").serialize();
			var urlA = readAppUrl+"/orderTickets/orderTicketsOpen.do?&"+commonParams+"&orderType="+type+"&maNo="+data.content.ClaimNo+"&btraVelId="+btraVelId+"&r="+Math.random()+"&jsonpcallback=?";
		    var option={title:"",width:412,height:200};
			winOpen(urlA,option);
			
			//if(type=='1') $('#ticketsAndhotel_from').attr("action",readAppUrl+"/orderTickets/testAirticketPage.do?type=1&jsonpcallback=?"+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random());//机票单点:"http://123.127.208.183/ltms/"
			
			/*  机票内网测试地址: http://10.0.71.18/ltms/（DCN网）
			 *  机票公网测试地址: http://220.250.65.182/ltms/	
			 *  机票内网正式地址: http://10.0.71.3/ltms/（DCN网） 
			 *  机票公网正式地址: http://220.250.65.189/ltms/
			*/
			if(type=='1') $('#ticketsAndhotel_from').attr("action","http://220.250.65.182/ltms/");//机票单点公网:"http://220.250.65.189/ltms/" 机票单点内网:"http://10.0.71.18/ltms/"
			
			/*  酒店内网测试地址: http://10.0.71.16/LoginUnicomHandler.ashx （DCN网）
			 *  酒店公网测试地址: http://220.250.65.162/LoginUnicomHandler.ashx
			 *  酒店内网正式地址: http://10.0.71.1/LoginUnicomHandler.ashx  （DCN网）
			 *  酒店公网正式地址: http://220.250.65.173/LoginUnicomHandler.ashx
			*/
			if(type=='2') $('#ticketsAndhotel_from').attr("action","http://220.250.65.162/LoginUnicomHandler.ashx");//酒店单点公网:"http://220.250.65.173/LoginUnicomHandler.ashx " 酒店单点内网:"http://10.0.71.16/LoginUnicomHandler.ashx"
			$('#ticketsAndhotel_from').submit();
			
		}else{
			artDialogAlert(data.resultMessage);
		}
	});
}
//是否特殊审批事件
function isSpecial_selected(type){
	if(type=='0'){
		$('#isSpecial_0').removeClass("isSpecial_NO");
		$('#isSpecial_0').removeClass("noprint");
		$('#isSpecial_0').addClass("isSpecial_OK");
		$('#isSpecial_0 input').attr("name","isSpecial");
		$('#isSpecial_0 input').attr("id","isSpecial");
		$('#isSpecial_1').removeClass("isSpecial_OK");
		$('#isSpecial_1').addClass("isSpecial_NO");
		$('#isSpecial_1').addClass("noprint");
		$('#isSpecial_1 input').attr("name","");
		$('#isSpecial_1 input').attr("id","");
		$('#isSpecialCause').hide();
		$('#isSpecialCause option[value=\'\']').attr("selected","selected");
		$('#isSpecialCause_title').hide();
		if($('input:hidden[name=\'isAfterwards\']').val()=='0')$('#hidden_cause_tr').hide();
		$('#isPlane_selected_0').attr('disabled',false);
		$('#isPlane_selected_1').attr('disabled',false);
		isPlane_selected('2');
	}else if(type=='1'){
		$('#isSpecial_1').removeClass("isSpecial_NO");
		$('#isSpecial_1').removeClass("noprint");
		$('#isSpecial_1').addClass("isSpecial_OK");
		$('#isSpecial_1 input').attr("name","isSpecial");
		$('#isSpecial_1 input').attr("id","isSpecial");
		$('#isSpecial_0').removeClass("isSpecial_OK");
		$('#isSpecial_0').addClass("isSpecial_NO");
		$('#isSpecial_0').addClass("noprint");
		$('#isSpecial_0 input').attr("name","");
		$('#isSpecial_0 input').attr("id","");
		$('#isSpecialCause').show();
		$('#isSpecialCause_title').show();
		$('#hidden_cause_tr').show();
	}else {
		$('#isSpecial_1').addClass("isSpecial_NO");
		$('#isSpecial_0').addClass("isSpecial_NO");
		$('#hidden_cause_tr').hide();
		$('#isSpecialCause_title').hide();
		$('#isSpecialCause').hide();
	}
}
//是否市内出差 市内出差
function isInsideCity_selected(type){
	if(type=='0'){
		$('#isInsideCity_0').removeClass("isSpecial_NO");
		$('#isInsideCity_0').removeClass("noprint");
		$('#isInsideCity_0').addClass("isSpecial_OK");
		$('#isInsideCity_0 input').attr("name","isInsideCity");
		$('#isInsideCity_0 input').attr("id","isInsideCity");
		$('#isInsideCity_1').removeClass("isSpecial_OK");
		$('#isInsideCity_1').addClass("isSpecial_NO");
		$('#isInsideCity_1').addClass("noprint");
		$('#isInsideCity_1 input').attr("name","");
		$('#isInsideCity_1 input').attr("id","");
	}else if(type=='1'){
		$('#isInsideCity_1').removeClass("isSpecial_NO");
		$('#isInsideCity_1').removeClass("noprint");
		$('#isInsideCity_1').addClass("isSpecial_OK");
		$('#isInsideCity_1 input').attr("name","isInsideCity");
		$('#isInsideCity_1 input').attr("id","isInsideCity");
		$('#isInsideCity_0').removeClass("isSpecial_OK");
		$('#isInsideCity_0').addClass("isSpecial_NO");
		$('#isInsideCity_0').addClass("noprint");
		$('#isInsideCity_0 input').attr("name","");
		$('#isInsideCity_0 input').attr("id","");
	}else{
		$('#isInsideCity_0').addClass("isSpecial_NO");
		$('#isInsideCity_1').addClass("isSpecial_NO");
	}
}
//是否乘坐飞机
function isPlane_selected(type){
	if(type=='0'){
		$('#isPlane_selected_0').removeClass("isSpecial_NO");
		$('#isPlane_selected_0').removeClass("noprint");
		$('#isPlane_selected_0').addClass("isSpecial_OK");
		$('#isPlane_selected_0 input').attr("name","isPlane");
		$('#isPlane_selected_0 input').attr("id","isPlane");
		$('#isPlane_selected_1').removeClass("isSpecial_OK");
		$('#isPlane_selected_1').addClass("isSpecial_NO");
		$('#isPlane_selected_1').addClass("noprint");
		$('#isPlane_selected_1 input').attr("name","");
		$('#isPlane_selected_1 input').attr("id","");
		$('#isPlane_selected_2 input').attr("name","");
		$('#isPlane_selected_2 input').attr("id","");
		$('#jp_info a').css({"display":"none"});
	}else if(type=='1'){
		$('#isPlane_selected_1').removeClass("isSpecial_NO");
		$('#isPlane_selected_1').addClass("isSpecial_OK");
		$('#isPlane_selected_1').removeClass("noprint");
		$('#isPlane_selected_1 input').attr("name","isPlane");
		$('#isPlane_selected_1 input').attr("id","isPlane");
		$('#isPlane_selected_0').removeClass("isSpecial_OK");
		$('#isPlane_selected_0').addClass("noprint");
		$('#isPlane_selected_0').addClass("isSpecial_NO");
		$('#isPlane_selected_0 input').attr("name","");
		$('#isPlane_selected_0 input').attr("id","");
		$('#isPlane_selected_2 input').attr("name","");
		$('#isPlane_selected_2 input').attr("id","");
		$('#jp_info a').css({"display":"block"});
	}else{
		$('#isPlane_selected_0').removeClass("isSpecial_OK");
		$('#isPlane_selected_1').removeClass("isSpecial_OK");
		$('#isPlane_selected_1').addClass("isSpecial_NO");
		$('#isPlane_selected_0').addClass("isSpecial_NO");
		$('#isPlane_selected_0 input').attr("name","");
		$('#isPlane_selected_0 input').attr("id","");
		$('#isPlane_selected_1 input').attr("name","");
		$('#isPlane_selected_1 input').attr("id","");
		$('#isPlane_selected_2 input').attr("name","isPlane");
		$('#isPlane_selected_2 input').attr("id","isPlane");
		$('#jp_info a').css({"display":"block"});
	}
}
//是否系统内出差
function isSystem_selected(type){
	if(type=='0'){
		$('#isSystem_selected_0').removeClass("isSpecial_NO");
		$('#isSystem_selected_0').removeClass("noprint");
		$('#isSystem_selected_0').addClass("isSpecial_OK");
		$('#isSystem_selected_0 input').attr("name","isSystem");
		$('#isSystem_selected_0 input').attr("id","isSystem");
		$('#isSystem_selected_1').removeClass("isSpecial_OK");
		$('#isSystem_selected_1').addClass("noprint");
		$('#isSystem_selected_1').addClass("isSpecial_NO");
		$('#isSystem_selected_1 input').attr("name","");
		$('#isSystem_selected_1 input').attr("id","");
	}else if(type=='1'){
		$('#isSystem_selected_1').removeClass("isSpecial_NO");
		$('#isSystem_selected_1').removeClass("noprint");
		$('#isSystem_selected_1').addClass("isSpecial_OK");
		$('#isSystem_selected_1 input').attr("name","isSystem");
		$('#isSystem_selected_1 input').attr("id","isSystem");
		$('#isSystem_selected_0').removeClass("isSpecial_OK");
		$('#isSystem_selected_0').addClass("noprint");
		$('#isSystem_selected_0').addClass("isSpecial_NO");
		$('#isSystem_selected_0 input').attr("name","");
		$('#isSystem_selected_0 input').attr("id","");
	}else{
		$('#isSystem_selected_1').addClass("isSpecial_NO");
		$('#isSystem_selected_0').addClass("isSpecial_NO");
	}
}

//是否特殊审批,特殊审批是否乘坐飞机
function isSpecialCause_selected(type,isspecialValue){
	if(type == '4' && isspecialValue == '1'){
		isPlane_selected('1');
		$('#isPlane_selected_0').attr('disabled',true);
		$('#isPlane_selected_1').attr('disabled',true);
	}
}

//报账
function btbz(btraVelId,busiType,orderNo,userUid,mallbillAddress,shopCode,docId,status,ou){
	//校验是否有未挂靠的信息
	$.getJSON(writeAppUrl+"/businessTravel/btbzCheck.do?r="+Math.random()+"&btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?", function(data1){
		if(data1.result){
			var msg;
			if(data1.msg==0) msg="事项1：当前商旅单的行程人有电话预订且未关联的机票或酒店订单，请确认是否需要关联，如需关联，请点击”取消”操作。"+
			                     "<br>事项2：当前商旅单上还没有个人补助信息，请确认是否需要补充，如需补充，请点击”取消”操作。"+
			                     "<br>是否继续提交报账？如确认提交报账，请点击”确定”操作；如需进一步修改，请点击”取消”操作。"+
					             "<br><font color='red'>（重要提醒：商旅单提交报账后将不允许撤销，请务必完整、正确填写酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况信息！！）</font>";
			else if(data1.msg==1) msg="当前商旅单的行程人有电话预订且未关联的机票或酒店订单，请确认是否需要关联。如需关联，请点击”取消”操作后再将商旅单关联上电话预订订单；如无需关联，请点击”确定”操作进行后续处理。"+
			                          "<br><font color='red'>（重要提醒：商旅单提交报账后将不允许撤销，请务必完整、正确填写酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况信息！！）</font>";
			else if(data1.msg==2) msg="当前商旅单上还没有个人补助信息，请确认是否需要补充，如需补充，请点击”取消”操作。"+
			                          "<br>是否继续提交报账？如确认提交报账，请点击”确定”操作；如需进一步修改，请点击”取消”操作。"+
			                          "<br><font color='red'>（重要提醒：商旅单提交报账后将不允许撤销，请务必完整、正确填写酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况信息！！）</font>";
			else msg="是否继续发起报账？如确认提交报账，请点击”确定”操作；如需进一步修改，请点击”取消”操作。"+
			         "<br><font color='red'>（重要提醒：商旅单提交报账后将不允许撤销，请务必完整、正确填写酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况信息！！）</font>";
			//art.dialog.confirm(data1.msg?"有未关联的电话预订的机票或酒店信息。提交后不能撤销，请确认酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况等信息是否正确!":"提交后不能撤销，请确认酒店、机票、员工垫付部分交通或住宿、个人补助、费用情况等信息是否正确!",function() {
			art.dialog.confirm("<span style='line-height:1.5em'>"+msg+"</span>",function() {
				//报账
				$.getJSON(writeAppUrl+"/businessTravel/btbz.do?r="+Math.random()+"&btraVelId="+btraVelId+"&orderNo="+orderNo+"&"+commonParams+"&status="+status+"&jsonpcallback=?", function(data){
					if(data.result){
						reloadOpener();;
						history.go(0);
						var bzurl = mallbillAddress+"requestId=T007New&disabled=1&shopCode="+shopCode+"&uid="+userUid+"&id="+btraVelId+"&docId="+docId+"&uuid=1&itemId=T007&wfActDefId=newState&item2Id="+busiType+"&storeOrderNum="+orderNo+"&uname="+userUid+"&portalgroupid="+ou;
						window.open(bzurl);
					}else{
						artDialogAlert(data.msg);
					}
				});
			});
		}else{
			artDialogAlert(data1.msg);
		}
	});
}
//办结
function btbj(btraVelId){
	var msg = pStatus=='3'?"办结后，申请人的门户待办将会清除，<br>请确认是否办结？":"办结后，审批流程将无法继续处理，当前处理人的门户待办也会清除，<br>请确认是否办结？";
	art.dialog.confirm("<span style='line-height:1.5em'>"+msg+"</span>",function() {
		$.getJSON(writeAppUrl+"/businessTravel/btbj.do?r="+Math.random()+"&btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?", function(data){
			if(data.result){
				history.go(0);
			}else{
				artDialogAlert(data.msg);
			}
			
		});
	});
}
//电话预定机票弹出窗口
function orderTicketsPhone(btraVelId){
	var url = readAppUrl+"/orderTickets/selectPhoneOrderTicketsPage.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	var option={title:"电话订票",width:750,height:450};
	winOpen(url,option);
}
//电话预定酒店弹出窗口
function hotelPhone(btraVelId){
	var url = readAppUrl+"/orderTickets/selectHotelPage.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
	var option={title:"电话预订酒店",width:780,height:410};
	winOpen(url,option);
}
//获取商旅单ID,审批状态,报账状态,启动提交审批状态 参数
function getImportantOption(){
	return ImportantOption={ btraVelId:btraVelId, pStatus:pStatus, bStatus:bStatus, startAndSubmitCheckStatus:startAndSubmitCheckStatus};
}
//刷新父窗口
function reloadOpener(){
	try{
		window.opener.location.reload();
	}catch(E){}
}

//发起人修改业务类别,专业, 全成本指标
function updateCateIndic(id,value){
	var orderNo = $('#maNo').val();  
	 var option={title:"修改业务类别",width:650,height:240};
	 if(value=='1'){
	 	 option={title:"修改业务类别",width:650,height:200};
	 }
	var obj = emsBbztCheck(orderNo);
	 if(obj.res){
		 var url = readAppUrl+"/businessTravel/updateCateIndic.do?id="+id+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
		
	     winOpen(url,option);
	 }else{
		 artDialogAlert(obj.msg);
	 }
}


//项目弹出窗口
function addProjectWin(adminShopId,provinceNo){
	var width_=550;
	var height_=430;
	if(isIE_6()){
		width_=580;
		height_=460;
	}
	var option={title:"选择项目",width:width_,height:height_};
	winOpen(readAppUrl+"/businessTravel/addProjectInfo.do?adminShopId="+adminShopId+"&provinceNo="+provinceNo+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?",option);
}
//项目编号,项目名称移除
function deleteProject(){
	$('#projectName').val("");
    $('#projectValue').val("");
    $("#custom_hidden").hide(); //客户段隐藏
    $('#custom').hide();//客户段input隐藏
	$('#custom').val("00");
	$('#custom_desc').val("缺省");
}

//选择项目列表回调方法
function projectCallback(name,value){
    $('#projectName').val(name);
    $('#projectValue').val(value);
    if(value!='0' && value!=null && value!=''){
    	$("#custom_hidden").show(); //客户段显示
		$("#custom").show(); //客户段input显示
    }
    else{
    	$("#custom_hidden").hide(); //客户段隐藏
        $('#custom').hide();//客户段input隐藏
    	$('#custom').val("00");
    	$('#custom_desc').val("缺省");
    }
}

//发起人修改项目信息,客户段信息
function updateXmxx(id,adminShopId,provinceNo){
	var orderNo = $('#maNo').val();  
	var obj = emsBbztCheck(orderNo);
	if(obj.res){
		var url = readAppUrl+"/businessTravel/updateXmxx.do?id="+id+"&adminShopId="+adminShopId+"&provinceNo="+provinceNo+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?";
		var option={title:"修改项目信息",width:760,height:232};
	    winOpen(url,option);
	}else{
		 artDialogAlert(obj.msg);
	}
	
}

//调用报账接口查询相应报账单是否删除
function emsBbztCheck(orderNo){
	var obj = new Object();
	var url = readAppUrl+"/businessTravel/emsBbztCheck.do?orderNo="+orderNo+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	$.ajax({
		type : "POST",
		url: url,
		async: false,
		dataType : "json",
		success: function (data) {
			obj.res = data.result;
			obj.msg = data.msg;
		}
	});
	return obj;
}

//科目交叉验证--商旅单提交审批,修改业务类别,项目,成本中心时先验证
function subjectToVerify(id){
	var obj = new Object();
	var url = readAppUrl+"/businessTravel/subjectToVerify.do?id="+id+"&"+commonParams+"&jsonpcallback=?&r="+Math.random();
	$.ajax({
		type : "POST",
		url: url,
		async: false,
		dataType : "json",
		success: function (data) {
			obj.res = data.result;
			obj.msg = data.msg;
		}
	});
	return obj;
}

