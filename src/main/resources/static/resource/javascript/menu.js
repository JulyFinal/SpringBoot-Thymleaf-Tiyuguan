   var nav_menu=[{"name":"商品","id":"1","link":"/eshopadmin/admin/goods/brand/brand.do"},
	            {"name":"库存","id":"2","link":"/eshopadmin/admin/goods/warehouse/warehouse.do"},
	            {"name":"订单","id":"3","link":"/eshopadmin/order/dealorder.do"},
	            {"name":"会员","id":"4","link":"/eshopadmin/refer/referList.do"},
	            {"name":"统计","id":"5","link":""},
	            {"name":"预算","id":"6","link":"/eshopadmin/budget/deptbudget.do"},
	            {"name":"系统","id":"7","link":"/eshopadmin/sysmanager/index.do"},
	            {"name":"工具","id":"8","link":"/eshopadmin/announce/announceList.do"}
	            ];
   /**
   *left:每一个模块的菜单
   *navId：上方导航的id编号
   *treeId:左侧选中的节点
   *baseUrl:相对路径
   */	            
function initMenu(left,navId,selectId,baseUrl){
	var nav=nav_menu;
	for(i in nav)
	{
		if(nav[i]['id']==navId)
		{
			$('#menu ul').append('<li class="selected"><a href="'+baseUrl+nav[i]['link']+'">'+nav[i]['name']+'</a></li>');
            var item = '';
            for(j in left)
            {
                item = '<li><span>'+ left[j].name+'</span><ul name="menu">';
                var list=left[j].list;
                for(k in list)
                {
                    if( list[k].id == selectId ){
                       item +='<li class="selected"><a href="'+baseUrl+list[k]['link']+'" >'+list[k].name+'</a></li>';
                    } else{
                    	item +='<li><a href="'+baseUrl+list[k]['link']+'">'+list[k].name+'</a></li>';
                    }
                }
                $('.submenu').append(item+'</ul></li>');
            }
		}
		else
		{
			$('#menu ul').append('<li><a href="'+baseUrl+nav[i]['link']+'" hidefocus = "true">'+nav[i]['name']+'</a></li>');
		}
	}
}





