 //кості, кості, костилі
 var position = [-1, 0.6, 0.75, 0.9, 2]

 var didScroll = true;
 var lastScrollTop = 0;

 $(document).ready(function() {
     $(document).on("scroll", function(event) {
         didScroll = true;
     });
     setImageSize();
     $(window).resize(function() {
         setImageSize();
     });
     setInterval(function() {
         if (didScroll) {
             hasScrolled();
             didScroll = false;
         }
     }, 500);

     $(".button.down").on("click", function() {
         $("html, body").animate({
             scrollTop: $(".mode").height() - $(window).height()
         }, $(".mode").height());
     });
     $(".button.up").on("click", function() {
         $("html, body").animate({
             scrollTop: 0
         }, $(".mode").height());
     });
     $('#newsletter').submit(function() {
         var $this = $(this),
             $response = $('#response'),
             $mail = $('#signup-email'),
             testmail = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/,
             hasError = false;

         $response.find('p').remove();

         if (!testmail.test($mail.val())) {
             $response.html('<p class="error">Please enter a valid email</p>');
             hasError = true;
         }

         if (hasError === false) {

             $response.find('p').remove();
             $response.addClass('loading');

             $.ajax({
                 type: "POST",
                 dataType: 'json',
                 cache: false,
                 url: $this.attr('action'),
                 data: $this.serialize()
             }).done(function(data) {
                 $response.removeClass('loading');
                 $response.html('<p class="success">' + data.message + '</p>');
             }).fail(function() {
                 $response.removeClass('loading');
                 $response.html('<p class="error">An error occurred, please try again</p>');
             })
         }


         return false;
     });

 })


 function setImageSize() {
     var biggestHeight = "0";
     $(".modes *").each(function() {
         if ($(this).height() > biggestHeight) {
             biggestHeight = $(this).height()
         }
     });
     $(".modes").height(biggestHeight);
 }

 function hasScrolled() { //костильок
     var y = $(this).scrollTop() + $(window).height(),
         imageH = $(".mode").height(),
         scrolledDown = false,
         imagePosition = $(".mode").offset().top;




     //костильок
     if (lastScrollTop < $(this).scrollTop())
         scrolledDown = true;
     for (var i = 1; i < position.length - 1; i++) {
         if (y >= position[i] * imageH + imagePosition && scrolledDown) {
             if ($(".mode" + (i)).is(":visible")) {
                 $(".mode" + (i)).fadeOut(600);
                 if (i == 3) {
                     $(".intro .text").eq(1).fadeIn(600);
                     $(".intro .text").eq(0).hide();
                 }
             }
         } else if (y <= position[i] * imageH + imagePosition && !scrolledDown) {


             if ($(".mode" + (i)).is(":hidden")) {
                 $(".mode" + (i)).fadeIn(600);

                 if (i == 3) {
                     $(".intro .text").eq(0).fadeIn(600);
                     $(".intro .text").eq(1).hide();
                 }
             }
         }
     }
     lastScrollTop = $(this).scrollTop();
 }