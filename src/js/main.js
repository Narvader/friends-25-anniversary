var pictures = new Array(
	['https://www.ecestaticos.com/file/4fc9e6e6492b53ddbbd323a90f70b91d/1568738098-marco.png'],
	['https://www.ecestaticos.com/file/ce3e721aee757e4e65afb461279b67b4/1568738158-chaleco.png'],
	['https://www.ecestaticos.com/file/a9f3a722b69f9067207758c372591776/1568738169-pizarra.png'],
	['https://www.ecestaticos.com/file/61853b91acafa26dd9c6526c64c02141/1568738147-guitarra.png'],
	['https://www.ecestaticos.com/file/78fb8442e2976e665de157d5cfccd528/1568738113-dinosaurio.png'],
	['https://www.ecestaticos.com/file/157331dfb38a83e3649c661067a45bbc/1568738128-falda.png']
);

var count = 0;
var startScrolling = false;
var stopArray = false;
var scrollWindow, circle, windowHeight, translateArea, decorationTop, decorationBottom, getScrollPercent, total, slideCount;

var jq = jQuery.noConflict();

jq(document).ready(function(){
	
    init();

    jq('.button').click(function(){
    	jq(".methodology--hidden").toggleClass('visible');
    	jq('.methodology--bg').toggleClass('hidden');
    	jq(this).text(function(i, v){
               return v === 'Seguir leyendo' ? 'Cerrar' : 'Seguir leyendo'
            })
    });

    jq(window).scroll(function(){
    	scrollWindow = jq(window).scrollTop();
    	scrollSocialNetworks();

    	if(!startScrolling) {
    		headerAnimation();
    		startScrolling = true;
    	};

    	if(!isVisible(jq('.header--array'), scrollWindow)){
    		if(!stopArray) {
    			stopArray = true;
    			changeImg();
    		}
    	};

    	jq('.mask').each(function(){
    		if(isVisible(jq(this), scrollWindow)){
    			jq(this).find('img').addClass('visible');
    		}
    	});

    	//Circle's parallax
    	if(!isDevice()){
    		jq('.circle').each(function(){
	    		if(isVisible(jq(this), scrollWindow)){

	    			circle = jq('.circle').height();
	    			windowHeight = jq(window).height();
	    			translateArea = circle - windowHeight;
	    		
	    			decorationTop = jq(this).offset().top;
	    			decorationBottom = decorationTop + jq(this).height();
	    			getScrollPercent =  (scrollWindow - decorationTop ) / decorationBottom;

	    			total = getScrollPercent * translateArea;
	    			totalCouch = -(getScrollPercent * translateArea);
	    		};
	    	});
    	}
    	
    	jq('.graphic__box').each(function(){
    		if(isVisible(jq(this), scrollWindow)){
    			
    			jq(this).find('img').addClass('visible');	
    		}
    	});


    	if(isVisible(jq('.footer__logo'), scrollWindow)) {
    		jq('.share-container').removeClass('is-visible');
    	};

    });
  

});

window.onload = function(){ 
	adjustElements();
}

function adjustElements() {

	var text = jq('.text').offset().left
	
	if(jq(window).width() > 993){
		jq('.card--one').css('margin-left', text);
	}
}

function isVisible(el,scroll) {
    var elementTop = el.offset().top;
	var elementBottom = elementTop + el.outerHeight();
	var viewportTop = scroll;
	var viewportBottom = viewportTop + jq(window).height();
	return (elementTop > viewportTop) && (elementBottom < viewportBottom);
}


function init() {
    socialNetworksSharing();
    initCarousel();

    setTimeout(function(){
    	changeImg();
    	setInterval(changeImg, 1000);
    }, 2000);
}

function headerAnimation() {

	jq('.header__circle').addClass('scaled');
	jq('.header__title').addClass('gray');
	jq('.header__subtitle').addClass('visible');
	jq('.header__friends-logo').addClass('black')

}

function changeImg(){
    // cambiamos la imagen y la url
    count++
    document.getElementById("picture").src=pictures[count%pictures.length];
}

function scrollSocialNetworks() {
	var desktopSocialNetworks = jq(".aside");
	var mobileSocialNetworks = jq(".share-container");
	var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
	if (scrollTop > 63){
		mobileSocialNetworks.addClass('is-visible');
		desktopSocialNetworks.addClass('is-visible');
	} else {
		mobileSocialNetworks.removeClass('is-visible');
		desktopSocialNetworks.removeClass('is-visible');
	}
}

