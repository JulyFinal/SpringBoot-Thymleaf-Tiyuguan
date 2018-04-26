$(function(){

	if(startAndSubmitCheckStatus=='1'){
	}else{
		 $("#gotoDate").mobiscroll().date({ 
	//      preset: 'date', //日期
	        theme: "ios", //皮肤样式
	        display: 'modal', //显示方式
	//      mode: 'clickpick', //日期选择模式
	        dateFormat: 'yy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名籍我
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月',
	        yearText: '年',hourText:'时', minuteText:'分',//面板中年月日文字
	        endYear:2020,//结束年份
	        inputClass:'inputdummy',
	        label:'出发日期',
	         onSelect: function (valueText, inst) {
	            //var selectedDate = inst.getVal(); // Call the getVal method
	            //alert(selectedDate);
	            //alert(valueText);
	            saveBTravelTemp(1);
	        }
	    });
	    $("#backDate").mobiscroll().date({ 
	//    preset: 'date', //日期
	      theme: "ios", //皮肤样式
	      display: 'modal', //显示方式
	//    mode: 'clickpick', //日期选择模式
	      dateFormat: 'yy-mm-dd', // 日期格式
	      setText: '确定', //确认按钮名称
	      cancelText: '取消',//取消按钮名籍我
	      dateOrder: 'yymmdd', //面板中日期排列格式
	      dayText: '日', monthText: '月',
	      yearText: '年',hourText:'时', minuteText:'分',//面板中年月日文字
	      endYear:2020,//结束年份
	      inputClass:'inputdummy',
	      label:'出发日期',
	      onSelect: function (valueText, inst) {
	            //var selectedDate = inst.getVal(); // Call the getVal method
	            //alert(selectedDate);
	            //alert(valueText);
	            saveBTravelTemp(1);
	        }
	    });  
	}
 	 
});

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
		$('#hidden_isAfterwards_tr').hide();
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
		$('#hidden_isAfterwards_tr').show();
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
	saveBTravelTemp(1);
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
		$('#hidden_isSpecial_tr').hide();
		
		if(is_needSpecial=='1'){
			isPlane_selected('0');
			$('#isPlane_selected_0').attr('disabled',true);
			$('#isPlane_selected_1').attr('disabled',true);
			
			$('#isPlane_selected_0').removeAttr('onclick');
            $('#isPlane_selected_1').removeAttr('onclick');
	    }else{
	        $('#isPlane_selected_0').removeAttr('onclick');
            $('#isPlane_selected_1').removeAttr('onclick');
	        $('#isPlane_selected_0').attr('onclick',"isPlane_selected('0')");
            $('#isPlane_selected_1').attr('onclick',"isPlane_selected('1')");
	    }
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
		$('#hidden_isSpecial_tr').show();
		
		//初始化select显示的值
		var checkText = $("#isSpecialCause").val()
		var checkText2= $("#isSpecialCause").find("option:selected").text();
		var checkValue= $("#isSpecialCause").find("option:selected").val();
		var a = document.getElementById("isSpecialCause").selectedIndex;
		var c =$("#isSpecialCause_span").children();
		//span
		var c1 = c.eq(0);
		//select
		var c2 = c.eq(1);
		$("#isSpecialCause_span").html("");
		$("#isSpecialCause_span").append(c1);
		$("#isSpecialCause_span").append(c2);
		document.getElementById("isSpecialCause").selectedIndex = a;
		$("#isSpecialCause_span").append(checkText2.substring(0, 12));

		if(checkValue==4){
			isPlane_selected('1');
			$('#isPlane_selected_0').attr('disabled',true);
			$('#isPlane_selected_1').attr('disabled',true);
			$('#isPlane_selected_0').removeAttr('onclick');
            $('#isPlane_selected_1').removeAttr('onclick');
		}else if(checkValue!=4 && is_needSpecial=='1'){
			isPlane_selected('0');
			$('#isPlane_selected_0').attr('disabled',true);
			$('#isPlane_selected_1').attr('disabled',true);
			$('#isPlane_selected_0').removeAttr('onclick');
            $('#isPlane_selected_1').removeAttr('onclick');
	    }
	    
	}else {
		$('#isSpecial_1').addClass("isSpecial_NO");
		$('#isSpecial_0').addClass("isSpecial_NO");
		$('#hidden_isSpecial_tr').hide();
		$('#isSpecialCause_title').hide();
		$('#isSpecialCause').hide();
		$('#isPlane_selected_0').removeAttr('onclick');
        $('#isPlane_selected_1').removeAttr('onclick');
	    $('#isPlane_selected_0').attr('onclick',"isPlane_selected('0')");
        $('#isPlane_selected_1').attr('onclick',"isPlane_selected('1')");
	}
	saveBTravelTemp(1);
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
	saveBTravelTemp(1);
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
		var checkValue= $("#isSpecialCause").find("option:selected").val();
		if(checkValue!=4 && is_needSpecial=='1'){
			$('#isPlane_selected_0').attr('disabled',true);
			$('#isPlane_selected_1').attr('disabled',true);
	    }
	    
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
		
		var checkValue= $("#isSpecialCause").find("option:selected").val();
		if(checkValue==4){
			$('#isPlane_selected_0').attr('disabled',true);
			$('#isPlane_selected_1').attr('disabled',true);
		} 
		
	}else{
		$('#isPlane_selected_1').addClass("isSpecial_NO");
		$('#isPlane_selected_0').addClass("isSpecial_NO");
	}

	saveBTravelTemp(1);
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
	saveBTravelTemp(1);
}
function isStatus_selected(status){
	if(status=='0'){
		$('#isStatus_selected_0').removeClass("isSpecial_NO");
		$('#isStatus_selected_0').removeClass("noprint");
		$('#isStatus_selected_0').addClass("isSpecial_OK");
		$('#isStatus_selected_0 input').attr("name","status");
		$('#isStatus_selected_0 input').attr("id","status");
		$('#isStatus_selected_1').removeClass("isSpecial_OK");
		$('#isStatus_selected_1').addClass("noprint");
		$('#isStatus_selected_1').addClass("isSpecial_NO");
		
		//
		$('#isStatus_selected_0_other').removeClass("isSpecial_NO");
		$('#isStatus_selected_0_other').removeClass("noprint");
		$('#isStatus_selected_0_other').addClass("isSpecial_OK");
		$('#isStatus_selected_1_other').removeClass("isSpecial_OK");
		$('#isStatus_selected_1_other').addClass("noprint");
		$('#isStatus_selected_1_other').addClass("isSpecial_NO");
		
		
		$('#isStatus_selected_1 input').attr("name","");
		$('#isStatus_selected_1 input').attr("id","");
	}else if(status=='1'){
		$('#isStatus_selected_1').removeClass("isSpecial_NO");
		$('#isStatus_selected_1').removeClass("noprint");
		$('#isStatus_selected_1').addClass("isSpecial_OK");
		$('#isStatus_selected_1 input').attr("name","status");
		$('#isStatus_selected_1 input').attr("id","status");
		$('#isStatus_selected_0').removeClass("isSpecial_OK");
		$('#isStatus_selected_0').addClass("noprint");
		$('#isStatus_selected_0').addClass("isSpecial_NO");
		
		$('#isStatus_selected_1_other').removeClass("isSpecial_NO");
		$('#isStatus_selected_1_other').removeClass("noprint");
		$('#isStatus_selected_1_other').addClass("isSpecial_OK");
		$('#isStatus_selected_0_other').removeClass("isSpecial_OK");
		$('#isStatus_selected_0_other').addClass("noprint");
		$('#isStatus_selected_0_other').addClass("isSpecial_NO");
		
		
		
		
		$('#isStatus_selected_0 input').attr("name","");
		$('#isStatus_selected_0 input').attr("id","");
	}
}
function initBusiType(){
	var checkText = $("#busiType").val()
	var checkText2= $("#busiType").find("option:selected").text();
	var checkValue= $("#busiType").find("option:selected").val();
	var a = document.getElementById("busiType").selectedIndex;
	var c =$("#busiType_span").children();
	//span
	var c1 = c.eq(0);
	//select
	var c2 = c.eq(1);
	$("#busiType_span").html("");
	$("#busiType_span").append(c1);
	$("#busiType_span").append(c2);
	document.getElementById("busiType").selectedIndex = a;
	if(checkText2=="请选择"){
		$("#busiType_span").append($("#busiType_span").data('text'));
	}else{
		$("#busiType_span").append(checkText2.substring(0, 12));
	}
	
}
function initCustomValue(){
	var checkText = $("#custom").val()
	var checkText2= $("#custom").find("option:selected").text();
	$('#custom_desc').val(checkText2);
	var checkValue= $("#custom").find("option:selected").val();
	//var a = document.getElementById("custom").selectedIndex;
	var c =$("#custom_span").children();
	//span
	var c1 = c.eq(0);
	//select
	var c2 = c.eq(1);
	$("#custom_span").html("");
	$("#custom_span").append(c1);
	$("#custom_span").append(c2);
	//document.getElementById("custom").selectedIndex = a;
	if(checkText2=="请选择"){
		$("#custom_span").append($("#custom_span").data('text'));
	}else{
		if(checkText2 == "缺省" || checkText2.indexOf("缺省") != -1){
			//如果客户段为缺省值
			$("#custom_span").append("");
		}else{
			$("#custom_span").append(checkText2.substring(0, 12));
		}
	}
	
}
function initSpecialty(){
	var checkText = $("#specialty").val()
	var checkText2= $("#specialty").find("option:selected").text();
	var checkValue= $("#specialty").find("option:selected").val();
	var a = document.getElementById("specialty").selectedIndex;
	var c =$("#specialty_span").children();
	//span
	var c1 = c.eq(0);
	//select
	var c2 = c.eq(1);
	//var c3 = c.eq(2);
	
	$("#specialty_span").html("");
	$("#specialty_span").append(c1);
	$("#specialty_span").append(c2);
	//if(c3.length>0){
	//	$("#specialty_span").append(c3);
	//}
	document.getElementById("specialty").selectedIndex = a;
	
	if(checkText2=="请选择"){
		$("#specialty_span").append($("#specialty_span").data('text'));
	}else{
		$("#specialty_span").append(checkText2.substring(0, 12));
	}
	
}
function initAcst_code(){
	var checkText = $("#acst_code").val()
	var checkText2= $("#acst_code").find("option:selected").text();
	var checkValue= $("#acst_code").find("option:selected").val();
	var c =$("#acst_code_span").children();
	//span
	var c1 = c.eq(0);
	//select
	var c2 = c.eq(1);
	$("#acst_code_span").html("");
	$("#acst_code_span").append(c1);
	$("#acst_code_span").append(c2);
	if(checkText2=="请选择"){
		$("#acst_code_span").append($("#acst_code_span").data('text'));
	}else{
		$("#acst_code_span").append(checkText2.substring(0, 12));
	}
}
//获取全成指标
	function getQCZB(id,selectedValue,selectedName,busiType){
		if(_disabled!=0){
			$("#"+id).html("<option value='"+selectedValue+"' >"+selectedName+"</option>");
			initAcst_code();
			return;
		}
		var str="";
		var str1="<option value=''>请选择</option>";
		if(busiType==null||busiType==""){
			$("#"+id).html(str1);
			return;
		}
		$.getJSON(readAppUrl+"/businessTravel/getAcstListBySegValue.do?r="+Math.random()+"&busiType="+busiType+"&"+commonParams+"&jsonpcallback=?&from=mobile", function(date){
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
			
			var checkText = $("#acst_code").val()
			var checkText2= $("#acst_code").find("option:selected").text();
			var checkValue= $("#acst_code").find("option:selected").val();
			var c =$("#acst_code_span").children();
			//span
			var c1 = c.eq(0);
			//select
			var c2 = c.eq(1);
			$("#acst_code_span").html("");
			$("#acst_code_span").append(c1);
			$("#acst_code_span").append(c2);
			if(checkText2=="请选择"){
				$("#acst_code_span").append($("#acst_code_span").data('text'));
			}else{
				$("#acst_code_span").append(checkText2.substring(0, 12));
			}
			
			
		});
	}

	//获取专业
	function getZY(id,selectedValue,selectedName,busiType){
		if(_disabled!=0){
			$("#"+id).html("<option value='"+selectedValue+"' >"+selectedName+"</option>");
			initSpecialty();
			return;
		}
		var str="";
		var str1="<option value=''>请选择</option>";
		if(busiType==null||busiType==""){
			$("#"+id).html(str1);
			return;
		}
		$.getJSON(readAppUrl+"/businessTravel/getSpecialtyList.do?r="+Math.random()+"&"+commonParams+"&busiType="+busiType+"&adminShopId="+adminShopId+"&jsonpcallback=?&from=mobile", function(date){
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
			var checkText = $("#specialty").val()
			var checkText2= $("#specialty").find("option:selected").text();
			var checkValue= $("#specialty").find("option:selected").val();
			var a = document.getElementById("specialty").selectedIndex;
			var c =$("#specialty_span").children();
			//span
			var c1 = c.eq(0);
			//select
			var c2 = c.eq(1);
			//var c3 = c.eq(2);
			
			$("#specialty_span").html("");
			$("#specialty_span").append(c1);
			$("#specialty_span").append(c2);
			//if(c3.length>0){
			//	$("#specialty_span").append(c3);
			//}
			document.getElementById("specialty").selectedIndex = a;
			
			if(checkText2=="请选择"){
				$("#specialty_span").append($("#specialty_span").data('text'));
			}else{
				$("#specialty_span").append(checkText2.substring(0, 12));
			}
		});
	}
	//初始化页面隐藏与显示的信息
