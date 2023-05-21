/* ==============================================
Parallax
=============================================== */

if(!Modernizr.touch){
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    });
}

/* ==============================================
Liquid Slider - Home Text Slider
=============================================== */

$('#slider-home').liquidSlider({
  autoSlide: false,
  autoSlideInterval: 4500,
  autoSlideControls: true,
  forceAutoSlide: false,
  dynamicArrows: false,
  slideEaseFunction:'animate.css',
  // slideEaseDuration:900,
  heightEaseDuration:400,
  animateIn:"fadeInUp"//,
  // animateOut:"fadeInDown",
  // callback: function() {
  //   var self = this;
  //   $('.slider-6-panel').each(function() {
  //     $(this).removeClass('animated ' + self.options.animateIn);
  //   });
  // }
});


/* ==============================================
Liquid Slider - Testimonials
=============================================== */

// $('#testimonials-slider').liquidSlider({
//   autoSlide: true,
//   autoSlideInterval:  5000,
//   autoSlideControls:  true,
//   forceAutoSlide: true,
//   autoHeight: true,
//   dynamicArrows: true,
//   keyboardNavigation: true,
//   slideEaseFunction:'animate.css',
//   slideEaseDuration:500,
//   heightEaseDuration:500,
//   animateIn:"fadeInUp",
//   animateOut:"fadeOutUp",
//   callback: function() {
//     var self = this;
//     $('.slider-6-panel').each(function() {
//       $(this).removeClass('animated ' + self.options.animateIn);
//     });
//   }
// });

/* ==============================================
Sticky Navbar
=============================================== */

$(document).ready(function(){
    $(".navbar").sticky({topSpacing:0});
});

/* ==============================================
Auto Close Responsive Navbar on Click
=============================================== */

function close_toggle() {
  if ($(window).width() <= 992) {
    $('.navbar-collapse a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
    });
  }
  else {
   $('.navbar .navbar-default a').off('click');
  }
}
close_toggle();

$(window).resize(close_toggle);

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });

$(function () {
  $('.navbar-toggle').bind('click', function (event) {
    var $anchor = $('.navbar-header');
    $('html, body').stop().animate({
        scrollTop: $($anchor).offset().top - 0
    }, 800, 'swing');
    event.preventDefault();
  });
});

/* ==============================================
WOW plugin triggers animation.css on scroll
=============================================== */

var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       150,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
  }
);
wow.init();

/* ==============================================
FlexSlider v2.2.2
=============================================== */

$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
    });
    $('.shop-flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
    });
});


/* ==============================================
Back to Top
=============================================== */

$(window).scroll(function(){
    if($(window).scrollTop() > 300){
      $(".back-to-top").fadeIn(600);
    } else{
      $(".back-to-top").fadeOut(600);
    }
});

$('.back-to-top').click(function() {
    $('html, body').animate({ scrollTop:0 }, '1000');
    return false;
});


/* ==============================================
Smooth Scroll To Anchor
=============================================== */

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('#main-nav a, .home-bottom a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 66
        }, 1000);
        event.preventDefault();
    });
});

/* ==============================================
Active Menu Item on Page Scroll
=============================================== */

var sections = $('section'),
    nav = $('nav'),
    nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('current');
      sections.removeClass('current');

      $(this).addClass('current');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
    }
  });
});

/* ==============================================
Smooth Scroll (mouse-wheel)
=============================================== */

// SmoothScroll for websites v1.2.1
// Licensed under the terms of the MIT license.

// People involved
//  - Balazs Galambosi (maintainer)
//  - Michael Herf     (Pulse Algorithm)

