/*
 * 搜索引擎
 */
//高亮的索引

/**
      var highLightIndex = -1; 
      
	  function getText(txt){
	  	  var myEvent = event || windows.event; 
          var keyCode = myEvent.keyCode; 
		  //处理上下键(up,down)
		  if(keyCode == 38 || keyCode == 40){ 
               processKeyUpAndDown(keyCode); 
           //按下了回车键 
          }else if(keyCode == 13){ 
               processEnter(); 
          }else{
          	   if(txt==""){
				  document.all.content.style.display='none';
			   }else{
			  	  txt= trim(txt);
				  document.all.content.innerHTML="";   
			  	  rendCaption(txt);
				  //document.all.content.style.display="";
			   }
          }   
		 
	  }
	  
	  /** 
       * 处理按上下键的情况 
       */ 
      function processKeyUpAndDown(keyCode){ 
          var words = $('#content').children(); 
          var num = words.length; 
          if(num <= 0) return; 
          changeToWhite(); 
          
          highLightIndex = ((keyCode != 38 ? num + 1:num - 1)+highLightIndex) % num; 
          words.eq(highLightIndex).css('background-color','#4474BB'); 
          $('#txt').val(words.eq(highLightIndex).html()); 
      } 
      
      /** 
       * 如果有高亮的则把高亮变白 
       */ 
      function changeToWhite(){ 
      
          if(highLightIndex != -1){ 
              $('#content').children().eq(highLightIndex).css('background-color','white'); 
          } 
      } 
      **/
      
	  function trim(str){ //翻页 跳转页面时，删除左右两端的空格
		  return str.replace(/(^\s*)|(\s*$)/g, "");
	  }
		
    
	  
	  /**
	  function do_mouseover(obj,index){
          $('#content').children().css('background-color','#fff'); 
	  	  obj.style.background='#4474BB';
	  	  highLightIndex = index; 
	  }
	  
	  function do_mouseout(obj,index){
	  	  obj.style.background="#fff";
	  	  highLightIndex = index; 
	  }
	  **/