function initIsAfterwards(pendingStatus,isAfterwards){
	if(pendingStatus=='3'){
		isAfterwards_click('3',isAfterwards);
	}else{
		isAfterwards_click(pendingStatus,isAfterwards);
	}
}
//弹出增加人员信息窗口,type=2 只修改成本中心
function addUserInfo(btraVelId,userId,type){
	if(touchFlag == "1"){//触屏执行了收起动作，此事件本次点击屏蔽，防止页面滑动造成点击元素转移
		if(type!=1){
			return;
		}
	}
	var str = "修改人员信息";
	if(userId==null || userId=="") str = "人员信息";
	if(type == 2) str = "修改成本中心";
	var option;
	var url = "";
	if(type == 2){
		url = readAppUrl+"/businessTravel/updateCostIndex.do?id="+btraVelId+"&userId="+userId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	}
	else if(type==1){
		url = readAppUrl+"/businessTravel/userIndex.do?id="+btraVelId+"&userId="+userId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile&isupdate=1"+"&lastPage="+lpage+"&uid="+dlrUid;
	}else{
		url = readAppUrl+"/businessTravel/userIndex.do?id="+btraVelId+"&userId="+userId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile"+"&lastPage="+lpage+"&uid="+dlrUid;
	}
	location.href = url;
}
function addProject(btraVelId,productBudgetId,lpage){
	var url = "";
	url = readAppUrl+"/businessTravel/addProjectInfo.do?bid="+btraVelId+"&lastPage="+lpage+"&productBudgetId="+productBudgetId+"&uid="+dlrUid+"&adminShopId="+adminShopId+"&provinceNo="+provinceNo+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile&isupdate=1";
	location.href = url;
}
function delProject(btraVelId,productBudgetId){
	var url = "";
	url = readAppUrl+"/mobile/btravel/delProjectMobile.do?btraVelId="+btraVelId+"&budgetId="+productBudgetId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.ajax({
			type : "POST",
			url: url,
			async: true,
			//dataType : "json",
			success: function (data) {
				if(data.result==true){
					location.reload();
				}else{
					artDialogAlert(data.resultMessage);
				}
			},
			error:function(data){
				artDialogAlert("删除失败!");
			}
	  });
}
//查询用户信息
function queryUserInfo(btraVelId,pendingStatus,startAndSubmitCheckStatus){
	var tableHtml="";
	var url = readAppUrl+"/businessTravel/selectUsers.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,null,function(data){
		var boo = pendingStatus=='0' || pendingStatus=='2' || startAndSubmitCheckStatus=='0';
		for(var i=0;i<data.length;i++){
			var str = "";
			
			if(boo){
				str="<div><a href=\"javascript:addUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','1')\">修改</a></div><div><a href=\"javascript:deleteUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','"+pendingStatus+"','"+startAndSubmitCheckStatus+"')\">删除</a></div>";
			}
			//else{
			//	if(_disabled != '4' && startAndSubmitCheckStatus !=0 && pendingStatus != '0' && updateCateIndicStr == 'true')
			//		str = "<div><a class=\"noprint\" name=\"updateUserA\" href=\"javascript:addUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','2')\">修改成本中心</a></div>";
			//}
			var empNp = data[i].empNo==null? "":data[i].empNo;
			var temp = "";
			if(boo){
					temp="<img id='userinfo_"+i+"_o' class='ryxx_img_cla'  src='"+imgbasepath+"images/toP_tb.png' onclick='javascript:userInfo_li_click("+i+",1)' ></img>"+
					"<img id='userinfo_"+i+"_c' class='ryxx_img_cla'   src='"+imgbasepath+"images/bott_tb.png' style='display:none;' onclick='javascript:userInfo_li_click("+i+",0)'  ></img>";
				}
			tableHtml+=
				"<li class='userInfoli' style='position: relative;'>"
				+"	<div class='ryxx_fir'>"+(i+1)+"</div>"
				+"	<div class='ryxx_sec'>"
				+"		<div>"+data[i].empName+"（"+empNp+"）</div>"
				+"		<div>"+data[i].costunitName+"</div>"
				+"	</div>"
				+"	<div class='ryxx_thi'>"
				+" <br/>" 
				+"</div>"
				+temp
				+"</li>"
				+"<div id='userinfo_"+i+"' class='traveluserinfo'>"
				+"<a href=\"javascript:deleteUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','"+pendingStatus+"','"+startAndSubmitCheckStatus+"')\" class=\"traveluserinfoDel\">删除</a>"
				+"<a href=\"javascript:addUserInfo('"+data[i].btraVelId+"','"+data[i].id+"','1')\" class=\"traveluserinfoUpdate\">修改</a>"
				+"</div>";
	}
	$("#userInfo_table").html(tableHtml);
		
});
userInfo_li_over();
}
var isloadingId='';
//行程人员信息点击事件
function userInfo_li_click(vid,f){
	//alert("点击里的flag="+touchFlag);
	if(touchFlag == "1"){//触屏执行动作，此点击事件屏蔽
		return;
	}
	if(f==1){
		$("#userinfo_"+vid+"_o").hide();
		$("#userinfo_"+vid+"_c").show();
		vid='userinfo_'+vid;
		if(isloadingId==vid){
			isloadingId='';
		}else{
			isloadingId=vid;
			$('#'+vid).slideDown("normal");
		}
		
	}else if(f == 0){
		isloadingId='';
		$("#userinfo_"+vid+"_o").show();
		$("#userinfo_"+vid+"_c").hide();
		vid='userinfo_'+vid;
		//if(document.getElementById(vid).style.display=='block'){
			$('#'+vid).slideUp("normal");
		//}
	}

}
//加载行程信息展开事件
var isloading_disTanceTableinfo_Id='';
function disTanceTableinfo_li_click(vid,f){
	if(touchFlag == "1"){//触屏执行动作，此点击事件屏蔽
		return;
	}
	if(f == 1){
		$("#disTanceTableinfo_"+vid+"_o").hide();
		$("#disTanceTableinfo_"+vid+"_c").show();
		vid='disTanceTableinfo_'+vid;
		if(isloading_disTanceTableinfo_Id==vid){
			isloading_disTanceTableinfo_Id='';
		}else{
			isloading_disTanceTableinfo_Id=vid;
			$('#'+vid).slideDown("normal");
		}
	}else{
		isloading_disTanceTableinfo_Id = "";
		$("#disTanceTableinfo_"+vid+"_o").show();
		$("#disTanceTableinfo_"+vid+"_c").hide();
		vid='disTanceTableinfo_'+vid;
		
		$('#'+vid).slideUp("normal");
	
	}
}

