var is_touch_device = 'ontouchstart' in document.documentElement;

/* Splash image lightbox on home page load, but not in mobile */
if ( $('body.home').length > 0 && $(window).width() > 767 ) { 
	// Hide the contents of the home page while the splash image loads
	$('body.home .wrapper').addClass('home-hide');

	$('.home').ready(function($) {
		$.fancybox({
			padding: 0,
			margin: 0,
			autoSize: false,
			preload: false,
			width: '100%',
			height: '100%',
			scrolling: 'no',
			wrapCSS : 'splash-container',
			content: '<div class="splash-lightbox"></div>',
			afterShow  : function () {
				$.extend(this, {
					aspectRatio : false,
					type    : 'html',
					width   : '100%',
					height  : '100%'
				});
				
				$('.splash-lightbox').css('background-image', 'url(' + $('#splash-image').attr('src') + ')');

				// Close splash lightbox after set time
				var splashTimer = setTimeout(function() {
					fancyboxClose();
				}, 6000);
				
				$('.fancybox-overlay').click(function () {
					fancyboxClose();
					
					// Clear splash timeout so that it doesn't close the next opened painting
					clearTimeout(splashTimer);
				});
			}
		});
	});
}

// Identify active painting and add class
function fancyboxClose() {
	$.fancybox.close( true );
	$activeImage = $('#splash-image').attr('src');
	$(".painting-container[data-image-detail='" + $activeImage +"']").closest('.painting-container').addClass('delay');
	$(".painting-container[data-image-detail='" + $activeImage +"'] img, .painting-container[data-image-detail='" + $activeImage +"'] .title").addClass('active');
	$('.painting-container').hover( function () {
		$('.painting-container img, .painting-container .title').removeClass("active")
	});
	
	// Scroll to active image on lightbox close 
	$('html, body').animate({
		 scrollTop: $(".painting-container[data-image-detail='" + $activeImage +"']").offset().top - $(window).height() / 2 + $(".painting-container[data-image-detail='" + $activeImage +"']").height() / 2
	}, 500);

	$('.painting-container').addClass('preventHover');

	setTimeout(function() {
		$('.delay').removeClass('delay');
		$('.painting-container').removeClass('preventHover');
	}, 3000);

	// Show the home page wrapper now that the splash image is closed
	$('body.home .wrapper').removeClass('home-hide');
}

