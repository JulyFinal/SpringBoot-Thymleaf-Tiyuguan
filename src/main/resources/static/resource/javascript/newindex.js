
//dom载入成功后开始操作
jQuery(
	function()
	{
		
		var allshopLateCall = new lateCall(200,function(){$('#div_allshop').show();});
		//全部商店
		$('.tzggallshop').hover(
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

