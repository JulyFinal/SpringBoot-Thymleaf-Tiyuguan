// mobile goods detail js 
// szj 2014年10月23日14:35:48

//商品详页js ---四个下拉框
/***
 * 选择预算
 * @param {Object} id
 * @param {Object} style
 * @param {Object} current
 */
function select_budget(id,style){
	var shopId = $("#shopId").val();
	var costid = $('#costunit').val();
	//var readAppUrl = '${readAppUrl }';
	var myDate = new Date();
	var temp = myDate.getTime(); 
	var select_html ="";
	var accepttype="";//接收类型 0：直发，1：入库 2:自行选择 3：费用二次分摊
	if (style==1) {
		//下面的代码似乎在原来商品用途是下列列表框的时候，才会有效果的。故暂时先隐掉，如果以后有用，则参照其他详情页再进行修改
		//select_html += '<option value="" selected="true">请选择商品用途</option>';
		//if (buyType == 0) {
		//	if (shopType == 5){
		//		//jd type
		//		if (shopCode == '${stap_code}') {
		//			shopId = "";
		//		}
		//		
		//		$.getJSON(readAppUrl+"/front/goods/budget/usageNew.do?from=mobile&redirected=1",{costid:id,shopId:shopId,goodsType:goodsType,temp:temp,buyType:3}, function(date){
		//			if(date.resultType == '0'){
		//				mobilerealAlert(date.result);
		//			}
		//			if(date.resultType == '1'){
		//				select_html += date.result;
		//				$("#budget_id").html(select_html);
		//				$("#budget_id_txt").html($("#budget_id option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
		//				flag = $("#budget_id").val();
		//				var valueid = $("#budget_id").val();
		//				select_budget(valueid,7);
		//			}
		//		});
		//	}else{
		//		$("#budget_id").html('<option value="" selected="true">请选择商品用途</option>' + budgetUsageStr);
		//		$("#budget_id_txt").html('请选择商品用途').removeClass('checked-value').addClass('unchecked-value');
		//	}
		//} else {
		//	if (costid == null || costid == '') {
		//		if ($('#costunit')[0].tagName == 'INPUT') {
		//			costid = $('#costunit')[0].value;
		//		} else {
		//			costid = $('#costunit')[0][1].value;
		//		}
		//	}
		//	var datapost;
		//	if(shopType == 5){
		//		datapost = {costid:id,temp:temp, buyType:buyType};
		//	}else{
		//		datapost = {costid:costid,shopId:shopId,temp:temp, buyType:buyType};
		//	}
		//	$.ajax({
		//		type : "POST",
		//		url: readAppUrl+"/front/goods/budget/lgUsageBycost.do?from=mobile&redirected=1",
		//		data : datapost,
		//		dataType : "json",
		//		async: false,
		//		success: function (date) {
		//			if(date.resultType == '0'){
		//				return flag;
		//			}
		//			if(date.resultType == '1'){
		//				select_html += date.result;
		//				$("#budget_id").html(select_html);
		//				$("#budget_id_txt").html($("#budget_id option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
		//				flag = $("#budget_id").val();
		//				if(shopType == 5 && falg != ''){
		//					select_budget(flag, 7);
		//				}
		//			}
		//		}
		//	});
		//	if (shopType == 5){
		//		// 会计专业由所属商店（成本中心）决定，零购时需要提前取得下拉框数据（会计科目不显示）
		//		select_budget("",5);
		//	}
		//}
	} else if(style==2){
		// 预算科目
		var datapost;
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			datapost = {usageId:id,costid:costid,temp:temp};
		}else{
			datapost = {usageId:id,shopId:shopId,temp:temp};
		}
		$.ajax({ 
			type : "POST",
			url: readAppUrl+"/front/goods/budget/subjectByUsage.do?from=mobile&redirected=1",
			data :datapost,
			dataType : "json",
			async: false,
			success: function (date){
			
				if(date.resultType == '0'){
					$("#yskm_show").html("");
					$("#service_id").html("");
				}
				
				if(date.resultType == '1'){
					select_html += date.result;
					$("#service_id").html(select_html);
					$("#service_id_txt").html($("#service_id option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
					$("#yskm_show").html($("#service_id").text());
					
					var valueid = $("#service_id").val();
					var accepttype=$("#accepttype").val();//判断是入库，还是直发
					if(accepttype=="0" || accepttype=="3"){//直发操作
						select_budget(id,3);
					}
					select_budget("",5);//获取专业
					select_project(date.projectStr,6);
				}
			}
		});
	}else if(style==3){
		var datapost;
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			datapost = {usageId:id,costid:costid,temp:temp};
		}else{
			datapost = {usageId:id,shopId:shopId,temp:temp};
		}
		if (buyType == 0) {
			$.getJSON(readAppUrl+"/front/goods/budget/seginfoByUsage.do?from=mobile&redirected=1",datapost, function(date){
				select_html += date.result;
				$("#seg_id").html(select_html);
				var valueid = $("#seg_id").val();
				if (valueid != null && valueid != '') {
					$("#kjkm_show").html($("#seg_id").text());
				} else {
					$("#kjkm_show").html('');
				}
				select_budget(valueid,4);
			});
		} else {
			$("#seg_id").html("<option value='" + lgSegValue + "' selected='true'>" + lgSegName + "</option>");
			$("#seg_id_txt").html(lgSegName).removeClass('unchecked-value').addClass('checked-value');
			var valueid = $("#seg_id").val();
			select_budget(valueid,4);
		}
	}else if(style==4){
		if (id.substr(0,2) == '19') {
			// 隐藏全成本指标
			$("#acst_code").val('');
			$("#acsttd").hide();
		} else {
			$("#acsttd").show();
			select_html += '<option value="" selected="true">请选择全成本指标</option>';
			if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
				$.getJSON(readAppUrl+"/front/goods/budget/acstnew.do?from=mobile&redirected=1",{segValue:id,costid:costid,temp:temp}, function(date){
					select_html += date.rt;
					$("#acst_code").html(select_html);
					$("#acst_code_txt").html("请选择全成本指标").removeClass('checked-value').addClass('unchecked-value');
					var valueid = $("#acst_code").val();
				});
			}else{
				$.getJSON(readAppUrl+"/front/goods/budget/acst.do?from=mobile&redirected=1",{segValue:id,shopId:shopId,temp:temp}, function(date){
					select_html += date.rt;
					 $("#acst_code").html(select_html);
					 $("#acst_code_txt").html("请选择全成本指标").removeClass('checked-value').addClass('unchecked-value');				 
					var valueid = $("#acst_code").val();
				});
			}
		}

	}else if(style==5){
		select_html += '<option value="" selected="true">请选择专业</option>';
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			//jd type
			$.getJSON(readAppUrl+"/front/goods/budget/specialtynew.do?from=mobile&redirected=1",{costid:costid,temp:temp}, function(date){
				select_html += date.rt;
				$("#specialty").html(select_html);
				$("#specialty_txt").html("请选择专业").removeClass('checked-value').addClass('unchecked-value');
				if(select_html.indexOf("selected='selected'")>-1){//如果返回的值有自动选中
					save4Options();
				}
			});
		}else{
			$.getJSON(readAppUrl+"/front/goods/budget/specialty.do?from=mobile&redirected=1",{shopId:shopId,temp:temp}, function(date){
				select_html += date.rt;
				//$("#selec"+style).show();
				$("#specialty").html(select_html);
				$("#specialty_txt").html("请选择专业").removeClass('checked-value').addClass('unchecked-value');
				if(select_html.indexOf("selected='selected'")>-1){//如果返回的值有自动选中
					save4Options();
				}
			});
		}
	}else if(style==6){
		// 当页面初始化，成本中心没有直接选中，而商品用途只配置一个被默认选中时，调用该方法没有成本中心
		// 没有成本中心值时需要取第一个值
		if (costid == null || costid == '') {
			costid = $('#costunit')[0][1].value;
		}
		$.getJSON(readAppUrl+"/front/goods/budget/getAssignment.do?from=mobile&redirected=1",{projectCode:id,costid:costid,currShopId:shopId,uid:uid,temp:temp}, function(data){
			data.assignmentStr = '<option value="" selected="true">请选择任务</option>' + data.assignmentStr;
			$("#assign_code").html(data.assignmentStr);
			$("#assign_code_txt").html("请选择任务").removeClass('checked-value').addClass('unchecked-value');
		});
	}else if(style==7){
		if (buyType==0){
			select_html += '<option value="" selected="true">请选择接收类型</option>';
			if(shopType != 4 && shopType != 5 && shopType != 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
				$.ajax({ 
					type : "POST",
					url: readAppUrl+"/front/goods/budget/accepttype.do?from=mobile&redirected=1",
					data :{usageId:id,shopId:shopId,temp:temp, shopType:shopType, costid:costid},
					dataType : "json",
					async: false,
					success: function (date){
						accepttype=date.isInStore;
						$("#accepttype").val(accepttype);//商品用途对应的是否入库
						$("#seg_value_jf").val(date.seg_value_jf);//商品用途对应的科目组合
						$("#defaultStoreId").val(date.defaultStoreId);//商品用途对应的默认仓库
						isVMI = date.isVMI;
						
						if (isVMI == "1") {
							$("#yskmspan").hide();
						} else {
						
							if (buyType == 0) {
								$("#yskmspan").show();
							} else {
								$("#yskmspan").hide();
							}
						}
						if (isVMI == "1") { // VMI库
							// 隐藏段值选择和预算科目
							$("#accepttype").val(4);//是VMI的入库类型为4
							$("#accepttypetd").hide();
							$("#kjkmspan").hide();
							$("#acsttd").hide();
							$("#depottd").show();
							$("#specialtd").hide();
							//$('#assembly-button').hide();
							var budget_id= $('#budget_id').val();
							select_budget(budget_id,8);//显示仓库
						} else if(accepttype=="2"){//自行选择
							$("#accepttypetd").show();
							$("#specialtd").show();
							//$("#depot_id").val(date.defaultStoreId);
							toChangeAccept();
						}else if(accepttype=="0"){//直发
							$("#accepttypetd").hide();
							$("#specialtd").show();
							toAccept2();
						}else if(accepttype=="1"){//入库
							$("#accepttypetd").hide();
							$("#specialtd").show();
							//$("#depot_id").val(date.defaultStoreId);
							toAccept3();
						}else if(accepttype=="3"){//费用二次分摊
							$("#accepttypetd").hide();
							$("#specialtd").show();
							toAccept4();
						}
					}
				});
			}else{
				//4、义务商店 5、京东商店 8、集团集采商店
				$.ajax({ 
					type : "POST",
					url: readAppUrl+"/front/goods/budget/accepttypenew.do?from=mobile&redirected=1",
					data :{usageId:id,costid:costid,temp:temp},
					dataType : "json",
					async: false,
					success: function (date){
						accepttype=date.isInStore;
						$("#accepttype").val(accepttype);//商品用途对应的是否入库
						$("#seg_value_jf").val(date.seg_value_jf);//商品用途对应的科目组合
						$("#defaultStoreId").val(date.defaultStoreId);//商品用途对应的默认仓库
						
						if(accepttype=="2"){//自行选择
							$("#accepttypetd").show();
							toChangeAccept();
						}else if(accepttype=="0"){//直发
							$("#accepttypetd").hide();
							toAccept2();
						}else if(accepttype=="1"){//入库
							$("#accepttypetd").hide();
							toAccept3();
						}else if(accepttype=="3"){//费用二次分摊
							$("#accepttypetd").hide();
							toAccept4();
						}
					}
				});
			}
		} else {
			select_html += '<option value="" selected="true">请选择项目</option>';
			$.ajax({
				type : "POST",
				url: readAppUrl+"/front/goods/budget/getProjectsAndAssign.do?from=mobile&redirected=1",
				data :{usageId:id,costid:costid,currShopId:shopId,uid:uid,temp:temp},
				dataType : "json",
				async: false,
				success: function (data) {
					select_html += data.projectStr;
					$("#project_code").html(select_html);
					$("#project_code_txt").html("请选择项目").removeClass('checked-value').addClass('unchecked-value');
					$("#projectspan1").show();

					if(data.assignmentStr != null && data.assignmentStr != ''){
						data.assignmentStr = '<option value="" selected="true">请选择任务</option>' + data.assignmentStr;
						$("#assign_code").html(data.assignmentStr);
						$("#assign_code_txt").html("请选择任务").removeClass('checked-value').addClass('unchecked-value');
					} else {
						$("#assign_code").html('<option value="" selected="true">请选择任务</option>');
						$("#assign_code_txt").html("请选择任务").removeClass('checked-value').addClass('unchecked-value');
					}
				}
			});
			// 接收类型默认为直发
			$("#accepttype").val("0");
			$("#acsttd").show();
			select_budget("",5);//获取专业
			// 和成本预算购买对应起来，此处加载会计科目组合
			isHaveSubAssem(id);
		}
	}else if(style==8){
		var accepttype = $("#accepttype").val();
		select_html += '<option value="" selected="true">请选择仓库</option>';
		var defaultStoreId = $("#defaultStoreId").val();
		var url = "";
		var postdata;
		if (shopType != 5 && shopType != 4 && shopType != 8){//4:义乌 5：合作店 8：集团集采 使用同一个取仓库方式 ，其他跟本地店的方式相同
			if (isVMI == '1') {
				url = "/front/goods/budget/queryVMIDepot.do?from=mobile&redirected=1";
			} else {
				url = "/front/goods/budget/queryDepot.do?from=mobile&redirected=1";
			}
			postdata = {usageId:id,accepttype:accepttype,shopId:shopId,uid:uid,shopType:shopType,defaultStoreId:defaultStoreId,temp:temp};
		}else{
			url = "/front/goods/budget/queryDepotnew.do?from=mobile&redirected=1";
			postdata = {usageId:id,costid:costid,accepttype:accepttype,uid:uid,shopType:shopType,defaultStoreId:defaultStoreId,temp:temp};
		}
		$.getJSON(readAppUrl + url, postdata, function(date){			
			select_html += date.result;
			$("#depot_id").html(select_html);
			$("#depot_id_txt").html("请选择仓库").removeClass('checked-value').addClass('unchecked-value');
		});
	}
}