/* Fancybox lightbox popup */
$('a').has('img').click(function(){
	$(this).addClass('active');
}).fancybox({
	margin: [50, 50, 50, 50],
	padding: 0,
	openEffect: 'fade',
	closeEffect: 'fade',
	nextEffect: 'none',
	prevEffect: 'none',
	maxWidth: 1040,
	maxHeight: 760,
	openSpeed: 100,
	closeSpeed: 50,
	preload: 4,
	autoSize: true,
	beforeLoad: function() {
		this.title = '<div class="lightbox-title">' + $(this.element).attr('details') + '</div><div class="detail-container"><span class="detail-container-link" data-detail-link="' + $(this.element).attr('data-image-detail-in-lightbox') + '">detail</span><span class="process-container-link" data-process-link='+ $(this.element).attr('data-image-process') +'>color-chart</span></div>';
	},
	beforeShow: function() {
		var serialNumber = this.element.attr('data-serial')
		if (serialNumber) {
			window.location.hash = serialNumber;
		} else {
			history.pushState("", document.title, window.location.pathname + window.location.search);
			window.location.hash = "";
		}
	},
	afterShow: function() {
		// Preload detail/process images
		// $('body').append( '<img src="' + $('.detail-container-link').attr('data-detail-link') + '"/>');
		// $('body').append( '<img src="' + $('.process-container-link').attr('data-process-link') + '"/>');

		// Check for detail and process images in lightbox
		var originalImage = $('.fancybox-image').attr('src');

		if ( $('.lightbox-title').text() == 'undefined' ) {
			$('.lightbox-title').remove();
		}
		if ( $('.detail-container-link').attr('data-detail-link') == 'undefined' ) {
			$('.detail-container-link').remove();
		}
		if ( $('.process-container-link').attr('data-process-link') == 'undefined' ) {
			$('.process-container-link').remove();
		}

		$('.detail-container span').hover(
		  function () {  
			$('.fancybox-image').attr('src', $('.detail-container span').attr('data-detail-link'));
		  },
		  function () {
			$('.fancybox-image').attr('src', originalImage);
		  }
		);

		$('.process-container-link').hover(
		  function () {  
			$('.fancybox-image').attr('src', $('.process-container-link').attr('data-process-link')).addClass('active');
		  },
		  function () {
			$('.fancybox-image').attr('src', originalImage).removeClass('active');
		  }
		);

		$('.popup').removeClass('active');
		
		if (is_touch_device){
			$('.fancybox-nav').css('display','none');
			$('.fancybox-wrap').swipe({
				swipe : function(event, direction) {
					if (direction === 'left' || direction === 'up') {
						$.fancybox.prev( direction );
					} else {
						$.fancybox.next( direction );
					}
				}
			});
			
			if ($(window).width() < 640) {
				$('.fancybox-title').css('display','none');
			}
		}

		// Check if image is different size on color-chart hover
		$('.process-container-link').hover(function(){
			$('.fancybox-image').load(function(){
				var imageOffset = ($('.fancybox-image.active').width() - $('.fancybox-inner').width())/2;
				$('.fancybox-image').css('margin-left', imageOffset * -1);    
			});
		}, function(){
			$('.fancybox-image').load(function(){
				$('.fancybox-image').css('margin-left', '');
			});
		});
	},
	beforeClose: function() {
		history.pushState("", document.title, window.location.pathname + window.location.search);
		window.location.hash = "";
	},
	tpl: {
		closeBtn: '<div class="fancybox-close"><span class="close-button">close</span></div>',
		next:  '<a class="fancybox-nav fancybox-next"><span></span></a>',
		prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>'
	}
});

/* Check if there is a direct image serial hash in the URL */
var directImageHash = location.hash.replace('#', '');
$(document).ready(function() {
	$('[data-serial='+directImageHash+']').trigger('click');
});

/* Add active classes to nav items */
$(function(){
	var url = window.location.pathname, 
	urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
	// now grab every link from the navigation
	$('.sub-menu a').each(function(){
		// Skip checking the home page (it should always be first nav item)
		if (!$('body').hasClass('home')) {
			// and test its normalized href against the url pathname regexp
			if(urlRegExp.test(this.href.replace(/\/$/,''))){
				$(this).parent('.nav-sub-item').addClass('active');
			}
		} else {
			$('.nav-sub-item:first').addClass('active');
		}
	});
	// If no links are activated, make the first sub-nav item active
	if (!$('.category-nav').hasClass('active')) {
		$('.nav-sub-item:first').addClass('active');
	}
});

// Add active class to painting containers (always keep an image active)
$('.painting-container:not(preventHover)').hover(function() {
	$('.painting-container').removeClass('active');
	$(this).addClass('active');
});

/* Isotope used for sorting paintings by date and size */
/* Extend with categoryRows custom layout mode */
$.extend( $.Isotope.prototype, {
  
	_categoryRowsReset : function() {
	  this.categoryRows = {
		x : 0,
		y : 0,
		height : 0,
		currentCategory : null
	  };
	},
  
	_categoryRowsLayout : function( $elems ) {
	  var instance = this,
		  containerWidth = this.element.width(),
		  sortBy = this.options.sortBy,
		  props = this.categoryRows;
	  
	  $elems.each( function() {
		var $this = $(this),
			atomW = $this.outerWidth(true),
			atomH = $this.outerHeight(true),
			category = $.data( this, 'isotope-sort-data' )[ sortBy ],
			x, y;
		
		if ( category !== props.currentCategory ) {
		  // new category, new row
		  props.x = 0;
		  props.height += props.currentCategory ? instance.options.categoryRows.gutter : 0;
		  props.y = props.height;
		  props.currentCategory = category;
		  
		} else if ( props.x !== 0 && atomW + props.x > containerWidth ) {
		  // if this element cannot fit in the current row
		  props.x = 0;
		  props.y = props.height;
		}
	  
		// position the atom
		instance._pushPosition( $this, props.x, props.y );
  
		props.height = Math.max( props.y + atomH, props.height );
		props.x += atomW;

		// var position = $(this).data('isotope-item-position');
		// $(this).attr({
		//     'data-positionY': position.y,
		//     'data-positionX': position.x
		// });
  
	  });
	},
  
	_categoryRowsGetContainerSize : function () {
	  return { height : this.categoryRows.height };
	},
  
	_categoryRowsResizeChanged : function() {
	  return true;
	}
  
});