var isloading_projectTableinfo_Id='';
function projectTableinfo_li_click(f){
	var vid ='projectbutton';
	if(touchFlag == "1"){//触屏执行动作，此点击事件屏蔽
		return;
	}
	if(f == 1){
		$("#projectTableinfo_o").hide();
		$("#projectTableinfo_c").show();
		isloading_projectTableinfo_Id=vid;
		$('#'+vid).slideDown("normal");
	}else{
		isloading_projectTableinfo_Id = "";
		$("#projectTableinfo_o").show();
		$("#projectTableinfo_c").hide();
		$('#'+vid).slideUp("normal");
	}
}
//触屏事件
function userInfo_li_over(targetY){	
				var flag = false;
				var userinfo=$('.traveluserinfo');//修改删除块
				for(var i=0;i<userinfo.length;i++){//遍历
					var id=userinfo[i].id;//
					if(userinfo[i].style.display=='block'){
						flag = true;
						var top_div = userinfo[i].offsetTop;//
						var topvalue = parseInt(top_div);
						imgClkFlag = false;
						if(targetY <(topvalue)|| targetY > (topvalue+58)){
							$('#'+id).slideUp("fast");
							$('#'+id+'_o').show();
							$('#'+id+'_c').hide();
						}
					}
					
				}
				isloadingId='';
				var disTanceTableinfo=$('.disTanceTableinfo');
				for(var i=0;i<disTanceTableinfo.length;i++){
					var id=disTanceTableinfo[i].id;
					if(disTanceTableinfo[i].style.display=='block'){
						flag = true;
						var top_div = disTanceTableinfo[i].offsetTop;//
						var topvalue = parseInt(top_div);
						if(targetY <(topvalue)|| targetY > (topvalue+58)){
							$('#'+id).slideUp("fast");
							$('#'+id+'_o').show();
							$('#'+id+'_c').hide();
						}
					}
					
				}
				if($('#projectbutton').css("display")=='block'){
						flag = true;
						var top_div = $('#projectbutton').offset().top;//
						var topvalue = parseInt(top_div);
						imgClkFlag = false;
						if(targetY <(topvalue)|| targetY > (topvalue+58)){
							$('#projectbutton').slideUp("fast");
							$('#projectTableinfo_o').show();
							$('#projectTableinfo_c').hide();
						}
				}
				if(flag){
					touchFlag = "1";//如果有做收起动作，此处1
				}else{
					touchFlag = "0";//如果没有做任何动作，页面click事件恢复有效
				}
				isloading_disTanceTableinfo_Id='';
}
//删除用户信息
function deleteUserInfo(btraVelId,userId,pendingStatus,startAndSubmitCheckStatus){
		var url = writeAppUrl+"/mobile/btravel/deleteUser.do?btraVelId="+btraVelId+"&userId="+userId+"&pendingStatus="+pendingStatus+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			success: function (data) {
				if(data.result==true)
					queryUserInfo(btraVelId,pendingStatus,startAndSubmitCheckStatus);
				else
					artDialogAlert(data.resultMessage);
			}
	  });
}
//ajax 查询费用情况信息列表
function queryCostList(btraVelId,accountStatus){
	var url = readAppUrl+"/businessTravel/queryCost.do?btraVelId="+btraVelId+"&accountStatus="+accountStatus+"&"+commonParams+"&jsonpcallback=?&r="+Math.random()+"&from=mobile";
	if(accountStatus==0){
		$.getJSON(url,null,function(data){
			var tableHtml="<tr style='background-color:#F8F6F7; height:30px;' align='center'>"
							+"	<td width='33%' style='border-right:0px;'>住宿</td>"
							+"	<td width='33%' style='border-left:0px; border-right:0px;'>交通</td>"
							+"	<td width='34%' style='border-left:0px;'>合计</td>"
							+"</tr>";
			for(var i=0;i<data.length;i++){
				tableHtml+=
							"<tr align='center'style='height:30px;'>"
							+"	<td style='border-right:0px;'>￥"+Number(data[i].zs).toFixed(2)+"</td>"
							+"	<td style='border-left:0px; border-right:0px;'>￥"+Number(data[i].jt).toFixed(2)+"</td>"
							+"	<td style='border-left:0px;'>￥"+(Number(data[i].jt)+Number(data[i].zs)).toFixed(2)+"</td>"
							+"</tr>";
			}
			$("#unifiedCostTable").html(tableHtml);
			disabledAllElement();
		});
	}else if(accountStatus==1){
		$.getJSON(url,null,function(data){
			var tableHtml="";
			
			for(var i=0;i<data.length;i++){
				tableHtml+=
							"<div class='x_block'>"
							+"<div class='x_block_top'>"
							+"	<div class='x_block_top_l'>"+data[i].empName+"</div>	"
							+"	<div class='x_block_top_r'>￥"+(Number(data[i].jt)+Number(data[i].zs)+Number(data[i].jtbz)+Number(data[i].cb)).toFixed(2)+"</div>"
							+"</div>"
							+"<div class='x_block_bottom'>"
							+"	<table  width='100%' border='0' cellpadding='0' cellspacing='0' class='x_expense_table' frame='void'>"
							+"		<tr class='x_expense_tr' align='center'>"
							+"			<td width='25%'>住宿</td>"
							+"			<td width='25%'>交通</td>"
							+"			<td width='25%'>交通补助</td>"
							+"			<td width='25%'>餐补</td>"
							+"		</tr>"
							+"		<tr align='center' class='x_expense_tr'>"
							+"			<td>"+Number(data[i].zs).toFixed(2)+"</td>"
							+"			<td>"+Number(data[i].jt).toFixed(2)+"</td>"
							+"			<td>"+Number(data[i].jtbz).toFixed(2)+"</td>"
							+"			<td>"+Number(data[i].cb).toFixed(2)+"</td>"
							+"		</tr>"
							+"	</table>"
							+"</div>"
						+"</div>"
						//<!--  块之间的分隔 -->
						+"<div class='x_block_space'></div>"
			}
			
			$("#personCostTable").html(tableHtml);
			disabledAllElement();
		});
	}
		
	
}

