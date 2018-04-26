/*
	TMail Sider - jQuery TMail Sider Plugin
	Author: 		夏の寒风
	Version:		1.0 (2012/12/28)
	QQ:				490720430
	edit by chenz 2013/6/6
	Please use this development script if you intend to make changes to the plugin code.
	For production sites, please use jquery.tmailsider.js.
*/

(function($) {
	var Z_TMAIL_SIDE_DATA = new Array(); // 用来存放列表数据，暂时没有用到
	
	$.fn.Z_TMAIL_SIDER = function(options) {
		var opts = $.extend( {}, $.fn.Z_TMAIL_SIDER.defaults, options);
		var base = this;
		var target = opts.target;
		var Z_MenuList = $(base).find('.Z_MenuList');
		var Z_SubList = $(base).find('.subcatlist');
		initPosition();

		var isIE = navigator.userAgent.indexOf('MSIE') != -1;
		var isIE6 = isIE && ($.browser.version == '6.0');

	 	// 重新定位
		$(window).resize(function() {
			initPosition();
		});
		
	    //if(isIE6) return;
	    
	    //判断分辨率,add chenz
		/**
		if(screen.width<1030||isCateHidden){
			$('#cats').addClass('cats-hide');
			OpenOrCloseMenu(100);
			if(screen.width<1030){
				//窄屏宽度自适应
				$('body').addClass('narrow-screen');
			}
			$('#all-sort').hover(function(){
				$('#cats').show();
			},function(){
				$('#cats').hide();
				$(Z_SubList).hide();
				$('.hide').hide();
			});
			$('#cats').hover(function(){
				
			},function(){
				$('#cats').hide();
				$('.hide').hide();
			});
		}else{
		*/
			$('#cats').css('display','block');
			$(Z_MenuList).hover(function(){
				
			},function(){
				$(Z_SubList).hide();
			});
	//	}
	    
	    
	    
		$(Z_MenuList).find('li').live('mouseover', function(e, index) {
			var thisLi = this;
			var timeOut = setTimeout(function() {
				showSubList(thisLi);
			},0);
			$(Z_SubList).hover(function() {
				clearTimeout(timeOut);
			},function() {
				hideSubList(thisLi);
			});
			e.stopPropagation();
		}).live('mouseout', function(e) {
			var thisLi = this;
			var timeOut = setTimeout(function(){
				hideSubList(thisLi);
			}, 0);
			$(Z_SubList).hover(function() {
				clearTimeout(timeOut);
			},function() {
				hideSubList(thisLi);
			});
			e.stopPropagation();
		});
		
		if(!isIE6) {
			$('.all-sort').append('<s class="btn_group bright"><a class="bleft"></a><a class="bright"></a></s>');
			$('.all-sort .btn_group a').click(function() {
				if($(this).attr('class') == 'bleft' && $(this).parent().attr('class') == 'btn_group bleft') {
					$('.all-sort .btn_group').attr('class', 'btn_group bright');
					OpenOrCloseMenu(0);
					opts.autoExpan = true;
				}
				if($(this).attr('class') == 'bright' && $(this).parent().attr('class') == 'btn_group bright') {
					$('.all-sort .btn_group').attr('class', 'btn_group bleft');
					OpenOrCloseMenu(100);
					opts.autoExpan = false;
				}
			});
			//$('#allsort').append($('.all-sort').html());
		}
		
		if(!isIE6) {
			$(Z_MenuList).find('li').click(function() {
				$(this).find('p').slideToggle(500);
			});
		}

		function showSubList(thisLi) {
			if(!isIE6) {
				$(thisLi).append('<s class="menuIcon"></s>');
				$(thisLi).addClass('curr');
			}
			var thisIndex = $(Z_MenuList).find('li').index($(thisLi));
			var subExList = $(Z_SubList).find('div');
			if(thisIndex > subExList.length - 1) return;

			var winHeight = $(window).height();
			var subTop = $(thisLi).offset().top - $(window).scrollTop();
			var subBottom = winHeight - subTop - $(Z_SubList).height();
			
			var absTop = $(thisLi).offset().top - $(window).scrollTop() - opts.fTop;
			if($(window).scrollTop()>150){
				absTop = $(thisLi).offset().top - $(window).scrollTop();
			}
			if(isIE6) {
				absTop = $(thisLi).offset().top - opts.fTop;
			}
			var absLeft = 220;
			if(subBottom < 40) {
				absTop = absTop + subBottom - 40;
			}
			
			$(subExList).each(function(index) {
				if(index == thisIndex) {
					$(this).show();
					//alert(index);					
				} else {
					$(this).hide();
				}
			});
			
			$(Z_SubList).show().stop().animate({
				top: absTop,
				left: absLeft
			}, 0);
		};

		function hideSubList(thisLi) {
			if(!isIE6) {
				$(thisLi).find('.menuIcon').remove();
				$(thisLi).removeClass('curr');
			}
			//$(Z_SubList).hide();
		};
		
		// 定位
		function initPosition() {
			if($(base).css('position') == 'abs2olute') {
				$(base).css({
					top: $(target).offset().top, 
					left: $(target).offset().left - $(base).width()
				}).show();

				$(Z_SubList).css({
					top: $(target).offset().top - 60,
					left: $(target).offset().left - $(base).offset().left
				});
			}
			if($(base).css('position') == 'fixed') {
				$(base).css({
					top: opts.fTop, 
					left: $(target).offset().left - $(base).width()
				}).show();
				$(Z_SubList).css({
					top: opts.cTop - 60,
					left: $(target).offset().left - $(base).offset().left
				});
			}
		};
		
		// 折叠
		function OpenOrCloseMenu(l) {
			var mList = $(Z_MenuList).find('ul li');
			for(var i = 0; i < l; i++) {
				if(i < mList.length) {
					var thisLi = $(mList[i]);
					$(thisLi).find('p').slideUp(500, function (){
						$(this).hide();
					});
				}
			}
			
			for(var i = mList.length - 1; i >= l; i--) {
				if(i >= 0) {
					var thisLi = $(mList[i]);
					$(thisLi).find('p').slideDown(500, function (){
						$(this).show();
					});
				}
			}
		};
		
		/**
		// 滚动折叠
		var scrollTimeOut;
		$(window).scroll(function() {
			var sTop = $(window).scrollTop();
			if(sTop>=opts.fTop){
				$('#slidewrap').addClass('fixdiv');
				$('#allsort').show();
			}else{
				$('#slidewrap').removeClass('fixdiv');
				$('#allsort').hide();
			}
			if(!opts.autoExpan) return;
			if(isIE6) return;
			clearTimeout(scrollTimeOut);

			if(sTop >= opts.cTop) {
				var l = parseInt((sTop - opts.fTop - opts.cTop)/opts.unitHeight);
				scrollTimeOut = setTimeout(function() {
					OpenOrCloseMenu(l);
				},200);
			} else {
				scrollTimeOut = setTimeout(function() {
					OpenOrCloseMenu(0);
				},200);
			}
		});
		*/
	};
	
	// 默认配置项
	$.fn.Z_TMAIL_SIDER.defaults = {
		target: '#Z_RightSide',
		fTop: 152, // 距离顶部距离
		cTop: 100, // 滚动条滚动多少像素后开始折叠的高度
		unitHeight: 110, // 每滚动多少距离折叠一个
		autoExpan: true
	};
})(jQuery);

//
$(function(){
	$('#cats').Z_TMAIL_SIDER();
})