/* Initialize Isotope */
var $containers = $('.pageid-86 .entry-content, .pageid-33 .entry-content, .s-category-paintings .entry-content');

// show a loading image
// $('.loading-animation').show();

$(window).resize(function(){ $containers.isotope('reLayout'); });
$containers.imagesLoaded(function(){
	var $win = $(window),
	$imgs = $("img");

	$("img.lazy").show().lazyload({
		threshold : 200,
		failure_limit: Math.max($imgs.length - 1, 0) 
	});

	$containers.fadeTo(0, 0).isotope({
		itemSelector : '.painting-container',
		layoutMode : 'categoryRows',
		animationEngine : 'css',
		itemPositionDataEnabled : true,
		categoryRows : {
			gutter : 40
		  },
		getSortData : {
			date : function ( $elem ) {
				return $elem.attr('data-date');
			},
			size : function ( $elem ) {
				return $elem.attr('data-size');
			},
			type : function ( $elem ) {
				return $elem.attr('data-type');
			}
		},
		sortBy : 'size',
		// sortBy: 'size',
		// sortAscending: false,
		onLayout: function() {
            $win.trigger('scroll');
        }
	});

	$('body:not(.home)').find('.painting-container').last().addClass('active');
	
	$('.size-heading').remove();

	// add size/date info to first element of new category rows
	$('.painting-container').each( function() {
		$(this).prepend('<p class="size-heading">' + $(this).closest('.painting-container').attr('data-size') + ' inches' + ' <span class="painting-count">[' + $('div[data-size="' + $(this).closest('.painting-container').attr('data-size') + '"]').length + ']</span>' + '</p>');		
		// check for duplicate items and remove
		var seen = {};
		$($('.size-heading').get().reverse()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).last().remove();
			else
				seen[txt] = true;
		});
	});

	// if (!$('body').hasClass('home')) {
	// 	$('.painting-container img').first().addClass('active');
	// }
	
	// hide the loading image
	// $('.loading-animation').hide();
});

