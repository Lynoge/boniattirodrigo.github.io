/**
 * Define day and night plugin
 * Source help: http://stackoverflow.com/questions/2250036/how-to-determine-if-it-is-day-or-night-in-javascript-or-jquery
 */

var hr = (new Date()).getHours();

if (hr > 18 || hr < 6) {
    $('.header').addClass('header--night');
}

/**
 * Radom image I coder
 * Source help: http://stackoverflow.com/questions/22363616/generate-random-number-between-2-variables-jquery
 */

var minNumber = 1;
var maxNumber = 3;

function randomNumberFromRange(min, max) {

    var randomNumber = Math.floor(Math.random()*(max-min+1)+min);

    if (randomNumber === 1) {
        $('.i-coder').addClass('i-coder--coffee-in-the-hand');
    } else if (randomNumber === 2) {
        $('.i-coder').addClass('i-coder--normal');
    } else if (randomNumber === 3) {
        $('.i-coder').addClass('i-coder--drink-coffee');
    }

}

randomNumberFromRange(minNumber, maxNumber);

// Hidden toggle menu when click outside

$(".menu-toggle").click(function () {
    $(".nav__options").toggleClass("nav__options--active");
    $(document.body).mousedown(function(event) {
        var target = $(event.target);
        if (!target.parents().andSelf().is('.nav')){
            $(".nav__options").removeClass("nav__options--active");
        }
    });
    return false;
});

// Hidden menu when scroll

$( window ).scroll(function() {
    $(".nav__options").removeClass("nav__options--active");
});

// Magnific popup

$('.open-trabalhos').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'modulos-popup fade-popup'
});
$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Fechar (Esc)',
  tLoading: 'Carregando...'
});

// Navigation scroll

$(document).ready(function() {
    $('.nav').scrollToFixed();

    var menuItems = $(".nav__options a");
    menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-15;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        },
        400, function () {});
        e.preventDefault();
    });


    // Move arm when focus in input
    $("#email").focus(function() {
        $('.i-arm').addClass('i-arm-email-focus');
        $('.i-arm').removeClass('i-arm-mensagem-focus');
    });

    $("#mensagem").focus(function() {
        $('.i-arm').addClass('i-arm-mensagem-focus');
        $('.i-arm').removeClass('i-arm-email-focus');
    });

    $("#nome").focus(function() {
        $('.i-arm').removeClass('i-arm-email-focus');
        $('.i-arm').removeClass('i-arm-mensagem-focus');
    });

    (function() {
        if($.fn.validate) {
            var $contactForm = $(".form");
            // VALIDATE FORM
            $contactForm.validate();
            $contactForm.submit(function(e) {
                if ($(this).valid()) {
                    var nome = $("input#nome").val();
                    $(".subject").val(nome + " - Contato via site");
                    e.preventDefault();
                    $.ajax({
                        url: '//formspree.io/boniatti.rodrigo@gmail.com',
                        method: 'POST',
                        data: $(this).serialize(),
                        dataType: 'json',
                        beforeSend: function() {
                            $(".btn-submit").val('Enviando...');
                        },
                        success: function() {
                            $(".btn-submit").val('Enviado');
                            $(".btn-submit").addClass("btn-submit--success");
                            $(".i-mouth").addClass("i-happy-smile");
                            $contactForm.append('<span class="form-message">Mensagem enviada com sucesso.</span>');
                            $('input[type="submit"]').attr('disabled','disabled');
                            $('input[type="text"]').keyup(function() {
                                if($(this).val() !== '') {
                                    $('input[type="submit"]').removeAttr('disabled');
                                }
                            });
                        },
                        error: function() {
                            $(".btn-submit").removeClass("btn-submit--success");
                            $(".btn-submit").addClass("btn-submit--error");
                            $(".i-mouth").addClass("i-open-mouth");
                            $(".btn-submit").val('Ops, ocorreu um erro.');
                            $contactForm.append('<span class="form-message">Ocorreu um erro ao enviar sua mensagem. Utilize meu email abaixo.</span>');
                            $('input[type="submit"]').attr('disabled','disabled');
                            $('input[type="text"]').keyup(function() {
                                if($(this).val() !== '') {
                                    $('input[type="submit"]').removeAttr('disabled');
                                }
                             });
                        }
                    });
                }
               return false;
            });
        }
    })();

});