$( document ).ready(function() {
  $(".how-it-works-scroll").click(function() {
      $('html, body').animate({
          scrollTop: $("#how-it-works").offset().top
      }, 500);
  });

  $( "#show-mobile-nav" ).on( "click", function() {
    $("#mobile-nav").show();
  });

  $( "#close-mobile-nav" ).on( "click", function() {
    $("#mobile-nav").hide();
  });

  $( "#navbar-pri-navicon, .nav-toggle" ).on( "click", function() {
    toggleMobileNav();
  });


  // _slaask.init('0b75a46e0da9477b6cdaeafd34d8ce2e');


  $(window).on("resize", function(event){
    if ($(window).width() > 996) {
      $(".navbar-mobile").removeClass("is-active");
      $(".navbar-pri").removeClass("is-active");
    }
  });
});


function pageTitle() {
  var docTitle = document.title; {}
}

function toggleMobileNav() {
  $(".navbar-mobile").toggleClass("is-active");
  $(".navbar-pri").toggleClass("is-active");
}
