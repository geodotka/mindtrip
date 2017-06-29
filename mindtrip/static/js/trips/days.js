(function () {
    $('.js-show-more').on('click', function() {
        var $this = $(this);
        var $dayDescription = $this.parent().find('.js-day-description');
        if ($dayDescription.css('display') == 'none') {
            $dayDescription.show();
            $this.find('.js-show-more-info').html('Zwiń<i class="material-icons">keyboard_arrow_up</i>');
        } else {
            $dayDescription.hide();
            $this.find('.js-show-more-info').html('Rozwiń<i class="material-icons">keyboard_arrow_down</i>');
        }
    })
})();
