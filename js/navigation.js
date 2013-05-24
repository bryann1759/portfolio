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
        this.$sections = $(this.element).find("section");
        this.sectionsInfo = {};

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
            _this.setUrl();
            _this.setEvents();

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
                var target = e.target,
                    sectionTarget = $($(target).attr('href'));


                $('html,body').animate({
                    scrollTop:sectionTarget.position().top
                }, 500);
            });
        },
        setUrl: function (){
            var _this = this;


            _this.$sections.each(function(index, el){

                var id = $(el).attr("id");
                var data = {
                    top : $(el).position().top,
                    id : id
                }


                _this.sectionsInfo[id] = data;
            })

        },

        setEvents: function () {
            var _this = this;

            $(window).bind("statechange",function(e){
            });


            $(window).scroll(function(){
                var top = $(window).scrollTop();

                $.each(_this.sectionsInfo, function(index, value){
                    if(top >= value.top) {
                        if(history.replaceState){
                            history.replaceState({page:value.id}, value.id, '#'+ value.id)
                        }

                        else {
                            window.location.hash = '!' + value.id
                        }

                    }
                });
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