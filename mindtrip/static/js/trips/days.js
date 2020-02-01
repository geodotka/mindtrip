(function () {

    const uncolorButtons = ($button, $parent) => {
        $parent.querySelectorAll('a').forEach(($b) => {
            $b.classList.remove('btn-active');
        });
    };

    const showSection = ($section, $button) => {
        $section.classList.remove('hidden');
        $button.classList.add('btn-active');
    };

    const hideSection = ($section, $button) => {
        $section.classList.add('hidden');
        $button.classList.remove('btn-active');
    };

    document.querySelectorAll('.js-description').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            const $section = $parent.querySelector('.js-day-description');
            if ($section.classList.contains('hidden')) {
                showSection($section, $button);

                const $photos = $parent.querySelector('.js-day-photos');
                if ($photos) {
                    $photos.classList.add('hidden');
                }
                const $tips = $parent.querySelector('.js-day-tips');
                if ($tips) {
                    $tips.classList.add('hidden');
                }
            } else {
                hideSection($section, $button);
            }
        });
    });

    document.querySelectorAll('.js-photos').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            const $section = $parent.querySelector('.js-day-photos');
            if ($section.classList.contains('hidden')) {
                showSection($section, $button);

                const $description = $parent.querySelector('.js-day-description');
                if ($description) {
                    $description.classList.add('hidden');
                }
                const $tips = $parent.querySelector('.js-day-tips');
                if ($tips) {
                    $tips.classList.add('hidden');
                }
            } else {
                hideSection($section, $button);
            }
        });
    });

    document.querySelectorAll('.js-tips').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            const $section = $parent.querySelector('.js-day-tips');
            if ($section.classList.contains('hidden')) {
                showSection($section, $button);

                const $description = $parent.querySelector('.js-day-description');
                if ($description) {
                    $description.classList.add('hidden');
                }
                const $photos = $parent.querySelector('.js-day-photos');
                if ($photos) {
                    $photos.classList.add('hidden');
                }
            } else {
                hideSection($section, $button);
            }
        });
    });
})();
