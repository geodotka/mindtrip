
export const observeImages = ($img=null) => {

    function observe($img) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    if ($img.dataset.src) {
                        $img.src = $img.dataset.src;
                    }
                }
            });
        });
        observer.observe($img);
    }

    if ($img === null) {
        document.querySelectorAll('img').forEach($img => {
            observe($img);
        });
    } else {
        observe($img);
    }
};
