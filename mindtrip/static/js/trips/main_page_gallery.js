
var Gallery = function(tripsJson){
    this.trips = this.getTrips(tripsJson);
    this.firstTripIndex = 0;
    this.tripsNumberInGallery = 3;
    this.tripsInGallery = [];

    this.setPrevNextTrip();
    this.getTripsInGallery();
};


Gallery.prototype.getTrips = function(tripsJson){
    var trips = JSON.parse(tripsJson);
    var tripList = [];
    for (var i= 0; i < trips.length; i++) {
        tripList.push(new Trip(trips[i]))
    }
    return tripList
};


Gallery.prototype.getTripsInGallery = function(){
    this.tripsInGallery = [];
    for (var i=this.firstTripIndex; i < Math.min(this.firstTripIndex + this.tripsNumberInGallery, this.trips.length); i++){
        if (i <= this.trips.length){
            this.tripsInGallery.push(this.trips[i])
        }
    }
};


Gallery.prototype.setPrevNextTrip = function(){
    this.hasPrevTrip = this.firstTripIndex > 0;
    this.hasNextTrip = this.firstTripIndex + this.tripsNumberInGallery < this.trips.length;
};


Gallery.prototype.draw = function(){
    var $galleryContent = $('.js-gallery-content');
    $galleryContent.empty();
    if (this.hasPrevTrip) {
        $galleryContent.append(this.drawIcon(true))
    }
    $galleryContent.append(this.drawGallery());
    if (this.hasNextTrip){
        $galleryContent.append(this.drawIcon(false))
    }
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


Gallery.prototype.drawGallery = function(){
        var gallery = document.createElement('div');
        gallery.className = 'gallery';
        for (var i=0; i < this.tripsInGallery.length; i++){
            gallery.appendChild(this.tripsInGallery[i].drawTripWidget());
        }
    return gallery
};


Gallery.prototype.bindArrows = function () {
    if (this.hasPrevTrip){
        this.bindLeftArrow();
    }
    if (this.hasNextTrip){
        this.bindRightArrow();
    }
};


Gallery.prototype.refresh = function () {
    this.setPrevNextTrip();
    this.getTripsInGallery();
    this.draw();
};


Gallery.prototype.bindLeftArrow = function () {
    var this_ = this;
    $('.js-prev').on('click', function(){
        if (this_.firstTripIndex > 0){
            this_.firstTripIndex -= 1
        }
        this_.refresh()
    })
};


Gallery.prototype.bindRightArrow = function () {
    var this_ = this;
    $('.js-next').on('click', function(){
        if (this_.firstTripIndex < this_.trips.length){
            this_.firstTripIndex += 1
        }
        this_.refresh()
    })
};


var Trip = function(trip){
    this.id = trip.pk;
    this.destination = trip.fields.destination;
    this.pictureUrl = '/media/' + trip.fields.picture;
    this.startAt = trip.fields.start_at;
    this.endAt = trip.fields.end_at;
    this.isComplete = trip.fields.is_complete;
};


Trip.prototype.drawTripWidget = function(){
    var link = document.createElement('a');
    link.href = '/podroze/' + this.id;
    var tripContainer = document.createElement('div');

    var img = document.createElement('img');
    img.src = this.pictureUrl;
    tripContainer.appendChild(img);

    var destination = document.createElement('span');
    destination.innerHTML = this.destination;
    destination.className = 'destination';
    tripContainer.appendChild(destination);

    var dates = document.createElement('span');
    dates.innerHTML = this.startAt + ' - ' + this.endAt;
    dates.className = 'dates';
    tripContainer.appendChild(dates);

    if (!this.isComplete) {
        var underConstruction = document.createElement('span');
        underConstruction.innerHTML = 'W przygotowaniu';
        underConstruction.className = 'under-construction';
        tripContainer.appendChild(underConstruction);
    }

    link.appendChild(tripContainer);
    return link
};