//计算费用情况信息
function calculateCost(btraVelId){
	var url = writeAppUrl+"/businessTravel/calculateCost.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,null,function(data){
		if(data.result){
			queryCostList(btraVelId,0);
			queryCostList(btraVelId,1);
		}else
			artDialogAlert(data.resultMessage);
	});	
}
//商旅单日志
function getOrderLog(btraVelId){
	var url = readAppUrl+"/businessTravel/getOrderLog.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,function(data){
	var str="";
		$.each(data,function(index,value){
			str+=
			"<tr class='x_hisinfo_tr_top'>"
			+"	<td rowspan='2' valign='top' class='x_hislog_td_l'>"+(index+1)+".</td>"
			+"	<td>"+value.inTime+"</td>"
			+"</tr>"
			+"<tr class='history_tr'>"
			+"	<td>"+value.name+"  "+value.matter+value.content+"</td>"
			+"</tr>";
		})
		$('#index_orderLog').html(str);
	});
}

//ajax 查询行程信息列表
function queryDistanceList(btraVelId,sStatus){
	var url = readAppUrl+"/businessTravel/queryDistance.do?btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?&from=mobile&r="+Math.random();
	$.getJSON(url,null,function(data){
		var tableHtml="";
	
		for(var i=0;i<data.length;i++){
			tableHtml+="<li style='position: relative;'>"+(i+1)+".   "+data[i].startCname+"<i class='right_arrow'>→</i>"+data[i].endCname
			if(sStatus==0){
				tableHtml +="<img  id='disTanceTableinfo_"+i+"_o' class='ryxx_img_cla'  src='"+imgbasepath+"images/toP_tb.png'   onclick='javascript:disTanceTableinfo_li_click("+i+",1)' ></img>"
				+"<img id='disTanceTableinfo_"+i+"_c' class='ryxx_img_cla'  src='"+imgbasepath+"images/bott_tb.png'  class='img_up' style='display:none;' onclick='javascript:disTanceTableinfo_li_click("+i+",0)' ></img>";
			}
			tableHtml+="</li>"
				+"<div id='disTanceTableinfo_"+i+"' class='disTanceTableinfo'>"
				+"<a href=\"javascript:deleteDistance('"+data[i].id+"','"+data[i].btraVelId+"','"+sStatus+"')\" class=\"traveluserinfoDel\">删除</a>"
				+"<a href=\"javascript:modifyDistance('"+data[i].id+"')\" class=\"traveluserinfoUpdate\">修改</a>"
				+"</div>";;
		}
		$("#disTanceTable").html(tableHtml);
		disabledAllElement();
	});
}	
//增加行程弹出窗口
function addDistance(btraVelId,sStatus){
	var url = readAppUrl+"/businessTravel/addDistanceIndex.do?"+commonParams+"&r="+Math.random()+"&uid="+dlrUid+"&btraVelId="+btraVelId+"&lastPage="+lpage+"&sStatus="+sStatus+"&jsonpcallback=?&from=mobile";
	location.href = url;
}

//修改行程弹出窗口
function modifyDistance(id){
    var url = readAppUrl+"/businessTravel/updateDistanceIndex.do?id="+id+"&lastPage="+lpage+"&"+commonParams+"&r="+Math.random()+"&uid="+dlrUid+"&jsonpcallback=?&from=mobile";
    location.href = url;
}

//删除行程
function deleteDistance(id,btraVelId,sStatus){
    var url = writeAppUrl+"/mobile/btravel/deleteDistance.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
   //art.dialog.confirm("您确定要删除行程信息吗？",function() {
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			//dataType : "json",
			success: function (data) {
				if(data.result==true)
					queryDistanceList(btraVelId,sStatus);
				else
					artDialogAlert(data.resultMessage);
			}
		//});
	});
}

