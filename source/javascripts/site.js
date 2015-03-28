$(function() {
	/* VARIABLES */
	var nav_btn = $('.nav-collapse-btn'),
		nav_bar_phone = $('.nav-bar-phone'),
		nav_btn_phone = $('.nav-collapse-btn-phone'),
		nav_bar_phone_height = nav_bar_phone.height(),
		nav = $('.nav'),
		nav_bg = $('.nav-bg'),
		nav_item = $('.nav a'),
		nav_open = false,
		nav_width = nav.width(),
		on_phone = false,
		menu_speed = 200;

	/* FUNCTIONS */
	var navClose = function() {
		nav.animate({
			left: -nav.width()+nav_btn.width()
		}, menu_speed);
		nav_btn.switchClass('icon-arrow-left', 'icon-arrow-right', menu_speed);
		nav_btn_phone.switchClass('icon-close','icon-menu', menu_speed);
		if(on_phone == true) {
			nav_bg.fadeOut(menu_speed);
		}
		nav_open = false;
	}

	var navOpen = function() {
		nav.animate({
			left:0
		}, menu_speed);
		nav_btn.switchClass('icon-arrow-right', 'icon-arrow-left', menu_speed);
		nav_btn_phone.switchClass('icon-menu', 'icon-close', menu_speed);
		if(on_phone == true) {
			nav_bg.fadeIn(menu_speed);
		}
		nav_open = true;
	}

	var navOpenOrClose = function() {
		if (nav_open == true) {
			navClose();
		} else {
			navOpen();
		};
	}

	var preventScrollPhone = function(e) {
		if(nav_open == true) {
			// console.log(e.target);
			if(!$('.nav').has($(e.target)).length) { // stoppa touch scroll om det vi touchar (e.target) inte är en child till .nav
				return false;
			}
		}
	}

	/* MEDIA QUERIES */
	enquire.listen();
	enquire.register('(min-width:769px)', function() {
		on_phone = false;
		navOpen();
		nav_bg.css('display', 'none');
		nav_item.unbind('click.itemclose');
		$('body').unbind('touchmove.phone');
	});
	enquire.register('(max-width:768px)', function() {
		on_phone = true;
		if (nav_open) { 
			navClose();
		};
			
		nav_btn.height($(window).height());
		nav_item.bind('click.itemclose', navClose);
		nav_btn.css('line-height', $(window).height() + "px");
		nav_btn_phone.css('line-height',nav_bar_phone_height - 2 + "px");

		 var nav_wrapper = $('.nav-wrapper'),
		 	height = nav_wrapper.height(),
		 	scrollHeight = nav_wrapper.get(0).scrollHeight;

		 var nav_wrapper = $('.nav-wrapper'),
		 	height = nav_wrapper.height(),
		 	scrollHeight = nav_wrapper.get(0).scrollHeight;

		 //TODO: stoppa scroll av sidan när menyn har scrollat i botten eller toppen. men "d" existerar inte på touchmove.
		 nav_wrapper.bind('touchmove', function(e, d) {
		 	console.log(this.scrollTop, scrollHeight, height, e.type);
		 	if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
		 		return false;
		 	}
		 });

	});

	var nav_wrapper = $('.nav-wrapper'),
		height = nav_wrapper.height(),
		scrollHeight = nav_wrapper.get(0).scrollHeight;

	nav_wrapper.bind('mousewheel', function(e, d) { // scrolla ej body när menyn har scrollat i botten eller toppen
		if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
			e.preventDefault();
		}
	});

	/* MAIN STUFF */
	nav.localScroll({
		duration: 700,
		offset:-20 - nav_bar_phone_height,
		hash: true
	});

	$.localScroll.hash({
		duration: 700,
		offset:-20 - nav_bar_phone_height
	}); // make it scroll if someone enters site directly to hash url

	/* BIND PERSISTENT HANDLERS */

	nav_btn.bind('touchstart', navOpenOrClose);
	nav_btn_phone.bind('touchstart', navOpenOrClose);
	nav_bg.bind('touchstart', navClose);
	$('body').bind('touchmove.phone', preventScrollPhone);

})