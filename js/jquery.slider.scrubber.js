/**
 * Created by dev on 20/08/15.
 */
(function($){
    $.fn.scrubber = function( options ) {
        var settings = $.extend({
            showItem : 1,
            leaveToFirst : true
        }, options);

        // the scrub function that produces the image scrubbing effect;
        var scrub = function(elements, itemToShow){
            settings.slider.$GoTo(itemToShow - 1);
        };

        return this.each(function(){
            var $this, elements, horizontalTrigger;

                // element_width, element_height, numberOfChildren;

            $this = $(this);

            console.log("$this is ", $this);

            elements = $("div", $this);

            //elements = $this.find("li");
            element_width = elements.first().width();
            element_height = elements.first().height();
            //$this.width(element_width).height(element_height).css('padding', 0);
            //numberOfChildren = elements.length;
            numberOfChildren = settings.slider.$SlidesCount();
            //numberOfChildren = $this.children().length;

            // get the trigger size => scrubber size / number of chidren;
            horizontalTrigger = element_width / numberOfChildren;

            // show the first element
            //scrub(elements, 1);

            // bind mousemove event with the scrubber function;
            $this.on('mousemove.scrubber', function(e){
                var remaing_index, index;
                remaing_index = Math.ceil((e.pageX - $this.offset().left) / horizontalTrigger);
                index = Math.min(Math.max(remaing_index, 1), numberOfChildren);
                return scrub(elements, index);
            });


            // bind mouse
            return $this.on("mouseleave.scrubber", function(){
                return scrub(elements, 1);
            });
        });
    };
}( jQuery ));