/* Isotope sort by buttons */
function removeContainerHeading() {
	$('.size-heading').remove();
	$('.date-heading').remove();
	$('.type-heading').remove();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SORT BY SIZE
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Update size on button click */
$('.sort_by_size').click(sortBySize);
function sortBySize() {
	if (!$('.sort_by_size').hasClass('active')) {
		
		$('.nav-sub-item.sort').removeClass('active ascending');
		$('.sort_by_size').addClass('active descending');
		$('.nav-sub-item.sort').removeClass('underline');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
			$(this).prepend('<p class="size-heading">' + $(this).closest('.painting-container').attr('data-size') + ' inches <span class="painting-count">[' + $('div[data-size="' + $(this).closest('.painting-container').attr('data-size') + '"]').length + ']</span>' + '</p>');
		
			// Add data attributes for isotope's item position
			var position = $(this).data('isotope-item-position');
			$(this).attr({
			    'data-positionY': position.y,
			    'data-positionX': position.x
			});
		}).tsort({data:'positiony'},{data:'positionx'});

		// check for duplicate items and remove
		var seen = {};
		$($('.size-heading').get().reverse()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).last().remove();
			else
				seen[txt] = true;
		});
		
		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				size : function ( $elem ) {
					return $elem.attr('data-size');
				}
			},
			sortBy: 'size',
			sortAscending: false
		}).fadeTo('fast', 1);
	} else {
		$('.sort_by_size').removeClass('active descending');
		$('.sort_by_size').addClass('underline ascending');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
			$(this).prepend('<p class="size-heading">' + $(this).closest('.painting-container').attr('data-size') + ' inches <span class="painting-count">[' + $('div[data-size="' + $(this).closest('.painting-container').attr('data-size') + '"]').length + ']</span>' + '</p>');
		
			// Add data attributes for isotope's item position
			var position = $(this).data('isotope-item-position');
			$(this).attr({
			    'data-positionY': position.y,
			    'data-positionX': position.x
			});
		}).tsort({data:'positiony'},{data:'positionx'});

		// check for duplicate items and remove
		var seen = {};
		$($('.size-heading').get()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).first().remove();
			else
				seen[txt] = true;
		});
		
		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				size : function ( $elem ) {
					return $elem.attr('data-size');
				}
			},
			sortBy: 'size',
			sortAscending: true
		}).fadeTo('fast', 1);
	}

	$('a').has('img').fancybox({
		margin: [50, 50, 50, 50],
		padding: 0,
		openEffect: 'fade',
		closeEffect: 'fade',
		nextEffect: 'none',
		prevEffect: 'none',
		maxWidth: 1040,
		maxHeight: 760,
		openSpeed: 100,
		closeSpeed: 50,
		preload: 4,
		autoSize: true,
		beforeLoad: function() {
			this.title = '<div class="lightbox-title">' + $(this.element).attr('details') + '</div><div class="detail-container"><span class="detail-container-link" data-detail-link="' + $(this.element).attr('data-image-detail-in-lightbox') + '">detail</span><span class="process-container-link" data-process-link='+ $(this.element).attr('data-image-process') +'>color-chart</span></div>';
		},
		beforeShow: function() {
			var serialNumber = this.element.attr('data-serial')
			if (serialNumber) {
				window.location.hash = serialNumber;
			} else {
				history.pushState("", document.title, window.location.pathname + window.location.search);
				window.location.hash = "";
			}
		},
		afterShow: function() {
			// Preload detail/process images
			// $('body').append( '<img src="' + $('.detail-container-link').attr('data-detail-link') + '"/>');
			// $('body').append( '<img src="' + $('.process-container-link').attr('data-process-link') + '"/>');

			// Check for detail and process images in lightbox
			var originalImage = $('.fancybox-image').attr('src');

			if ( $('.lightbox-title').text() == 'undefined' ) {
				$('.lightbox-title').remove();
			}
			if ( $('.detail-container-link').attr('data-detail-link') == 'undefined' ) {
				$('.detail-container-link').remove();
			}
			if ( $('.process-container-link').attr('data-process-link') == 'undefined' ) {
				$('.process-container-link').remove();
			}

			$('.detail-container span').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.detail-container span').attr('data-detail-link'));
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage);
			  }
			);

			$('.process-container-link').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.process-container-link').attr('data-process-link')).addClass('active');
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage).removeClass('active');
			  }
			);

			$('.popup').removeClass('active');

			if ($('body').hasClass('reverse')) {
				$('.fancybox-nav').addClass('reverse')
			} else {
				$('.fancybox-nav').removeClass('reverse')
			}
			
			if (is_touch_device){
				$('.fancybox-nav').css('display','none');
				$('.fancybox-wrap').swipe({
					swipe : function(event, direction) {
						if (direction === 'left' || direction === 'up') {
							$.fancybox.prev( direction );
						} else {
							$.fancybox.next( direction );
						}
					}
				});
				
				if ($(window).width() < 640) {
					$('.fancybox-title').css('display','none');
				}
			}

			// Check if image is different size on color-chart hover
			$('.process-container-link').hover(function(){
				$('.fancybox-image').load(function(){
					var imageOffset = ($('.fancybox-image.active').width() - $('.fancybox-inner').width())/2;
					$('.fancybox-image').css('margin-left', imageOffset * -1);    
				});
			}, function(){
				$('.fancybox-image').load(function(){
					$('.fancybox-image').css('margin-left', '');
				});
			});
		},
		beforeClose: function() {
			history.pushState("", document.title, window.location.pathname + window.location.search);
			window.location.hash = "";
		},
		tpl: {
			closeBtn: '<div class="fancybox-close"><span class="close-button">close</span></div>',
			next:  '<a class="fancybox-nav fancybox-next"><span></span></a>',
			prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>'
		}
	});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SORT BY DATE
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Update date on button click */
$('.sort_by_date').click(sortByDate);
function sortByDate() {
	if (!$('.sort_by_date').hasClass('active')) {

		$('.nav-sub-item.sort').removeClass('active ascending');
		$('.sort_by_date').addClass('active descending');
		$('.nav-sub-item.sort').removeClass('underline');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
			var dateWithTitle = $(this).closest('.painting-container').attr('data-date');
			var n = dateWithTitle.indexOf('$');
			dateWithTitle = dateWithTitle.substring(0, n != -1 ? n : dateWithTitle.length);

			if (!$('body').hasClass('s-category-installations')) {
				$(this).prepend('<p class="date-heading">' + dateWithTitle + '<span class="painting-count">[' + $('div[data-date="' + $(this).closest('.painting-container').attr('data-date') + '"]').length + ']</span>' + '</p>');
			} else {
				$(this).prepend('<p class="date-heading">' + dateWithTitle + '&nbsp;&#8211;&nbsp;' + '&#39;<a href="'+ $(this).closest('.painting-container').attr('data-gallery-link') +'" target="_blank">' + $(this).closest('.painting-container').attr('data-gallery-name') + '</a>&#39;, ' + $(this).closest('.painting-container').attr('data-title') + ', ' + $(this).closest('.painting-container').attr('data-location') + '<span class="painting-count">[' + $('div[data-date="' + $(this).closest('.painting-container').attr('data-date') + '"]').length + ']</span>' + '</p>');
			}

			// Add data attributes for isotope's item position
			var position = $(this).data('isotope-item-position');
			$(this).attr({
			    'data-positionY': position.y,
			    'data-positionX': position.x
			});
		}).tsort({data:'date'},{order:'desc',data:'serial'});
		
		// check for duplicate items and remove
		var seen = {};
		$($('.date-heading').get().reverse()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).last().remove();
			else
				seen[txt] = true;
		});

		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope('reloadItems').isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				size : function ( $elem ) {
					return $elem.attr('data-size');
				}
			},
			sortBy: 'date',
			sortAscending: false
		}).fadeTo('fast', 1);		
	} else {
		$('.nav-sub-item.sort').removeClass('active descending');
		$('.sort_by_date').addClass('underline ascending');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
				$(this).prepend('<p class="date-heading">' + $(this).closest('.painting-container').attr('data-date') + '<span class="painting-count">[' + $('div[data-date="' + $(this).closest('.painting-container').attr('data-date') + '"]').length + ']</span>' + '</p>');
		
		// Add data attributes for isotope's item position
			var position = $(this).data('isotope-item-position');
			$(this).attr({
			    'data-positionY': position.y,
			    'data-positionX': position.x
			});
		}).tsort('.painting-container[data-group="serial"]');

		// check for duplicate items and remove
		var seen = {};
		$($('.date-heading').get()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).first().remove();
			else
				seen[txt] = true;
		});

		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope('reloadItems').isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				size : function ( $elem ) {
					return $elem.attr('data-size');
				}
			},
			sortBy: 'date',
			sortAscending: true
		}).fadeTo('fast', 1);
	}

	// Re-initialize fancybox with our huge list of settings
	// This should really be it's own function or variable
	$('a').has('img').fancybox({
		margin: [50, 50, 50, 50],
		padding: 0,
		openEffect: 'fade',
		closeEffect: 'fade',
		nextEffect: 'none',
		prevEffect: 'none',
		maxWidth: 1040,
		maxHeight: 760,
		openSpeed: 100,
		closeSpeed: 50,
		preload: 4,
		autoSize: true,
		beforeLoad: function() {
			this.title = '<div class="lightbox-title">' + $(this.element).attr('details') + '</div><div class="detail-container"><span class="detail-container-link" data-detail-link="' + $(this.element).attr('data-image-detail-in-lightbox') + '">detail</span><span class="process-container-link" data-process-link='+ $(this.element).attr('data-image-process') +'>color-chart</span></div>';
		},
		beforeShow: function() {
			var serialNumber = this.element.attr('data-serial')
			if (serialNumber) {
				window.location.hash = serialNumber;
			} else {
				history.pushState("", document.title, window.location.pathname + window.location.search);
				window.location.hash = "";
			}
		},
		afterShow: function() {
			// Preload detail/process images
			// $('body').append( '<img src="' + $('.detail-container-link').attr('data-detail-link') + '"/>');
			// $('body').append( '<img src="' + $('.process-container-link').attr('data-process-link') + '"/>');

			// Check for detail and process images in lightbox
			var originalImage = $('.fancybox-image').attr('src');

			if ( $('.lightbox-title').text() == 'undefined' ) {
				$('.lightbox-title').remove();
			}
			if ( $('.detail-container-link').attr('data-detail-link') == 'undefined' ) {
				$('.detail-container-link').remove();
			}
			if ( $('.process-container-link').attr('data-process-link') == 'undefined' ) {
				$('.process-container-link').remove();
			}

			$('.detail-container span').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.detail-container span').attr('data-detail-link'));
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage);
			  }
			);

			$('.process-container-link').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.process-container-link').attr('data-process-link')).addClass('active');
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage).removeClass('active');
			  }
			);

			$('.popup').removeClass('active');

			if ($('body').hasClass('reverse')) {
				$('.fancybox-nav').addClass('reverse')
			} else {
				$('.fancybox-nav').removeClass('reverse')
			}
			
			if (is_touch_device){
				$('.fancybox-nav').css('display','none');
				$('.fancybox-wrap').swipe({
					swipe : function(event, direction) {
						if (direction === 'left' || direction === 'up') {
							$.fancybox.prev( direction );
						} else {
							$.fancybox.next( direction );
						}
					}
				});
				
				if ($(window).width() < 640) {
					$('.fancybox-title').css('display','none');
				}
			}

			// Check if image is different size on color-chart hover
			$('.process-container-link').hover(function(){
				$('.fancybox-image').load(function(){
					var imageOffset = ($('.fancybox-image.active').width() - $('.fancybox-inner').width())/2;
					$('.fancybox-image').css('margin-left', imageOffset * -1);    
				});
			}, function(){
				$('.fancybox-image').load(function(){
					$('.fancybox-image').css('margin-left', '');
				});
			});
		},
		beforeClose: function() {
			history.pushState("", document.title, window.location.pathname + window.location.search);
			window.location.hash = "";
		},
		tpl: {
			closeBtn: '<div class="fancybox-close"><span class="close-button">close</span></div>',
			next:  '<a class="fancybox-nav fancybox-next"><span></span></a>',
			prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>'
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SORT BY TYPE
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Update type on button click */
$('.sort_by_type').click(sortByType);
function sortByType() {
	if (!$('.sort_by_type').hasClass('active')) {

		$('.nav-sub-item.sort').removeClass('active ascending');
		$('.sort_by_type').addClass('active descending');
		$('.nav-sub-item.sort').removeClass('underline');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
			$(this).prepend('<p class="type-heading">' + $(this).closest('.painting-container').attr('data-type') + '<span class="painting-count">[' + $('div[data-type="' + $(this).closest('.painting-container').attr('data-type') + '"]').length + ']</span>' + '</p>');

			// Add data attributes for isotope's item position
			var position = $(this).data('isotope-item-position');
			$(this).attr({
			    'data-positionY': position.y,
			    'data-positionX': position.x
			});
		}).tsort('.painting-container[data-group="serial"]');

		// check for duplicate items and remove
		var seen = {};
		$($('.type-heading').get().reverse()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).last().remove();
			else
				seen[txt] = true;
		});
		
		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope('reloadItems').isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				type : function ( $elem ) {
					return $elem.attr('data-type');
				}
			},
			sortBy: 'type',
			sortAscending: false
		}).fadeTo('fast', 1);		
	} else {
		$('.nav-sub-item.sort').removeClass('active descending');
		$('.sort_by_type').addClass('underline ascending');
		removeContainerHeading();

		// add size/date info to first element of new category rows
		$('.painting-container').each( function() {
				$(this).prepend('<p class="type-heading">' + $(this).closest('.painting-container').attr('data-type') + '<span class="painting-count">[' + $('div[data-type="' + $(this).closest('.painting-container').attr('data-type') + '"]').length + ']</span>' + '</p>');
		}).tsort({data:'serial'});

		// check for duplicate items and remove
		var seen = {};
		$($('.type-heading').get()).each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).first().remove();
			else
				seen[txt] = true;
		});
		
		//Initialize Isotope sort by buttons
		$containers.fadeTo(0, 0).isotope('reloadItems').isotope({
			itemSelector : '.painting-container',
			layoutMode : 'categoryRows',
			animationEngine : 'css',
			itemPositionDataEnabled : true,
			categoryRows : {
				gutter : 40
			  },
			getSortData : {
				date : function ( $elem ) {
					return $elem.attr('data-date');
				},
				type : function ( $elem ) {
					return $elem.attr('data-type');
				}
			},
			sortBy: 'type',
			sortAscending: true
		}).fadeTo('fast', 1);
	}

	// Re-initialize fancybox with our huge list of settings
	// This should really be it's own function or variable
	$('a').has('img').fancybox({
		margin: [50, 50, 50, 50],
		padding: 0,
		openEffect: 'fade',
		closeEffect: 'fade',
		nextEffect: 'none',
		prevEffect: 'none',
		maxWidth: 1040,
		maxHeight: 760,
		openSpeed: 100,
		closeSpeed: 50,
		preload: 4,
		autoSize: true,
		beforeLoad: function() {
			this.title = '<div class="lightbox-title">' + $(this.element).attr('details') + '</div><div class="detail-container"><span class="detail-container-link" data-detail-link="' + $(this.element).attr('data-image-detail-in-lightbox') + '">detail</span><span class="process-container-link" data-process-link='+ $(this.element).attr('data-image-process') +'>color-chart</span></div>';
		},
		beforeShow: function() {
			var serialNumber = this.element.attr('data-serial')
			if (serialNumber) {
				window.location.hash = serialNumber;
			} else {
				history.pushState("", document.title, window.location.pathname + window.location.search);
				window.location.hash = "";
			}
		},
		afterShow: function() {
			// Preload detail/process images
			// $('body').append( '<img src="' + $('.detail-container-link').attr('data-detail-link') + '"/>');
			// $('body').append( '<img src="' + $('.process-container-link').attr('data-process-link') + '"/>');

			// Check for detail and process images in lightbox
			var originalImage = $('.fancybox-image').attr('src');

			if ( $('.lightbox-title').text() == 'undefined' ) {
				$('.lightbox-title').remove();
			}
			if ( $('.detail-container-link').attr('data-detail-link') == 'undefined' ) {
				$('.detail-container-link').remove();
			}
			if ( $('.process-container-link').attr('data-process-link') == 'undefined' ) {
				$('.process-container-link').remove();
			}

			$('.detail-container span').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.detail-container span').attr('data-detail-link'));
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage);
			  }
			);

			$('.process-container-link').hover(
			  function () {  
				$('.fancybox-image').attr('src', $('.process-container-link').attr('data-process-link')).addClass('active');
			  },
			  function () {
				$('.fancybox-image').attr('src', originalImage).removeClass('active');
			  }
			);

			$('.popup').removeClass('active');

			if ($('body').hasClass('reverse')) {
				$('.fancybox-nav').addClass('reverse')
			} else {
				$('.fancybox-nav').removeClass('reverse')
			}
			
			if (is_touch_device){
				$('.fancybox-nav').css('display','none');
				$('.fancybox-wrap').swipe({
					swipe : function(event, direction) {
						if (direction === 'left' || direction === 'up') {
							$.fancybox.prev( direction );
						} else {
							$.fancybox.next( direction );
						}
					}
				});
				
				if ($(window).width() < 640) {
					$('.fancybox-title').css('display','none');
				}
			}

			// Check if image is different size on color-chart hover
			$('.process-container-link').hover(function(){
				$('.fancybox-image').load(function(){
					var imageOffset = ($('.fancybox-image.active').width() - $('.fancybox-inner').width())/2;
					$('.fancybox-image').css('margin-left', imageOffset * -1);    
				});
			}, function(){
				$('.fancybox-image').load(function(){
					$('.fancybox-image').css('margin-left', '');
				});
			});
		},
		beforeClose: function() {
			history.pushState("", document.title, window.location.pathname + window.location.search);
			window.location.hash = "";
		},
		tpl: {
			closeBtn: '<div class="fancybox-close"><span class="close-button">close</span></div>',
			next:  '<a class="fancybox-nav fancybox-next"><span></span></a>',
			prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>'
		}
	});
}

