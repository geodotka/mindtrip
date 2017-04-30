
var Gallery = function(photos){
    this.photos = photos;
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
        if (this.photos[i].url == src){
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
    $('.js-image').attr('src', photo.url);
    $('.js-counter').html(String(this.photoIndex + 1) + '/' + this.photos.length );
    this.drawArrows();
};


Gallery.prototype.drawArrows = function(){
    if (this.hasPrevPhoto){
        this.leftArrow.removeClass('hidden')
    } else {
        this.leftArrow.addClass('hidden')
    }
    if (this.hasNextPhoto){
        this.rightArrow.removeClass('hidden')
    } else {
        this.rightArrow.addClass('hidden')
    }
    this.bindArrows()
};

Gallery.prototype.bind = function(){
    var this_ = this;
    $('.js-show-gallery').on('click', function(){
        $('.js-gallery-content').removeClass('hidden');
        this_.setIndexBySrc($(this).children('img')[0].src);
        this_.setPrevNextPhoto();
        this_.draw()
    });

    $('.js-close-gallery').on('click', function(ev){
        $('.js-gallery-content').addClass('hidden')
    });
};


Gallery.prototype.bindArrows = function(){
    if (this.hasPrevPhoto){
        this.bindLeftArrow();
    }
    if (this.hasNextPhoto){
        this.bindRightArrow();
    }
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
