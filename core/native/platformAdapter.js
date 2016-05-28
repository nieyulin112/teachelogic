/**
 * 平台调用适配器
 * @import $$
 */
(function () {
    var toString = Object.prototype.toString,
        slice = Array.prototype.slice,
        count = 0,
        loop = function () {
        },
        platformAdapter = $$.platformAdapter = {};

    function errHandler(error) {
        $$.Native.loadingFinish();
        switch (error.code) {
            case '001':
                window.requestCount = 0;
//                $$.Native.tip('应用错误');
                break;
            case '002':
                window.requestCount = 0;
                $$.Native.tip('没有连接网络');
                break;
            case '003':
                window.requestCount = 0;
                $$.Native.tip('网络超时');
                break;
            case '004':
                window.requestCount = 0;
//                $$.Native.tip('服务器发生异常');
                break;
            default:
                window.requestCount = 0;
//                $$.Native.tip('未知错误');
                break;
        }
    }

    $$.extend(platformAdapter, {
        /**
         * @private
         * 回调函数集
         */
        _handlers: {},
        /**
         * 调用Native方法
         * @param method
         */
        call: function (method) {
            var self = this;
            if (!$$.isNative()) {
                return;
            }

            var args = slice.call(arguments, 1),
                arg = null,
                callback = null,
                hasCallbackFlag = false,
                handlers = {};

            var handlersErrorCallback = function (arg) {

                return function (error) {
                    if (!error) {
                        arg.apply(window, slice.call(arguments, 1));
                    } else {
                        //TODO: 统一处理入口
                        errHandler(error);
                    }
                };

            };
            /*
             *请注意！！！！！！！！！arg参数（字符串）安卓和IOS需要单独处理。
             *ios不需要加""号。   
             *安卓需要加""号。
             */
            // 参数内容处理
            for (var i = 0, len = args.length; i < len; i++) {
                arg = args[i];
                arg = arg || '';
                //f(ar)
                // if (_.isEmpty(arg)) {
                //     arg = '';
                // }
                // 函数型参数转换
                if (toString.call(arg) == '[object Function]') {
                    hasCallbackFlag = true;
                    callback = method + '_' + count++;
                    //platformAdapter._handlers[callback] = arg;
                    handlers = platformAdapter._handlers;
                    handlers[callback] = handlersErrorCallback(arg);
                    arg = callback;
                } else if (toString.call(arg) == '[object Object]') {
                    arg = JSON.stringify(arg);
                } else if (toString.call(arg) == '[object Array]') {
                    arg = JSON.stringify(arg);
                }

                if ($$.isAndroid()) {
                    arg = arg.toString().replace(/\|/g, '||');
                    arg = '"' + arg + '"';
                }

                args[i] = arg;
            }

            if (!hasCallbackFlag) {
                callback = method + '_' + count++;
                handlers = platformAdapter._handlers;
                handlers[callback] = handlersErrorCallback(loop);
                arg = callback;

                if ($$.isAndroid()) {
                    args.push('"' + arg + '"');
                } else {
                    args.push(arg);
                }
            }

            if ($$.isAndroid()) {
                //console.log(method + '(' + args.join('|') + ')');
                prompt('call://' + method + '(' + args.join('|') + ')');
            } else if ($$.isiOS()) {
                try {
                    window.iOS[method].apply(window.iOS, args);
                    //eval('window.iOS.' + method + '(' + args.join(',') + ')');
                } catch (e) {
                    // error
                }
            }
        },
        /**
         * 提供给Native回调
         * @param method
         */
        callback: function (method) {
            var args = slice.call(arguments, 1),
                handlers = platformAdapter._handlers,
                callback = null;
            callback = handlers[method];
            //if(!callback) {console.log("method:" +method)};
            if (callback && toString.call(callback) == '[object Function]') {
                callback.apply(window, args);
                //handlers[method] = null;
            }
        }
    });
    window.__callback = $$.platformAdapter.callback;


})();
