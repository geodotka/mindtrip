'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gallery = function () {
    function Gallery(tripIdList) {
        _classCallCheck(this, Gallery);

        this.tripIdList = tripIdList;
        this.firstTripIndex = 0;
        this.$leftArrow = document.querySelector('.js-hp-left-arrow');
        this.$rightArrow = document.querySelector('.js-hp-right-arrow');

        this.bindArrows();
    }

    _createClass(Gallery, [{
        key: 'bindArrows',
        value: function bindArrows() {
            var _this = this;

            this.$leftArrow.addEventListener('click', function (ev) {
                if (_this.firstTripIndex + 2 < _this.tripIdList.length) {
                    _this.$rightArrow.classList.remove('disabled');
                }
                if (_this.firstTripIndex > 0) {
                    _this.firstTripIndex--;
                    $('#' + _this.tripIdList[_this.firstTripIndex + 3]).hide(100);
                    $('#' + _this.tripIdList[_this.firstTripIndex]).show(100);
                }
                if (_this.firstTripIndex == 0) {
                    _this.$leftArrow.classList.add('disabled');
                }
            });
            this.$rightArrow.addEventListener('click', function (ev) {
                if (_this.firstTripIndex == 0) {
                    _this.$leftArrow.classList.remove('disabled');
                }
                if (_this.firstTripIndex + 3 < _this.tripIdList.length) {
                    $('#' + _this.tripIdList[_this.firstTripIndex]).hide(100);
                    $('#' + _this.tripIdList[_this.firstTripIndex + 3]).show(100);
                    _this.firstTripIndex++;
                }
                if (_this.firstTripIndex + 3 == _this.tripIdList.length) {
                    _this.$rightArrow.classList.add('disabled');
                }
            });
            window.addEventListener('keypress', function (ev) {
                switch (ev.keyCode) {
                    case 37: ev.preventDefault();this.$leftArrow.click();break;
                    case 39: ev.preventDefault();this.$rightArrow.click();break;
                }
            });
        }
    }]);

    return Gallery;
}();
