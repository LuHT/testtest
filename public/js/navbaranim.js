function navbarDesign(){
	$(window).scroll(function() {
		if ($(window).scrollTop() == 0) {
			$(".navbar-fixed-top").css('background-color', '#B45048');
			$(".navbar-fixed-top").css('border-color', '#B45048');
			$(".navbar-fixed-top").css('box-shadow', '0 0 0 #B45048');
			$(".navbar-fixed-top").css('transition', '1s');
		} else {
			$(".navbar-fixed-top").css('background-color', '#640F08');
			$(".navbar-fixed-top").css('border-color', '#640F08');
			$(".navbar-fixed-top").css('box-shadow', '0px 2px 5px #333333');
			$(".navbar-fixed-top").css('transition', '0.8s');
		}
	});
	
	$(function() {
	   $("li").click(function() {
			  // remove classes from all
			  $("li").removeClass("page-scroll active");
			  // add class to the one we clicked
			  $(this).addClass("page-scroll active");
		   });
		});
		
	(function($) {
		"use strict"; // Start of use strict

		// Smooth scrolling using jQuery easing
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - 40)
					}, 700, "easeInOutExpo");
					return false;
				}
			}
		});

		// Activate scrollspy to add active class to navbar items on scroll
		$('body').scrollspy({
			target: '#navbarhome',
			offset: 55
		});

		// Closes responsive menu when a link is clicked
		$('.navbar-fixed-top>ul>li>a').click(function() {
			$('.navbar-fixed-top').collapse('hide');
		});

	})(jQuery); // End of use strict
}

