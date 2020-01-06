(function () {

    const uncolorButtons = ($button, $parent) => {
        $parent.querySelectorAll('a').forEach(($b) => {
            $b.classList.remove('btn-active');
        });
    };

    const showSection = ($section, $button) => {
        if ($section.classList.contains('hidden')) {
            $section.classList.remove('hidden');
            $button.classList.add('btn-active');
        } else {
            $section.classList.add('hidden');
            $button.classList.remove('btn-active');
        }
    };

    document.querySelectorAll('.js-description').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            showSection($parent.querySelector('.js-day-description'), $button);

            const $photos = $parent.querySelector('.js-day-photos');
            if ($photos) {
                $photos.classList.add('hidden');
            }
            const $tips = $parent.querySelector('.js-day-tips');
            if ($tips) {
                $tips.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('.js-photos').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            showSection($parent.querySelector('.js-day-photos'), $button);

            const $description = $parent.querySelector('.js-day-description');
            if ($description) {
                $description.classList.add('hidden');
            }
            const $tips = $parent.querySelector('.js-day-tips');
            if ($tips) {
                $tips.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('.js-tips').forEach(($button) => {
        $button.addEventListener('click', (ev) => {
            const $parent = $button.parentNode.parentNode.parentNode;
            uncolorButtons($button, $parent);
            showSection($parent.querySelector('.js-day-tips'), $button);

            const $description = $parent.querySelector('.js-day-description');
            if ($description) {
                $description.classList.add('hidden');
            }
            const $photos = $parent.querySelector('.js-day-photos');
            if ($photos) {
                $photos.classList.add('hidden');
            }
        });
    });
})();
