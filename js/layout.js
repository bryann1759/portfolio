;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "sectionHeight",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var _this = this;
            _this.setHeightSection();
            $(window).resize(function(){
                _this.setHeightSection()
            });

        },
        setHeightSection: function(el, options) {
            $(this.element).css("height", "");
            var heightSection = $(this.element).height(),
                heightWindow = $(window).height();

            if(heightSection < heightWindow) {
                $(this.element).css("height", heightWindow);
            }
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