/* Check if URL has hash tag for sort, and if it does then sort by that hash tag */
$containers.imagesLoaded(function() {
	if (window.location.hash == '' && !$('body').hasClass('s-category-diptychs-triptychs') && !$('body').hasClass('s-category-installations')) {
		sortBySize();
	}
	else if (window.location.hash == '' && $('body').hasClass('s-category-diptychs-triptychs')) {
		sortByDate();
	}
	else if (window.location.hash == '#type') {
		sortByType();
	}
	else if (window.location.hash == '#date' || $('body').hasClass('s-category-installations')) {
		sortByDate();
	}
	else if (!$('body').hasClass('s-category-installations')) {
		sortBySize();
	}
});

function navHide(){
	if ($(window).width() > 767) {	
		var mainNavTimeout = setTimeout(function(){
			$('.sub-menu, .page-sub-menu').stop().fadeOut(300);
		}, 3000);

		$('header').mousemove(function(){
			clearTimeout(mainNavTimeout);
		});

		$('header').hover(
			function(){
				$('.sub-menu, .page-sub-menu').fadeIn(150);
				clearTimeout(mainNavTimeout);
			},
			function (){
				mainNavTimeout = setTimeout(function(){
					$('.sub-menu, .page-sub-menu').fadeOut(300);
				}, 300);
			}
		);

		$('body').removeClass('mobile');
	} else {
		$('header').off('mouseenter mouseleave');
		$('header').off('mousemove');
		$('body').addClass('mobile');
	}
};