(function(){

// Scroll Variables (tweakable)
var defaultOptions = {

    // Scrolling Core
    frameRate        : 60, // [Hz]
    animationTime    : 700, // [px]
    stepSize         : 130, // [px]

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 10,
    pulseNormalize   : 1,

    // Acceleration
    accelerationDelta : 20,  // 20
    accelerationMax   : 1,   // 1

    // Keyboard Settings
    keyboardSupport   : true,  // option
    arrowScroll       : 50,     // [px]

    // Other
    touchpadSupport   : true,
    fixedBackground   : true,
    excluded          : ""
};

var options = defaultOptions;


// Other Variables
var isExcluded = false;
var isFrame = false;
var direction = { x: 0, y: 0 };
var initDone  = false;
var root = document.documentElement;
var activeElement;
var observer;
var deltaBuffer = [ 120, 120, 120 ];

var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32,
            pageup: 33, pagedown: 34, end: 35, home: 36 };


/***********************************************
 * SETTINGS
 ***********************************************/

var options = defaultOptions;


/***********************************************
 * INITIALIZE
 ***********************************************/

/**
 * Tests if smooth scrolling is allowed. Shuts down everything if not.
 */
function initTest() {

    var disableKeyboard = false;

    // disable keyboard support if anything above requested it
    if (disableKeyboard) {
        removeEvent("keydown", keydown);
    }

    if (options.keyboardSupport && !disableKeyboard) {
        addEvent("keydown", keydown);
    }
}

/**
 * Sets up scrolls array, determines if frames are involved.
 */
function init() {

    if (!document.body) return;

    var body = document.body;
    var html = document.documentElement;
    var windowHeight = window.innerHeight;
    var scrollHeight = body.scrollHeight;

    // check compat mode for root element
    root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
    activeElement = body;

    initTest();
    initDone = true;

    // Checks if this script is running in a frame
    if (top != self) {
        isFrame = true;
    }

    /**
     * This fixes a bug where the areas left and right to
     * the content does not trigger the onmousewheel event
     * on some pages. e.g.: html, body { height: 100% }
     */
    else if (scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight ||
             html.offsetHeight <= windowHeight)) {

        html.style.height = '100%';
        //setTimeout(refresh, 10);

        // clearfix
        if (root.offsetHeight <= windowHeight) {
            var underlay = document.createElement("div");
            underlay.style.clear = "both";
            body.appendChild(underlay);
        }
    }

    // disable fixed background
    if (!options.fixedBackground && !isExcluded) {
        body.style.backgroundAttachment = "scroll";
        html.style.backgroundAttachment = "scroll";
    }
}


/************************************************
 * SCROLLING
 ************************************************/

var que = [];
var pending = false;
var lastScroll = +new Date;

/**
 * Pushes scroll actions to the scrolling queue.
 */
function scrollArray(elem, left, top, delay) {

    delay || (delay = 1000);
    directionCheck(left, top);

    if (options.accelerationMax != 1) {
        var now = +new Date;
        var elapsed = now - lastScroll;
        if (elapsed < options.accelerationDelta) {
            var factor = (1 + (30 / elapsed)) / 2;
            if (factor > 1) {
                factor = Math.min(factor, options.accelerationMax);
                left *= factor;
                top  *= factor;
            }
        }
        lastScroll = +new Date;
    }

    // push a scroll command
    que.push({
        x: left,
        y: top,
        lastX: (left < 0) ? 0.99 : -0.99,
        lastY: (top  < 0) ? 0.99 : -0.99,
        start: +new Date
    });

    // don't act if there's a pending queue
    if (pending) {
        return;
    }

    var scrollWindow = (elem === document.body);

    var step = function (time) {

        var now = +new Date;
        var scrollX = 0;
        var scrollY = 0;

        for (var i = 0; i < que.length; i++) {

            var item = que[i];
            var elapsed  = now - item.start;
            var finished = (elapsed >= options.animationTime);

            // scroll position: [0, 1]
            var position = (finished) ? 1 : elapsed / options.animationTime;

            // easing [optional]
            if (options.pulseAlgorithm) {
                position = pulse(position);
            }

            // only need the difference
            var x = (item.x * position - item.lastX) >> 0;
            var y = (item.y * position - item.lastY) >> 0;

            // add this to the total scrolling
            scrollX += x;
            scrollY += y;

            // update last values
            item.lastX += x;
            item.lastY += y;

            // delete and step back if it's over
            if (finished) {
                que.splice(i, 1); i--;
            }
        }

        // scroll left and top
        if (scrollWindow) {
            window.scrollBy(scrollX, scrollY);
        }
        else {
            if (scrollX) elem.scrollLeft += scrollX;
            if (scrollY) elem.scrollTop  += scrollY;
        }

        // clean up if there's nothing left to do
        if (!left && !top) {
            que = [];
        }

        if (que.length) {
            requestFrame(step, elem, (delay / options.frameRate + 1));
        } else {
            pending = false;
        }
    };

    // start a new queue of actions
    requestFrame(step, elem, 0);
    pending = true;
}


