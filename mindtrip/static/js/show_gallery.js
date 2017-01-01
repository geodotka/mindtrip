
var Gallery = function(tripsJson){
    this.trips = this.getTrips(tripsJson);
    console.log(this.trips);
    this.firstTripIndex = 0;
};


Gallery.prototype.getTrips = function(tripsJson){
    var trips = JSON.parse(tripsJson);
    var tripList = [];
    for (var i= 0; i < trips.length; i++) {
        tripList.push(new Trip(trips[i]))
    }
    return tripList
};


Gallery.prototype.draw = function(){
    var $gallery = $('.js-gallery');
    $gallery.empty();
    $gallery.append(this.trips[this.firstTripIndex].drawTripWidget());
    $gallery.append(this.trips[this.firstTripIndex + 1].drawTripWidget())
};


var Trip = function(trip){
    this.id = trip.pk;
    this.destination = trip.fields.destination;
    this.pictureUrl = '/media/' + trip.fields.picture;
    this.startAt = trip.fields.start_at;
    this.endAt = trip.fields.end_at;
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

    link.appendChild(tripContainer);
    return link
};
