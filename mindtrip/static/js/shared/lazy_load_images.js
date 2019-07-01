document.querySelectorAll('img').forEach(($img) => {
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
});
