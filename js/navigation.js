;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "navigation",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.nav = $(this.element).find("nav");
        this.section = $(this.element).find("section");

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var _this = this;
            _this.setNav();
            _this.scrollPosition();

        },
        setNav: function(el, options) {
            var _this = this,
                cloneNav = this.nav.clone(),
                secondNav = cloneNav.attr("id", "secondNav")
            $(this.element).prepend(secondNav);
        },
        scrollPosition: function (){
            var navLink = $("body").find("nav a"),
                _this = this;
            navLink.bind("click", function (e){
                e.preventDefault();
                var target = e.target,
                    sectionTarget = $($(target).attr('href'));


                $('html').animate({
                    scrollTop:sectionTarget.position().top
                }, 600,"easeOutQuad");
            });
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );