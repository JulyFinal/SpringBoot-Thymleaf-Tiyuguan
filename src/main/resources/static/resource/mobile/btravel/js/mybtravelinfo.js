$(function(){
var readAppUrl = "${readAppUrl}";
var writeAppUrl = "${writeAppUrl}";

$("#applytime").mobiscroll().date({ 
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
        label:'出发日期'
    });
	$("#stime").mobiscroll().date({ 
	//  preset: 'date', //日期
	    theme: "ios", //皮肤样式
	    display: 'modal', //显示方式
	//  mode: 'clickpick', //日期选择模式
	    dateFormat: 'yy-mm-dd', // 日期格式
	    setText: '确定', //确认按钮名称
	    cancelText: '取消',//取消按钮名籍我
	    dateOrder: 'yymmdd', //面板中日期排列格式
	    dayText: '日', monthText: '月',
	    yearText: '年',hourText:'时', minuteText:'分',//面板中年月日文字
	    endYear:2020,//结束年份
	    inputClass:'inputdummy',
	    label:'出发日期'
	});
	$("#etime").mobiscroll().date({ 
	//  preset: 'date', //日期
	    theme: "ios", //皮肤样式
	    display: 'modal', //显示方式
	//  mode: 'clickpick', //日期选择模式
	    dateFormat: 'yy-mm-dd', // 日期格式
	    setText: '确定', //确认按钮名称
	    cancelText: '取消',//取消按钮名籍我
	    dateOrder: 'yymmdd', //面板中日期排列格式
	    dayText: '日', monthText: '月',
	    yearText: '年',hourText:'时', minuteText:'分',//面板中年月日文字
	    endYear:2020,//结束年份
	    inputClass:'inputdummy',
	    label:'出发日期'
	});

});