//ajax 查询其他信息列表
function queryOtherList(btraVelId,otherType,pStatus,bStatus){
	var  sStatus = startAndSubmitCheckStatus;
	var url = readAppUrl+"/businessTravel/queryOther.do?btraVelId="+btraVelId+"&otherType="+otherType+"&"+commonParams+"&jsonpcallback=?&r="+Math.random()+"&from=mobile";
	if(otherType==0){
		$.getJSON(url,null,function(data){
			var tableHtml="";
			//if(bStatus!=1&&bStatus!=3){
			//	if((sStatus==1&&pStatus==3)||sStatus!=1){
			//		tableHtml+="<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">操作</th></tr>";
			//	}
			//}
				
			for(var i=0;i<data.length;i++){
				tableHtml+=
							"<div class='x_block'>"
							+"	<div class='x_block_top'>"
							+"		<div class='x_block_top_l'>"+data[i].personName+"</div>	"
							+"		<div class='x_block_top_r'>￥"+Number(data[i].totalPrice).toFixed(2)+"</div>"
							+"	</div>"
							+"	<div class='x_block_bottom'>"
							+"		<table width='100%' border='0' cellpadding='0' cellspacing='0' class='x_df_tab' frame='void'>"
							+"			<tr align='left'>"
							+"				<td class='x_df_td_l'>"
							+"					<div class='x_df_xc'>"+data[i].tripFrom+" -> "+data[i].tripArive+"</div>"
							+"					<div>"+data[i].dateFrom+"&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].trafficTool+"（"+data[i].trafficLevel+"）</div>"
							+"				</td>"
							+"				<td class='x_df_td_r'>"
							+"				</td>"
							+"			</tr>"
							+"		</table>"
							+"	</div>"
							+"</div>"
							+"<div class='x_block_space'></div>";
							
		
				//if(bStatus!=1&&bStatus!=3){
				//	if((sStatus==1&&pStatus==3)||sStatus!=1){
				//		tableHtml+="<tr><td align=\"center\" valign=\"middle\"><a href=\"javascript:modifyOther('"+data[i].id+"','0')\" class=\"noprint\">修改</a></td>&nbsp;&nbsp;&nbsp;<td><a href=\"javascript:deleteOther('"+data[i].id+"','"+data[i].btraVelId+"','0','"+pStatus+"')\" class=\"noprint\">删除</a></td></tr>";
				//	}
				//}
			}
			$("#otherTrafficTable").html(tableHtml);
			disabledAllElement();
		});
	}else{
		$.getJSON(url,null,function(data){
			var tableHtml="";
			//if(bStatus!=1&&bStatus!=3){
			//	if((sStatus==1&&pStatus==3)||sStatus!=1){
			//		tableHtml+="<th align=\"center\" valign=\"middle\" class=\"qita_table_title\">操作</th></tr>";
			//	}
			//}
			for(var i=0;i<data.length;i++){
				tableHtml+=
						"<div class='x_block'>"
						+"	<div class='x_block_top'>"
						+"		<div class='x_block_top_l'>"+data[i].personName+"</div>	"
						+"		<div class='x_block_top_r'>￥"+Number(data[i].totalPrice).toFixed(2)+"</div>"
						+"	</div>"
						+"	<div class='x_block_bottom'>"
						+"		<table width='100%' border='0' cellpadding='0' cellspacing='0' class='x_df_tab' frame='void'>"
						+"			<tr align='left'>"
						+"				<td class='x_df_td_l'>"
						+"					<div class='x_df_xc'>"+data[i].hotelName+"</div>"
						+"					<div>"+data[i].dateFrom+"&nbsp;&nbsp;至&nbsp;&nbsp;"+data[i].dateArive+"</div>"
						+"					<div>入住城市      "+data[i].tripArive+"</div>"
						+"				</td>"
						+"				<td class='x_df_td_r'>"
						+"				</td>"
						+"			</tr>"
						+"		</table>"
						+"	</div>"
						+"</div>"
						//<!--  块之间的分隔 -->
						+"<div class='x_block_space'></div>"
				//if(bStatus!=1&&bStatus!=3){
				//	if((sStatus==1&&pStatus==3)||sStatus!=1){
				//		tableHtml+="<tr><td align=\"center\" valign=\"middle\"><a href=\"javascript:modifyOther('"+data[i].id+"','1')\" class=\"noprint\">修改</a></td>&nbsp;&nbsp;&nbsp;<td><a href=\"javascript:deleteOther('"+data[i].id+"','"+data[i].btraVelId+"','1','"+pStatus+"')\" class=\"noprint\">删除</a></td></tr>";
				//	}
				//}
			}
			$("#otherHotelTable").html(tableHtml);
			disabledAllElement();
		});
	}
	
}

//ajax 查询个人补助信息列表
function queryPerallowanceList(btraVelId){
	var sStatus = startAndSubmitCheckStatus;
	var bss = bStatus;
	var pss = pStatus;
	var url = readAppUrl+"/businessTravel/queryPerallowanceList.do?btraVelId="+btraVelId+"&"+commonParams+"&jsonpcallback=?&r="+Math.random()+"&from=mobile";
	$.getJSON(url,null,function(data){
		var tableHtml="";
		for(var i=0;i<data.length;i++){
			tableHtml+=
				"<div class='x_block'>"
				+"	<div class='x_block_top'>"
				+"		<div class='x_block_top_l'>"+data[i].personName+"</div>	"
				+"		<div class='x_block_top_r'>￥"+(Number(data[i].trafficPriceTotal)+Number(data[i].foodPriceTotal)).toFixed(2)+"</div>"
				+"	</div>"
				+"	<div class='x_block_bottom'>"
				+"		<div class='x_bz x_df_xc'>"+data[i].dateFrom+"&nbsp;&nbsp;至&nbsp;&nbsp;"+data[i].dateArive+"&nbsp;&nbsp;&nbsp;<span style='font-size:12px;'>"
				+"        出差天数："+data[i].days+"天</span></div>"
				+"		<div class='x_bz'>交通补助&nbsp;￥"+data[i].trafficPriceTotal+"&nbsp;&nbsp;&nbsp;餐补&nbsp;￥"+data[i].foodPriceTotal+"</div>"
				+"	</div>"
				+"</div>"
				+"<div class='x_block_space'></div>";
		}
		$("#perallowanceDiv").html(tableHtml);
		disabledAllElement();
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
	var url = writeAppUrl+"/businessTravel/calculatePer.do?btraVelId="+btraVelId+"&isSystem="+isSystem+"&gotoDate="+gotoDate+"&backDate="+backDate+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
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
    var url = writeAppUrl+"/businessTravel/updatePerallowanceIndex.do?id="+id+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
    var option={title:"个人补助信息",width:550,height:255};
	winOpen(url,option);
}

//删除个人补助信息
function deletePerallowance(id,btraVelId){
    var url = writeAppUrl+"/businessTravel/deletePerallowance.do?id="+id+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
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
				}else
					artDialogAlert("删除失败！！！");
			}
		});
	});
}

