(function (window, document, $, undefined) {
    "use strict";
    var startPoint,
        $currentEl,
        $fixEl,
        moving = false,
        $rootEl = $(document.documentElement),
        openSwipeEl = null;

    function touchMove(event) {
        var touch = event.touches[0],
            diffX = touch.clientX - startPoint.x,
            diffY = Math.abs(touch.clientY - startPoint.y),
            fixElWidth = $fixEl.width(),
            translated,
            translatedLeft = ($currentEl.data("translatedLeft") || 0) + diffX;

        if (translatedLeft > 0) {
            translatedLeft = translatedLeft / 10;
        } else if (translatedLeft < -fixElWidth) {
            translatedLeft = -fixElWidth;
        }

        $currentEl.data("isShow", translatedLeft < -fixElWidth * 0.5);

        translated = "translate3d(" + translatedLeft + "px,0,0)";


        // 阻止默认行为，用于修复android4下不会触发touchend事件的bug,针对android且为左滑状态时，才阻止默认事件
        if($$.isAndroid() && diffX < -5 && diffY < 5){
            $currentEl.css({
                "-webkit-transform": translated,
                transform: translated
            });
            event.preventDefault();
        }else if(!$$.isAndroid()){
            $currentEl.css({
                "-webkit-transform": translated,
                transform: translated
            });
        }
        openSwipeEl = $currentEl;
    }

    function touchEnd(event) {
        $rootEl.off("touchmove", touchMove);
        $rootEl.off("touchend", touchEnd);
        $rootEl.off("touchcancle", touchEnd);
        moving = false;
        if (null === event) {
            return;
        }
        var translatedLeft = $currentEl.data("translatedLeft"),
            fixElWidth = $fixEl.width(),
            translated,
            halfFixElWidth = fixElWidth / 2;
        if ($currentEl.data("isShow")) {
            translatedLeft = -fixElWidth;
            openSwipeEl = $currentEl;
        } else {
            translatedLeft = 0;
            openSwipeEl = null;
        }
        $currentEl.data("translatedLeft", translatedLeft);
        translated = translatedLeft ? "translate3d(" + translatedLeft + "px,0,0)" : "";

        $currentEl.css({
            "-webkit-transform": translated,
            transform: translated
        });

        $currentEl.addClass('anim');
    }

    function touchStart(event) {
        var touches = event.touches;
        $currentEl = $(event.currentTarget);
        $fixEl = $currentEl.children("*[data-swipe-item-fixel]");
        if (touches.length > 1) {
            return;
        }
        startPoint = {
            x: touches[0].clientX,
            y: touches[0].clientY
        };

        $currentEl.removeClass('anim');

        $rootEl.on("touchmove", touchMove);
        $rootEl.on("touchend", touchEnd);
        $rootEl.on("touchcancle", touchEnd);
    }

    $.fn.swipeMenu = function () {
        var $el = $(this);
        $el.delegate("*[data-swipe-item]", "touchstart", touchStart);
    };

    function hideSwipe() {
        var translated = "";
        //openSwipeEl = $("*[data-swipe-item]");
        if (openSwipeEl) {
            openSwipeEl
                .css({
                    "-webkit-transform": translated,
                    transform: translated
                })
                .data("isShow", 0)
                .data("translatedLeft", 0);

            openSwipeEl = null;
        }
    }
    $(document).delegate('body', 'touchstart', function () {
        hideSwipe();
    });
    //$('body').delegate('*[data-swipe-item]', 'touchstart', function () {
    //    //var transform = this.style.webkitTransform;
    //
    //    //if (!transform || transform == 'translate3d(0px, 0px, 0px)') {
    //    hideSwipe();
    //    //} else {
    //
    //    //}
    //});


}(window, document, Zepto));