/**
 * jQuery Grid Overlay plugin
 *
 * http://code.google.com/p/jsgridoverlay/
 *
 * Copyright (c) 2006 - 2008 Michael Allanson, Pete Goodman, Richard Hallows
 *
 * $Id: jquery.gridoverlay.js 11 2008-09-17 17:56:41Z richhallows $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Requires:
 *   http://www.stilbuero.de/2006/09/17/cookie-plugin-for-jquery/
 */
(function($) {

    $.gridOverlay = function(url, settings) {
    
        // define defaults and override with settings, if available
        settings = $.extend({
            imgExt: "png",
            gridId: "jgrid-overlay",
            gridPos: "50% top",
            gridRepeat: "no-repeat",
            opacityDefault: 1,
            opacityIncrement: 0.1
        }, settings);

        // set keycodes
        var toggleKeys = [59, 186, 90]; // ;
        var downOpacityKeys = [219, 91, 123]; // [
        var upOpacityKeys = [221, 93, 125]; // ]

        // get or calculate vars
        var docHeight = $(document).height();
        var bodyId = $("body").attr("id");
        var imgSrc = url+bodyId+"."+settings.imgExt;

        // create dom grid element
        var $grid = $('<div></div>');
        $grid.attr('id', settings.gridId);
        $grid.css({
            width: "100%",
            position: "absolute",
            top: "0pt",
            left: "0pt",
            zIndex: 1000,
            height: docHeight+"px",
            backgroundImage: "url("+imgSrc+")",
            backgroundPosition: settings.gridPos,
            backgroundRepeat: settings.gridRepeat,
            opacity: settings.opacityDefault
        });

        // maintain state
        if ($.cookie('gridOverlayState') == 'on') {
            $("body").prepend($grid);
            $grid.css("opacity", $.cookie('gridOverlayOpacity'));
        }

        // keyboard events
        $("html").keydown(function (e) {

            if (e.ctrlKey)    {

                if (jQuery.inArray(e.which, toggleKeys)!= -1) {
                    toggleOverlay();
                }

                if (jQuery.inArray(e.which, upOpacityKeys)!= -1) {  //increase opacity
                    var currOpacity = parseFloat($grid.css("opacity"));
                    var newOpacity = currOpacity + settings.opacityIncrement;

                    if ($.cookie('gridOverlayState') == 'off') {  // switch on overlay
                        toggleOverlay();
                    }

                    if (newOpacity <= 1) { // turn opacity up
                        $.cookie('gridOverlayOpacity', newOpacity);
                        $grid.css("opacity", newOpacity);
                    }
                }

                if (jQuery.inArray(e.which, downOpacityKeys)!= -1) {  //decrease opacity
                    var currOpacity = parseFloat($grid.css("opacity"));
                    var newOpacity = currOpacity - settings.opacityIncrement;

                    if ((currOpacity <= 0) && ($.cookie('gridOverlayState') == 'on')) {  // switch off overlay
                        toggleOverlay();

                    } else if ($.cookie('gridOverlayState') == 'on') { // turn opacity down
                        $.cookie('gridOverlayOpacity', newOpacity);
                        $grid.css("opacity", newOpacity);
                    }
                }
            }
        });

        /**
         * Toggle the overlay
         *
         * @returns void
         */
        function toggleOverlay() {

            // if exists then remove, else add to dom
            if ($("#"+settings.gridId).length) {
                $.cookie('gridOverlayState', 'off');
                $grid.remove();
            } else {
                $.cookie('gridOverlayState', 'on');
                $("body").prepend($grid);

                if (typeof $.cookie('gridOverlayState') == "string") {
                    $grid.css("opacity", $.cookie('gridOverlayOpacity'));
                }
                
                // display errors if there are any
                errorCheck();
            }
        };

        /**
         * Display an error within the grid holder
         *
         * @param string message The message to display
         * @param string errorType The type of error message
         * @returns void
         */
        function showError(message, errorType) {
            
            // set id for error div
            var errorId = settings.gridId + '-' + errorType + 'error';

            // clear existing errors
            $grid.children('#' + errorId).each(function() { 
                $(this).remove();
            }); 

            // create dom grid element as jquery object
            var $error = $('<div></div>');
            $error.attr('id', errorId);
            $error.css({
                border: "1px solid red",
                backgroundColor: "red",
                fontWeight: "bold",
                textAlign: "center"
            });
            $error.text(message);
            $grid.prepend($error);
        };
        
        /**
         * Checks for any errors
         *
         * @returns void
         */
        function errorCheck() {
            if (bodyId == '') {
                showError('Error: No id on body', 'noId');
            } else {
                // check image exists
                var img = new Image();
                $(img).error(function(){
                    showError('Error: Couldn\'t find ' + imgSrc, 'noImage');
                }).attr('src', imgSrc);
            }
        };
    };
})(jQuery);