//ajax 查询酒店订单信息列表
function queryOrderHotelList(btraVelId,txType){
	var url = readAppUrl+"/orderTickets/queryOrderHotel.do?btraVelId="+btraVelId+"&"+commonParams+"&txType="+txType+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,null,function(data){
		var tableHtml="";
		var peoNames = new Array();
		var peoPrices = new Array();
		var clType = "zx";
		if(txType==1)
				clType = "ph";
			for(var i= 0 ;i<data.length;i++){
				peoNames = data[i].peopleName.split(",");
				peoPrices = data[i].peoplePrice.split(",");
				peoTax = data[i].peopleTax.split(",");
				peoNake = data[i].peopleNake.split(",");
	            var str = "";
	            var status = "";
             	for(var j = 0 ;j<peoNames.length;j++){
            		  str+="<p>"+peoNames[j]+"："+peoPrices[j]+"&nbsp;<font style=\"font-size:12px; color:#8C8C8C;\">(净价:"+Number(peoNake[j]).toFixed(2)+" &nbsp;税额:"+Number(peoTax[j]).toFixed(2)+")</font></p>";
            	  }
            	//先判断是否为取消中
				  if(data[i].cancelStatus==1){
				  	status = "取消中";
				  }else{
	      	    	status = hotelStatus[data[i].status];	  
      	      	}
				  var uids = data[i].uid;
			       var uidArray = uids.split(",");
			       var isPj = false;
			       for(var uid in uidArray){
			         if(dlrUid == uidArray[uid]){
			  	       isPj = true;
			  	       break;
			         }
			       }
      	      	var czStr = "";
				  if(data[i].status==0||data[i].status==1){
					  czStr+="<a href=\"javascript:void(0)\" onclick=\"cancelHotelOnline('"+btraVelId+"','"+data[i].keyID+"')\">取消</a>";
				  }else if(data[i].status==3 && isPj){
					  czStr+="<a name=\"jdpj\" href=\"http://220.250.65.173:8088/#/comment/"+dlrUid+"/"+data[i].keyID+"\">评价</a>";
				  }else{
				  	czStr+="";
				  }	  
	            tableHtml+="<li>"
				+"	<div class='jd_name' id='jd_name"+i+"_"+clType+"'><div class='hotel_name' id='hotel_name"+i+"_"+clType+"'>"+data[i].hotelName+"</div><div class='hotel_price' id='hotel_price"+i+"_"+clType+"'>￥"+Number(data[i].totalPrice).toFixed(2)+"</div></div>"
				+"	<div class='jd_info'>"
				+"		<P>"+data[i].checkIn+"至"+data[i].checkOut+" "+data[i].roomName+"</P>"
				+"		<P>"+hotelPayType[data[i].payType]+"&nbsp;</P>"
				+		str
				+"	</div>"
				+"	<div class='jp_status'>状态：<span>"+status+"</span>"+czStr+"</div>"
				+"</li>"
				
		}
		if(txType==1)
			$("#jdPhoneDiv").html(tableHtml);
		else
			$("#jdOnlineDiv").html(tableHtml);
		for(var i= 0 ;i<data.length;i++){
			var lHeight = $("#jd_name"+i+"_"+clType).height();
			var lhHeight = $("#hotel_name"+i+"_"+clType).height();
		  $("#hotel_price"+i+"_"+clType).css("line-height",lHeight+"px");
		  $("#hotel_name"+i+"_"+clType).css("line-height",lhHeight>=46?"23px":"46px");
		}
		disabledAllElement();
	});
}	

//在线预订酒店取消
function cancelHotelOnline(btraVelId,keyID){
	dialog.confirm({
		    'title':'酒店取消',
        'content':"确定要执行取消操作吗",
        'height':120,
        'width':200,
        'callback':function (v) {
        	if(v){
        		var url = writeAppUrl+"/mobile/btravel/cancelHotelMobile.do?btraVelId="+btraVelId+"&keyID="+keyID+"&r="+Math.random()+"&"+commonParams+"&jsonpcallback=?&from=mobile";
        		$.ajax({
							type : "POST",
							url: url,
							async: false,
							success: function (data) {
								if(data.result){
									location.reload();
								}else{
									artDialogAlert(data.resultMessage);
								}
							}
						});
        	}
            
        }
  })
}
//获取在线订购机票信息
function getOrderTickets(btraVelId){
	var url = readAppUrl+"/orderTickets/getOrderTickets.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,null,function(data){
		//alert(JSON.stringify(data));
		var str="";
		$.each(data,function(index,value){
		
		var czStr = "";
		if(value.operType == '10' && value.returnAndChangeStatus !=32 && value.returnAndChangeStatus !=33){
			czStr += "<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','3')\">取消</a></p>";
		}
		else if(value.operType == '40'){
			if((value.returnAndChangeStatus==11 || value.returnAndChangeStatus==14 || //未退票与退票失败
					value.returnAndChangeStatus==21 || value.returnAndChangeStatus==24) && //未改签和改签失败
					value.flyStatus=='0'){
				czStr+="<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','2')\">退票</a>"+
					 "<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','1')\">改签</a>";
			}
		}
		var zjStr = '';
		if(value.checkInStatus!=0){
			zjStr+="<P>值机状态："+checkInStatus[value.checkInStatus];
			if(value.checkInStatus==1){
				zjStr+="&nbsp;&nbsp;&nbsp;&nbsp;座位："+value.checkinInfo;
			}
			zjStr+="</P>";
		}
		var hbStr = '';
		if(value.flightStatus!=0){
				hbStr+="<span style='line-height:20px'>航班状态："+flightStatus[value.flightStatus]+"&nbsp;"+value.flightInfo+"</span>";
		}
			
			str+="<li>"
		+"	<div class='jp_name'>"+value.passengerName+"("+value.ticketNumber+")<span>￥"+value.totalPrice+"</span></div>"
		+"	<div class='jp_info'>"
		+"		<P>"+value.boardPointName+"→"+value.offpointName+"</P>"
		+"		<P>"+getDate(value.flightDate).format("M月d日  hh:mm")+"  起飞</P>"
		+"		<P>"+value.carrierName+value.flightNo+"&nbsp;&nbsp; "+value.clazz+"&nbsp;&nbsp;"+value.classLevel+"</P>"
		+zjStr+hbStr
		+"	</div>"
		+"	<div class='jp_status'>状态：<span>"+OrderTicketsStatus(value.flyStatus,value.ifChange,value.returnAndChangeStatus,value.operType,value.settlementStatus)+"</span>"+czStr+"</div>"
		+"</li>"
		})
		$('#index_OrderTickets').empty();
		$('#index_OrderTickets').append(str);
		disabledAllElement();
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
//获取电话在线预订机票(合作单位)
function getPhoneOrderTickets(btraVelId){
	var url = readAppUrl+"/orderTickets/getPhoneOrderTickets.do?btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	$.getJSON(url,null,function(data){
		var str="";
		$.each(data,function(index,value){
		var czStr = "";
		if(value.operType == '10' && value.returnAndChangeStatus !=32 && value.returnAndChangeStatus !=33){
				czStr += "<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','3')\">取消</a>";
			}
			else if(value.operType == '40'){
				if((value.returnAndChangeStatus==11 || value.returnAndChangeStatus==14 || //未退票与退票失败
						value.returnAndChangeStatus==21 || value.returnAndChangeStatus==24) && //未改签和改签失败
						value.flyStatus=='0'){//未起飞
					czStr+="<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','2')\" >退票</a>"+
						 "<a href=\"javascript:void(0)\" onclick=\"changeAirTicket('"+btraVelId+"','"+value.keyID+"','"+value.ticketNumber+"','1')\">改签</a>";
				}
			}
		var zjStr = '';
		if(value.checkInStatus!=0){
			zjStr+="<P>值机状态："+checkInStatus[value.checkInStatus];
			if(value.checkInStatus==1){
				zjStr+="&nbsp;&nbsp;&nbsp;&nbsp;座位："+value.checkinInfo;
			}
			zjStr+="</P>";
		}
		var hbStr = '';
		if(value.flightStatus!=0){
				hbStr+="<span style='line-height:20px'>航班状态："+flightStatus[value.flightStatus]+"&nbsp;"+value.flightInfo+"</span>";
		}
			
			str+="<li>"
		+"	<div class='jp_name'>"+value.passengerName+"("+value.ticketNumber+")<span>￥"+value.totalPrice+"</span></div>"
		+"	<div class='jp_info'>"
		+"		<P>"+value.boardPointName+"→"+value.offpointName+"</P>"
		+"		<P>"+getDate(value.flightDate).format("M月d日  hh:mm")+"  起飞</P>"
		+"		<P>"+value.carrierName+value.flightNo+"&nbsp;&nbsp; "+value.clazz+"&nbsp;&nbsp;"+value.classLevel+"</P>"
		+zjStr+hbStr
		+"	</div>"
		+"	<div class='jp_status'>状态：<span>"+OrderTicketsStatus(value.flyStatus,value.ifChange,value.returnAndChangeStatus,value.operType,value.settlementStatus)+"</span>"+czStr+"</div>"
		+"</li>"
		
		})
		$('#index_phoneOrderTickets').empty();
		$('#index_phoneOrderTickets').append(str);
		disabledAllElement();
	});
}

