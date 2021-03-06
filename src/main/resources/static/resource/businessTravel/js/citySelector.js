/* *
 * ---------------------------------------- *
 * ---------------------------------------- *
 * */

/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
var readAppUrl = readAppUrl||"/";
var commonParams = commonParams || "";
var allCity=null;//存放城市信息的变量
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};
/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */
//Vcity.allCity = ['阿勒泰|aletai|alt|AAT','包头|baotou|bt|BAV','喀什|kashi|ks|KHG','高雄|gaoxiong|gx|KHH','南昌|nanchang|nc|KHN','喀纳斯|kanasi|kns|KJI','昆明|kunming|km|KMG','吉安|jian|ja|KNC','赣州|ganzhou|gz|KOW','库尔勒|kuerle|kel|KRL','克拉玛依|kelamayi|klmy|KRY','贵阳|guiyang|gy|KWE','蚌埠|bangbu|bb|BFU','桂林|guilin|gl|KWL','连城|liancheng|lc|LCX','伊春|yichun|yc|LDS','老河口|laohekou|lhk|LHK','梨山|lishan|ls|LHN','兰州|lanzhou|lz|LHW','梁平|liangping|lp|LIA','丽江|lijiang|lj|LJG','永州|yongzhou|yz|LLF','吕梁|lvliang|ll|LLV','北海|beihai|bh|BHY','临沧|lincang|lc|LNJ','芒市|mangshi|ms|LUM','庐山|lushan|ls|LUZ','拉萨|lasa|ls|LXA','林西|linxi|lx|LXI','洛阳|luoyang|ly|LYA','连云港|lianyungang|lyg|LYG','临沂|linyi|ly|LYI','柳州|liuzhou|lz|LZH','泸州|luzhou|lz|LZO','博乐|bole|bl|BPL','林芝|linzhi|lz|LZY','牡丹江|mudanjiang|mdj|MDG','绵阳|mianyang|my|MIG','梅县|meixian|mx|MXZ','马公|magong|mg|MZG','南充|nanchong|nc|NAO','南苑|nanyuan|ny|NAY','长白山|changbaishan|cbs|NBS','齐齐哈尔|qiqihaer|qqhe|NDG','宁波|ningbo|nb|NGB','保山|baoshan|bs|BSD','阿里|ali|al|NGQ','南京|nanjing|nj|NKG','那拉提|nalati|nlt|NLT','南宁|nanning|nn|NNG','南阳|nanyang|ny|NNY','南通|nantong|nt|NTG','满洲里|manzhouli|mzl|NZH','漠河|mohe|mh|OHE','北京|beijing|bj|PEK','上海浦东|shanghaipudong|shpd|PVG','长安|changan|ca|CAL','攀枝花|panzhihua|pzh|PZI','四川|sichuan|sc|SCH','上海虹桥|shanghaihongqiao|shhq|SHA','沈阳|shenyang|sy|SHE','秦皇岛|qinhuangdao|qhd|SHP','沙市|shashi|ss|SHS','石家庄|shijiazhuang|sjz|SJW','汕头|shantou|st|SWA','鄯善|shanshan|ss|SXJ','思茅|simao|sm|SYM','广州|guangzhou|gz|CAN','三亚|sanya|sy|SYX','苏州|suzhou|sz|SZV','深圳|shenzhen|sz|SZX','青岛|qingdao|qd|TAO','塔城|tacheng|tc|TCG','腾冲|tengchong|tc|TCZ','铜仁|tongren|tr|TEN','通辽|tongliao|tl|TGO','天水|tianshui|ts|THQ','济南|jinan|jn|TNA','潮州|chaozhou|cz|CCC','通化|tonghua|th|TNH','台南|tainan|tn|TNN','台北|taibei|tb|TPE','台北松山|taibeisongshan|tbss|TSA','天津|tianjin|tj|TSN','台东|taidong|td|TTT','唐山|tangshan|ts|TVS','台中|taizhong|tz|TXG','屯溪|tunxi|tx|TXN','太原|taiyuan|ty|TYN','常德|changde|cd|CGD','乌鲁木齐|wulumuqi|wlmq|URC','榆林|yulin|yl|UYN','潍坊|weifang|wf|WEF','威海|weihai|wh|WEH','芜湖|wuhu|wh|WHU','文山|wenshan|ws|WNH','温州|wenzhou|wz|WNZ','乌海|wuhai|wh|WUA','武汉|wuhan|wh|WUH','武夷山|wuyishan|wys|WUS','郑州|zhengzhou|zz|CGO','无锡|wuxi|wx|WUX','梧州|wuzhou|wz|WUZ','万州|wanzhou|wz|WXN','兴城|xingcheng|xc|XEN','襄樊|xiangfan|xf|XFN','西昌|xichang|xc|XIC','锡林浩特|xilinhaote|xlht|XIL','兴宁|xingning|xn|XIN','西关|xiguan|xg|XIQ','西安|xian|xa|XIY','兴义|xingyi|xy|ACX','长春|changchun|cc|CGQ','厦门|xiamen|xm|XMN','西宁|xining|xn|XNN','邢台|xingtai|xt|XNT','徐州|xuzhou|xz|XUZ','宜宾|yibin|yb|YBP','运城|yuncheng|yc|YCU','宜春|yichun|yc|YIC','宜昌|yichang|yc|YIH','伊宁|yining|yn|YIN','义乌|yiwu|yw|YIW','朝阳|chaoyang|cy|CHG','铱兰|yilan|yl|YLN','延吉|yanji|yj|YNJ','烟台|yantai|yt|YNT','盐城|yancheng|yc|YNZ','扬州泰州|yangzhoutaizhou|yztz|YTY','元谋|yuanmou|ym|YUA','玉树|yushu|ys|YUS','张掖|zhangye|zy|YZY','昭通|zhaotong|zt|ZAT','恰赫巴哈尔|qiahebahaer|qhbhe|ZBR','酒泉|jiuquan|jq|CHW','湛江|zhanjiang|zj|ZHA','中卫|zhongwei|zw|ZHY','苏黎士|sulishi|sls|ZRH','珠海|zhuhai|zh|ZUH','遵义|zunyi|zy|ZYI','黄龙|huanglong|hl|JZH','赤峰|chifeng|cf|CIF','长治|changzhi|cz|CIH','重庆|chongqing|cq|CKG','长海|changhai|ch|CNI','长沙|changsha|cs|CSX','成都|chengdu|cd|CTU','常州|changzhou|cz|CZX','百色|baise|bs|AEB','大同|datong|dt|DAT','达县|daxian|dx|DAX','丹东|dandong|dd|DDG','迪庆|diqing|dq|DIG','大连|dalian|dl|DLC','大理|dali|dl|DLU','敦煌|dunhuang|dh|DNH','东营|dongying|dy|DOY','大庆|daqing|dq|DQA','鄂尔多斯|eerduosi|eeds|DSN','安康|ankang|ak|AKA','张家界|zhangjiajie|zjj|DYG','大足|dazu|dz|DZU','恩施|enshi|es|ENH','延安|yanan|ya|ENY','二连浩特|erlianhaote|elht|ERL','罗马|luoma|lm|fco','福州|fuzhou|fz|FOC','阜阳|fuyang|fy|FUG','佛山|foshan|fs|FUO','富蕴|fuyun|fy|FYN','阿克苏|akesu|aks|AKU','广汉|guanghan|gh|GHN','格尔木|geermu|gem|GOQ','高崎|gaoqi|gq|GQI','广元|guangyuan|gy|GYS','海口|haikou|hk|HAK','邯郸|handan|hd|HDG','黑河|heihe|hh|HEK','呼和浩特|huhehaote|hhht|HET','合肥|hefei|hf|HFE','杭州|hangzhou|hz|HGH','鞍山|anshan|as|AOG','黄花|huanghua|hh|HHA','淮安|huaian|ha|HIA','芷江|zhijiang|zj|HJJ','香港|xianggang|xg|HKG','海南|hainan|hn|HKK','海拉尔|hailaer|hle|HLD','乌兰浩特|wulanhaote|wlht|HLH','哈密|hami|hm|HMI','衡阳|hengyang|hy|HNY','虹桥|hongqiao|hq|HQG','安庆|anqing|aq|AQG','哈尔滨|haerbin|heb|HRB','舟山|zhoushan|zs|HSN','和田|hetian|ht|HTN','徽州|huizhou|hz|HUZ','路桥|luqiao|lq|HYN','汉中|hanzhong|hz|HZG','黎平|liping|lp|HZH','银川|yinchuan|yc|INC','且末|qiemo|qm|IQM','庆阳|qingyang|qy|IQN','安顺|anshun|as|AVA','景德镇|jingdezhen|jdz|JDZ','加格达奇|jiagedaqi|jgdq|JGD','嘉裕关|jiayuguan|jyg|JGN','井冈山|jinggangshan|jgs|JGS','景洪|jinghong|jh|JHG','金昌|jinchang|jc|JIC','吉林|jilin|jl|JIL','锦江|jinjiang|jj|JIN','黔江|qianjiang|qj|JIQ','九江|jiujiang|jj|JIU','安阳|anyang|ay|AYN','晋江|jinjiang|jj|JJN','佳木斯|jiamusi|jms|JMU','济宁|jining|jn|JNG','锦州|jinzhou|jz|JNZ','池州|chizhou|cz|juh','衢州|quzhou|qz|JUZ','鸡西|jixi|jx|JXA','九寨|jiuzhai|jz|JZH','库车|kuche|kc|KCA','康定|kangding|kd|KGT'];

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*\|(\w+)$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */

