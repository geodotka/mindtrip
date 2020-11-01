(function () {

    const uncolorButtons = () => {
        document.querySelectorAll('.js-trips-tab').forEach(($button) => {
            $button.classList.remove('trips-tab-selected');
        });
    };

    const hideSections = () => {
        document.querySelectorAll('.js-trips-card').forEach(($button) => {
            $button.classList.add('hidden');
        });
    };

    document.querySelectorAll('.js-trips-tab').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            ev.preventDefault();
            uncolorButtons();
            $button.classList.add('trips-tab-selected');

            hideSections();
            document.getElementById("trips-card-" + $button.dataset.countryId).classList.remove('hidden');
        });
    });
})();
