/*!
* experimental in viewport function
* toDo
* store a flag for other elements being in the viewport within the prototype
*/
(function (window) {
    window.staticHeaders = window.staticHeaders || {};
    var sh = function () {};
    var staticHeader = function () {
        return new sh();
    };

    sh.prototype.init = function (el, options, enterCallback, exitCallback) {

        this.options = options || {};

        // set some defaults
        this.options.scrollEvent = options.scrollEvent || "scroll";
        this.options.scrollTarget = options.scrollTarget || "window";
        this.options.threshold = options.threshold || 0.5; // the fraction of the target element that needs to be in the viewport

        this.enterCallback = enterCallback || null;
        this.exitCallback = exitCallback || null;

        var that = this;

        $(this.options.scrollTarget).bind(this.options.scrollEvent, function (that) {

            if (that.inViewportTest()) {
                return that.wasInViewport ? null : that.onEnterViewport();
            } else {
                return that.wasInViewport ? that.onExitViewport() : null;
            }
        });
    };
    sh.prototype.onEnterViewport = function () {
        console.log('entered the viewport');
  //      this.enterCallback();
    };
    sh.prototype.onExitViewport = function () {
        console.log('left the viewport');
//        this.exitCallback();
    };
    sh.prototype.inViewportTest = function () {
        var winHeight = $(window).height(),
            bottom = winHeight + $(window).scrollTop(),
            top = $(window).scrollTop(),
            thresholdTop = (this.options.threshold * winHeight) + top,
            thresholdBottom = bottom - (this.options.threshold * winHeight);

        if (bottom <= this.offset().top && top >= this.offset().top + this.height()) {
            return false;
        } else {
            return true;
        }
    };

    window.staticHeader = staticHeader;

})(window);