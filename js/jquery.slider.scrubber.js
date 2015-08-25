/**
 * Created by dev on 20/08/15.
 */
(function ($) {
    $.fn.scrubber = function (options) {
        var settings = $.extend({
            showItem: 1,
            leaveToFirst: true
        }, options);

        // the scrub function that produces the image scrubbing effect;
        function _scrub(itemToShow) {
            settings.slider.$GoTo(itemToShow);
            $(".c").removeClass('thumbnail-hover');
            $($(".c")[itemToShow]).addClass("thumbnail-hover");
        }

        // function to calculate the index of image to show;
        function _calculateIndex(e, $this, horizontalTrigger, numberOfChildren) {
            var remaing_index, index;
            remaing_index = Math.ceil((e.pageX - $this.offset().left) / horizontalTrigger);
            index = Math.min(Math.max(remaing_index, 1), numberOfChildren);
            index -= 1; // index for 0 based array to use;
            return index;
        }

        return this.each(function () {
            var $this, element_width, elements, horizontalTrigger;


            $this = $(this);

            elements = $("div", $this);

            element_width = elements.first().width();

            // using the $SlidesCount() method from the API;
            numberOfChildren = settings.slider.$SlidesCount();

            // get the trigger size => scrubber size / number of chidren;
            horizontalTrigger = element_width / numberOfChildren;

            // bind mousemove event with the scrubber function;
            $this.on('mousemove.scrubber', function (e) {
                return _scrub(_calculateIndex(e, $this, horizontalTrigger, numberOfChildren));
            });

            $("div[u=thumbnavigator]").on('mousemove.scrubber', function (e) {
                return _scrub(_calculateIndex(e, $this, horizontalTrigger, numberOfChildren));
            }).on("mouseleave.scrubber", function () {
                return _scrub(0);
            });

            // bind mouseleve event with the scrubber function;
            return $this.on("mouseleave.scrubber", function () {
                return _scrub(0);
            });
        });
    };
}(jQuery));
