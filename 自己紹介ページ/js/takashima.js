$(document).ready(function(){
	$('body').pointer();
});

(function($){
	$.fn.pointer = function (options) {
		var settings = {
			size : 80,
			spd : 300,
			color : "#ccc"
		}
		settings = $.extend(settings, options);
		
		var circle_style = {
			"position":"absolute",
			"z-index":9999,
			"height":10,
			"width":10,
			"border":"solid 4px "+settings.color,
			"border-radius":settings.size
		}
		return this.each(function() {
			var $this = $(this);
			$this.css({"position":"relative"});
			$(document).click(function(e){
				var x = e.pageX-5;
				var y = e.pageY-5;
				
				var pos = {
					top :(-settings.size/2)+y,
					left :(-settings.size/2)+x
				}
		
				$this.append('<div class="circle"></div>');
				$this.find(".circle:last").css(circle_style).css({
					"top":y,
					"left":x
				}).animate({"height":settings.size,"width":settings.size,"left":pos.left,"top":pos.top},{duration:settings.spd,queue:false})
				.fadeOut(settings.spd*1.8,function(){
					$(this).remove();
				});
			});
		});
	}
})(jQuery);

window.onload = function(){

	var settings = {
		interval : 3000, 
		dur : 30000, 
		windowWidth : $(window).width(),
		windowHeight : $(window).height()
	}
	
	var styleFor = {
		height : 22, 
		width : 22, 
		'border-width' : 10 
	}
	
	var styleInit = {
		position:'absolute',
		'z-index' : 1,
		display : 'inline-block',
		border : 'solid 4px #eaeaea',
		height : 8,
		width : 8,
		adj : 0
	}
	
	var cube = {
		init : function(){
			$('body')
				.wrapInner('<div style="position:relative;z-index:2"></div>')
				.append('<div style="position:fixed;top:0;left:0;z-index:1" id="cube-area"></div>');
			
			$('#cube-area').css({
				height : settings.windowHeight,
				width : settings.windowWidth
			});
			
			styleInit.adj = styleFor['border-width'] + styleFor['width'];
		},
		add : function(){
			var initX = cube.getRandomX();
			var initY = cube.getRandomY();
	
			var endX = cube.getRandomX();
			var endY = cube.getRandomY();
			
			styleFor.left = endX;
			styleFor.top = endY;
			
			$('#cube-area').append($('<div class="block" />')
				.css(styleInit) // end init
				.css({
					top : initY,
					left : initX,
				})
				.animate(styleFor,{
						easing : 'linear',
						duration : settings.dur,
						complete : function(){
							$(this).fadeOut(300,function(){
								$(this).remove();
							});
						}
					}
				)
			);
		},
		getRandomX : function(){
			return Math.floor( Math.random() * settings.windowWidth - styleInit.adj);
		},
		getRandomY : function(){
			return Math.floor( Math.random() * settings.windowHeight );
		}
	}



	cube.init();
	setInterval(function(){
		cube.add();
	},settings.interval);
}