function getScrollPercent() {
	var bottom = jq(window).height() + jq(window).scrollTop();
	var height = jq(document).height();
	return Math.round(100*bottom/height);
}

function socialNetworksSharing() {
	var urlPage = window.location.href;
	jq('.share-fb').each(function(){
	var fbHref = "https://www.facebook.com/sharer/sharer.php?u="+urlPage;
        jq(this).attr('href',fbHref);
    });
    jq('.share-tw').each(function(){
        var tuitText = encodeURI(jq(this).data('text'));
        var tuitHref = "https://twitter.com/intent/tweet?url="+urlPage+"&text="+tuitText+"&original_referer="+urlPage;
        jq(this).attr('href',tuitHref);
    });
    jq('.share-lk').each(function(){
        var lkText = encodeURI(jq(this).data('text'));
        var lkHref = "https://www.linkedin.com/shareArticle?mini=true&url="+urlPage+"&title="+lkText+"&summary=&source=";
        jq(this).attr('href',lkHref);
    });
    jq('.share-wa').each(function(){
        var waText = encodeURI(jq(this).data('text'));
        var waHref = "https://wa.me/?text="+waText+" "+urlPage;
        jq(this).attr('href',waHref);
    });
}

function isDevice() {
	return jq(window).width() < 993
}

function initCarousel() {
	jq('.carousel').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 3,
		slidesToScroll: 3,
		centerPadding: '10px',
		responsive: [
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					centerPadding: '10px'
					
				}
			},
			{
				breakpoint: 460,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '10px'
				}
			}
		]
	});


	jq('.carousel').on('init', function(event, slick){
	  slideCount = slick.slideCount;
	  setSlideCount();
	  setCurrentSlideNumber(slick.currentSlide);
	});

	jq('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  setCurrentSlideNumber(nextSlide);
	});

	function setSlideCount() {
	  var el = jq('.carousel__number').find('.total');
	  el.text(slideCount);
	}

	function setCurrentSlideNumber(currentSlide) {
	  var el = jq('.carousel__number').find('.current');
	  el.text(currentSlide + 1);
	}

	//Carrusel del primer gráfico
	jq('.graphic__carousel').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '10px'
	});

	jq('.graphic__carousel').on('init', function(event, slick){
		
	  var slideCount = slick.slideCount;
	  setSlideGraphicCount();
	  setCurrentSlideGraphicNumber(slick.currentSlide);
	});

	jq('.graphic__carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
	  setCurrentSlideGraphicNumber(nextSlide);
	});

	function setSlideGraphicCount() {
		
	  var el = jq('.graphic__number').find('.total');
	  el.text(slideCount);
	}

	function setCurrentSlideGraphicNumber(currentSlide) {
		
	  var el = jq('.graphic__number').find('.current');
	  el.text(currentSlide + 1);
	}

	//Primer Carrusel de texto
		jq('.carousel__anecdote').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '10px'
	});

	jq('.carousel__anecdote').on('init', function(event, slick){
		
	  var slideCount = slick.slideCount;
	  setSlideTextCount();
	  setCurrentSlideTextNumber(slick.currentSlide);
	});

	jq('.carousel__anecdote').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
	  setCurrentSlideTextNumber(nextSlide);
	});

	function setSlideTextCount() {
		
	  var el = jq('.number--one').find('.total');
	  el.text(slideCount);
	}

	function setCurrentSlideTextNumber(currentSlide) {
		
	  var el = jq('.number--one').find('.current');
	  el.text(currentSlide + 1);
	}


	//Segundo Carrusel de texto
	jq('.carousel__anecdote--two').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '10px'
	});

	jq('.carousel__anecdote--two').on('init', function(event, slick){
		
	  var slideCount = slick.slideCount;
	  setSlideTextCountTwo();
	  setCurrentSlideTextNumberTwo(slick.currentSlide);
	});

	jq('.carousel__anecdote--two').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
	  setCurrentSlideTextNumberTwo(nextSlide);
	});

	function setSlideTextCountTwo() {
		
	  var el = jq('.number--two').find('.total');
	  el.text(slideCount);
	}

	function setCurrentSlideTextNumberTwo(currentSlide) {
		
	  var el = jq('.number--two').find('.current');
	  el.text(currentSlide + 1);
	}

}