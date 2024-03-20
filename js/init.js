

/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* Reload Page FIX
------------------------------------------------------ */
   window.onload = function() {
   window.scrollTo(0, 0);
   }

/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '55px' });
	 }, 100);





/* MultiLanguage ------------------------------------------------------
const flagsElement = document.getElementById('flags');
*/

const miCheckbox = document.getElementById('miCheckbox');


const textsToChange = document.querySelectorAll('[data-section]')

const changeLanguage = async (language) => {
   const requestJson = await fetch(`./languages/${language}.json`);
   const texts = await requestJson.json();
   
   for(const textToChange of textsToChange){
      const section = textToChange.dataset.section
      const value = textToChange.dataset.value
      textToChange.innerHTML = texts[section][value]
      
   }

}

miCheckbox.addEventListener('change', function() {
   if (this.checked) {
     // Acciones cuando el checkbox está marcado
     changeLanguage('en')
   } else {
     // Acciones cuando el checkbox está desmarcado
     changeLanguage('es')
   }
 });


// flagsElement.addEventListener('click', e => {
//    changeLanguage(e.target.parentElement.dataset.language)
//    //changeLanguage(e.target.parentElement.dataset.language)
//    //console.log(e.target.innerHTML.toLowerCase())
// })

/* LightMode ------------------------------------------------------
*/

const lightMode = document.getElementById('lightmode');
lightMode.addEventListener('click', () => {
   document.body.classList.toggle('light')
})

const miImagen1 = document.getElementById('miImagen1');
const miImagen2 = document.getElementById('miImagen2');

function cambiarSrc() {
   if (lightMode.checked) {
     miImagen1.src = 'images/icons/light/mdi_github.svg'; // Cambia el src cuando el checkbox está marcado
     miImagen2.src = 'images/icons/light/mdi_linkedin.svg';
   } else {
     miImagen1.src = 'images/icons/mdi_github.svg'; // Restaura el src cuando el checkbox está desmarcado
     miImagen2.src = 'images/icons/mdi_linkedin.svg';
   }
 }

// Agrega un evento de escucha para detectar cambios en el estado del checkbox
lightMode.addEventListener('change', cambiarSrc);

/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   
$('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      //validations 

      if(!contactName){
         $('#image-loader').fadeOut();
         $('#message-warning').html('Please enter your name.');
         $('#message-warning').fadeIn();
         return false;
      }
      const valEmail = (email) => {
         const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
         return regex.test(email);
      }
      console.log(valEmail(contactEmail))
      console.log(!contactEmail)
      if(!contactEmail || !valEmail(contactEmail)){
         $('#image-loader').fadeOut();
         $('#message-warning').html('Please enter your correct email.');
         $('#message-warning').fadeIn();
       
         return false;
        }  
      
      if(!contactSubject){
         $('#image-loader').fadeOut();
         $('#message-warning').html('Please enter the subject.');
         $('#message-warning').fadeIn();
         return false;
      }
      if(!contactMessage){
         $('#image-loader').fadeOut();
         $('#message-warning').html('Please enter your message.');
         $('#message-warning').fadeIn();
         return false;
      }
      var data ={contactName, contactEmail, contactSubject, contactMessage}

   
      const URL = 'https://formsubmit.co/ajax/'
      const email = 'test@gmail.com'

      fetch(URL + email, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(data)         
      })
      .then(response => response.json())
      .then(
         data => {
            console.log(data);
            if (data.success) {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();
            }
         }
      )
      .catch(error => {
         $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
      })

     
      return false;
   });


});