function dataHandle() {
	Vcity.allCity = allCity;
    var citys = Vcity.allCity, match, letter,
        regEx = Vcity.regEx,
        reg2 = /^[a-h]$/i, reg3 = /^[i-p]$/i, reg4 = /^[q-z]$/i;
		Vcity.oCode = {hot:{},ABCDEFGH:{}, IJKLMNOP:{}, QRSTUVWXYZ:{}};
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},ABCDEFGH:{}, IJKLMNOP:{}, QRSTUVWXYZ:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCDEFGH[letter]) Vcity.oCity.ABCDEFGH[letter] = [];
                Vcity.oCity.ABCDEFGH[letter].push(match[1]);
				if (!Vcity.oCode.ABCDEFGH[letter]) Vcity.oCode.ABCDEFGH[letter] = [];
				Vcity.oCode.ABCDEFGH[letter].push(match[4]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.IJKLMNOP[letter]) Vcity.oCity.IJKLMNOP[letter] = [];
                Vcity.oCity.IJKLMNOP[letter].push(match[1]);
				if (!Vcity.oCode.IJKLMNOP[letter]) Vcity.oCode.IJKLMNOP[letter] = [];
				Vcity.oCode.IJKLMNOP[letter].push(match[4]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.QRSTUVWXYZ[letter]) Vcity.oCity.QRSTUVWXYZ[letter] = [];
                Vcity.oCity.QRSTUVWXYZ[letter].push(match[1]);
				if (!Vcity.oCode.QRSTUVWXYZ[letter]) Vcity.oCode.QRSTUVWXYZ[letter] = [];
				Vcity.oCode.QRSTUVWXYZ[letter].push(match[4]);
            }
            /* 热门城市 前16条 */
            if(i<16){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
				if(!Vcity.oCode.hot['hot']) Vcity.oCode.hot['hot'] = [];
				Vcity.oCode.hot['hot'].push(match[4]);
            }
        }
    }
};
//校验用户手动输入的城市名称,如果没有使用鼠标点击,会造成code为空或不正确,进而改成输入正确的城市名称后自动对隐藏域code进行赋值
//name:输入的城市名称   hiddenId:隐藏域ID
function cityValidateFn(name,hiddenId){
	var pageCode=$("#"+hiddenId).val();//隐藏域开市隐藏code
	if(name==null||name=="") return false;
	var validateCode = cityValidate[name];//通过城市名称获取正确城市code
	if(validateCode==null || validateCode=="") return false;
	if(validateCode!=pageCode) {
		$('#'+hiddenId).val(validateCode);	
	}
	return true;
}
/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">热门城市(支持汉字/拼音/简拼)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>ABCDEFGH</li>',
    '<li>IJKLMNOP</li>',
    '<li>QRSTUVWXYZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
    	var input = options.input;
    	this.input = Vcity._m.$('#'+ input);
    	this.inputEvent();
    	this.createHiddenInput(this.input);
    },
	
	createHiddenInput:function(input){
		var hiddenInput = document.createElement("input");
		hiddenInput.type = "hidden";
		hiddenInput.name = input.name + "Code";//生成城市code隐藏域
		hiddenInput.id = input.name + "Code";//生成城市code隐藏域
		this.hinput = hiddenInput;
		input.parentNode.insertBefore(hiddenInput, hiddenInput.nextSibling);
	},

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
            oCity = Vcity.oCity;
			oCode = Vcity.oCode;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                	var cityName = oCity[key][sortKey[j]][i];
                	if(cityName.length>5) cityName = cityName.substring(0,5);
                    str = '<a href="javascript:void(0)" title="'+oCity[key][sortKey[j]][i]+'" code="'+ oCode[key][sortKey[j]][i] +'">' + cityName + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
				//console.log(that.hinput.value = this.getAttribute('code'));////////////////
                that.input.value = this.title;
				that.hinput.value = this.getAttribute('code');
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
                if(that.input.value == ''||that.input.value == '支持中文/拼音/简拼输入')
                	that.input.style.color='#aaa';
                else
                	that.input.style.color='#333';
                if(that.input.id == 'departCity')
                	choseStartArea(that.hinput.value,null);
                else if(that.input.id == 'arriveCity')
                	choseEndArea(that.hinput.value,null);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        Vcity._m.on(this.input,'focus',function(){
            that.input.select();
            if(that.input.value == '支持中文/拼音/简拼输入') that.input.value = '';
        });
        Vcity._m.on(this.input,'blur',function(){
            if(that.input.value == '') that.input.value = '支持中文/拼音/简拼输入';
            if(that.input.value == ''||that.input.value == '支持中文/拼音/简拼输入'){
            	document.getElementById(that.input.id).style.color='#aaa';
            }else{
            	document.getElementById(that.input.id).style.color='#333';
            }
//            choseArea(cityValidate[that.input.value],that.input.id);
        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();
            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
            if(that.input.id == 'departCity')
            	choseStartArea(that.hinput.value,null);
            else if(that.input.id == 'arriveCity')
            	choseEndArea(that.hinput.value,null);
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li code="'+ match[4] +'"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on" code="'+ match[4] +'"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
               //str = '<li class="empty">对不起，没有找到数据 "<em>' + value + '</em>"</li>';
               	str = '<li class="empty">对不起，暂不支持该地点</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
				this.hinput.value = lis[this.count].getAttribute('code');
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
//                choseArea(this.hinput.value,this.input.id);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
			//var hinputValue = lis[i].getAttribute('code');
			(function(data){
				 Vcity._m.on(data,'click',function(event){
		                event = Vcity._m.getEvent(event);
		                var target = Vcity._m.getTarget(event);
		                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
						that.hinput.value = data.getAttribute('code');
		                Vcity._m.addClass('hide',that.ul);
		                /* IE6 下拉菜单点击事件 */
		                Vcity._m.addClass('hide',that.myIframe);
		                if(that.input.id == 'departCity')
		                	choseStartArea(that.hinput.value,null);
		                else if(that.input.id == 'arriveCity')
		                	choseEndArea(that.hinput.value,null);
		            });
			})(lis[i]);
			
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};