/**
 * Created by Jun on 20/08/15.
 */
(function ($) {
    $.fn.scrubber = function (options) {
        var settings = $.extend({
            showItem: 1,
            leaveToFirst: true
        }, options);

        // the scrub function that produces the image scrubbing effect;
        function _scrub(itemToShow) {
            //using the $GoTo method from the API; slider is the slider object passed in;
            settings.slider.$GoTo(itemToShow);
            // remove the thumbnail-hover class from all elements, just show only the current thumbnail has the white border;
            $(".c").removeClass('thumbnail-hover');
            //add the thumbnail-hover class to the image to be shown;
            $($(".c")[itemToShow]).addClass("thumbnail-hover");
        }

        // function to calculate the index of image to show;
        function _calculateIndex(e, $this) {
            // select all the divs;
            var elements = $("div", $this);

            // calculate the width of the div;
            var element_width = elements.first().width();

            // using the $SlidesCount() method from the API to calculate the number of divs;
            var numberOfChildren = settings.slider.$SlidesCount();

            // get the trigger size => scrubber size (div size) / number of chidren;
            var horizontalTrigger = element_width / numberOfChildren;

            // calculate the remaining number of divs;
            var remaing_index = Math.ceil((e.pageX - $this.offset().left) / horizontalTrigger);
            // calculate the index of the div to be shown;
            var index = Math.min(Math.max(remaing_index, 1), numberOfChildren);
            index -= 1; // index of div to be shown is 0 based;
            return index;
        }

        return this.each(function () {
            var $this = $(this);

            // bind mousemove and moouseleave event of the slider div with the scrubber function;
            $this.on('mousemove.scrubber', function (e) {
                return _scrub(_calculateIndex(e, $this));
            }).on("mouseleave.scrubber", function () {
                return _scrub(0); //0 means showing the first image;
            });

            // bind mousemove and moouseleave event of the thumbnail div with the scrubber function;
            $("div[u=thumbnavigator]").on('mousemove.scrubber', function (e) {
                return _scrub(_calculateIndex(e, $this));
            }).on("mouseleave.scrubber", function () {
                return _scrub(0); //0 means showing the first image;
            });
        });
    };
}(jQuery));
