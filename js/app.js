$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();
        var $that = $(this);


        $.ajax({
            type: "POST",
            dataType: 'json',
            cache: false,
            url: $that.attr('action'),
            data: $that.serialize()
        }).done(function(data) {
            $that.fadeOut(100);
            $(".done").fadeIn(100);
          
        }).fail(function() {
            $(".fail").fadeIn(100);
        })


        return false;
    });

})
