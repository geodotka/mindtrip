
var Gallery = function(photos, isMobile){
    this.photos = photos;
    this.isMobile = isMobile;
    this.photoIndex = 0;
    this.leftArrow = $('.js-left-arrow');
    this.rightArrow = $('.js-right-arrow');

    this.setPrevNextPhoto();
    if (this.photos.length) {
        this.draw();
        this.bind();
    }
};


Gallery.prototype.setIndexBySrc = function(src){
    src = '/' + src.split('/').splice(3).join('/');
    for (var i=0; i < this.photos.length; i++){
        if (this.photos[i].mobile_url == src){
            this.photoIndex = i;
            break;
        }
    }
};


Gallery.prototype.setPrevNextPhoto = function(){
    this.hasPrevPhoto = this.photoIndex > 0;
    this.hasNextPhoto = this.photoIndex < this.photos.length - 1;
};


Gallery.prototype.draw = function(){
    var photo = this.photos[this.photoIndex];
    $('.js-description').html(photo.description);
    var url;
    if (this.isMobile) {
        url = photo.mobile_url;
    } else {
        url = photo.url;
    }
    $('.js-image').attr('src', url);
    $('.js-counter').html(String(this.photoIndex + 1) + '/' + this.photos.length );
    this.setArrows();
};


Gallery.prototype.setArrows = function(){
    if (this.hasPrevPhoto){
        this.leftArrow.removeClass('inactive-trip-gallery-left-arrow');
        this.bindLeftArrow();
    } else {
        this.leftArrow.addClass('inactive-trip-gallery-left-arrow');
        this.leftArrow.unbind();
    }
    if (this.hasNextPhoto){
        this.rightArrow.removeClass('inactive-trip-gallery-right-arrow');
        this.bindRightArrow();
    } else {
        this.rightArrow.addClass('inactive-trip-gallery-right-arrow');
        this.rightArrow.unbind();
    }
};

Gallery.prototype.bind = function(){
    var this_ = this;
    $('.js-show-gallery').on('click', function(){
        $('.js-gallery-content').removeClass('hidden');
        this_.setIndexBySrc($(this).children('img')[0].src);
        this_.setPrevNextPhoto();
        this_.draw();
        // hide menu
        $('header').css('position', 'relative');
    });

    $('.js-close-gallery').on('click', function(ev){
        $('.js-gallery-content').addClass('hidden');
        // show menu
        $('header').css('position', 'fixed');
    });
};


Gallery.prototype.bindLeftArrow = function(){
    var this_ = this;
    this_.leftArrow.off();
    this_.leftArrow.on('click', function(){
        if (this_.photoIndex > 0){
            this_.photoIndex -= 1
        }
        this_.setPrevNextPhoto();
        this_.draw()
    })
};


Gallery.prototype.bindRightArrow = function () {
    var this_ = this;
    this_.rightArrow.off();
    this_.rightArrow.on('click', function(){
        if (this_.photoIndex < this_.photos.length){
            this_.photoIndex += 1
        }
        this_.setPrevNextPhoto();
        this_.draw()
    })
};
