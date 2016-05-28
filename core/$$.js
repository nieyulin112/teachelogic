(function () {

    window.$$ = {
        /**
         * 扩展对象属性1
         * @param obj
         * @param prototypes
         */
        extend: function (obj, prototypes) {
            for (var key in prototypes) {
                if (prototypes.hasOwnProperty(key)) {
                    obj[key] = prototypes[key];
                }
            }
        }
    };

    // window.anydoorLogin = function(){
    //     $$.Native.forward({
    //         'url': 'pLogin/login.html?type=anyDoor'
    //         //'url': 'pLogin/login.html'
    //     });
    // };

})();