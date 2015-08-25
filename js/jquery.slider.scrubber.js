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
        function _scrub(elements, itemToShow){
            settings.slider.$GoTo(itemToShow - 1);
        };

        // function to calculate the index of image to show;
        function _calculateIndex(e, $this, horizontalTrigger, numberOfChildren) {
            var remaing_index, index;
            remaing_index = Math.ceil((e.pageX - $this.offset().left) / horizontalTrigger);
            index = Math.min(Math.max(remaing_index, 1), numberOfChildren);
            return index;
        }

        return this.each(function(){
            var $this, element_width, elements, horizontalTrigger;


            $this = $(this);

            elements = $("div", $this);

            element_width = elements.first().width();

            // using the $SlidesCount() method from the API;
            numberOfChildren = settings.slider.$SlidesCount();

            // get the trigger size => scrubber size / number of chidren;
            horizontalTrigger = element_width / numberOfChildren;

            // bind mousemove event with the scrubber function;
            $this.on('mousemove.scrubber', function(e){
                var index = _calculateIndex(e, $this, horizontalTrigger, numberOfChildren);
                return _scrub(elements, index);
            });

            // bind mouseleve event with the scrubber function;
            return $this.on("mouseleave.scrubber", function(){
                return _scrub(elements, 1);
            });
        });
    };
}( jQuery ));