//内部商城通知机票政企业务平台进行机票的退改签请求
function changeAirTicket(btraVelId,keyID,tno,type){
	var message = "";
	if(type==2)
		message = "确定要执行退票操作吗？";
	else if(type==1)
		message = "确定要执行改签操作吗？";
	else if(type==3){
		message = "确定要执行取消操作吗？";
	}
	dialog.confirm({
        'content':message,
        'height':120,
        'width':200,
        'callback':function (v) {
	        if(v){
	        		var url = writeAppUrl+"/mobile/btravel/ticketChangeMobile.do?btraVelId="+btraVelId+"&keyID="+keyID+"&tno="+tno+"&type="+type+"&r="+Math.random()+"&"+commonParams+"&jsonpcallback=?&from=mobile";
						  $.ajax({
								type : "POST",
								url: url,
								async: false,
								success: function (data) {
									if(data.result){
										location.reload();
									}else{
										artDialogAlert(data.resultMessage);
									}
								}
							});
	        }
        }
  })
		
}

//禁用所有按钮除头部部分
function disabledAllElement(){
	if(isPlane=='0'){
		$('#jp_info a').css({"display":"none"});
	}else if(startAndSubmitCheckStatus=='1'){
		//$('#right_menus_save').css({"display":"none"});//保存
		$('#fj_info a').css({"display":"none"});
	}else{
		$('#shenp_box').css({"display":"none"});//审批意见
	}
	if(_disabled =="" ||  _disabled =="0") return;
	//人员信息以上部分
	$('#index_form select').attr('disabled',true);
	$('#custom').attr('disabled',true);
	$("#index_form input[type=radio]").attr('disabled',true);
	$("#index_form *").removeAttr("onclick");
	$('#index_form *').attr({"readOnly":true});
	$('#xcxx_info a').css({"display":"none"});
	$('#xmxx_info a').css({"display":"none"});//项目信息操作按钮
	$('#projectTable img').css({"display":"none"});//项目信息操作按钮 
	$('#user_info a').css({"display":"none"});
	$(".select-box span").hide();
	if(_disabled=='4' || _disabled=='2'){//4登录人UID与商旅单申请人UID不相同  2:禁用状态
		//右边菜单按钮
		//$('#right_menus_save').css({"display":"none"});//保存
		//$('#right_menus_delete').css({"display":"none"});//作废按钮
		//$('#right_menus_bz').css({"display":"none"});//报账按钮
		userinfo_bottom();
	}else if(_disabled=='3' && bStatus==0){//审核通过
		//右边菜单按钮
		//$('#right_menus_bz').css({"display":"block"});//报账按钮
		//$('#right_menus_delete').css({"display":"none"});//作废按钮
	}else if(_disabled=='1'){//通过后台进入
		//右边菜单按钮
		//$('#right_menus_save').css({"display":"none"});//保存
		//$('#right_menus_delete').css({"display":"none"});//作废按钮
		//$('#right_menus_bz').css({"display":"none"});//报账按钮
		//$('#right_menus_sh').css({"display":"none"});//收回
		//$('#right_menus_tjsp').css({"display":"none"});//提交
		//userinfo_bottom();
	}
}

//控制人员信息以下部分按钮是否显示
function userinfo_bottom(){
	//人员信息一下部分
	$('#jp_info a').css({"display":"none"});
	$('#jd_info a').css({"display":"none"});
	$("a[name='jdpj']").css({"display":"block"});
}

//发起人修改业务类别,专业, 全成本指标
function updateCateIndic(id){
	 var url = readAppUrl+"/businessTravel/updateCateIndic.do?id="+id+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	 location.href =url;
}
function isbigData(gotoDate,backDate){

	 var beginDate=$("#gotoDate").val();  
	 var endDate=$("#backDate").val();  
	 var d1 = new Date(beginDate.replace(/\-/g, "\/"));  
	 var d2 = new Date(endDate.replace(/\-/g, "\/"));  
	
	  if(beginDate!=""&&endDate!=""&&d1 >d2)  
	 {  
	 // alert("开始时间不能大于结束时间！");  
	  return true;  
	 }
}
//提交商旅单
function saveBTravel(flag){
	var message="";
	var resMessage = "";
	if(flag == '1'){
		message="确定要保存商旅单吗？";
		resMessage = "保存成功！";
	}else{
		message="确定要提交商旅单吗？";
		resMessage = "提交成功！";
	}
	var isAudit = $('#isAudit').val();// 是否审批
	if(isAudit=='1' && flag=='2'){//审批中不需要保存
		formSubmit();
	}else {
		if($('#userMobile').val()==""){
			artDialogAlertFocus("请输入联系电话!",'userMobile');
			return;
		}
		var isSpecial = $('input:hidden[name=\'isSpecial\']').val();
		if(isSpecial==null || isSpecial=='2'){//特殊审批状态
			artDialogAlertFocus("请选择是否特殊审批!",'isSpecial');
			return;
		}
		var isInsideCity = $('input:hidden[name=\'isInsideCity\']').val();
		if(isInsideCity==null || isInsideCity=='2'){//是否市内出差
			artDialogAlertFocus("请选择是否本地网!",'isInsideCity');
			return;
		}
		var isPlane = $('input:hidden[name=\'isPlane\']').val();
		if(isPlane==null || isPlane=='2'){//是否乘坐飞机
			artDialogAlertFocus("请选择是否乘坐飞机!",'isPlane');
			return;
		}
		var isPlane = $('input:hidden[name=\'isSystem\']').val();
		if(isPlane==null || isPlane=='2'){//是否系统内出差
			artDialogAlertFocus("请选择是否系统内出差!",'isSystem');
			return;
		}
		var busiType = $('#busiType').val();
		if($('#busiType').val()==""){
			artDialogAlertFocus("请选择业务类别!",'busiType');
			return;
		}
		if($('#specialty').val()==""){
			artDialogAlertFocus("请选择专业!",'specialty');
			return;
		}
		var isSubcompany = $('#isSubcompany').val();//是否子公司
		if(busiType!='007004' && busiType!='007005' && isSubcompany !='1' ){
			if($('#acst_code').val()==""){
				artDialogAlertFocus("请选择全成指标!",'acst_code');
				return;
			}
		}
		if($('#gotoDate').val()==""){
			artDialogAlertFocus("请输入出发时间!",'gotoDate');
			return;
		}
		if($('#backDate').val()==""){
			artDialogAlertFocus("请输入返回时间!",'backDate');
			return;
		}
		if(isbigData($('#gotoDate').val(),$('#backDate').val())){
			
			artDialogAlertFocus("开始时间不能大于结束时间！",'backDate');
			return;
		}
		if($("input[name='isAfterwards']").val()=='0'){
			var start_=getDate($('#gotoDate').val()).format("yyyy-MM-dd");
			var now=new Date();
			var now_date = now.format("yyyy-MM-dd");
			if(start_<now_date){
				artDialogAlertFocus("是否事后补单选择 \"否\" 时,出发时间不能小于当前时间!",'gotoDate');
				return;
			}
		}else{
			if($('#isAfterwardsCause').val()==""){
				artDialogAlertFocus("是否事后补单选择 \"是\" 时,事后补单原因必填!",'isAfterwardsCause');
				return;
			}
		}
		if($("input[name='isSpecial']").val()=='1'){
			if($('#isSpecialCause').val()==""){
				artDialogAlertFocus("是否特殊审批选择\"是\" 时,特殊审批原因必选!",'isSpecialCause');
				return;
			}
		}
		if($('#busReason').val()==""){
			artDialogAlertFocus("请输入事由!",'busReason');
			return;
		}
		if($('#busReason').val().length>120){
			artDialogAlertFocus("事由长度不允许超过120字符!",'busReason');
			return;
		}
		if($('#content').val().length>1000){
			artDialogAlertFocus("摘要长度不允许超过1000字符!",'content');
			return;
		}
		//art.dialog.confirm(message,function() {
			var url = writeAppUrl+"/mobile/btravel/updateTravel.do?tjType="+flag+"&r="+Math.random()+"&jsonpcallback=?&from=mobile"+"&"+commonParams;
			var str = $("#index_form").serialize(); 
			$.ajax({
				type : "POST",
				url: url,
				data:str,
				async: false,
				success: function (data) {
					if(data.result=="success"){
						if(flag=='2'){
							formSubmit();
						}else{
							artDialogAlert(resMessage);
						}
					}else{
						artDialogAlert(data.resultMessage);
					}
				}
			});
	}
}


