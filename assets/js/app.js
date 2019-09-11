// JavaScript Document

$(function () {

	"use strict";
  
	var $body = $('body'),
		$window = $(window),
		$document = $(document);
	
	
	// product single carousel

	$.fn.initProductZoom = function () {
		
		/*var $this = this,
			zoompos = $body.is('.rtl') ? 11 : 1;
		if (!$body.is('.touch')) {
			$this.ezPlus({
				zIndex: 1002,
				zoomWindowPosition: zoompos,
				zoomContainerAppendTo: '.page-main',
				gallery: 'previewsGallery',
				galleryActiveClass: 'active'
			});
		} else {
			$this.ezPlus({
				zoomType: 'lens',
				zIndex: 1002,
				zoomContainerAppendTo: '.main-image',
				gallery: 'previewsGallery',
				galleryActiveClass: 'active'
			});
			
		}*/
		var $this = this;
		$this.ezPlus({
			zIndex: 99999,
			//zoomContainerAppendTo: '.main-image',
			gallery: 'previewsGallery',
			galleryActiveClass: 'active'
		});
	}

	if ($(".main-image").length) {
		$('.main-image > .zoom').initProductZoom();
		
	}

	// product previews carousel
	if ($(".product-previews-carousel").length) {

		var $this = $(".product-previews-carousel");

		$this.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			focusOnSelect: true,
			infinite: false
		});

		$this.on('click', '.slick-slide', function () {
			$('.zoom-link').removeClass('disable-gallery');
		})
	}

	// create image gallery for product page
	function productImageGallery() {
		var galleryObj = [];

		function createImageGallery() {
			$('.product-previews-carousel img').each(function () {
				var src = $(this).parent('a').data('zoom-image'),
					type = 'image'; // it's always an image
				var image = {};
				image["src"] = src;
				image["type"] = type;
				galleryObj.push(image);
			});
		}

		createImageGallery();

		function getActiveIndex() {
			var current = 0;
			if ($('.product-previews-carousel a.active').length) {
				current = $('.product-previews-carousel a.active').index();
			}
			return current;
		}

		if ($('.zoom-link').length) {
			$('.zoom-link').on('click', function (e) {
				if ($(this).is('.disable-gallery')) {
					var msrc = $('.main-image img').attr('data-zoom-image');
					$.magnificPopup.open({
						items: {
							src: msrc
						},
						type: 'image'
					});
				} else {
					getActiveIndex();
					$.magnificPopup.open({
						items: galleryObj,
						gallery: {
							enabled: true,
						}
					}, getActiveIndex());
				}
				e.preventDefault();
			});
		}

	}
	// product page form

	function productOptions(option) {
		var $option = $(option),
			$optionlist = $('ul', $option),
			$optionbtn = $('a', $optionlist),
			$optionselect = $('select', $option);
		$optionlist.find("a[data-value='" + $optionselect.val() + "']").parent().addClass('active');
		$optionbtn.on('click', function (e) {
			$this = $(this);
			if ($this.data('image')) {
				var $image = $('.main-image img');
				var imgSrc = $this.data('image');
				var newImg = document.createElement("img");
				newImg.src = imgSrc;
				newImg.onload = function () {
					$image.attr('src', imgSrc);
					$image.attr('data-zoom-image', imgSrc);
					if ($('.main-image > .zoom').length) {
						$('.main-image > .zoom').data('ezPlus').destroy();
						$('.main-image > .zoom').initProductZoom();
						$('.zoom-link').addClass('disable-gallery');
					}
				}
			}

			if (!$this.parent('li').is('.active')) {
				$optionselect.val($this.attr('data-value'));
				$this.closest('ul').find('li').removeClass('active');
				$this.parent('li').addClass('active');
			}
			e.preventDefault();
		});
	}




	
})