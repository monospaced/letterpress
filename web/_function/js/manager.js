/*
 * JavaScript for [ PROJECT NAME ]
 * 
 * Library Manager
 * Control all initialisation calls throughout the site
 */
 
/*
 * DOM load calls for all pages
 */
    $(document).ready(function() {

        // debug
        console.log('JS Library loaded');
        
        // add an extra class to the <body> element for JS-only styling
        $("body").addClass("js");
        
        // insert template image overlay for layout testing
        // Development only, remove for live
        var gridSettings = {
            imgExt: "jpg",
            gridPos: "center top"
        };
        $.gridOverlay("../../build-assets/devtools/template-overlay/", gridSettings);
    
        // condition : if script exists, initialise page print icon
        if (!!window.pagePrint) {
            pagePrint.init({
                element : '<li id="pa-print"><a href="#">Print</a></li>',
                attachTo : 'li#pa-email',
                relationship : 'sibling',
                newWin : false
            });  
        }
        
        // condition : if script exists, initialise links opening in a new window
        if (!!window.links) {
            links.init({
               element : 'a[rel="external"]' 
            });
        }
         
    });


/*
 * Window load calls for all pages
 */
    $(window).load(function() {
    
        // 
    
    });


/*
 * Fixes
 */
    // stop firebug console errors in browsers that don't support it
    if(!window.console)     { window.console = {}; };
    if(!window.console.log) { window.console.log = function(){}; };

    // image flicker fix for IE6
    try {
      document.execCommand('BackgroundImageCache', false, true);
    } catch(e) {}