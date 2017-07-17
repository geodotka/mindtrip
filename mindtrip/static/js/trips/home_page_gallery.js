
class Gallery {

    constructor(trips) {
        this.trips = trips;
        this.firstTripIndex = 0;
        this.tripsNumberInGallery = 3;
        this.hasPrevious = false;
        this.hasNext = false;
        this.$leftArrow = $('.js-hp-left-arrow');
        this.$rightArrow = $('.js-hp-right-arrow');
    }

    setPreviousNext() {
        this.hasPrevious = this.firstTripIndex > 0;
        this.hasNext = this.firstTripIndex + this.tripsNumberInGallery < this.trips.length
    }

    draw() {
        this.setPreviousNext();
        if (!this.hasPrevious) {
            this.$leftArrow.addClass('disabled')
        } else {
            this.$leftArrow.removeClass('disabled')
        }

        $('.js-hp-gallery').html(this.drawGallery());

        if (!this.hasNext) {
            this.$rightArrow.addClass('disabled')
        } else {
            this.$rightArrow.removeClass('disabled')
        }
        this.bindArrows()
    }

    drawGallery() {
        var gallery = document.createElement('div');
        gallery.className = 'hp-gallery';
        let currentTrips = this.trips.slice(this.firstTripIndex, this.firstTripIndex + 3);
        for (let trip of currentTrips) {
            gallery.appendChild(this.drawTrip(trip))
        }
        return gallery
    }

    drawTrip(trip) {
        let link = document.createElement('a');
        link.href = `/podroze/${trip.pk}`;
        let tripContainer = document.createElement('div');

        let img = document.createElement('img');
        img.src = `/media/${trip.fields.picture}`;
        tripContainer.appendChild(img);

        let destination = document.createElement('span');
        destination.innerHTML = trip.fields.destination;
        destination.className = 'destination';
        tripContainer.appendChild(destination);

        let dates = document.createElement('span');
        dates.innerHTML = trip.fields.start_at + ' - ' + trip.fields.end_at;
        dates.className = 'dates';
        tripContainer.appendChild(dates);

        if (!trip.fields.is_complete) {
            var underConstruction = document.createElement('span');
            underConstruction.innerHTML = 'W przygotowaniu';
            underConstruction.className = 'under-construction';
            tripContainer.appendChild(underConstruction);
        }

        link.appendChild(tripContainer);
        return link
    }

    bindArrows() {
        this.$leftArrow.unbind();
        this.$rightArrow.unbind();
        this.$leftArrow.on('click', (ev) => {
            if (this.hasPrevious) {
                this.firstTripIndex--;
                this.draw();
            }
        });
        this.$rightArrow.on('click', (ev) => {
            if (this.hasNext) {
                this.firstTripIndex++;
                this.draw();
            }
        });
    }
 }

