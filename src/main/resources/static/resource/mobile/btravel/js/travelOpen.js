//填写天数校验
function checkDateDiffEach(id){
	var dValue = jQuery("#"+id).val();
	if(dValue!=''&&dValue!=null){
		if(dValue>dateDiff()+1){
			artDialogAlert("填写天数大于出差日期时间间隔,请重新填写出差天数！");
			return true;
		}
	}
	return false;
}


//根据字符串 转换时间类型,部分浏览器不兼容new date(str)
function getDate(strDate) {  
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,  
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');  
    return date;  
} 
//计算天数差的函数
function  dateDiff(){
	var sDate1 = getDate(jQuery("#dateFrom").val());
	var sDate2 = getDate(jQuery("#dateArive").val());
    var iDays  =  parseInt(Math.abs((sDate1.getTime()-sDate2.getTime())/(1000*3600*24))); //把相差的毫秒数转换为天数  
    return iDays;
}    
//将计算天数时间差放入文本框
function jqSetDays(){
	var iDays = dateDiff();
	var foodPrice = jQuery("#foodPrice").val();
	var trafficPrice = jQuery("#trafficPrice").val();
	jQuery("#days").val(iDays+1);
	jQuery("#foodPriceTotal").val(foodPrice*(iDays+1));
	jQuery("#trafficPriceTotal").val(trafficPrice*(iDays+1));
}
//获取人员信息
function getBtravelPerson(id,selected,url){
	$.getJSON(url, function(data){
		var str="<option value=''>请选择</option>";
		var tmpl;
		$.each(data,function(index,value){
			tmpl="";
			if(value.id==selected){
				tmpl="selected='selected'";
			}
			str+="<option value='"+value.id+"' "+tmpl+" >"+value.empName+"</option>";
		})
		$("#"+id).html(str);
		var checkText = $("#personId").val()
		var checkText2= $("#personId").find("option:selected").text();
		var checkValue= $("#personId").find("option:selected").val();
		var a = document.getElementById("personId").selectedIndex;
		var c =$("#personId_span").children();
		//span
		var c1 = c.eq(0);
		//select
		var c2 = c.eq(1);
		$("#personId_span").html("");
		$("#personId_span").append(c1);
		$("#personId_span").append(c2);
		document.getElementById("personId").selectedIndex = a;
		$("#personId_span").append(checkText2.substring(0, 12));
		
	});
}
//放置Name
function selectNameset(id){

	var checkText = $("#personId").val()
	var checkText2= $("#personId").find("option:selected").text();
	var checkValue= $("#personId").find("option:selected").val();
	var a = document.getElementById("personId").selectedIndex;
	var c =$("#personId_span").children();
	//span
	var c1 = c.eq(0);
	//select
	var c2 = c.eq(1);
	$("#personId_span").html("");
	$("#personId_span").append(c1);
	$("#personId_span").append(c2);
	document.getElementById("personId").selectedIndex = a;
	$("#personId_span").append(checkText2.substring(0, 12));
			
			
	var selText = jQuery("#"+id+"Id  option:selected").text();
	jQuery("#"+id+"Name").val(selText);
	
	
}

//交通工具data
var toolRow = [{text:"火车",value:"火车"},{text:"汽车",value:"汽车"},{text:"飞机",value:"飞机"},{text:"轮船",value:"轮船"},{text:"其他",value:"其他"}];
//交通级别data
var levelRow={"rows":[{"row":[{text:"商务座",value:"商务座"},{text:"特等座",value:"特等座"},{text:"一等座",value:"一等座"},{text:"二等座",value:"二等座"},{text:"高级软卧",value:"高级软卧"},{text:"软卧",value:"软卧"},{text:"硬卧",value:"硬卧"},{text:"软座",value:"软座"},{text:"硬座",value:"硬座"},{text:"无座",value:"无座"},{text:"其他",value:"其他"}]},
				      {"row":[{text:"大客",value:"大客"},{text:"其他",value:"其他"}]},
				      {"row":[{text:"公务舱",value:"公务舱"},{text:"头等舱",value:"头等舱"},{text:"经济舱",value:"经济舱"},{text:"其他",value:"其他"}]},
				      {"row":[{text:"一等舱",value:"一等舱"},{text:"二等舱",value:"二等舱"},{text:"三等舱",value:"三等舱"},{text:"其他",value:"其他"}]},
				      {"row":[{text:"其他",value:"其他"}]}
				     ]
			};
function setTrafficlevel(){
	var checkText = $("#trafficLevel").val()
		var checkText2= $("#trafficLevel").find("option:selected").text();
		var checkValue= $("#trafficLevel").find("option:selected").val();
		var a = document.getElementById("trafficLevel").selectedIndex;
		var c =$("#trafficLevel_span").children();
		//span
		var c1 = c.eq(0);
		//select
		var c2 = c.eq(1);
		$("#trafficLevel_span").html("");
		$("#trafficLevel_span").append(c1);
		$("#trafficLevel_span").append(c2);
		document.getElementById("trafficLevel").selectedIndex = a;
		$("#trafficLevel_span").append(checkText2.substring(0, 12));
}
//获取交通工具信息
function getTrafficTool(id,selected){
		var str="<option value=''>请选择</option>";
		var tmpl;
		$.each(toolRow,function(index,row){
			tmpl="";
			if(row.value==selected){
				tmpl="selected='selected'";
			}
			str+="<option value='"+row.value+"' "+tmpl+" >"+row.text+"</option>";
		})
		
		$("#"+id).html(str);
		var checkText = $("#trafficTool").val();
		var checkText2= $("#trafficTool").find("option:selected").text();
		var checkValue= $("#trafficTool").find("option:selected").val();
		var a = document.getElementById("trafficTool").selectedIndex;
		var c =$("#trafficTool_span").children();
		//span
		var c1 = c.eq(0);
		//select
		var c2 = c.eq(1);
		$("#trafficTool_span").html("");
		$("#trafficTool_span").append(c1);
		$("#trafficTool_span").append(c2);
		document.getElementById("trafficTool").selectedIndex = a;
		$("#trafficTool_span").append(checkText2.substring(0, 12));
}
//获取交通工具级别
function getTrafficlevel(id,toolValue,selected){
	var index;
	if(toolValue=="火车")
		index = 0;
	else if(toolValue=="汽车")
		index = 1;
	else if(toolValue=="飞机")
		index = 2;
	else if(toolValue=="轮船")
		index = 3;
	else if(toolValue=="其他")
		index = 4;
	var str="<option value=''>请选择</option>";
	var tmpl;
	if(levelRow.rows[index]!=null){
		$.each(levelRow.rows[index].row,function(index,row){
			tmpl="";
			if(row.value==selected){
				tmpl="selected='selected'";
			}
			str+="<option value='"+row.text+"' "+tmpl+" >"+row.text+"</option>";
		})
	}
	
	$("#"+id).html(str);
	var checkText = $("#trafficTool").val()
		var checkText2= $("#trafficTool").find("option:selected").text();
		var checkValue= $("#trafficTool").find("option:selected").val();
		var a = document.getElementById("trafficTool").selectedIndex;
		var c =$("#trafficTool_span").children();
		//span
		var c1 = c.eq(0);
		//select
		var c2 = c.eq(1);
		$("#trafficTool_span").html("");
		$("#trafficTool_span").append(c1);
		$("#trafficTool_span").append(c2);
		document.getElementById("trafficTool").selectedIndex = a;
		$("#trafficTool_span").append(checkText2.substring(0, 12));
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
 return art.dialog.open.origin.artDialog($.extend(options,option));
}
