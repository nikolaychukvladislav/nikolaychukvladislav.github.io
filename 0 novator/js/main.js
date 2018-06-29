$(document).ready(function(){

	var popup = $('.popup'),
		popup_h = popup.outerHeight(),
		popup_w = popup.outerWidth() + 20,
		h = $(window).height(),
		px = window.pageYOffset + h/2 - popup_h/2;
	popup.css({
		'top': px+'px',
		'margin-left': '-'+ popup_w/2 +'px',
	});

	//submenu
	$('.header__submenu').mouseenter(function(){
		$(this).addClass('_active');
	}).mouseleave(function(){
		$(this).removeClass('_active');
	});
	$('.header__submenu').click(function(){
		$(this).toggleClass('_active');
	});
	//search
	$('.header__search_btn, .footer__search_btn').click(function(){
		var btn = $(this),
			search = btn.prev(),
			search_input = search.children('div');
		search_input.addClass('_active');
		$('.header nav,.footer nav').removeClass('_active');
		$('.header__hamb,.footer__hamb').removeClass('_close');
		setTimeout(function(){
			search_input.find('input').focus();
		},200);
	});
	$('.header__search_close, .footer__search_close').click(function(){
		var btn = $(this),
			search = btn.parent();
		search.removeClass('_active');
	});

	//hamb nav menu
	$('.header__hamb').click(function(e){
		e.preventDefault();
		var hamb = $(this),
			nav = hamb.prevAll('.header__search').find('nav');
		hamb.toggleClass('_close');
		nav.toggleClass('_active');
		nav.prev('.header__search_input').removeClass('_active');
	});
	$('.footer__hamb').click(function(e){
		e.preventDefault();
		var hamb = $(this),
			nav = hamb.prevAll('.footer__search').find('nav');
		hamb.toggleClass('_close');
		nav.toggleClass('_active');
		nav.prev('.footer__search_input').removeClass('_active');
	});


	//main slider
	if($('.s_main__slider').length){
		if(Modernizr.mq('only screen and (min-width: 763.5px)')){
			var sl_main = $('.s_main__slider').lightSlider({
				item: 1,
				controls: false,
				pager: false,
				loop: true,
				auto: true,
				pause: 3500,
				speed: 350,
				pauseOnHover: true,
				onBeforeSlide: function(){
					var n = sl_main.getCurrentSlideCount()-1;
					$('.s_main__pager span').eq(n).addClass('_active')
						.siblings().removeClass('_active');
				}
			});
		}else{
			var sl_main = $('.s_main__slider').lightSlider({
				item: 1,
				controls: false,
				pager: false,
				loop: true,
				adaptiveHeight: true,
				speed: 250,
				onBeforeSlide: function(){
					var n = sl_main.getCurrentSlideCount()-1;
					$('.s_main__pager span').eq(n).addClass('_active')
						.siblings().removeClass('_active');
				}
			});
		}
		$('.s_main__arr_top').click(function(){
			sl_main.goToPrevSlide();
		});
		$('.s_main__arr_bot').click(function(){
			sl_main.goToNextSlide();
		});
		$('.s_main__pager span').click(function(){
			var n = $(this).index()+1;
			sl_main.goToSlide(n);
		});
	}

	//reviews slider
	if($('.s_reviews__slider').length){
		var sl_s_reviews = $('.s_reviews__slider').lightSlider({
			item: 1,
			pager: false,
			controls: false,
			slideItem: 1,
			loop: true,
			speed: 250,
			adaptiveHeight: true
		});
		$('.s_reviews__arr_left').click(function(){
			sl_s_reviews.goToPrevSlide();
			$('.s_reviews__item_hidden').removeClass('_active');
			$('.s_reviews__item_more').text('Читать далее');
		});
		$('.s_reviews__arr_right').click(function(){
			sl_s_reviews.goToNextSlide();
			$('.s_reviews__item_hidden').removeClass('_active');
			$('.s_reviews__item_more').text('Читать далее');
		});
	}

	//cert slider
	if($('.s_cert__slider').length){
		var sl_cert = $('.s_cert__slider').lightSlider({
			item: 4,
			pager: false,
			controls: false,
			slideItem: 1,
			loop: true,
			speed: 200,
			onSliderLoad: function(el) {
				el.lightGallery({
					selector: '.s_cert__slider .lslide'
				});
			},
			responsive : [
				{
					breakpoint:763,
					settings: {
						item:3
					}
				},
				{
					breakpoint:411,
					settings: {
						item:1
					}
				}
			]
		});
		$('.s_cert__arr_left').click(function(){
			sl_cert.goToPrevSlide();
		});
		$('.s_cert__arr_right').click(function(){
			sl_cert.goToNextSlide();
		});
	}

	

	//sticky
	

	//read more
	$('.s_reviews__item_more').click(function(e){
		e.preventDefault();
		var more = $(this),
			text = more.prev('p'),
			hidden = text.find('.s_reviews__item_hidden');

		if(more.text()=='Читать далее'){
			more.text('Скрыть');
			hidden.addClass('_active');
		}else{
			more.text('Читать далее');
			hidden.removeClass('_active');
		}
		sl_s_reviews.refresh();
	});


	//popups
	



	//mask
	$('input[name="phone"]').mask("+3 (099) 999-99-99");
	// validate
	$("._validate").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: true},
				phone: {required: true},
				mail: {required: true},
				question: {required: true},
				desc: {required: false}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					url: '../mail.php',
					type: 'POST',
					data: it.serialize(),
					cache: false,
					success: function( respond, textStatus, jqXHR ){
						$('.popup').removeClass('_visible');
						var name = 'thnx'
						popup = $('.popup_'+name),
							popup_h = popup.outerHeight(),
							popup_w = popup.outerWidth(),
							h = $(window).height(),
							px = window.pageYOffset + h/2 - popup_h/2;
						popup.css({
							'top': px+'px',
							'margin-left': '-'+ popup_w/2 +'px',
						});
						$('.popup.popup_'+name+', .overlay').addClass('_visible');
						setTimeout(function () {
							if ($('.popup_thnx').hasClass('_visible')) {
								$('.popup_thnx, .overlay').removeClass('_visible');
							}
						}, 2000);
						$("form").trigger( 'reset' );
					},
					error: function( jqXHR, textStatus, errorThrown ){
						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
					}
				});
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});

	//map
	if ($('*').is('#map')) {
		function init () {
			/**
     * Создаем мультимаршрут.
     * Первым аргументом передаем модель либо объект описания модели.
     * Вторым аргументом передаем опции отображения мультимаршрута.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
     */
			var multiRoute = new ymaps.multiRouter.MultiRoute({
				// Описание опорных точек мультимаршрута.
				referencePoints: [
					[52.299335, 76.964236],
					[52.305599, 76.982239]
				],
				// Параметры маршрутизации.
				params: {
					// Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
					results: 2
				}
			}, {
				// Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
				boundsAutoApply: true
			});

			// Создаем кнопки для управления мультимаршрутом.
			var trafficButton = new ymaps.control.Button({
				data: { content: "Учитывать пробки" },
				options: { selectOnClick: true }
			});

			// Объявляем обработчики для кнопок.
			trafficButton.events.add('select', function () {
				multiRoute.model.setParams({ avoidTrafficJams: true }, true);
			});

			trafficButton.events.add('deselect', function () {
				multiRoute.model.setParams({ avoidTrafficJams: false }, true);
			});

			// Создаем карту с добавленными на нее кнопками.
			var myMap = new ymaps.Map('map', {
				center: [52.299335, 76.964236],
				zoom: 8,
				controls: [trafficButton]
			}, {
				buttonMaxWidth: 300
			});

			// Добавляем мультимаршрут на карту.
			myMap.geoObjects.add(multiRoute);
		}

		ymaps.ready(init);

	}
});
