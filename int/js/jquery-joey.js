/**
 * @author jdb
 */
        $(document).ready(function(){
			preload();
			navigation();
			
			
	
			if ((navigator.userAgent.match(/iPhone/i)) ||
			(navigator.userAgent.match(/Android/i)) ||
			(navigator.userAgent.match(/iPad/i)) ||
			(navigator.userAgent.match(/iPod/i))) {
				//Don't display work on mobile devices
				$('li#li-work, #facebooklike, #copyright').css('display', 'none').fadeOut(0, 0);
				$('#modal').animate({
					marginLeft: '-290px',
					width: '580px'
				})
				$('.main-stage').css('display', 'none');
			return false;
			}
			else {
				scroller();
				interfaces();
				slideshows();
			}
				function preload(arrayOfImages){
					$(arrayOfImages).each(function(){
						$('<img/>')[0].src = this;
					// Alternatively you could use:
					// (new Image()).src = this;
					});
				}
				preload(['int/img/bg-repeat.png', 'int/img/logo_JOEY.png', 'int/img/icon-email.png', 'int/img/icon-phone.png', 'int/img/icon-play.png', 'int/img/icon-twitter.png', 'int/img/feature_loading.gif']);
				
				function navigation(){
					//Fade icons down
					$('ul#contact li a img').fadeTo(0, 0).fadeTo(600, .25);
					
					//Give these *click* feedback.
					$('ul#contact li a, #home img, a.scrollPage, .work-masthead ul li span').live('mousedown', function(){
						$(this).css({
							position: 'relative',
							top: '2px'
						});
					});
					$('ul#contact li a, #home img, a.scrollPage, .work-masthead ul li span').live('mouseup', function(){
						$(this).css({
							position: 'relative',
							top: '0px'
						});
					});
					
					//Hide + Show Spaceman.
					$('#logo img').hover(function(){
						//Spacewalk!
						$astronautAnimate = setInterval(function astronautMove(){
							$('#overlay-astronaut').delay(700).animate({
								bottom: '+=10px'
							}, 1500, 'easeInOutCubic');
							$('#overlay-astronaut').delay(1000).animate({
								bottom: '-=10px'
							}, 1500, 'easeInOutCubic');
						}, 300);
						$(this).css('cursor', 'pointer');
						
						$('ul#contact li a img').stop(true, false).fadeTo(300, 0);
						$('#contact-phone, #contact-email, #contact-twitter, #contact-blog, #about-joey').stop(true, true).hide(); //.fadeTo(300, 0);
						$('#about-joey').stop(true, false).show().fadeTo(0, 0).delay(400).animate({
							left: '283px',
							opacity: '1'
						}, 300, 'easeInOutQuint');
						$('#overlay-astronaut, #overlay-astronaut img').delay(700).fadeIn(300);
	
						
					}, function(){
						$('#overlay-astronaut, #overlay-astronaut img').fadeOut(300);
						$('#about-joey').stop(true, false).animate({
							left: '200px',
							opacity: '0'
						}, 300, 'easeInOutQuint');
						$('ul#contact li a img').stop(true, false).delay(400).fadeTo(300, .25);
						
						//Stop Spacewalk!
						clearInterval($astronautAnimate);
					});
					
					//Hide + Show + Swoosh!
					$('ul#contact li a').hover(function(){
						$('#contact-phone, #contact-email, #contact-twitter, #contact-blog, #about-joey, .hoverinfo').stop(true, false).animate({
							left: '180px',
							opacity: '0'
						}, 300, 'easeInOutQuint');
						
						$(this).children().css('cursor', 'pointer').stop(true, false).fadeTo(300, 1);
						var contactmethod = $(this).parent().attr('id').replace("li-", "contact-");
						
						$('#contact-phone, #contact-email, #contact-twitter, #contact-blog, #about-joey').stop(true, true).hide(); //.fadeTo(300, 0);
						$('#' + contactmethod).stop(true, false).show().fadeTo(0, 0).animate({
							left: '269px',
							opacity: '1'
						}, 300, 'easeInOutQuint');
						
					}, function(){
						$(this).children().stop(true, true).fadeTo(300, .25);
						$('#contact-phone, #contact-email, #contact-twitter, #contact-blog, #about-joey, .hoverinfo').stop(true, false).animate({
							left: '180px',
							opacity: '0'
						}, 300, 'easeInOutQuint');
						
					});
					
					//On touchscreen? No problem!		
					$('#about-joey').live('click', function(){
						$('#about-joey').stop(true, false).animate({
							left: '200px',
							opacity: '0'
						}, 300, 'easeInOutQuint');
						$('ul#contact li a img').stop(true, false).delay(400).fadeTo(300, .25).stop();
					});
					
				};
				//Any link with the class .scrollPage will scroll to that destination anchor minus 1px.
				function scroller(){
					$('.scrollPage').click(function(){
						var elementClicked = $(this).attr("href");
						var destination = $(elementClicked).offset().top;
						$("html:not(:animated),body:not(:animated)").animate({
							scrollTop: destination - 1  //Number being the pixel distance from destination.
						}, 1000, 'easeInOutQuint');
						return false;
						
					});
				};
				
				
				function slideshows(){
					$('#show-tam').cycle({
						fx: 'fade',
						speed: 600,
						timeout: 0,
						next: '#show-tam',
						pause: 1,
						easing: 'easeInOutQuint',
						slideResize: 1
					});
					$('#show-srl').cycle({
						fx: 'fade',
						speed: 600,
						timeout: 0,
						next: '#show-srl',
						pause: 1,
						easing: 'easeInOutQuint',
						slideResize: 1
					});
					
				}
				
				
				function onAfter(curr, next, opts, fwd) {
					var index = opts.currSlide;
					$('#slide-1')[index == opts.slideCount - 1 ? 'hide' : 'show']();
					//get the height of the current slide
					var $ht = $(this).height();
					//set the container's height to that of the current slide
					$(this).parent().animate({height: $ht});
				}

				function interfaces(){
					$('.nivo-caption').hide();
					$('.work-masthead').animate({
						left: '15px',
						display: 'block',
						opacity: '0'
					}, 0);
					
					//Establish Lightboxes.
					$(".iframe").colorbox({width:"80%", height:"70%", iframe:true});
					$("a[rel='modal']").colorbox({transition:"fade"});
					
					//Show + Hide personal bio.
					$('#more-bio').slideToggle('fast');
					$('#moreToggle').toggle(function(){
						$(this).html('&times;')
						$('#more-bio').slideToggle('slow', 'easeInOutQuint');
					}, function(){
						$(this).html('+')
						$('#more-bio').slideToggle('slow', 'easeInOutQuint');
					})
					
					//Mark sure that the main container is distanced properly from the top of the screen.
					$('#main-container').css({
						'top': $(window).height()
					});
					
					//Initialize distance.
					function resizeContainer(){
						$('#main-container').css({
							'top': $nheight
						});
					};
					
					//Distance between body and top is the height of user's screen, updated every 10th of a second.
					var resizeTimer;
					$(window).resize(function(){
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(resizeContainer, 100);
						$nheight = $(window).height()
					});
					
					//Add icon to New Window-targeted links.
					$('#main-container a[href^="http://"]').attr({
						target: "_blank"
						//title: "Opens in a new window"
					}).append('<img src="int/img/icon-newWindow.gif" class="img-sup">');
					
					//Fade Facebook Like button when over content, show opaque onmouseover.
					$('#facebooklike').animate({
						opacity: '0'
					}, 50);
					$('#work-container').bind('inview', function(event, isInView, visiblePartX, visiblePartY){
						if (isInView) {
							// Element is now visible in the viewport.
							$('#facebooklike').animate({
								opacity: '.45'
							}, 600);
							$('#facebooklike').hover(function(){
								$(this).stop().animate({
									opacity: '1'
								}, 400);
							}, function(){
								$(this).stop().animate({
									opacity: '.45'
								}, 600);

							});
							
							if (visiblePartY == 'top') {
							// Top part of element is visible.
							}
							else 
								if (visiblePartY == 'bottom') {
								// Bottom part of element is visible.
								}
								else {
								// Whole part of element is visible.
								}
						}
						else {
							// Element has gone out of viewport.
							$('#facebooklike').animate({
								opacity: '0'
							}, 600);

						}
						
					});
			};
        });
	