// 校验是否配置零购采购流程
function checkUsable4Lg() {
	if (isUsableLg != '') {
		return isUsableLg;
	}
	var costid = $("#costunit").val();
	var uid = uid;
	if (costid == '' && $("#costunit")[0][1] != null) {
		costid = $("#costunit")[0][1].value;
	}
	$.ajax({
		type : "POST",
		url: readAppUrl + "/front/goods/budget/checkUsable4Lg.do?from=mobile&redirected=1",
		data :{costid:costid,uid:uid},
		dataType : "json",
		async: false,
		success: function (data) {
			isUsableLg = data.result;
			return isUsableLg;
		}
	});
}

function get4Options(){
	var flag =false;
	var cookieuid=uid+$("#shopId").val();
	var spyt = $.cookie(cookieuid+'eshopspyt');
	var usageName = $.cookie(cookieuid+'eshopspytm'); // 商品用途名称
	var yskm = $.cookie(cookieuid+'eshopyskm');
	var kjkm = $.cookie(cookieuid+'eshopkjkm');
	var qcbzb = $.cookie(cookieuid+'eshopqcbzb');
	var yszy = $.cookie(cookieuid+'eshopyszy');
	var xmd = $.cookie(cookieuid+'eshopxmd');
	var assignment = $.cookie(cookieuid+'eshopassignment');
	var accepttype = $.cookie(cookieuid+'eshopjslx');//接收类型
	var depot_id = $.cookie(cookieuid+'eshopckid');//仓库id

	$("#choiceBuy label").removeClass("cur");
	$('#buyType'+buyType).addClass("cur");
	
	if (buyType == 0) {
		if (projectHtml != "") {
			$('#projectspan2').html(projectHtml);
		}
		$('#projectspan1').hide();  // 零购时显示的项目
		projectHtml = $('#projectspan1').html();
		$('#projectspan1').empty(); // 零购时显示的项目HTML清空
		$('#assignment').hide();
		$('#yskmspan').show();
		$('#kjkmspan').show();
	} else {
	
		if (projectHtml != "") {
			$('#projectspan1').html(projectHtml);
		}
		$('#projectspan1').show();  // 零购时显示的项目
		projectHtml = $('#projectspan2').html();
		$('#projectspan2').empty(); // 普通购买时显示的项目HTML清空
		$('#assignment').show();
		$('#yskmspan').hide();
		$('#kjkmspan').hide();
	}
	// 商品用途
	spyt = autoSelect4Options("","",1);
		
	var isExit = false; 
	var shoptype= $("#shoptype").val();
	var sels=document.getElementById("budget_id");
	if(shoptype=='3'&&sels.length>2){//如果是利旧商店,且只有一个商品用途，隐藏
		 var liobj=document.getElementById("yusuanli");
		 liobj.style.display="block";
	}
	if(spyt==null || spyt=="" ){
		spyt = $("#budget_id").val();
	}
	// cookie中保存有之前选择信息
	if(spyt!=null && spyt!="" ){
		if(shoptype!='3'){//利旧商店不显示级联
			if (buyType == 0) {
				accepttype=autoSelect4Options(spyt,accepttype,7);
				yskm =autoSelect4Options(spyt,yskm,2);
				autoSelect4Options("",yszy,5);//专业
				if(accepttype=="0"){//直发操作
					kjkm = autoSelect4Options(spyt,kjkm,3);
					if(kjkm!="" && kjkm!=undefined &&kjkm!=null){//去查全成本指标
						// 长摊会计科目时，不去全成本指标
						if (kjkm.substr(0,2) == '19') {
							// 隐藏全成本指标
							$("#acst_code").val('');
							$("#acst_code_txt").html('请选择全成本指标').removeClass('checked-value').addClass('unchecked-value');
							$("#acsttd").hide();
						} else {
							flqcbzbag = autoSelect4Options(kjkm,qcbzb,4);
							$("#acsttd").show();
						}
					}
				}else if(accepttype=="1"){//入库操作
					autoSelect4Options(spyt,"1",8);
				}else if(accepttype=="3"){//入库操作
					kjkm = autoSelect4Options(spyt,kjkm,3);
					if(kjkm!=""  && kjkm!=undefined && kjkm!=null){
						// 长摊会计科目时，不去全成本指标
						if (kjkm.substr(0,2) == '19') {
							// 隐藏全成本指标
							$("#acst_code").val('');
							$("#acsttd").hide();
						} else {
							qcbzb = autoSelect4Options(kjkm,qcbzb,4);
							$("#acsttd").show();
						}
					}
					autoSelect4Options(spyt,"3",8);
				}
			} else {
				// 项目
				autoSelect4Options(spyt,xmd,7);
			}
		}
	}
	
	// 零购会计科目和全成本指标与商品用途无关，不加限制
	if (buyType == 1) {

		// 用预算科目取得会计科目
		kjkm = autoSelect4Options("","",3);
		if(kjkm!=""  && kjkm!=undefined && kjkm!=null){
			// 长摊会计科目时，不去全成本指标
			if (kjkm.substr(0,2) == '19') {
				// 隐藏全成本指标
				$("#acst_code").val('');
				$("#acsttd").hide();
			} else {
				qcbzb = autoSelect4Options(kjkm,qcbzb,4);
				$("#acsttd").show();
			}
		}
		// 会计专业
		autoSelect4Options(spyt,"",5);

		if (assetManager == 0) {
			if ($("#divLgAble").css("display") == 'none') {
				//无零购采购权限
			  	$("div[id='cart1']>.tbl-cell").hide();
			  	$("#divLgAble").html("抱歉！您没有零购固定资产采购权限。");
			  	$("#divLgAble").show();
			}
		// 校验没有配置零购采购流程时，不能购买，提示联系管理员
		} else {
			checkUsable4Lg();
			if (isUsableLg == false) {
				if ($("#divLgAble").css("display") == 'none') {
				  	$("div[id='cart1']>.tbl-cell").hide();
				  	$("#divLgAble").html("抱歉！没有进行零购固定资产采购配置，请联系商店管理员。");
				  	$("#divLgAble").show();
				}
			}
		}
	} else {
		$(".summary div.current:first").show();
		$("#table-1").show();
		$("#divLgAble").hide();
	}
}

