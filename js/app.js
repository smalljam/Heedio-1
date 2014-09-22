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

     $('form').submit(function() {
         var $this = $(this),
             $response = $this.parent().find('.response'),
             $mail = $this.find('input[name*="signup-email"]'),
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
                 $this.fadeOut(100);
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
     //absolute image parrent height
     var biggestHeight = "0";
     $(".modes *").each(function() {
         if ($(this).height() > biggestHeight) {
             biggestHeight = $(this).height()
         }
     });
     $(".modes").height(biggestHeight);
     if ($(window).height() > $(window).width() && $(window).width() > 640) {
         document.querySelector("meta[name=viewport]").setAttribute('content', 'width=' + $(window).width() / 2 + ' initial-scale=2, maximum-scale=2.0, user-scalable=0');
     } else if ($(window).height() < $(window).width()) {
         document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
     }
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
               if ($(".mode" + (i)).css('opacity') == '1') {
                  $(".mode" + (i)).css('opacity', '0');
               /* $(".mode" + (i)).hide();
                 $(".mode" + (i)).animate({
                     opacity: 0
                 });*/
                 if (i == 3) {
                     $(".intro .text").eq(1).fadeIn(600);
                     $(".intro .text").eq(0).hide();
                 }
             }
         } else if (y <= position[i] * imageH + imagePosition && !scrolledDown) {


             if ($(".mode" + (i)).css('opacity') == '0') {
                   $(".mode" + (i)).css('opacity', '1');
               
                 if (i == 3) {
                     $(".intro .text").eq(0).fadeIn(600);
                     $(".intro .text").eq(1).hide();
                 }
             }
         }
     }
     lastScrollTop = $(this).scrollTop();
 }
