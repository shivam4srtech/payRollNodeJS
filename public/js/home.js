function inVisible(element) {
    var WindowTop = $(window).scrollTop();
    var WindowBottom = WindowTop + $(window).height();
    var ElementTop = element.offset().top;
    var ElementBottom = ElementTop + element.height();
    if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
      animate(element);
  }
  
  function animate(element) {
    if (!element.hasClass('ms-animated')) {
      var maxval = element.data('max');
      var html = element.html();
      element.addClass("ms-animated");
      $({
        countNum: element.html()
      }).animate({
        countNum: maxval
      }, {
        duration: 5000,
        easing: 'linear',
        step: function() {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function() {
          element.html(this.countNum + html);
        }
      });
    }
  
  }
  
  $(function() {

    $(window).scroll(function() {
      $("h2[data-max]").each(function() {
        inVisible($(this));
      });
    })
  });
  // testimonial==================
  const swiperTestmonials = new Swiper('.swiper-testmonials', {
    loop: true,
    slidesPerView: 1.2,
    grabCursor: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-testmonials-next',
        prevEl: '.swiper-button-testmonials-prev',
    },
    breakpoints: {
        // when window width is >= 640px
        500: {
            slidesPerView: 1.4,
        },
        780: {
            slidesPerView: 1.8,
        },
        1300: {
            slidesPerView: 2.6,
        },
        1630: {
            slidesPerView: 3.2,
        }
    }

});