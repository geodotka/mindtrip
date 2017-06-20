(function () {
    $('.js-show-more').on('click', function(){
        console.log('Helou');
        var $boxDescription = $(this).parent().parent().find('.js-day-box-description');
        if ($boxDescription.css('display') == 'none') {
            $boxDescription.show();
            $(this).html('Zwiń<i class="material-icons">keyboard_arrow_up</i>');
        } else {
            $boxDescription.hide();
            $(this).html('Rozwiń<i class="material-icons">keyboard_arrow_down</i>');
        }
    })
})();
