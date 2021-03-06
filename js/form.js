;
(function ($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "formValidation",
        defaults = {

        };


    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        this.inputs = this.element.find("input");
        this.textarea = this.element.find("textarea");
        this.btnValid = this.element.find("button");
        this.checkForm = true;


        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        position: 0,

        init: function () {
            var _this = this;
            this.inputs.blur(function(){_this.validText(this)})
            this.element.submit(function(){
                _this.validText(_this.inputs);
                if(!this.checkForm) {
                    return false;
                }
            })

        },

        validText: function (element){
            var element = $(element);
            var value = element.val();

            if(/\b[A-Z0-9.]/gi.test(value)){
                this.checkForm = true;
                element.removeClass("error");
            } else {
                this.checkForm = false;
                element.addClass("error")
            }
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

