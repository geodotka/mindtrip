(function () {
    $('.js-show-more').on('click', function(){
        var $boxDescription = $(this).parent().find('.js-day-box-description');
        if ($boxDescription.css('display') == 'none') {
            $boxDescription.show();
            $('.js-show-more-info').html('Zwiń<i class="material-icons">keyboard_arrow_up</i>');
        } else {
            $boxDescription.hide();
            $('.js-show-more-info').html('Rozwiń<i class="material-icons">keyboard_arrow_down</i>');
        }
    })
})();