//提交商旅单
function saveBTravelTemp(flag){
	var message="";
	if(flag == '1'){
		message="确定要保存商旅单吗？";
	}else{
		message="确定要提交商旅单吗？";
	}
	var isAudit = $('#isAudit').val();// 是否审批
	if(isAudit=='1' && flag=='2'){//审批中不需要保存
		formSubmit();
	}else {
		
		//art.dialog.confirm(message,function() {
			var url = writeAppUrl+"/mobile/btravel/updateTravel.do?r="+Math.random()+"&jsonpcallback=?&from=mobile&temp=1"+"&"+commonParams;
			$.post(url,$('#index_form').serialize(),function(data){
				if(data.result=="success"){
					//artDialogAlert(data.resultMessage);
					//console.log(data.resultMessage);
				}else{
					//alert(data.resultMessage);
				}
			},'json');
		//});
	}
}


//验证加光标锁定位置
function artDialogAlertFocus(content,id){
	dialog.alert({
		    'title':'提示',
        'content':content,
        'height':80,
        'width':200,
        'callback':function (v) {
            //alert('iframe内容加载完成！')
        }
    });
	  //$('#'+id).focus();  //因手机端录入框聚焦会弹出键盘、时间选择框等模块，遮挡提示信息  取消聚焦
}
//验证加光标锁定位置
function artDialogAlert(content,id){
	dialog.alert({
		    'title':'提示',
        'content':content,
        'height':80,
        'width':200,
        'callback':function (v) {
            //alert('iframe内容加载完成！')
        }
    });
}
//刷新父窗口
function reloadOpener(){
	try{
		window.opener.location.reload();
	}catch(E){}
}
//根据字符串 转换时间类型,部分浏览器不兼容new date(str)
function getDate(strDate) {  
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,  
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');  
    return date;  
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

//增加其他信息弹出窗口
function addOther(index,btraVelId,pStatus){
	var url = readAppUrl+"/businessTravel/addOtherIndex.do?btraVelId="+btraVelId+"&pStatus="+pStatus+"&otherType="+index+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
 	location.href =url;
}

//修改其他信息弹出窗口
function modifyOther(id,index){
    var url = readAppUrl+"/businessTravel/updateOtherIndex.do?id="+id+"&otherType="+index+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
	location.href =url;
}
//删除其他信息
function deleteOther(id,bid,index,pStatus){
    var url = writeAppUrl+"/businessTravel/deleteOther.do?id="+id+"&btraVelId="+bid+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
    confirm(index==0?"您确定要删除交通信息吗":"您确定要删除住宿信息吗？",function() {
		$.ajax({
			type : "POST",
			url: url,
			async: false,
			dataType : "json",
			success: function (data) {
				if(data.result)
					location.href =readAppUrl+"/businessTravel/index.do?from=mobile&id="+bid;
				else
					alert(data.resultMessage);
			}
		});
	});
}
function orderHotel(btraVelId,type,lpage){
	location.href = readAppUrl + "/mobile/btravel/qfsg.do?&from=mobile&lastPage="+lpage+"&bid="+btraVelId;
}
//在线订票或酒店参数提交方法
function orderTickets(btraVelId,type){
	if(pStatus !=3){
		artDialogAlert("只有审批通过的商旅单才可以使用该功能!");
		return;
	}
	var url = writeAppUrl+"/orderTickets/postRequestUrl.do?type="+type+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random()+"&jsonpcallback=?&from=mobile";
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
			//var urlA = readAppUrl+"/orderTickets/orderTicketsOpen.do?&"+commonParams+"&orderType="+type+"&maNo="+data.content.ClaimNo+"&btraVelId="+btraVelId+"&r="+Math.random()+"&jsonpcallback=?";
		    //var option={title:"",width:412,height:200};
			//winOpen(urlA,option);
			
			//if(type=='1') $('#ticketsAndhotel_from').attr("action",readAppUrl+"/orderTickets/testAirticketPage.do?type=1&jsonpcallback=?"+"&btraVelId="+btraVelId+"&"+commonParams+"&r="+Math.random());//机票单点:"http://123.127.208.183/ltms/"
			
			/*  机票内网测试地址: http://10.0.71.18/ltms/（DCN网）
			 *  机票公网测试地址: http://220.250.65.182/ltms/	
			 *  机票内网正式地址: http://10.0.71.3/ltms/（DCN网） 
			 *  机票公网正式地址: http://220.250.65.189/ltms/
			*/
			if(type=='1') $('#ticketsAndhotel_from').attr("action","http://220.250.65.182:8081/ltmsapp/");//机票单点公网:"http://220.250.65.189/ltms/" 机票单点内网:"http://10.0.71.18/ltms/"
			
			/*  酒店内网测试地址: http://10.0.71.16/LoginUnicomHandler.ashx （DCN网）
			 *  酒店公网测试地址: http://220.250.65.162/LoginUnicomHandler.ashx
			 *  酒店内网正式地址: http://10.0.71.1/LoginUnicomHandler.ashx  （DCN网）
			 *  酒店公网正式地址: http://220.250.65.173/LoginUnicomHandler.ashx
			*/
			if(type=='2') $('#ticketsAndhotel_from').attr("action","http://220.250.65.162/LoginForMobile.aspx");//酒店单点公网:"http://220.250.65.173/LoginUnicomHandler.ashx " 酒店单点内网:"http://10.0.71.16/LoginUnicomHandler.ashx"
			$('#ticketsAndhotel_from').submit();
			//location.href ="http://220.250.65.181:8080/ltmsapp/";
			
		}else{
			artDialogAlert(data.resultMessage);
		}
	});
}