/***********************************************
 * EVENTS
 ***********************************************/

/**
 * Mouse wheel handler.
 * @param {Object} event
 */
function wheel(event) {

    if (!initDone) {
        init();
    }

    var target = event.target;
    var overflowing = overflowingAncestor(target);

    // use default if there's no overflowing
    // element or default action is prevented
    if (!overflowing || event.defaultPrevented ||
        isNodeName(activeElement, "embed") ||
       (isNodeName(target, "embed") && /\.pdf/i.test(target.src))) {
        return true;
    }

    var deltaX = event.wheelDeltaX || 0;
    var deltaY = event.wheelDeltaY || 0;

    // use wheelDelta if deltaX/Y is not available
    if (!deltaX && !deltaY) {
        deltaY = event.wheelDelta || 0;
    }

    // check if it's a touchpad scroll that should be ignored
    if (!options.touchpadSupport && isTouchpad(deltaY)) {
        return true;
    }

    // scale by step size
    // delta is 120 most of the time
    // synaptics seems to send 1 sometimes
    if (Math.abs(deltaX) > 1.2) {
        deltaX *= options.stepSize / 120;
    }
    if (Math.abs(deltaY) > 1.2) {
        deltaY *= options.stepSize / 120;
    }

    scrollArray(overflowing, -deltaX, -deltaY);
    event.preventDefault();
}

/**
 * Keydown event handler.
 * @param {Object} event
 */
function keydown(event) {

    var target   = event.target;
    var modifier = event.ctrlKey || event.altKey || event.metaKey ||
                  (event.shiftKey && event.keyCode !== key.spacebar);

    // do nothing if user is editing text
    // or using a modifier key (except shift)
    // or in a dropdown
    if ( /input|textarea|select|embed/i.test(target.nodeName) ||
         target.isContentEditable ||
         event.defaultPrevented   ||
         modifier ) {
      return true;
    }
    // spacebar should trigger button press
    if (isNodeName(target, "button") &&
        event.keyCode === key.spacebar) {
      return true;
    }

    var shift, x = 0, y = 0;
    var elem = overflowingAncestor(activeElement);
    var clientHeight = elem.clientHeight;

    if (elem == document.body) {
        clientHeight = window.innerHeight;
    }

    switch (event.keyCode) {
        case key.up:
            y = -options.arrowScroll;
            break;
        case key.down:
            y = options.arrowScroll;
            break;
        case key.spacebar: // (+ shift)
            shift = event.shiftKey ? 1 : -1;
            y = -shift * clientHeight * 0.9;
            break;
        case key.pageup:
            y = -clientHeight * 0.9;
            break;
        case key.pagedown:
            y = clientHeight * 0.9;
            break;
        case key.home:
            y = -elem.scrollTop;
            break;
        case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            y = (damt > 0) ? damt+10 : 0;
            break;
        case key.left:
            x = -options.arrowScroll;
            break;
        case key.right:
            x = options.arrowScroll;
            break;
        default:
            return true; // a key we don't care about
    }

    scrollArray(elem, x, y);
    event.preventDefault();
}

/**
 * Mousedown event only for updating activeElement
 */
function mousedown(event) {
    activeElement = event.target;
}


/***********************************************
 * OVERFLOW
 ***********************************************/

var cache = {}; // cleared out every once in while
setInterval(function () { cache = {}; }, 10 * 1000);

var uniqueID = (function () {
    var i = 0;
    return function (el) {
        return el.uniqueID || (el.uniqueID = i++);
    };
})();

function setCache(elems, overflowing) {
    for (var i = elems.length; i--;)
        cache[uniqueID(elems[i])] = overflowing;
    return overflowing;
}

