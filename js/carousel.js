;
(function ($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "carousel",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        this.wrapper = this.element.find(".carouselWrapper");
        this.ul = this.element.find("ul");
        this.lis = this.element.find("li");
        this.liWidth = this.lis.width();

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var _this = this;
            _this.setCarousel();
            _this.setEvent();

        },

        setCarousel: function () {
            var widthParent = this.wrapper.width();
            this.lis.css("width", widthParent);
            var liHeight = this.lis.height();
            this.wrapper.css("height", liHeight)
            var ulWidth = this.lis.length * this.lis.width();
            this.ul.css({
                width: ulWidth,
                position: "absolute",
                left: 0,
                top: 0
            });


            var btnPrev = '<a class="prev" href="#"></a>',
                btnNext = '<a class="next" href="#"></a>';

            this.element.prepend(btnNext, btnPrev)
        },

        setEvent: function () {
            var _this = this,
                prev = this.element.find(".prev"),
                next = this.element.find(".next"),
                lastPosition = (_this.lis.length -1) * (_this.lis.width());


            prev.bind("click", function (e) {
                e.preventDefault();

                var ulPosition = _this.ul.css("left").split("px")[0],
                    ulPositionNumber = parseInt(ulPosition, 10),
                    liWidthNumber = parseInt(_this.lis.width(), 10);

                if(ulPositionNumber != 0){
                _this.ul.stop().animate({
                    left: ulPositionNumber + liWidthNumber
                }, { duration: 500 })
            }

            })

            next.bind("click", function (e) {
                e.preventDefault();

                var ulPosition = _this.ul.css("left").split("px")[0],
                    ulPositionNumber = parseInt(ulPosition, 10),
                    liWidthNumber = parseInt(_this.lis.width(), 10);


                if(ulPositionNumber == 0 || ulPositionNumber != (-lastPosition)){
                    _this.ul.stop().animate({
                        left: ulPositionNumber + (-liWidthNumber)
                    }, {duration: 500 })
                }
            })

        }

    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);