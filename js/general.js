

$( document ).ready(function() {




  $(".how-it-works-scroll").click(function() {
      $('html, body').animate({
          scrollTop: $("#how-it-works").offset().top
      }, 500);
  });

  $( "#tab-one" ).on( "click", function() {
    $(".tab-button").removeClass("active");
    $(this).addClass("active");
    $(".info p").text("Are you a student or graduate of a credentialed training program in the trades, including skilled trades, allied health, and IT? WorkAmerica is the exclusive recruiting network built just for you.");
    $("#learn-more-table-btn").attr("href", "http://www.workamerica.co/join-now.html");
    $("#learn-more-table-btn").text("Join Now");
  });

  $( "#tab-two" ).on( "click", function() {
    $(".tab-button").removeClass("active");
    $(this).addClass("active");
    $(".info p").text("Do you hire in the trades, including skilled trades, allied health and IT? We help everyone, from mom-and-pop shops to nationwide enterprises, find the credentialed talent that you desperately need");
    $("#learn-more-table-btn").attr("href", "http://www.workamerica.co/employers.html");
    $("#learn-more-table-btn").text("Learn More");
  });

  $( "#tab-three" ).on( "click", function() {
    $(".tab-button").removeClass("active");
    $(this).addClass("active");
    $(".info p").text("Are you a vocational school, credentialing agency, professional organization, non-profit or something else entirely, aligned with our mission to employ each and every American that holds a certification in the trades? Then we can certainly work together.");
    $("#learn-more-table-btn").attr("href", "http://www.workamerica.co/partners.html");
    $("#learn-more-table-btn").text("Learn More");

  });

  $( "#show-mobile-nav" ).on( "click", function() {
    $("#mobile-nav").show();
  });

  $( "#close-mobile-nav" ).on( "click", function() {
    $("#mobile-nav").hide();
  });

});