function overflowingAncestor(el) {
    var elems = [];
    var rootScrollHeight = root.scrollHeight;
    do {
        var cached = cache[uniqueID(el)];
        if (cached) {
            return setCache(elems, cached);
        }
        elems.push(el);
        if (rootScrollHeight === el.scrollHeight) {
            if (!isFrame || root.clientHeight + 10 < rootScrollHeight) {
                return setCache(elems, document.body); // scrolling root in WebKit
            }
        } else if (el.clientHeight + 10 < el.scrollHeight) {
            overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
            if (overflow === "scroll" || overflow === "auto") {
                return setCache(elems, el);
            }
        }
    } while (el = el.parentNode);
}


/***********************************************
 * HELPERS
 ***********************************************/

function addEvent(type, fn, bubble) {
    window.addEventListener(type, fn, (bubble||false));
}

function removeEvent(type, fn, bubble) {
    window.removeEventListener(type, fn, (bubble||false));
}

function isNodeName(el, tag) {
    return (el.nodeName||"").toLowerCase() === tag.toLowerCase();
}

function directionCheck(x, y) {
    x = (x > 0) ? 1 : -1;
    y = (y > 0) ? 1 : -1;
    if (direction.x !== x || direction.y !== y) {
        direction.x = x;
        direction.y = y;
        que = [];
        lastScroll = 0;
    }
}

var deltaBufferTimer;

function isTouchpad(deltaY) {
    if (!deltaY) return;
    deltaY = Math.abs(deltaY)
    deltaBuffer.push(deltaY);
    deltaBuffer.shift();
    clearTimeout(deltaBufferTimer);

    var allEquals    = (deltaBuffer[0] == deltaBuffer[1] &&
                        deltaBuffer[1] == deltaBuffer[2]);
    var allDivisable = (isDivisible(deltaBuffer[0], 120) &&
                        isDivisible(deltaBuffer[1], 120) &&
                        isDivisible(deltaBuffer[2], 120));
    return !(allEquals || allDivisable);
}

function isDivisible(n, divisor) {
    return (Math.floor(n / divisor) == n / divisor);
}

var requestFrame = (function () {
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              function (callback, element, delay) {
                  window.setTimeout(callback, delay || (1000/60));
              };
})();


/***********************************************
 * PULSE
 ***********************************************/

/**
 * Viscous fluid with a pulse for part and decay for the rest.
 * - Applies a fixed force over an interval (a damped acceleration), and
 * - Lets the exponential bleed away the velocity over a longer interval
 * - Michael Herf, http://stereopsis.com/stopping/
 */
function pulse_(x) {
    var val, start, expx;
    // test
    x = x * options.pulseScale;
    if (x < 1) { // acceleartion
        val = x - (1 - Math.exp(-x));
    } else {     // tail
        // the previous animation ended here:
        start = Math.exp(-1);
        // simple viscous drag
        x -= 1;
        expx = 1 - Math.exp(-x);
        val = start + (expx * (1 - start));
    }
    return val * options.pulseNormalize;
}

function pulse(x) {
    if (x >= 1) return 1;
    if (x <= 0) return 0;

    if (options.pulseNormalize == 1) {
        options.pulseNormalize /= pulse_(1);
    }
    return pulse_(x);
}

var isChrome = /chrome/i.test(window.navigator.userAgent);
var isMouseWheelSupported = 'onmousewheel' in document;

if (isMouseWheelSupported && isChrome) {
  addEvent("mousedown", mousedown);
  addEvent("mousewheel", wheel);
  addEvent("load", init);
};

})();


/***********************************************
 * MAGIC
 ***********************************************/

