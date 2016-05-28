/**
 * 通用函数扩展
 * @import $$
 */
(function () {

    var ua = navigator.userAgent;

    $$.extend($$, {
        /**
         * 查询URL参数
         * @param name
         * @param [url]
         * @returns {*}
         */
        getQueryString: function (name, url) {
            var reg = new RegExp('[&,?]' + name + '=([^\\&]*)', 'i');
            var value = reg.exec(url || location.search);
            return value ? value[1] : '';
        },
        /**
         * 获取URL参数对象
         * @param queryString
         * @returns {{}}
         */
        getQueryMap: function (queryString) {
            var paramObj = {},
                paramList,
                oneQueryMatch,
                regGlobal = /[\?\&][^\?\&]+=[^\?\&#]+/g,
                regOne = /[\?\&]([^=\?]+)=([^\?\&#]+)/;

            queryString = queryString || location.href;
            paramList = queryString.match(regGlobal);

            if (!paramList) {
                return paramObj;
            }

            for (var i = 0, len = paramList.length; i < len; i++) {
                oneQueryMatch = paramList[i].match(regOne);
                if (null === oneQueryMatch) {
                    continue;
                }
                paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
            }

            return paramObj;
        },
        /**
         * 检测是否移动设备
         * @returns {boolean}
         */
        isMobile: function () {
            return /Mobile/i.test(ua);
        },
        /**
         * 检测是否Android平台
         * @returns {boolean}
         */
        isAndroid: function () {
            return /Android/i.test(ua);
        },
        /**
         * 检测是否iOS平台
         * @returns {boolean}
         */
        isiOS: function () {
            return /iPhone OS/i.test(ua);
        },
        /**
         * 检测是否iPhone设备
         * @returns {boolean}
         */
        isiPhone: function () {
            return /iPhone/i.test(ua);
        },
        /**
         * 检测是否iPad设备
         * @returns {boolean}
         */
        isiPad: function () {
            return /iPad/i.test(ua);
        },
        /**
         * 检测是否通过浏览器访问
         * @returns {boolean}
         */
        isBrowser: function () {
            return !$$.isNative();
        },
        /**
         * 检测是否通过WebView访问
         * @returns {boolean}
         */
        isNative: function () {
            return /WebView/i.test(ua);
        }
    });

})();