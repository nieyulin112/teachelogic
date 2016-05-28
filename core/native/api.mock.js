/**
 * 定义与Native相关的方法
 */
(function () {

    var defaultCallback = function () {
    };

    $$.Native = {
        openNativeBank: function(options){
          if(options){
            options.callback();
          }
        },
        /**
         * 发送HTTP请求
         * @import jQuery|Zepto
         * @param options
         */
        request: function (options) {
            $.ajax(options);
        },

        /**
         * 用于获取本地json
         */
        getJson: function (options) {
            $.ajax(options);
        },
        /**
         * 发送HTTP GET请求（调用$$.Native.request）
         * @param options
         */
        get: function (options) {
            $.get(options);
        },
        /**
         * 发送HTTP POST请求（调用$$.Native.request）
         * @param options
         */
        post: function (options) {
            $.post(options);
        },
        /**
         * WebView跳转（本地页面、服务端页面、及模块）
         * @param options
         */
        forward: function (options) {
            var data = options.data,
                url = options.url,
                htmlPath = '/dev/xiaoxiao/modules/html/';

            if (/^https*:\/\//.test(url)) {
                //
            } else {
                if (!/^\/modules\/html\//ig.test(url)) {
                    url = htmlPath + url;
                }
            }
            if (data) {
                data = $.param(data);

                if (url.indexOf('?') > -1) {
                    url += '&' + data;
                } else {
                    url += '?' + data;
                }
            }
            /*
             *过滤param
             */
            if (url && url.indexOf('?') > -1) {
                var param = [],
                    urlHost = url.split("?")[0],
                    urlData = $$.getQueryMap(url);
                for (var key in urlData) {
                    var tmp = '';
                    try{
                        tmp = decodeURIComponent(urlData[key]);
                    }catch(e){
                        tmp = urlData[key];
                    }
                    param.push(key + '=' + encodeURIComponent(tmp));
                }
                url = urlHost + "?" + param.join("&");
            }
            location.href = url;
        },
        /**
         * WebView返回
         * @param options
         */
        back: function (options) {

            var url = options ? options.url : '';

            if (url) {
                url = '/dev/xiaoxiao/modules/html/' + url;
                location.href = url;
            } else {
                history.go(-1);
            }
        },
        /**
         * 设置头部信息
         * @param options
         */
        setHeader: function (options) {
        },
        /**
         * 调用密码键盘
         * @param options
         */
        keyboard: function (options) {
            options.keyPressCallback("8");
            options.completeCallback();
        },

        /**
         * 获取加密后的密码
         * @param options callback timestamp
         */
        getSavePassword: function (options) {
            var data = '513248C0E498521B91289EC04E05D235AC0F36AF3082EB6E592B009BFE6DD258E72D1C4EBC15CE12DEA84DE59D8850179A47EB96CDE0105E7F746583EC73435796BB3AE95042AFA84C9B51172CFB4376D52F823B4160153DC76F39C87076ACE3772E604566FD1A2DE6770FA154FE37A4180B25F9721C718C9B0629552B4D2193';
            //123456b
            //var data = '16900396FA6D0A82A6124E71B67F2CDF3837A24A95038FFB8E1A947155A584A5F43FBC82023234AFD285AC994D7B36DD8428EE6710B0BC1E667AB51276F46A41ECFD17EF10732D9EE8324F4B51506E75A07B1E48D425AB0580E445CA7A5DAF154BAFD9002D25DA6B17203CDE68E9A343E7DFCF1CC49F3AED7FC395A27CE6AF4E';
            options.callback(data);
        },

        /**
         * 用于登录页面点击返回时关闭密码键盘
         * @param options
         */
        viewDisappear: function () {
            console.log('消失页面');
        },

        /**
         * 关闭密码键盘
         */
        closeKeyboard: function () {
        },

        /**
         * 清空密码
         */
        cleanPassword: function () {
        },

        /**
         * 显示加载动画
         */
        loadingBegin: function () {
        },
        /**
         * 关闭加载动画
         */
        loadingFinish: function () {
        },
        /**
         * 弱提示
         * @param options
         */
        tip: function (options) {
            alert(options.text);
        },
        /**
         * 强提示
         * @param options
         */
        alert: function (options) {
            var callback = options.btnCallback;

            alert(options.text);

            if (callback) {
                callback();
            }

        },
        /**
         * 确认信息
         * @param options
         */
        confirm: function (options) {
            var leftBtnCallback = options.leftBtnCallback || function () {
                    },
                rightBtnCallback = options.rightBtnCallback || function () {
                    };

            confirm(options.text, leftBtnCallback, rightBtnCallback);
        },
        /**
         * 开启下拉动作
         * @param options
         */
        pullDown: function (options) {
        },
        /**
         * 关闭下拉动作
         */
        closePullDown: function () {
        },
        /**
         * 隐藏下拉动画
         */
        hidePullDownAnim: function () {
        },
        /**
         * 开启上拉动作
         * @param options
         */
        pullUp: function (options) {
        },
        /**
         * 关闭上拉动作
         */
        closePullUp: function () {
        },
        /**
         * 隐藏上拉动画
         */
        hidePullUpAnim: function () {
        },
        /**
         * 存储本地数据
         * @param options
         */
        setData: function (options) {
            localStorage.setItem(options.name, JSON.stringify(options.value));
            options.callback();
        },
        /**
         * 获取本地数据
         * @param options
         */
        getData: function (options) {
            var value = localStorage.getItem(options.name);

            try {
                value = JSON.parse(value);
            } catch (e) {
                //
            }

            options.callback(value);
        },
        /**
         * 存储本地数据
         * @param options
         */
        setLocalData: function (options) {
            localStorage.setItem(options.name, JSON.stringify(options.value));
            options.callback();
        },
        /**
         * 获取本地数据
         * @param options
         */
        getLocalData: function (options) {
            var value = localStorage.getItem(options.name);

            try {
                value = JSON.parse(value);
            } catch (e) {
                //
            }

            options.callback(value);
        },
        /**
         * 获取图片资源
         * @param options
         * */
        requestImage:function(options){
           var v = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAeAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtlqTcqjLEAepNQtGsgww/XBFQX9gb3TprRm3iRfl3dVPY59jR0AvRXMEsrwxzRvIn30VgSv1FQ6vqH9m6XPcjG6OMsueme364rM8Mm3SxYtBsvI3aO5crli4POT78Gptc0y91fSHht3iSdpFZRNnbtBzg4+lJO6uPqR+FNQv7xLq01WY/2hbMrEgABo2GVIGMeo/CuiWVkbbKuAejjp+PpXCaqfFGj3cXiC4i0w+QnkS/Z2kwyMeN2ewPcV3dq8kttG8qBHZQWUNuAPfB70IbXUsIwYAqQQehFSrXm2paLeWvjZdNtdWudN0/Vi9zEbdtpE6j51B7Z4NegWZeK3iguJTJMqBWkYY3kd+OMmqasSXFqRaxrXWy/iO50S4g8qSOJZ4JA2RNGeCcdiDxjn1q7aaraXd/d2ETn7TZlfOjZSCAwypHqCPSkBoClqKKZJGZUOdvU9qmoA5UVItMFSLQAyC0gguJp449sk5BkOT8xAwOOlWlpi1ItABLBFcwPBPGskUilXRhkEGpYIkghSKNdqRqFUegHSkWpFoAzPEGhnW7W3EVx9murS5S5t5tm7aynoRkcEZFbOAy4YAg9RTVqRaLgcz4stZrKbTfEFojyPpk/wC9RRkmBhh/c44NZD+JLC7+IGk3mmzbo7uI2dy6fdOfmjH1yD74r0ADNQPpGnTeVvsoT5MwnjwgG2QdG470rAW4YkhQIi4UVNTVp9MD/9k=";
            options.callback(v);

        },
        /**
         * 移除本地数据
         * @param options
         */
        removeData: function (options) {
            localStorage.removeItem(options.name);
            options.callback();
        },
        /**
         * 清空本地数据
         * @param options
         */
        clearData: function (options) {
            localStorage.clear();
            options.callback();
        },
        /**
         * 移除本地数据
         * @param options
         */
        removeLocalData: function (options) {
            localStorage.removeItem(options.name);
            options.callback();
        },
        /**
         * 清空本地数据
         * @param options
         */
        clearLocalData: function (options) {
            localStorage.clear();
            options.callback();
        },

        /**
         * 清除指定key的数据以外的所有数据
         * @param options.data 需要保留的数据 type: array ['key1','key2','key3']
         * @param options.callback 回调函数 type: function
         */
        clearAppointData: function (options){
            var data = options.data || null;
            var callback = options.callback || defaultCallback;

            if(data!==null){
                data = JSON.stringify(data);
            }
            //$$.platformAdapter.call('clearAppointData', data);
            console.log(options);
        },

        /**
         * 获取设备信息
         * @param options
         */
        getDeviceInfo: function (options) {
            var deviceInfo = 'FFA0E7ED-D6F0-401F-9BD6-F35A7B6D7CD3',
                callback = options.callback;
            if (typeof callback === 'function') {
                callback(deviceInfo);
            }
        },
        /**
         * 选择日期
         * @param options
         * options.format: 日期格式['Y', 'Y-m', 'm-d', 'Y-m-d']
         * options.callback: 选择回调，传递选择的日期，格式YYYY-mm-dd
         */
        selectDate: function (options) {
            $$.platformAdapter.call('selectDate', options.format, options.callback);
        },

        /**
         * 获取拨盘
         * @param options.data 数据
         *        @format:
         *        [
         *          {
         *              id: 'xxx',
         *              columns: [
         *                  '刘诗诗',
         *                  '平安银行',
         *                  '****3458'
         *              ]
         *          },
         *          {},
         *          {}
         *        ]
         * @param options.defaultId 默认选中的ID
         * @param options.changeCallback
         * @param options.completeCallback
         */
        getDial: function (options) {
            var data = options.data || '',
                changeCallback = options.changeCallback,
                completeCallback = options.completeCallback;

            if (data) {
                JSON.stringify(data);
            }

            if (typeof changeCallback === 'function') {
                changeCallback("1");
            }
            if (typeof completeCallback === 'function') {
                completeCallback("6224271190380273-101");
            }
        },
        /**
         * 隐藏系统键盘
         */
        hideSysKeyboard: function () {
        },
        /**
         * 选择开户行
         * @param options.list 开户行列表 [{id: "", name: ""}]
         * @param options.callback 选择开户行回调 function({id: "", name: ""}) {}
         */
        selectBankOfDeposit: function (options) {
            var list = options.list,
                callback = options.callback;
            if (list && callback) {
                callback(list[0]);
            }
        },
        /**
         * 选择开户城市
         * @param options.historyList 选择历史 ['上海', '台州']，没有历史传空列表[]
         * @param options.cityList 城市列表 [{province: '广东', citys: ['广州', '深圳']}]
         * @param options.callback 选择城市回调 function('台州') {}
         */
        selectBankOfCity: function (options) {
            var cityList = options.cityList,
                callback = options.callback;
            if (cityList && cityList.length && callback) {
                callback(cityList[0].citys[0]);
            }
        },
        /**
         * 选择支行
         * @param options.city 当前城市
         * @param options.list 支行列表 [{id: '', name: ''}]
         * @param options.callback 选择支行回调 function({id: '', name: ''}) {}
         */
        selectBranch: function (options) {
            var list = options.list,
                callback = options.callback;
            if (list && list.length && callback) {
                callback(list[0]);
            }
        },

        /**
         * 登录成功调用任意门登录
         */
        anyDoorLogin: function () {
        },

        /**
         * 登录时调用任意门登录接口
         * @param options.ssoTicket 登录返回服务端返回的sso ticket
         * @param options.sessionSecret 登录返回服务端返回的sessionSecret
         * @param options.mamcId 任意门用户Id
         *
         */
        anyDoorLoginSuccess: function (options) {
        },
        /*
         * 设置工具箱
         * @param data {
         * "fixedBoxList":["jiaofei","",""],
         * "openBoxList":[,,],
         * "columns":3
         * }
         */
        setToolBox: function (options) {
            console.log(options);
        },
        /**
         * 打开F自己的插件
         *
         * @param options.adr_title 插件名称
         * @param options.url 链接地址
         */
        onAnyDoorEvent: function (options) {
        },

        /**
         * 打开任意门插件
         *
         * @param options.adr_pluginUid 插件ID
         * @param options.params 参数
         */
        openAnyDoorPlugin: function (options) {

            console.log(options);
        },

        moduleReady: function (options) {
        },
        TDOnEvent: function (eventId, eventLable, jsonData) {
            if (F && F.C) {
                F.C.getUserInfo(function (data) {
                    var userId = '未登录';

                    if (data && data.UserId) {
                        userId = data.UserId;
                    }

                    F.C.getUserLoginType(function (data) {
                        var loginType = '未登录';

                        if (data && data.LoginType) {
                            switch (data.LoginType) {
                                case 'D':
                                    loginType = '直销银行客户';
                                    break;
                                case 'C':
                                    loginType = '证书客户';
                                    break;
                                case 'O':
                                    loginType = '令牌客户';
                                    break;
                                case 'R':
                                    loginType = '大众版客户';
                                    break;
                            }
                        }

                        console.log(eventId);
                        console.log(eventLable);
                        console.log(JSON.stringify({UserType:loginType,UserId:userId}));

                        //$$.platformAdapter.call("TDOnEvent", eventId || '', eventLable || '', JSON.stringify({
                        //    UserType: loginType,
                        //    UserID: userId
                        //}));
                    });
                });
            }
        },
        logoutCallAnyDoor: function () {
        },
        /**
         * updateTab 更新TAB. 如果数组中的对象为空将不做任何修改
         *
         * @param arr Array
         * @eg [
         *      {id:'BANK', text:'直销银行'}, //将修改 tabId为BANK的文本
         *      {id:'HOME', text: '主页'} //将修改 tabId为BANK的文本
         * ]
         *
         * id: TabId, text:更换标题, url链接
         *
         * @send: JsonString.
         */
        updateTab: function(arr){
            console.log(arr);
        }
    };


})();