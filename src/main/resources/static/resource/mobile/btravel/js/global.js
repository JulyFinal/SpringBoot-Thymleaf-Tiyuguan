$(function(){
	$("#homePage").click(function(){
		location.href = writeAppUrl+"/mobile/btravel/mobileIndex.do?"+commonParams+"&from=mobile";
	});
	$("#customerService").click(function(){
		//location.href = "${writeAppUrl}/mobile/btravel/mobileIndex.do?&from=mobile&uid="+data.uid+"&uuid="+data.uuid+"&shopCode="+data.shopCode;
		location.href = readAppUrl + "/mobile/btravel/kf.do?&from=mobile";
	});
	$("#my").click(function(){
		location.href = writeAppUrl+"/businessTravel/myBtravelInfo.do.do?"+commonParams+"&from=mobile";
	});
});