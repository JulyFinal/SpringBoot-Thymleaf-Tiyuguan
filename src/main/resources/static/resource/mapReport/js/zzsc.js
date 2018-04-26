// JavaScript Document
$(document).ready(function(e) {
	/***不需要自动滚动，去掉即可***/
	
	/***不需要自动滚动，去掉即可***/
	linum = $('.mainlist li').length;//图片数量
	w = linum * 105;//ul宽度
	$('.piclist').css('width', w + 'px');//ul宽度
	$('.swaplist').html($('.mainlist').html());//复制内容
	
	$('.og_next').click(function(){
		//alert('2');
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>3){//多于4张图片
			ml = parseInt($('.mainlist').css('left'));//默认图片ul位置
			sl = parseInt($('.swaplist').css('left'));//交换图片ul位置
			if(ml<=0 && ml>w*-1){//默认图片显示时
				$('.swaplist').css({left: '315px'});//交换图片放在显示区域右侧
				$('.mainlist').animate({left: ml - 315 + 'px'},'30000');//默认图片滚动				
				if(ml==(w-315)*-1){//默认图片最后一屏时
					$('.swaplist').animate({left: '0px'},'3000');//交换图片滚动
				}
			}else{//交换图片显示时
				$('.mainlist').css({left: '315px'})//默认图片放在显示区域右
				$('.swaplist').animate({left: sl - 315 + 'px'},'30000');//交换图片滚动
				if(sl==(w-315)*-1){//交换图片最后一屏时
					$('.mainlist').animate({left: '0px'},'3000');//默认图片滚动
				}
			}
		}
	})
	$('.og_prev').click(function(){
		//alert('3');
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>3){
			ml = parseInt($('.mainlist').css('left'));
			sl = parseInt($('.swaplist').css('left'));
			if(ml<=0 && ml>w*-1){
				$('.swaplist').css({left: w * -1 + 'px'});
				$('.mainlist').animate({left: ml + 315 + 'px'},'30000');				
				if(ml==0){
					$('.swaplist').animate({left: (w - 315) * -1 + 'px'},'3000');
				}
			}else{
				$('.mainlist').css({left: (w - 315) * -1 + 'px'});
				$('.swaplist').animate({left: sl + 315 + 'px'},'30000');
				if(sl==0){
					$('.mainlist').animate({left: '0px'},'3000');
				}
			}
		}
	})    
});

//$('#cg_newgoodsList').onmouseover=function() {window.clearInterval(time)};
//$('#cg_newgoodsList').onmouseout=function() {time=setInterval(Marquee,speed)};


$(document).ready(function(){
	$('.og_prev,.og_next').hover(function(){
			$(this).fadeTo('fast',1);
		},function(){
			$(this).fadeTo('fast',0.7);
	})

})

