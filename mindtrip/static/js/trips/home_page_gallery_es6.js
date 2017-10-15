
class Gallery {

    constructor(tripIdList) {
        this.tripIdList = tripIdList;
        this.firstTripIndex = 0;
        this.$leftArrow = document.querySelector('.js-hp-left-arrow');
        this.$rightArrow = document.querySelector('.js-hp-right-arrow');

        this.bindArrows()
    }

    bindArrows() {
        this.$leftArrow.addEventListener('click', (ev) => {
            if (this.firstTripIndex + 2 < this.tripIdList.length) {
                this.$rightArrow.classList.remove('disabled');
            }
            if (this.firstTripIndex > 0) {
                this.firstTripIndex--;
                $(`#${this.tripIdList[this.firstTripIndex + 3]}`).hide(100);
                $(`#${this.tripIdList[this.firstTripIndex]}`).show(100);
            }
            if (this.firstTripIndex == 0) {
                this.$leftArrow.classList.add('disabled');
            }
        });
        this.$rightArrow.addEventListener('click', (ev) => {
            if (this.firstTripIndex == 0) {
                this.$leftArrow.classList.remove('disabled');
            }
            if (this.firstTripIndex + 3 < this.tripIdList.length) {
                $(`#${this.tripIdList[this.firstTripIndex]}`).hide(100);
                $(`#${this.tripIdList[this.firstTripIndex + 3]}`).show(100);
                this.firstTripIndex++;
            }
            if (this.firstTripIndex + 3 == this.tripIdList.length) {
                this.$rightArrow.classList.add('disabled');
            }
        });
        window.addEventListener('keypress', (ev) => {
            switch (ev.keyCode) {
                case 37: ev.preventDefault(); this.$leftArrow.click(); break;
                case 39: ev.preventDefault(); this.$rightArrow.click(); break;
            }
        })
    }
 }
