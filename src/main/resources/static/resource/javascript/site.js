//关闭product购物车弹出的div
function closeCartDiv()
{
	$('#product_myCart').hide('slow');
	$('.submit_join').attr('disabled','');
}

//商品移除购物车
function removeCart(urlVal,goods_id,type)
{
	var goods_id = parseInt(goods_id);

	$.getJSON(urlVal,{goods_id:goods_id,type:type},function(content){
		if(content.isError == false)
		{
			$('[name="mycart_count"]').html(content.data['count']);
			$('[name="mycart_sum"]').html(content.data['sum']);
		}
		else
		{
			alert(content.message);
		}
	});
}

//添加收藏夹
function favorite_add_ajax(urlVal,goods_id,obj)
{
	$.getJSON(urlVal,{goods_id:goods_id,nocache:((new Date()).valueOf())},function(content){
		if(content.isError == false)
		{
			obj.value = content.message;
		}
		else
		{
			alert(content.message);
		}
	});
}

//寄存购物车[ajax]
function deposit_ajax(urlVal)
{
	$.getJSON(urlVal,{is_ajax:'1'},function(content){
		if(content.isError == false)
		{
			alert(content.message);
		}
		else
		{
			alert(content.message);
		}
	});
}

//购物车展示
function showCart(urlVal)
{
	$.get(urlVal,{sign:Math.random()},function(content)
	{
		if($.trim(content) != '')
		{
			$('#div_mycart').html(content);
			$('#div_mycart').show();
		}
	});
}

//自动完成
function autoComplete(ajaxUrl,linkUrl,minLimit)
{
	var minLimit = minLimit ? parseInt(minLimit) : 2;
	var maxLimit = 10;
	var keywords = $.trim($('input:text[name="word"]').val());

	//输入的字数通过规定字数
	if(keywords.length >= minLimit && keywords.length <= maxLimit)
	{
		$.getJSON(ajaxUrl,{word:keywords},function(content){

			//清空自动完成数据
			$('.auto_list').empty();

			if(content.isError == false)
			{
				for(var i=0; i < content.data.length; i++)
				{
					var searchUrl = linkUrl.replace('@word@',content.data[i].word);
					$('.auto_list').append('<li onclick="event_link(\''+searchUrl+'\')" style="cursor:pointer"><a href="javascript:void(0)">'+content.data[i].word+'</a>约'+content.data[i].goods_nums+'个结果</li>');
					//鼠标经过效果
					$('.auto_list li').bind("mouseover",
						function()
						{
							$(this).addClass('hover');
						}
					);
					$('.auto_list li').bind("mouseout",
						function()
						{
							$(this).removeClass('hover');
						}
					);
				}
				$('.auto_list').show();
			}
			else
			{
				$('.auto_list').hide();
			}
		});
	}
	else
	{
		$('.auto_list').hide();
	}
}

//输入框
function checkInput(para,textVal)
{
	var inputObj = (typeof(para) == 'object') ? para : $('input:text[name="'+para+'"]');

	if(inputObj.val() == '')
	{
		inputObj.val(textVal);
	}
	else if(inputObj.val() == textVal)
	{
		inputObj.val('');
	}
}

//dom载入成功后开始操作
jQuery(
	function()
	{
		var allsortLateCall = new lateCall(200,function(){$('#div_allsort').show();});
		//商品分类
		$('.allsort').hover(
			function(){
				allsortLateCall.start();
			},
			function(){
				allsortLateCall.stop();
				$('#div_allsort').hide();
			}
		);
		$('.sortlist li').each(
			function(i)
			{
				$(this).hover(
					function(){
						$(this).addClass('hover');
						$('.sublist:eq('+i+')').show();
					},
					function(){
						$(this).removeClass('hover');
						$('.sublist:eq('+i+')').hide();
					}
				);
			}
		);
		
		
		
		
		var allshopLateCall = new lateCall(200,function(){$('#div_allshop').show();});
		//全部商店
		$('.allshop').hover(
			function(){
				allshopLateCall.start();
			},
			function(){
				allshopLateCall.stop();
				$('#div_allshop').hide();
			}
		);
		$('.shoplist li').each(
			function(i)
			{
				$(this).hover(
					function(){
						$(this).addClass('hover');
						$('.shopsublist:eq('+i+')').show();
					},
					function(){
						$(this).removeClass('hover');
						$('.shopsublist:eq('+i+')').hide();
					}
				);
			}
		);

		//排行,浏览记录的图片
		$('#ranklist li').hover(
			function(){
				$(this).addClass('current');
			},
			function(){
				$(this).removeClass('current');
			}
		);

		//自动完成input框 事件绑定
//		var tmpObj = $('input:text[name="word"]');
//		var defaultText = tmpObj.val();
//		tmpObj.bind({
//			focus:function(){checkInput($(this),defaultText);},
//			blur :function(){checkInput($(this),defaultText);}
//		});
	}
);



//[ajax]加入购物车
function joinCart_ajax(id,type)
{
	var url ="index.php?controller=simple&action=joinCart&goods_id=@goods_id@&random=@random@&type=@type@";
	url = url.replace("@random@",Math.random()).replace("@goods_id@",id).replace("@type@",type);
	$.getJSON(url,function(content){
		if(content.isError == false)
		{
			var count = parseInt($('[name="mycart_count"]').html());
			$('[name="mycart_count"]').html(count + 1);
			$('.msgbox').hide();
			alert(content.message);
		}
		else
		{
			alert(content.message);
		}
	});
}

//列表页加入购物车统一接口
function joinCart_list(id)
{
	var url = "index.php?controller=simple&action=getProducts&id=@id@";
	$.get('index.php?controller=simple&action=getProducts',{id:id},function(content){
		if(content == '')
		{
			joinCart_ajax(id,'goods');
		}
		else
		{
			$('#product_box_'+id).html(content);
			$('#product_box_'+id).parent().show();
		}
	});
}
