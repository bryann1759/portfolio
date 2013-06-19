;
(function ($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "navigation",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.nav = $(this.element).find("nav");
        this.$sections = $(this.element).find("section");
        this.sectionsInfo = [];

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var _this = this;
            _this.setNav();
            _this.scrollPosition();
            _this.setUrl();
            _this.setEvents();

        },
        setNav: function (el, options) {
            var _this = this,
                cloneNav = this.nav.clone(),
                secondNav = cloneNav.attr("id", "secondNav")
            $(this.element).prepend(secondNav);
        },
        scrollPosition: function () {
            var navLink = $("body").find("nav a"),
                _this = this;
            navLink.bind("click", function (e) {
                var target = e.target,
                    sectionTarget = $($(target).attr('href'));


                $('html,body').animate({
                    scrollTop: sectionTarget.position().top
                }, 500);
            });
        },
        setUrl: function () {
            var _this = this;


            _this.$sections.each(function (index, el) {
                var id = $(el).attr("id");
                var data = {
                    top: $(el).position().top,
                    id: id
                }
                _this.sectionsInfo.push(data);
            })

        },

        setEvents: function () {
            var _this = this;
            $(window).scroll(function () {

                var top = $(window).scrollTop();

                for (var i = 0, l = _this.sectionsInfo.length; i < l; i++) {
                    var obj = _this.sectionsInfo[i];
                    var diff = top - obj.top;
                    if (diff < 0 ) break;

                }

                if (_this.sectionsInfo[i - 1]) {

                    if (history.replaceState) {
                        history.replaceState({page: _this.sectionsInfo[i - 1].id}, _this.sectionsInfo[i - 1].id, '#' + _this.sectionsInfo[i - 1].id)
                    }
                    else {
                        window.location.hash = '!' + _this.sectionsInfo[i - 1].id
                    }
                }
            });
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