navHide();

$(window).load(function() {
	if ($(window).width() < 768) {	
		$('body').addClass('mobile');
	}
});

$(window).resize(function() {
	navHide();
	
	$.fancybox.update();
});

/* Smooth scroll on jumplink navigation items */
$(function() {
	$('.jumplink a').smoothScroll({
		speed: 600
	});
});

/* For URL's with anchor/hash tags, first stop the page from 
jumping to the anchor and then Smooth Scroll to position */
setTimeout(function() {
  if (location.hash) {
    window.scrollTo(0, 0);

	$(document).ready(function() {
		var hash = window.location.hash;
		$.smoothScroll({
			scrollTarget: hash,
			speed: 600
		});
	});
  }
}, 1);


// Force window to reload if hash tag changes (this opens the lightbox).
// Only check in .entry-content to avoid the link navigation in the information/resume page.
$('.entry-content a').click(function(){
	// Alerts every time the hash changes!
	var url = $(this).attr('href'), idx = url.indexOf("#");
	var hash = idx != -1 ? url.substring(idx+1) : "";
	if (hash != '') { 
		window.location.hash = hash;
		window.location.reload();
	}
})

// jQuery progress bar loader
// $(document).ready(function () {
//     $('.page-template-page-paintings-php, .s-category-paintings').queryLoader2({
//     	backgroundColor: '#f8f8f5',
//     	barColor: '#e3dfd9',
//     	barHeight: 14
//     });
// });

$('.nav-sub-item.sort').click(function(){
	if ($('.nav-sub-item.sort').hasClass('active')) {
		$('body').removeClass('reverse');
	} else {
		$('body').addClass('reverse');
	}
});