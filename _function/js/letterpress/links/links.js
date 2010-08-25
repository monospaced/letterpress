/**
 * @fileoverview Open external links in a new window
 * 
 * @author Pete Goodman
 * 
 */
var links = function(){
    
    
    /**
     * The options passed through to this function
     *
     * @var Object
     * @private
     */
    var options = {
        
        /**
         * HTML link element to search for
         *
         * @var String
         */
        element : 'a[rel="external"]'
    
    };

    /**
     * Initialise the link popup functionality
     * @return void
     * @public
     */
    var init = function(initOptions) {
        
        // save any options sent through to the intialisation script, if set
        for (var option in options) {
            if (!!initOptions[option]) {
                options[option] = initOptions[option];
            }
        }
        
        // error check, if no element is specified then stop
        if (!options.element) {
            return false;
        }  
        
        // bind a handler to the event (call a function when link is clicked)
        $(options.element).bind('click',function(e){
            handleClick(e, this);
        });
    };
    
    
    /**
     * Handle click event - open the link in a new window
     * @return void
     * @private
     */
    var handleClick = function(e, element) {
        e.preventDefault();
        window.open( $(element).attr('href') , "_blank" );
    };
    
    
    /**
     * Return value, expose certain methods above
     */
    return {
        init: init
    };
}();


/*
 * Example call:

 $(document).ready(function(){
     
        links.init('a[rel="external"]');
  });

 */