jQuery(document).ready(function(){

  if ( $(window).scrollTop() > 0) {
    setTimeout(function() {
      $('#fixed-navbar').removeAttr('style');
    }, 300);
  }

  $('.mostrar-todos').each(function(){
    $(this).click(function(event){
      $(this).parent().find('.ver-todos').click();
      event.preventDefault();
    });
  });

  $('.ver-todos').click(function(event){
    var self = this;
    var servicio = $(this).attr('data-href');
    var hijoScroll = $(this).attr('href');
    var padreScroll = $(this).attr('data-target');
    var detalle = $('.detalle');
    var seccion = $(this).parents('.row');
    var categoria = $(this).parents('.col-md-4');

    $(seccion).addClass('tabbed').find('.active').not(categoria).removeClass('active');
    $(this).parents('.col-md-4').addClass('active');

    $(detalle).not($(servicio)).removeClass('wow fadeInDown visible');
    $(servicio).addClass('visible');
    setTimeout(function() {
      $(servicio).addClass('wow fadeInDown');
      $(servicio).find('.service').addClass('wow fadeInDown');
    }, 300);

    $('html, body').stop().animate({
      scrollTop: $(hijoScroll).offset().top - 66
    }, 400);

    $('.detalle .close').click(function(){
      $(this).parents('.visible').removeClass('visible wow fadeInDown');
      $(seccion).removeClass('tabbed').find('.active').removeClass('active');
      $('html, body').stop().animate({
        scrollTop: $(padreScroll).offset().top - 66
      }, 400);
    });

    event.preventDefault();
  });

  $('.clients-logos a').click(function(event){
    event.preventDefault();
  });

  $('.ubicaciones strong').each(function(){
    $(this).click(function(){
      $(this).next().toggle();
    });
  });

  $('#contactform').submit(function(){
    var action = $(this).attr('action');

    $("#message").slideUp(750,function() {
      $('#message').hide();
      $('#submit').after('<img src="img/sending-g.gif" class="loader" />').attr('disabled','disabled');

    $.post(action, {
      nombre: $('#nombre').val(),
      email: $('#email').val(),
      telefono: $('#telefono').val(),
      mensaje: $('#mensaje').val(),
    },
    function(data){

      document.getElementById('message').innerHTML = '<p>'+data+'<p>';
      // document.getElementById('message').innerHTML = '<p><span class="close"><i class="icon ion-android-close"></i></span>'+data+'<p>';
      $('#message').show();
      $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
      //$('#submit').removeAttr('disabled');
      // $('.close-message').click(function(){
      //   $('#message').hide().html('');
      // });
      if(data.match('success') != null) $('#contactform').slideUp('slow');
      //document.getElementById("#contactform").reset();
      $('#contactform input[type="text"]').val('');
      $('#contactform input[type="email"]').val('');
      $('#contactform textarea').val('');
      setTimeout(function() {
        $('#message').fadeOut(function(){
          $(this).html('');
          
        });
      }, 7000);
     }
    );

   });

   return false;

  });

  $('#contact-phone').submit(function(){
    var action = $(this).attr('action');

    $("#message-phone").slideDown(1,function() {
      $('#submit-phone').after('<img src="img/sending-g.gif" class="loader" />').attr('disabled','disabled');

      $.post(action, {
        phone: $('#phone').val()
      },
      function(data){
        // document.getElementById('message-phone').innerHTML = '<p><span class="close-message"><i class="icon ion-android-close"></i></span>'+data+'<p>';
        document.getElementById('message-phone').innerHTML = '<p>'+data+'<p>';
        $('#message-phone').show();
        $('#contact-phone img.loader').fadeOut('slow',function(){$(this).remove()});
        $('#submit-phone').removeAttr('disabled');
        
        // $('.close-message').click(function(){
        //   $('#message-phone').hide().html('');
        // });
        if(data.match('success') !== null) $('#contact-phone').slideUp('slow');
        $('#contact-phone input[type="text"]').val('');
        //document.getElementById("#contact-phone").reset();
        setTimeout(function() {
          $('#message-phone').fadeOut(function(){
            $(this).html('');

          });
        }, 7000);
       }
    );

   });

   return false;

   });
//finestra modal aviso legal  
  $('#botonModal').on('click',function(){
      $('#myModal').modal('show');
  });
  
//enviar formulario
    $("#enviarformulario").click(function(){
        var url = "http://cloud.settingconsultoria.com:8089/poremp/rest/contacto";
        var form = $("#formcontact").serialize();
        console.log(form);
        if(form.search('legal') != -1 && form.search('=&') == -1 ) {
            var data = $("#formcontact").serialize();
        } else {
            noenviar();
            return false;
        }
        $.ajax({
            type: "POST",
            url: url,

            success: function(data)
            {
                enviarCorrecto();
            },
            error:function(){
                alert('no se obtuvo respuesta');
                
            }
        });

        return false; 
    });
//fin formulario  

});

function enviarCorrecto(){
    $('#formmodal').modal('show'); 
}

function noenviar(){
    $('#formmodalnoenviar').modal('show'); 
}