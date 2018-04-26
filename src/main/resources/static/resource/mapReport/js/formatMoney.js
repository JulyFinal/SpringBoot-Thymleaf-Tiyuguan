//js处理金额千位用逗号分隔,s表示金额，type表示小数位数	
	function formatMoney(s, type) { 
		if (/[^0-9\.]/.test(s)) 
			return "0"; 
		if (s == null || s == "") 
			return "0"; 
		s = s.toString().replace(/^(\d*)$/, "$1."); 
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1"); 
		s = s.replace(".", ","); 
		var re = /(\d)(\d{3},)/; 
		while (re.test(s)) 
		s = s.replace(re, "$1,$2"); 
		s = s.replace(/,(\d\d)$/, ".$1"); 
		if (type == 0) {// 不带小数位(默认是有小数位) 
			var a = s.split("."); 
				if (a[1] == "00") { 
				s = a[0]; 
			} 
		} 
		return s; 
	} 