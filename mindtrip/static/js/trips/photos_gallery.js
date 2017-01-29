
var Gallery = function(photos){
    this.photos = this.getPhotos(photos);
    this.photoIndex = 0;

    this.setPrevNextPhoto();
};


Gallery.prototype.getPhotos = function(photos){
    var photoList = [];
    for (var i= 0; i < photos.length; i++) {
        photoList.push(new Photo(photos[i]))
    }
    return photoList
};


Gallery.prototype.setPrevNextPhoto = function(){
    this.hasPrevPhoto = this.photoIndex > 0;
    this.hasNextPhoto = this.photoIndex < this.photos.length - 1;
};


Gallery.prototype.draw = function(){
    var $galleryContent = $('.js-gallery-content');
    $galleryContent.empty();
    $galleryContent.append(this.drawImageContainer());
    $galleryContent.append(this.photos[this.photoIndex].drawPhotoDescription());
    this.bindArrows()
};


Gallery.prototype.drawIcon = function(isPrev){
    var icon = document.createElement('i');
    icon.className = 'material-icons arrow';
    if (isPrev){
        icon.className += ' arrow-left js-prev'
    } else {
        icon.className += ' js-next'
    }
    icon.innerHTML = 'play_arrow';
    return icon
};


Gallery.prototype.drawImageContainer = function(){
    var gallery = document.createElement('div');
    gallery.className = 'image-container';
    if (this.hasPrevPhoto){
        gallery.appendChild(this.drawIcon(true));
    }
    gallery.appendChild(this.photos[this.photoIndex].drawPhotoImage());
    if (this.hasNextPhoto){
        gallery.appendChild(this.drawIcon(false))
    }
    return gallery
};


Gallery.prototype.bindArrows = function () {
    if (this.hasPrevPhoto){
        this.bindLeftArrow();
    }
    if (this.hasNextPhoto){
        this.bindRightArrow();
    }
};


Gallery.prototype.refresh = function () {
    this.setPrevNextPhoto();
    this.draw();
};


Gallery.prototype.bindLeftArrow = function () {
    var this_ = this;
    $('.js-prev').on('click', function(){
        if (this_.photoIndex > 0){
            this_.photoIndex -= 1
        }
        this_.refresh()
    })
};


Gallery.prototype.bindRightArrow = function () {
    var this_ = this;
    $('.js-next').on('click', function(){
        if (this_.photoIndex < this_.photos.length){
            this_.photoIndex += 1
        }
        this_.refresh()
    })
};


var Photo = function(photo){
    this.url = photo.url;
    this.day = photo.trip_day;
    this.description = photo.description;
};


Photo.prototype.drawPhotoImage = function(){
    var photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';

    var img = document.createElement('img');
    img.src = this.url;
    photoContainer.appendChild(img);


    var shadow = document.createElement('div');
    shadow.className = 'shadow';
    photoContainer.appendChild(shadow);

    return photoContainer
};

Photo.prototype.drawPhotoDescription = function(){
    var description = document.createElement('span');
    description.innerHTML = this.description;
    description.className = 'description';
    return description
};