/**
 * 
 * 判断动态生成的下拉框是否加载完毕,如果加载完毕，则根据cookie的值自动选中
 * cookieId:需要赋值的select的cookieId；selectValue:当前下拉框选择的值；下拉框类型（商品用途、预算类别，预算活动、预算专业）
 * @param {Object} selectValue
 * @param {Object} cookieValue
 * @param {Object} optionsType
 * @return {TypeName} 

 */

function autoSelect4Options(selectValue,cookieValue,optionsType){
	var flag ="";
	var shopId = $("#shopId").val();
	var costid = $('#costunit').val();
	var myDate = new Date();
	var temp = myDate.getTime(); 
	var select_html ="";
	var accepttype="";//接收类型 0：直发，1：入库 2:自行选择 3：费用二次分摊
	if (optionsType==1) {
		var buyTypeTemp = 0;
		if (buyType == 1) {//零购
			buyTypeTemp = 1;
		}else {
			buyTypeTemp = 0;//默认普通购买
			if(shopType == 4){//4:义乌店
				buyTypeTemp = 2;
			}else if(shopType == 5 || shopType == 8){//5：合作店 8：集团集采 
				buyTypeTemp = 3;
			}
		}
		var mobileGoodsType = '${goodsMap.catagory_id}';
		if(shopType == 4 || shopType == 5 || shopType == 8){//4:义乌店 5：合作店 8：集团集采 
			mobileGoodsType = '${goodsMap.goodsType}';
		}
		
		if ($.cookie(cookieuid+'eshopspyt') != null) {
			var cookieValue = $.cookie(cookieuid+'eshopspyt');
			var postdata = {usagekey:'',costid:costid,buyType:buyTypeTemp,goodsType:mobileGoodsType,goodsId:'${goodsMap.id}', usageId:cookieValue, shopId:shopID,shopType:shopType};
			$.ajax({
				type : "POST",
				url: readAppUrl+"/front/goods/budget/searchUsage.do?from=mobile&redirected=1",
				data : postdata,
				dataType : "json",
				async: false,
				success: function (data) {
					if (data.resultType == '1') {
						$(data.result).each(function (index, domEle) { 
							$("#budget_id").val(domEle.id);
							//$("#usageName").val(domEle.name);
							//$("#usageName").css("color","#000");
							$("#budget_id_txt").html(domEle.name).removeClass('unchecked-value').addClass('checked-value');
							flag = $("#budget_id").val();
						});
					} else {
						$("#budget_id").val("");
//						$("#usageName").val("请选择商品用途");
//						$("#usageName").css("color","#999");
						$("#budget_id_txt").html('请选择商品用途').removeClass('checked-value').addClass('unchecked-value');

						flag = ""
					}
				}
			});
		}
		if (flag == '' && '3' != $("#shoptype").val()) {
			if (initUsageId != '' && initIsLgGoods == buyType) {
				$("#budget_id").val(initUsageId);
//				$("#usageName").val(initUsageName);
//				$("#usageName").css("color","#000");
				$("#budget_id_txt").html(initUsageName).removeClass('unchecked-value').addClass('checked-value');				
				flag = initUsageId;
			} else {
				$("#budget_id").val("");
//				$("#usageName").val("请选择商品用途");
//				$("#usageName").css("color","#999");
				$("#budget_id_txt").html('请选择商品用途').removeClass('checked-value').addClass('unchecked-value');
				flag = "";
			}
		}
		return flag;
	} else if(optionsType==2){
		var postdata;
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			//jd
			postdata = {usageId:selectValue,costid:costid,currShopId:shopId,uid:uid,temp:temp};
		}else{
			postdata = {usageId:selectValue,shopId:shopId,currShopId:shopId,uid:uid,temp:temp};
		}
		$.ajax({
			type : "POST",
			url:readAppUrl+"/front/goods/budget/subjectByUsage.do?from=mobile&redirected=1",
			data : postdata,
			dataType : "json",
			async: false,
			success: function (date) {
				if(date.resultType == '0'){
					$("#yskm_show").html("");
					$("#service_id").html("");
					$("#seg_id").html('<option value="" >请选择会计科目</option>');
					$('#seg_id_txt').html('请选择会计科目').removeClass('checked-value').addClass('unchecked-value');
				}
				if(date.resultType == '1'){
					select_html += date.result;
					$("#service_id").html(select_html);
					if($('#service_id').val() == ''){
						$("#service_id_txt").html('请选择预算科目').removeClass('checked-value').addClass('unchecked-value');
					}else{
						$("#service_id_txt").html($('#service_id option:selected').text()).removeClass('unchecked-value').addClass('checked-value');
					};
					$("#yskm_show").html($("#service_id").text());
					select_project(date.projectStr,6);//项目段
					flag = $("#service_id").val();
				}
			}
		});
		return flag;
	}else if(optionsType==3){
		var postdata;
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			//jd
			postdata = {usageId:selectValue,costid:costid,currShopId:shopId,uid:uid,temp:temp};
		}else{
			postdata = {usageId:selectValue,shopId:shopId,uid:uid,temp:temp};
		}
		if (buyType == 0) {
			$.ajax({
				type : "POST",  
				url: readAppUrl+"/front/goods/budget/seginfoByUsage.do?from=mobile&redirected=1",
				data : postdata,
				dataType : "json",
				async: false,
				success: function (date) {
					select_html += date.result;
					$("#seg_id").html(select_html);
					
					// $("#seg_id").hide().show();//解决ie6下不自适应宽度的问题
					flag = $("#seg_id").val();
					if (flag != null && flag != '') {
						$("#kjkm_show").html($("#seg_id").text());
					} else {
						$("#kjkm_show").html('');
					}
					
				}
			});
		} else {
			$("#seg_id").html("<option value='" + lgSegValue + "' selected='true'>" + lgSegName + "</option>");
			$("#seg_id_txt").html('lgSegName').removeClass('unchecked-value').addClass('checked-value');			
			flag = $("#seg_id").val();
		}
		return flag;
	}else if(optionsType==4){
		select_html += '<option value="" selected="true">请选择全成本指标</option>';
		if(shopType != 4 && shopType != 5 && shopType != 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			$.ajax({
				type : "POST",  
				url: readAppUrl+"/front/goods/budget/acst.do?from=mobile&redirected=1",
				data :{segValue:selectValue,shopId:shopId,uid:uid,temp:temp},
				dataType : "json",
				async: false,
				success: function (date) {
				select_html += date.rt;
				$("#acst_code").html(select_html);
				if(cookieValue!=null && cookieValue!=''){
					$("#acst_code").val(cookieValue);
					$("#acst_code_txt").html($("#acst_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
	
				}else{
					$("#acst_code_txt").html('请选择全成本指标').removeClass('checked-value').addClass('unchecked-value');
				}
				flag = $("#acst_code").val();
			}});
		}else{
			$.ajax({
				type : "POST",
				url: readAppUrl+"/front/goods/budget/acstnew.do?from=mobile&redirected=1",
				data :{segValue:selectValue,costid:costid,currShopId:shopId,uid:uid,temp:temp},
				dataType : "json",
				async: false,
				success: function (date) {
					select_html += date.rt;
					$("#acst_code").html(select_html);
					//$("#acst_code").hide().show();//解决ie6下不自适应宽度的问题
					if(cookieValue!=null && cookieValue!=''){
						$("#acst_code").val(cookieValue);
						$("#acst_code_txt").html($("#acst_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
		
					}else{
						$("#acst_code_txt").html('请选择全成本指标').removeClass('checked-value').addClass('unchecked-value');
					}
					flag = $("#acst_code").val();
			}});
		}
		return flag;
	}else if(optionsType==5){
		select_html += '<option value="" selected="true">请选择专业</option>';
		if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
			$.getJSON(readAppUrl+"/front/goods/budget/specialtynew.do?from=mobile&redirected=1",{costid:costid,currShopId:shopId,uid:uid,temp:temp}, function(date){
				select_html += date.rt;
				$("#specialty").html(select_html);
				cookieValue = $.cookie(cookieuid+'eshopyszy');
				if(cookieValue!=null && cookieValue!=''){
					$("#specialty").val(cookieValue);
					$("#specialty_txt").html($("#specialty option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
	
				}else{
					$("#specialty_txt").html('请选择专业').removeClass('checked-value').addClass('unchecked-value');
				}
			});			
		}else{
			$.getJSON(readAppUrl+"/front/goods/budget/specialty.do?from=mobile&redirected=1",{shopId:shopId,uid:uid,temp:temp}, function(date){
				select_html += date.rt;
				$("#specialty").html(select_html);
				var cookieValue = $.cookie(cookieuid+'eshopyszy');//仓库id
				if(cookieValue!=null && cookieValue!=''){
					$("#specialty").val(cookieValue);
					$("#specialty_txt").html($("#specialty option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
	
				}else{
					$("#specialty_txt").html('请选择专业').removeClass('checked-value').addClass('unchecked-value');
				}
			});
		}
	}else if(optionsType==6){
		$.getJSON(readAppUrl+"/front/goods/budget/getAssignment.do?from=mobile&redirected=1",{projectCode:selectValue,costid:costid,currShopId:shopId,uid:uid,temp:temp}, function(data){
			if(data.assignmentStr != null && data.assignmentStr != ''){
				data.assignmentStr = '<option value="" selected="true">请选择任务</option>' + data.assignmentStr;
				$("#assign_code").html(data.assignmentStr);
				if(cookieValue!=null && cookieValue!=''){
					$("#assign_code").val(cookieValue);
					$("#assign_code_txt").html($("#assign_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
				}else{
					$("#assign_code_txt").html('请选择任务').removeClass('checked-value').addClass('unchecked-value');
				}							
			}
		});
	}else if(optionsType==7){
		if (buyType == 0) {
			select_html += '<option value="" selected="true">请选择接收类型</option>';
			var posturl, postdata;
			if(shopType == 4 || shopType == 5 || shopType == 8 ){//4、义乌商店 5、京东商店 8、集团集采商店
				posturl = readAppUrl+"/front/goods/budget/accepttypenew.do?from=mobile&redirected=1";
				postdata = {usageId:selectValue,shopId:shopId,costid:costid,temp:temp};
			}else{
				posturl = readAppUrl+"/front/goods/budget/accepttype.do?from=mobile&redirected=1";
				postdata = {usageId:selectValue,shopId:shopId,temp:temp};
			}
			$.ajax({ 
				type : "POST",
				url: posturl,
				data : postdata,
				dataType : "json",
				async: false,
				success: function (date){
					accepttype=date.isInStore;
					$("#accepttype").val(accepttype);//商品用途对应的是否入库
					$("#seg_value_jf").val(date.seg_value_jf);//商品用途对应的科目组合
					$("#defaultStoreId").val(date.defaultStoreId);//商品用途对应的默认仓库
					
					if(shopType == 4 || shopType == 5 || shopType == 8 ){
						isVMI = "0";
					}else{
						isVMI = date.isVMI;
					}
					if (isVMI == "1") {
						$("#yskmspan").hide();
					} else {
					
						if (buyType == 0) {
							$("#yskmspan").show();
						} else {
							$("#yskmspan").hide();
						}
					}
					if (isVMI == "1") { // VMI库
						// 隐藏段值选择和预算科目
						$("#accepttypetd").hide();
						$("#kjkmspan").hide();
						$("#acsttd").hide();
						$("#specialtd").hide();
						$("#depottd").show();
						//$('#assembly-button').hide();
						var budget_id= $('#budget_id').val();
						select_budget(budget_id,8);//显示仓库
						
					} else if(accepttype=="2"){//自行选择
						
						//此段代码没看懂
						$("#accepttypetd").show();
						$("#specialtd").show();
						toInitAccept2(cookieValue);
						if(cookieValue!=null && cookieValue!=''){
							accepttype=cookieValue;
						} else {
							$("#accepttype_id :selected").removeAttr("selected");
						}
						//此段代码没看懂
					}else if(accepttype=="0"){//直发
						$("#accepttypetd").hide();
						$("#specialtd").show();
						toInitAccept0();
					}else if(accepttype=="1"){//入库
						$("#accepttypetd").hide();
						$("#specialtd").show();
						//$("#depot_id").val(date.defaultStoreId);
						toInitAccept1();
					}else if(accepttype=="3"){//费用二次分摊
						$("#accepttypetd").hide();
						$("#specialtd").show();
						toInitAccept3();
					}
				}
			});
		
		} else {
			// 当页面初始化，成本中心没有直接选中，而商品用途只配置一个被默认选中时，调用该方法没有成本中心
			// 没有成本中心值时需要取第一个值
			if (costid == null || costid == '') {
				costid = $('#costunit')[0][1].value;
			}
			select_html += '<option value="" selected="true">请选择项目</option>';
			$.ajax({
				type : "POST",
				url: readAppUrl+"/front/goods/budget/getProjectsAndAssign.do?from=mobile&redirected=1",
				data :{usageId:selectValue,costid:costid,currShopId:shopId,uid:uid,temp:temp},
				dataType : "json",
				async: false,
				success: function (data) {
					select_html += data.projectStr;
					$("#project_code").html(select_html);
					$("#projectspan1").show();
					
					if(cookieValue!=null && cookieValue!=''){
						$("#project_code").val(cookieValue);
						if ($('#project_code').val() != ''){
							$("#project_code_txt").html($("#project_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
							var assignmentCookieStr = $.cookie(cookieuid+'eshopassignment');
							if (assignmentCookieStr != null && assignmentCookieStr != ''){
								autoSelect4Options($('#project_code').val(),assignmentCookieStr,6);
							}
						}else{
							$('#project_code_txt').html('请选择项目').removeClass('checked-value').addClass('unchecked-value');
						}
					}else{
						$('#project_code_txt').html('请选择项目').removeClass('checked-value').addClass('unchecked-value');
					}
					//后台收不到cookie
//					if(data.assignmentStr != null && data.assignmentStr != ''){
//						data.assignmentStr = '<option value="" selected="true">请选择任务</option>' + data.assignmentStr;
//						$("#assign_code").html(data.assignmentStr);
//						var assignmentCookieStr = $.cookie(cookieuid+'eshopassignment');
//						if (assignmentCookieStr != null && assignmentCookieStr != ''){
//							$("#assign_code").val(assignmentCookieStr);
//							if($("#assign_code").val() != ''){
//								$("#assign_code_txt").html($("#assign_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
//							}else{
//								$('#assign_code_txt').html('请选择任务').removeClass('checked-value').addClass('unchecked-value');
//							}
//						}else{
//							$('#assign_code_txt').html('请选择任务').removeClass('checked-value').addClass('unchecked-value');
//						}
//					}
				}
			});
			// 接收类型默认为直发
			$("#accepttype").val("0");
			$("#acsttd").show();
			// 和成本预算购买对应起来，此处加载会计科目组合
			isHaveSubAssem(selectValue);
		}
		return accepttype;
	}else if(optionsType==8){
		var accepttype = cookieValue;
		select_html += '<option value="" selected="true">请选择仓库</option>';
		var defaultStoreId=$("#defaultStoreId").val();
		var url = "";
		if(shopType != 5 && shopType != 4 && shopType != 8){//4:义乌 5：合作店 8：集团集采 使用同一个取仓库方式 ，其他跟本地店的方式相同
			if (isVMI == '1') {
				url = "/front/goods/budget/queryVMIDepot.do?from=mobile&redirected=1";
			} else {
				url = "/front/goods/budget/queryDepot.do?from=mobile&redirected=1";
			}
			postdata = {usageId:selectValue,accepttype:accepttype,shopId:shopId,uid:uid,shopType:shopType,defaultStoreId:defaultStoreId,temp:temp};
		}else{
			url = "/front/goods/budget/queryDepotnew.do?from=mobile&redirected=1";
			postdata = {usageId:selectValue,accepttype:accepttype,shopId:shopId,uid:uid,costid:costid,shopType:shopType,defaultStoreId:defaultStoreId,temp:temp}
		}
		$.getJSON(readAppUrl + url, postdata, function(date){
			select_html += date.result;
			$("#depot_id").html(select_html);
			//$("#selec"+style).show();
			var depot_id = $.cookie(cookieuid+'eshopckid');//仓库id
			if(depot_id!=null && depot_id!=''){
				$("#depot_id").val(depot_id);
				$("#depot_id_txt").html($("#depot_id option:selected").text()).removeClass('unchecked-value').addClass('checked-value');

			}else{
				$("#depot_id_txt").html('请选择仓库').removeClass('checked-value').addClass('unchecked-value');
			}		
		});
		
	}	
}

//验证某商品用途是否配了科目组合,未知用途
function isHaveSubAssem(usageID){
	//科目组合的配置在手机端暂未使用，如使用，则需考虑义乌、京东、集团集采的情况
	/**
	url = "${readAppUrl}/front/goods/budget/getSubjectAssembly.do?shopID=${shopId}&usageID="+ usageID +"&jsonpcallback=?";
	$.getJSON(url,null,function(data){
		if(data.length>0){
			$('#assembly-button').show();
			subjectsJson = data;
			var subjectStr = "";
			for(i=0;i<data.length;i++){
				subjectStr += "<li><a href=\"javascript:void(0)\" onclick=\"chgDesc("+ i +")\" id='sub"+i+"'>"+ data[i].name +"</a></li>"
			}
			$("#subjects").html(subjectStr);
		}else{
			$('#assembly-button').hide();
		}
	});
	**/
}

function select_project(projectStr,style){
  	var select_html = '<option value="" >请选择项目段</option>';
  	  select_html +=projectStr;
	  $("#project_code").html(select_html);
	  if($('#project_code').val() != ''){
		  $("#project_code_txt").html($("#project_code option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
	  }else{
		  $("#project_code_txt").html('请选择项目段').removeClass('checked-value').addClass('unchecked-value');
	  }
	  var sels=document.getElementById("project_code");
	  if(sels.options.length>2 || sels.options.length==1){
	     $("#projectspan2").show();
	  }else{
	      $("#projectspan2").hide();
	  }
}

/***
 * 
 * 将购买时或加入购物车时把选择的成本中心加入cookie
 */
function saveCostunit(){
	var costId= $('#costunit').val();
	if(costId!='' && costId!=undefined){
		$.cookie(uid+$("#shopId").val()+'costunit',costId,{expires:9999999});
	}
	select_budget(costId,1);
}

/***
 * 
 * 判断是直发，还是入库
 */
function toChangeAccept(){
  var accepttype_id= $('#accepttype_id').val();
  if(accepttype_id=="0"){//直发
      toAccept2();
  //自由选择时为直发、二次分摊；入库为：采购入库用途
  //}else if(accepttype_id=="1"){//入库
  //   toAccept3();
  }else if(accepttype_id=="3"){//费用二次分摊
      toAccept4();
  }else{
    toAccept1();
   }
}
 /***
 * 
 * 处理直发操作
 */
function toAccept2(){
  // $("#segtd").show();
  $("#kjkmspan").show();
  $("#acsttd").show();
  $("#depottd").hide();
  var budget_id= $('#budget_id').val();
   $("#accepttype").val("0");
  select_budget(budget_id,2);//根据商品用途选择预算科目
  isHaveSubAssem(budget_id); 

}

 /***
 * 
 * 处理入库操作
 */
function toAccept3(){
  // $("#segtd").hide();
  $("#kjkmspan").hide();
  $("#acsttd").hide();
  $("#depottd").show();
  $("#accepttype").val("1");
  var budget_id= $('#budget_id').val();
  select_budget(budget_id,2);//根据商品用途选择预算科目
  //$('#assembly-button').hide();
  select_budget(budget_id,8);//显示仓库
  
}

 /*
 * 处理费用二次分摊操作
 */
function toAccept4(){
  // $("#segtd").show();
  $("#kjkmspan").show();
  $("#acsttd").show();
  $("#depottd").show();
  $("#accepttype").val("3");
  var budget_id= $('#budget_id').val();
  var costunit = $('#costunit').val();
  select_budget(budget_id,2);//根据商品用途选择预算科目
  select_budget(budget_id,8);//显示仓库
  isHaveSubAssem(budget_id);// 科目组合选择
  
}

 /***
 * 
 * 处理自行选择操作
 */
function toAccept1(){
  // $("#segtd").hide();
  $("#acsttd").hide();
  $("#depottd").hide();
  $("#accepttype").val("2");
  
}

/**
 * 
 * 将购买时的四个下拉框存入cookie
 */
function save4Options(){
	//alert('in save4Options');
	var cookieuid=uid+$("#shopId").val();
	var costId= $('#costunit').val();
	var budget_id  = $('#budget_id').val();//商品用途id
	var usageName  = $('#usageName').val();//商品用途名称
	var service_id = $('#service_id').val();//预算科目
	var seg_id   = $('#seg_id').val();//会计科目
	var acst_code  = $('#acst_code').val();//全成本指标
	var specialty   = $('#specialty').val();//预算专业
	var project_code  = $('#project_code').val();//项目段
	var assign_code = $('#assign_code').val();//任务
	var accepttype  = $('#accepttype').val();//接收类型
	var depot_id  = $('#depot_id').val();//仓库id

	if(costId==undefined){
		costId="";
	}
	if( budget_id==undefined){
		budget_id="";
	}
	if( usageName==undefined){
		usageName="";
	}
	if(service_id==undefined){
 		service_id="";
		}
 	if(seg_id==undefined){
 		seg_id ="";
	}
	if(acst_code==undefined){
 		acst_code="";
	}
 	 if(specialty==undefined){
 		specialty="";	
	}
	 if(project_code==undefined){
 		project_code="";		
	}
	if(assign_code==undefined){
		assign_code="";		
	}
	 if(accepttype==undefined){
 		accepttype="";		
	}
	 if(depot_id==undefined){
 		depot_id="";		
	}
		$.cookie(cookieuid+'costunit',costId,{expires:9999999});
	 	$.cookie(cookieuid+'eshopspyt',budget_id,{expires:9999999});
	 	$.cookie(cookieuid+'eshopspytm',usageName,{expires:9999999});
 		$.cookie(cookieuid+'eshopyskm',service_id,{expires:9999999});
        $.cookie(cookieuid+'eshopkjkm',seg_id,{expires:9999999});
        $.cookie(cookieuid+'eshopqcbzb',acst_code,{expires:9999999});
        $.cookie(cookieuid+'eshopyszy',specialty,{expires:9999999});
        $.cookie(cookieuid+'eshopxmd',project_code,{expires:9999999});
        $.cookie(cookieuid+'eshopassignment',assign_code,{expires:9999999});
        $.cookie(cookieuid+'eshopckid',depot_id,{expires:9999999});
        $.cookie(cookieuid+'eshopjslx',accepttype,{expires:9999999});
        $.cookie(cookieuid+'eshopbuytype',buyType,{expires:9999999});
}

/***
 * 
 * 判断是直发，还是入库
 */
function toInitAccept2(cookieValue){

  if(cookieValue=="0"){//直发
	  $("#accepttype_id").val("0");
	  //$("#acceptType_id").trigger('change');
	  $('#accepttype_id_txt').html($("#accepttype_id").find("option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
      toInitAccept0();
  //}else if(cookieValue=="1"){//入库
  //  $("#accepttype_id").val("1");
  //  $('#accepttype_id_txt').html($("#accepttype_id").find("option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
  //  toInitAccept1();
   }else if(cookieValue=="3"){//费用分摊
		$("#accepttype_id").val("3");
		$('#accepttype_id_txt').html($("#accepttype_id").find("option:selected").text()).removeClass('unchecked-value').addClass('checked-value');
		toInitAccept3();
	}else{
		toInitAccept();
   }
  
}
 /***
 * 
 * 处理直发操作
 */
function toInitAccept0(){
  // $("#segtd").show();
  $("#kjkmspan").show();
  $("#acsttd").show();
  $("#depottd").hide();
  var budget_id= $('#budget_id').val();
   $("#accepttype").val("0");
  isHaveSubAssem(budget_id);

}

 /***
 * 
 * 处理入库操作
 */
function toInitAccept1(){
  // $("#segtd").hide();
  $("#kjkmspan").hide();
  $("#acsttd").hide();
  $("#depottd").show();
   $("#accepttype").val("1");
   //$('#assembly-button').hide();
}

/*
* 处理二次分摊操作
*/
function toInitAccept3(){
	// $("#segtd").show();
	$("#kjkmspan").show();
	$("#acsttd").show();
	$("#depottd").show();
	$("#accepttype").val("3");
	var budget_id= $('#budget_id').val();
	var costunit = $('#costunit').val();
	isHaveSubAssem(budget_id);
	
}

function toInitAccept(){
	   // $("#segtd").hide();
	   $("#acsttd").hide();
	   $("#depottd").hide();
	 }



//规格html生成
var jsonArr;
function renderSpec(jsonStr){
	//var jsonStr = "[{id:1,name:\"笔芯颜色\",value:[\"红色\",\"黑色\",\"蓝色\"]},{id:2,name:\"笔芯粗细\",value:[\"0.7mm\",\"0.4mm\",\"0.9mm\"]}]";//商品规格json串
	//var jsonStr = "${specs}";//商品保存的json串
	
	if(jsonStr!=''){
		jsonArr = eval("("+ jsonStr +")");//格式化json
	}
	//var goodsId = ${goodsMap.id};//商品ID
	$(function(){
		if(jsonStr==''){
			//如果无规格,直接查找产品
			getProduct(goodsID);
		}else{
			//显示已选择规格
			var chosen = "";
			for(var i=0;i<jsonArr.length;i++){
				var html = "<input type='hidden' value='' name='spec-"+ jsonArr[i].id +"' id='spec-"+ jsonArr[i].id +"'>";
				$("#hidd_id").append(html);
				//chosen += "<span id='chosen-"+ jsonArr[i].id +"'></span>";
				
				chosen += "<span class='s-block'>";
                chosen += "<span class='text-fl2-1row'>" + jsonArr[i].name + "：</span>";
                chosen += "<span class='text-overflow'>";
                chosen += "<span class='to-text3' id='chosen-" + jsonArr[i].id + "'>请选择</span>";
                chosen += "</span>";
                chosen += "</span>";								
			}
			//chosen += "</span></p>";
			//指示箭头
			chosen += "<span class='icon-arr'></span>";
			
			$("#specBtn").append(chosen);
		}				
	});
}

//选择规格
function setValue(sid,value,specVid,obj){
	//将值写到隐藏域
	$("#spec-"+sid).val(value);
	//将选择的值写到已选择
	$("#chosen-"+sid).html(value);
	//添加已选样式
	$("#specVal"+specVid).parent().siblings().children().removeClass("current");
	$("#specVal"+specVid).addClass("current");
	
	$('.spec-item').each(function(index, element) {
		if($(element).data('specId') == sid){
			$(element).removeClass('cur');
			$(element).children('input').prop('checked', 'false');
		}
	});
	$(obj).addClass('cur');
	
	//判断是否选全
	if(isSelectAll()){
		//如果选全，拼接json串，然后ajax查找相应产品
		var specStr = "";
		for(var i=0;i<jsonArr.length;i++){
			specStr += jsonArr[i].name + ":" + $("#spec-"+jsonArr[i].id).val();
			if(i!=jsonArr.length-1){
				specStr += ",";	
			}
		}
		//ajax查找相应产品
		getProduct(goodsID,specStr);
	}
	
}

//判断是否选全
function isSelectAll(){
	var resultNum = 0;
	for(var i=0;i<jsonArr.length;i++){
		var val = $("#spec-"+jsonArr[i].id).val();
		if(val!=''){
			resultNum += 1;
		}
	}
	if(resultNum==jsonArr.length){
		return true;	
	}else{
		return false;	
	}
}

//根据goodsId和json串查找商品
function getProduct(goodsId,specStr){
	//alert('in getproduct');
	$.post(
			readAppUrl + "/front/goods/getProduct.do?from=mobile&redirected=1",
			{goodsId:goodsId,specJson:specStr},
			function(data){
				var obj = data;
				if(obj.id==0){
					$("#productId").val(0);
					mobilerealAlert('该商品暂无！', false);
				}else{
					$("#productId").val(obj.id);
					$("#company_price").html('￥' + obj.company_price.toFixed(2));//改变商品价格显示，含税单价
					$("#sell_price").html('￥' + obj.sellPrice.toFixed(2));//改变商品价格显示 净价
					$("#market_price").html('￥' + obj.marketPrice.toFixed(2)); //市场价
					if(obj.tax_price!=-99){
						$("#tax_price").html('￥' + obj.tax_price.toFixed(2));
					}
					if(obj.tax_price==-99){
						$("#tax_price").html('-');
					}
					if(obj.taxRate!=-99){
						var taxRateNew = obj.taxRate*100;
						$("#taxRate").html(taxRateNew.toFixed(2) + "%");
					}
					if(obj.taxRate==-99){
						$("#taxRate").html("-%");
					}
					if(obj.isvirtual==0){
						$("#store_nums").html('现货 ' + obj.storeNums);
					}else{
						$("#store_nums").html('有货');
					}								
				}
			},'json'
	);
}

//获取库存情况
var stockState = '';
function ajaxLoadStockState(goodsID){
	var url = readAppUrl + "/front/goods/getJdStockState.do?from=mobile&redirected=1&goodsID="+ goodsID+"&jsonpcallback=?";
	var stockStr = '';
	//如果已经有数据不再取
	if(stockState == ''){
		$.getJSON(url,null,function(data){
			stockState = data;
			ajaxLoadStockState(goodsID);
		});
	}else{
		var sclass = '';
		$('#areaList').html('');
		stockStr = "<li class='sub-category2-li'>";
		for(i=0;i<stockState.length;i++){
			var current = stockState[i];
			var sclass = '';
			if(current.store_desc == '无货'){
			    sclass = 'stock-value-zr';
			}else{
			    sclass = 'stock-value';				
			}
            stockStr += "<a class='new-category2-a' href='#' ><span class='stock-title'>";
            if ((i+1)%3 != 1){
            	stockStr += " <span class='new-bar'></span>";
            }
            if(shopCode != 'womai'){
            	stockStr += current.area +"：</span><span class=' " + sclass + "'>[" + current.store_desc +"]</span></a>";
            }else{
            	stockStr += current.area +"：</span><span class=' " + sclass + "'>[" + current.qutity +"]</span></a>";
            }
            
            if((i+1)%3 ==0){
            	stockStr += "</li>";
            	if (i!=(stockState.length-1)){
            		stockStr += "<li class='sub-category2-li'>";
            	}
            }

			/**
			if(current.store_desc == '无货'){
				var sclass = 'no-stock';
			}
			<c:if test="${shopCode==womai_code}"> 
				stockStr += "<li><span class='area-title'>"+ current.area +"：</span><span class='"+sclass+"'>["+ current.qutity +"]</span></li>";
			</c:if>
			<c:if test="${shopCode!=womai_code}"> 
				stockStr += "<li><span class='area-title'>"+ current.area +"：</span><span class='"+sclass+"'>["+ current.store_desc +"]</span></li>";
			</c:if>
			**/
		}
		var j = (stockState.length)%3;
		if(j != 0){
			for(var i=3;i>j;i--){
				 stockStr += "<a class='new-category2-a' href='#' ><span class='stock-title'><span class='new-bar'></span>&nbsp;";
		         stockStr += "</span><span class='stock-value'>&nbsp;</span></a>";	
			}
			stockStr += "</li>";
		}
		$('#areaList').html(stockStr);

	}
	
}


var feeInfo = '';
function ajaxLoadFeeState(ngoodsid){
	var url = readAppUrl + "/front/goods/getYWPostFee.do?from=mobile&redirected=1&gid="+ ngoodsid +"&uid=" + uid + "&jsonpcallback=?";
	var stockStr = '';
		$.getJSON(url,null,function(data){
			//alert('ajaxLoadFeeState');
			feeInfo = data;
			$('#areaList').attr("state","full");
			if(feeInfo != ''){
				
				//------
				stockStr = "<li class='sub-category2-li'>";
				for(i=0;i<feeInfo.length;i++){
					var current = feeInfo[i];
					var sclass = 'stock-value';				
		            stockStr += "<a class='new-category2-a' href='#' ><span class='stock-title'>";
		            if ((i+1)%3 != 1){
		            	stockStr += " <span class='new-bar'></span>";
		            }
		            stockStr += current.city_name  +"：</span><span class=' " + sclass + "'>￥" +  current.format_fare +"</span></a>";
		            
		            if((i+1)%3 ==0){
		            	stockStr += "</li>";
		            	if (i!=(feeInfo.length-1)){
		            		stockStr += "<li class='sub-category2-li'>";
		            	}
		            }
				}
				var j = (feeInfo.length)%3;
				if(j != 0){
					for(var i=3;i>j;i--){
						 stockStr += "<a class='new-category2-a' href='#' ><span class='stock-title'><span class='new-bar'></span>&nbsp;";
				         stockStr += "</span><span class='stock-value'>&nbsp;</span></a>";	
					}
					stockStr += "</li>";
				}
				$('#areaList').html(stockStr);
				//-------
				//for(i=0;i<feeInfo.length;i++){
				//	var current = feeInfo[i];
				//	stockStr += "<li><span class='area-title'>"+ current.city_name +"：</span><span>&nbsp;￥"+ current.format_fare +"</span></li>";
				//	$('#areaList').html(stockStr);
				//	}
			}
			if(feeInfo == ''){
				stockStr += "<li><span>暂无运费信息</span></li>";
				$('#areaList').html(stockStr);
			}
		});
}


function disableBtn(isBuyNow){
	if (isBuyNow ==0){
		$('#add_cart').addClass('disable');
	}else{
		$('#directorder').addClass('disable');
	}	
}

function enableBtn(isBuyNow){
	if (isBuyNow ==0){
		$('#add_cart').removeClass('disable');
	}else{
		$('#directorder').removeClass('disable');
	}
	hideLoading();
}

function checkBtnDisable(isBuyNow){
	if (isBuyNow ==0){
		return $('#add_cart').hasClass('disable');
	}else{
		return $('#directorder').hasClass('disable');
	}
}
//加入购物车
//isBuyNow=1,立即购买,isBuyNow=0,加入购物车
function addCart(isBuyNow){
	
	showLoading();
	if(checkBtnDisable(isBuyNow)){
		return;
	}
	
	disableBtn(isBuyNow);
	
	var productsId = $("#productId").val();
	var shoptype= $("#shoptype").val();
	var budget_id  = $('#budget_id').val();//商品用途
	var accepttype=$("#accepttype").val();//商品用途对应的是否入库
	var seg_value_jf=$("#seg_value_jf").val();//商品用途对应的科目组合
	var depot_id = $("#depot_id").val();
	if(buyType == 1){//如果是零购时，接收类型固定为直发，且非vmi
		accepttype = 0;
		isVMI = '0';
	}
	if(shoptype!="3"){
		var service_id = $('#service_id').val();//预算科目
		var specialty  = $('#specialty').val();//预算专业
		var project = $("#project_code").val();//项目段
		var assign_code = $("#assign_code").val();//任务
		var costId= $('#costunit').val();
		if (isVMI == '1') {
			if(depot_id==''||depot_id==undefined){
				mobilerealAlert("请选择仓库名称", false);
				return false;
			}
			var acst_code = "0";// 全成本指标
			specialty = "";     // 预算专业
		} else if(accepttype=="0"){//接收方式：直发
			var seg_id   = $('#seg_id').val();//会计科目
			var acst_code = $("#acst_code").val();//全成本指标
			depot_id="";//仓库id
		} else if(accepttype=="1"){//接收方式：入库
			var seg_id   = seg_value_jf;//会计科目
			var acst_code = "0";//全成本指标
			if(depot_id==''||depot_id==undefined){
				mobilerealAlert("请选择仓库名称", false);
				enableBtn(isBuyNow);
				return false;
			}
			
		} else if(accepttype=="3"){//接收方式：费用分摊
			var seg_id = $('#seg_id').val();//会计科目
			var acst_code = $("#acst_code").val();//全成本指标
			if(depot_id==''||depot_id==undefined){
				mobilerealAlert("请选择仓库名称", false);
				enableBtn(isBuyNow);
				return false;
			}
		}
		
	}else{
		var service_id = "";
		var seg_id   = "";
		var acst_code = "";//全成本指标
		var specialty  = "";//预算专业
		var project = "";//项目段
		var costId="";
	}
	var number = parseInt($('#number').val());
	var numOfFengzhuang= $("#numOfFengzhuang").val();
	var miniNumOfOrder= $("#miniNumOfOrder").val();
	if(number==undefined){
		mobilerealAlert("请输入正确的购买数量", false);
		$("#number")[0].focus();
		enableBtn(isBuyNow);
		return false;
	}
		  
	if(number%numOfFengzhuang!=0){
		mobilerealAlert('请输入封装量的倍数!', false);
		$("#number")[0].focus();
		enableBtn(isBuyNow);
		return false;
	}
	
	if(isNaN(productsId)||productsId==0){
		mobilerealAlert("未找到相应产品，或未选择规格", false);
		enableBtn(isBuyNow);
		return false;
	}
	if(shoptype!="3"){ //不是利旧商店检查商品用途，预算类别、预算活动、预算专业、成本中心
		if(costId==''||costId==undefined){
			mobilerealAlert("请选择成本中心", false);
			enableBtn(isBuyNow);
			return false;
		}
		// VMI采购不需要验证段值
		if (isVMI == '1') {
			if(budget_id==''||budget_id==undefined){
				mobilerealAlert("请选择商品用途", false);
				enableBtn(isBuyNow);
				return false;
			}
		} else if(budget_id==''||budget_id==undefined){
			mobilerealAlert("请选择商品用途",false);
			enableBtn(isBuyNow);
			return false;
		} else if(accepttype == '2' && $("#accepttype_id").val()==''){
			mobilerealAlert("请选择接收类型");
			enableBtn(isBuyNow);
			return false;
		}else if(buyType == 1 && (project==''||project==undefined)){
			mobilerealAlert("请选择项目",false);
			enableBtn(isBuyNow);
			return false;
		}else if(buyType == 1 && (assign_code==''||assign_code==undefined)){
			mobilerealAlert("请选择任务",false);
			enableBtn(isBuyNow);
			return false;
		}else if(seg_id==''||seg_id==undefined){
			mobilerealAlert("请选择会计科目",false);
			enableBtn(isBuyNow);
			return false;
		}else if((acst_code==''||acst_code==undefined)&&seg_id.substr(0,2) != '19'){
			mobilerealAlert("请选择全成本指标",false);
			enableBtn(isBuyNow);
			return false;
		}else if(specialty==''||specialty==undefined){
			mobilerealAlert("请选择专业",false);
			enableBtn(isBuyNow);
			return false;
		}else if(buyType == 0 && (project==''||project==undefined)){
			mobilerealAlert("请选择项目段",false);
			enableBtn(isBuyNow);
			return false;
		}else if(buyType == 0 && (service_id==''||service_id==undefined)){
			mobilerealAlert("请选择预算科目",false);
			enableBtn(isBuyNow);
			return false;
		}
	}else{//利旧商店只检查商品用途
		if(budget_id==''||budget_id==undefined){
			mobilerealAlert("请选择商品用途",false);
			enableBtn(isBuyNow);
			return false;
		}else{//获取入库直发
			accepttype="0";//商品用途对应的是否入库
		}
		
	}
	save4Options();//购买或者加入购物车时，再次保存四个下拉框
	if(shopType!='3' && isVMI == '0'){//排除利旧商店
		//交叉验证 
		var _url = readAppUrl+"/front/goods/budget/checkInfoSingle.do?from=mobile&redirected=1"
		var user_name = encodeURIComponent(encodeURIComponent(userName));
		$.ajax({ 
			type : "POST",
			url: _url,
			data :{costId:costId,specialtyId:specialty,segValue:seg_id,uid:uid,userName:user_name,projectValue:project},
			dataType : "json",
			async: true,
			success: function (date){
				if(date.resultType == '0'){
					hideLoading();
					 mobilerealAlert(date.result, true);
					 enableBtn(isBuyNow);
					 return;
				}else{
				//-------------
					//ajax加入购物车
					var url = readAppUrl + "/mobile/goods/goodscart/add.do?from=mobile&redirected=1&jsonpcallback=?";
					$.getJSON(url,{is_ajax:1,uid:uid,token:token,timestamp:timestamp,projectValue:project ,productsId: productsId,subjectCode:service_id, usageId: budget_id,activeCode:acst_code,segValue:seg_id,specialtyId:specialty,nums:number,shopCode:shopCode,uuid:uuid,costId:costId,isStorage:accepttype,storage_id:depot_id,assign_code:assign_code,isProject:buyType, is_vmi:0,province:province},function(data){
					if (!data.result) {
						hideLoading();
						mobilerealError(data.msg, true);
						enableBtn(isBuyNow);
					}else{
						hideLoading();
						mobilerealAlert(data.msg);
						enableBtn(isBuyNow);
					// 更新购物车数量
						//parent.updateGoodscartCounts();
						// 如果是立即购买
							if (isBuyNow) {
							window.location.href = writeAppUrl + "/front/mobile/goodscart.do?from=mobile&redirected=1&showback=1&"+shopUrl;
							}
						}
					})
				//-------------
				}
			}
		});
	}else if(shopType!='3' && isVMI == '1'){ // VMI采购

		//ajax加入购物车
		var url = readAppUrl + "/mobile/goods/goodscart/add.do?from=mobile&redirected=1&jsonpcallback=?";
		$.getJSON(url,{is_ajax:1,uid:uid,token:token,timestamp:timestamp,projectValue:project ,productsId: productsId,subjectCode:service_id, usageId: budget_id,activeCode:acst_code,segValue:seg_id,specialtyId:specialty,nums:number,shopCode:shopCode,uuid:uuid,costId:costId,isStorage:accepttype,storage_id:depot_id,assign_code:assign_code,isProject:buyType, is_vmi:1},function(data){

			if (!data.result) {
				hideLoading();
				mobilerealError(data.msg, true);
				enableBtn(isBuyNow);
			}else{
				hideLoading();
				mobilerealAlert('添加到购物车成功', false);
				enableBtn(isBuyNow);
				// 更新购物车数量,移动端屏蔽掉
				//parent.updateGoodscartCounts();
				// 如果是立即购买
				if (isBuyNow) {
					window.location.href = writeAppUrl + "/front/mobile/goodscart.do?from=mobile&redirected=1&showback=1&"+shopUrl;
				}
			}
		})
	}else{
		//-------------
		//ajax加入购物车
		var url = readAppUrl + "/mobile/goods/goodscart/add.do?from=mobile&redirected=1&jsonpcallback=?";
		$.getJSON(url,{is_ajax:1,uid:uid,token:token,timestamp:timestamp,projectValue:project ,productsId: productsId,subjectCode:service_id, usageId: budget_id,activeCode:acst_code,subjectCode:service_id,segValue:seg_id,specialtyId:specialty,nums:number,shopCode:shopCode,uuid:uuid,costId:costId,isStorage:accepttype,storage_id:depot_id},function(data){
			//alert('adsf');
			if (!data.result) {
				hideLoading();
				mobilerealError(data, true);
				enableBtn(isBuyNow);
			}else{
				hideLoading();
				if(!isBuyNow){
					mobilerealAlert(data.msg, false);
				}
				enableBtn(isBuyNow);
			// 更新购物车数量，移动端屏蔽掉
				//parent.updateGoodscartCounts();
			// 如果是立即购买
				if (isBuyNow) {
					window.location.href = writeAppUrl + "/front/mobile/goodscart.do?from=mobile&redirected=1&showback=1&"+shopUrl;
				}
			}
		})
		//-------------
	}
}

//[ajax]加入收藏夹
function addFavorate(id){
	$.getJSON(
		addFavorite+id+"&shopCode="+shopCode+"&uuid="+uuid+"&jsonpcallback=?",
		function(data){
			//var obj = eval("("+data+")");
			var obj = data;
			if(obj.status==1){
				alert("收藏成功！");	
			}else if(obj.status==0){
				alert("您已收藏过此商品");	
			}else if(obj.status==2){
				alert("收藏失败！请咨询管理员");	
			}else if(obj.status==3){
				alert("未登录，请先登录！");	
			}						
		}
	);
}