;
(function ($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "carousel",
        defaults = {
            infinity: true
        };


    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        this.wrapper = this.element.find(".carouselWrapper");
        this.ul = this.element.find("ul");
        this.lis = this.element.find("li");
        this.widthParent = this.wrapper.width();
        this.btnPrev = '<a class="prev" href="#"></a>';
        this.btnNext = '<a class="next" href="#"></a>';
        this.firstItem = this.lis.eq(0);
        this.lastItem = this.lis.eq(this.lis.length - 1);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        position: 0,

        init: function () {
            this.setCarousel();
            if (this.options.infinity) this.infinite();
            this.setEvent();

        },

        setCarousel: function () {
            this.lis.css("width", this.widthParent);
            var ulWidth = this.lis.length * this.lis.width(),
                _this = this;
            this.ul.css({
                width: ulWidth,
                position: "absolute",
                left: 0,
                top: 0
            });
            if (this.options.infinity) {

            }
            this.element.prepend(this.btnNext, this.btnPrev);
            _this.lis.each(function (index, el) {
                var el = $(el);
                if (-(el.position().left) == _this.ul.position().left) {
                    _this.lis.removeClass("current");
                    $(el).addClass("current");
                }

            });
        },

        infinite: function () {
            var _this = this;


            _this.lis.filter(":first").before(_this.lis.filter(":last").clone().addClass("cloned"))
            _this.lis.filter(":last").before(_this.lis.filter(":first").clone().addClass("cloned"))
            1

            _this.lis.each(function (index, el) {
                var el = $(el);
                if (-(el.position().left) == _this.ul.position().left) {
                    _this.lis.removeClass("current");
                    $(el).addClass("current");
                }

            });


        },

        move: function (newPosition) {
            var _this = this;
            _this.position = newPosition;
            _this.ul.stop().animate({
                left: _this.position
            }, {
                duration: 500,
                done: function () {
                    _this.lis.each(function (index, el) {
                        var el = $(el);
                        if (-(el.position().left) == _this.ul.position().left) {
                            _this.lis.removeClass("current");
                            $(el).addClass("current");
                        }

                        /*if (el.hasClass("current") && el.position().left == 0) {
                         _this.lis.eq(_this.lis.length - 1).prependTo(_this.ul);
                         el.addClass("first")
                         } else {
                         el.removeClass("first")
                         }

                         if (el.hasClass("current") && el.position().left == (_this.ul.width() - el.width())) {
                         _this.lis.eq(0).appendTo(_this.ul);
                         el.addClass("last")
                         } else {
                         el.removeClass("last")
                         }*/

                    });
                }
            })
        },

        setEvent: function () {
            var _this = this,
                prev = this.element.find(".prev"),
                next = this.element.find(".next");


            prev.bind("click", function (e) {
                e.preventDefault();
                var newPosition = _this.position + parseInt(_this.lis.width(), 10);

                if (newPosition <= 0) {
                    _this.move(newPosition);
                }
            })

            next.bind("click", function (e) {
                e.preventDefault();
                var newPosition = _this.position - parseInt(_this.lis.width(), 10);

                if (newPosition > -_this.ul.width()) {
                    _this.move(newPosition);
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

