/*
 * jQuery.selectboxMobile
 * 
 * @author		hom
 * @copyright	Copyright (C) KICKcreative Co., All Rights Reserved.
 * 
 */


;(function($) {

	/**
	 * selectboxMobile
	 * @param    
	 * 
	 **/
	
	$.fn.selectboxMobile = function(_configs) {
		
		var __this = [];
		
		return this.each(function() {
			
			var _public = {
				// obj_custom_css for outside use custom new ui
				obj_custom_css: {},
				
				// evtChange_after_hook is user change option after for outside hook
				evtChange_after_hook: false
			};
			
			var _privaty = {
				$body: $(document),
				
				// $OBJ is select element
				$OBJ: {},
				// obj_default_css is select default css
				obj_default_css: {},
				
				// $wrap is select wrap
				$wrap: {},
				
				// $handle is custom select's skin
				$handle: {},
				
				// $arrow is custom select's arrow
				$arrow: {},
				
				// step option info
				STEP_INFO: '',
				
				// Setup is plugin constructor
				Setup: function() {
					_this.$OBJ = $(this);
					
					// initialize custom select setting
					_this.initSelect();
				},
				// statusReset is reset custom select ui status
				statusReset: function() {
					_this.$wrap.removeClass('active');
					_this.$wrap.removeClass('hover');
				},
				// initSelect is hidden native OS select menu
				initSelect: function() {
					_this.obj_default_css = {
						//width: _this.$OBJ.width(),
						width: '100%',
						height: _this.$OBJ.height(),
						'line-height': _this.$OBJ.height() + 'px',
						'font-size': _this.$OBJ.css('font-size'),
						'font-family': _this.$OBJ.css('font-family'),
						'font-weight': _this.$OBJ.css('font-weight'),
						'color': _this.$OBJ.css('color')
					};

					_this.$OBJ.css({
						'-webkit-appearance': 'none',
						'min-height': '100%',
						'max-height': '100%'
					});
					
					_this.obj_default_css = $.extend(_this.obj_default_css, _this.obj_custom_css);
					
					_this.$OBJ.wrap('<div class="selectbox-mobile-wrap" />');
					
					_this.$wrap = _this.$OBJ.parent();
					_this.$wrap.prepend('<div class="handle" /><div class="arrow" />');
					
					_this.$handle = _this.$wrap.find('.handle');
					_this.$handle.css(_this.obj_default_css);
					_this.$wrap.css({
						//width: _this.$handle.outerWidth(),
						width: '100%',
						height: _this.$handle.outerHeight(),
						'margin': _this.$OBJ.css('margin') == '' ? _this.$OBJ.css('margin-top') + ' ' + _this.$OBJ.css('margin-right') + ' ' + _this.$OBJ.css('margin-bottom') + ' ' + _this.$OBJ.css('margin-left') : _this.$OBJ.css('margin'),
						'padding': _this.$OBJ.css('padding') == '' ? _this.$OBJ.css('padding-top') + ' ' + _this.$OBJ.css('padding-right') + ' ' + _this.$OBJ.css('padding-bottom') + ' ' + _this.$OBJ.css('padding-left') : _this.$OBJ.css('padding')
					});
					
					_this.$arrow = _this.$wrap.find('.arrow');
					
					_this.displayInfo();
					
					_this.setSelectEvent();
					
					_this.setJqProto();
				},
				// displayInfo is show select step option in custom select
				displayInfo: function() {
					var info = _this.$OBJ.find('option').eq(_this.$OBJ[0].selectedIndex).text();
					_this.$handle.text(info);
					if (_this.STEP_INFO != info) {
						_this.$wrap.width('auto');
						_this.$handle.width('auto');
						_this.$handle.width(_this.obj_default_css.width > _this.$handle.width() ? _this.obj_default_css.width : 'auto');
						_this.$wrap.css({
							width: _this.$handle.outerWidth(),
							height: _this.$handle.outerHeight()
						});
					}
					_this.STEP_INFO = info;
				},
				// setSelectEvent is contorl custom select ui status
				setSelectEvent: function() {
					// add select events
					_this.$OBJ.bind('mouseover', _this.evtMouseOver);
					_this.$OBJ.bind('mouseout', _this.evtMouseOut);
					_this.$OBJ.bind('focus', _this.evtMouseDown);
					_this.$OBJ.bind('blur', _this.statusReset);
					_this.$OBJ.bind('change', _this.evtChange);
				},
				evtChange: function() {
					_this.$OBJ.trigger('blur');
					$(__this).each(function(i) {
						__this[i].displayInfo();
					});
					if (_this.evtChange_after_hook) _this.evtChange_after_hook();
				},
				evtMouseDown: function(e) {
					e.stopPropagation();
					_this.$wrap.addClass('active');
				},
				evtMouseOver: function() {
					_this.$wrap.addClass('hover');
				},
				evtMouseOut: function() {
					_this.$wrap.removeClass('hover');
				},
				// setJqProto is support outside call inside function
				setJqProto: function() {
					// add function to jquery object
					var jq_proto = _this.$OBJ.__proto__ || _this.$OBJ.constructor.prototype;
					
					jq_proto.destroy = function() {
						this.each(function(i) {
							_this.destroy.call(this, __this[i]);
						});
					};
				},
				// destroy is destroy custom select ui
				destroy: function(_this) {
					_this.$OBJ.unbind('mouseover', _this.evtMouseOver);
					_this.$OBJ.unbind('mouseout', _this.evtMouseOut);
					_this.$OBJ.unbind('blur', _this.statusReset);
					_this.$OBJ.unbind('focus', _this.evtMouseDown);
					_this.$OBJ.unbind('change', _this.evtChange);
					_this.$OBJ.unwrap();
					_this.$OBJ.removeAttr('style');
					_this.$handle.remove();
					_this.$arrow.remove();
				}
			};
		
			var _this = {};
			_this = $.extend(_public, _configs, _privaty);
			
			__this.push(_this);
			
			_this.Setup.call(this);
			
		});
		
	};
	
})(jQuery);