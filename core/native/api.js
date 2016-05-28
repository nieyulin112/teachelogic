/**
 * 定义与Native相关的方法
 */
(function () {

    /**
     * 配置信息
     */
    /*
     * htmlPath 字符串 设置forward默认根目录
     * defaultCallback 函数 设置默认空回调
     */
    var locationUrl = location.href,
        htmlPath = '/modules/html/',
        defaultCallback = function () {
        };
        locationUrl = htmlPath + locationUrl.split("?")[0].split("\/modules\/html\/")[1] || "";

    $$.Native = {
        /**
         @param queryString  查询的json串， string类型.
            如：{
                merchantId:111,
                merchantOrderId:222,
                merchantOrderTime:333,
                orderKey:444,
                sign:555
            }
         @param callback 回调方法
         */
        openNativeBank: function(options){
            $$.platformAdapter.call('openNativeBank', options.queryString, options.callback || function(){});
        },
        /**
         * 发送HTTP请求
         * @import jQuery|Zepto
         * @param options 对象{type:"get",data:{},success:function(res){},error:function(res){}}
         * @param .data JSON对象 请求入参
         * @param .type 字符串 请求方式，默认get
         * @param .success 函数 function(){} 请求成功处理
         * @param .error  函数 function(){} 请求失败处理
         */
        request: function (options) {
            var data = options.data,
                param = [],
                type = options.type;

            if (!/^get|post$/.test(type)) {
                type = 'get';
            }
			if(type && type.toLowerCase()==='post'){
				if(data && typeof data === 'object'){
					data = JSON.stringify(data);
				}
			}else if (data && typeof data == 'object') {
                //data = $.param(data);
                for (var key in data) {
                    try {
                        param.push(key + '=' + encodeURIComponent(decodeURIComponent(data[key])));
                    } catch (e) {
                        param.push(key + '=' + encodeURIComponent(data[key]));
                    }
                    // param.push(key + '=' + data[key]);
                }

                data = param.join('&');
            }
            $$.platformAdapter.call('request', options.url, type, data, options.success, options.error);
        },
        
        /**
         * 没有loading的请求
         * @param {Object} options
         */
        requestNoHud: function (options) {
            var data = options.data,
                param = [],
                type = options.type;
            if (!/^get|post$/.test(type)) {
                type = 'get';
            }
            if(type && type.toLowerCase()==='post'){
				if(data && typeof data === 'object'){
					data = JSON.stringify(data);
				}
			}else if (data && typeof data == 'object') {
                //data = $.param(data);
                for (var key in data) {
                    try {
                        param.push(key + '=' + encodeURIComponent(decodeURIComponent(data[key])));
                    } catch (e) {
                        param.push(key + '=' + encodeURIComponent(data[key]));
                    }
                }
                data = param.join('&');
            }
            $$.platformAdapter.call('requestNoHud', options.url, type, data, options.success, options.error);
        },
        
        /**
         * 发送HTTP GET请求（调用$$.Native.request）
         * @param options 对象
         * 默认get方式 方法参照request
         */
        get: function (options) {
            options.type = 'get';
            $$.Native.request(options);
        },
        /**
         * 发送HTTP POST请求（调用$$.Native.request）
         * @param options 对象
         * 默认post方式 方法参照request
         */
        post: function (options) {
            options.type = 'post';
            $$.Native.request(options);
        },
        /**
         * WebView跳转（本地页面、服务端页面、及模块）
         * @param options 对象 {title:"",url:""}
         * .title 字符串 跳转的标题
         * .url 字符串 跳转的链接
         * .type 跳转类型 local本地，F在线network网络，paNetwork平安第三方网络，interNetwork其他第三方网络
         * 跳转参数
         */
        forward: function (options) {
            
            var data = options.data,
                url = options.url,
                title = options.title || "",
                type = options.type || "local";
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
            /*判断是否需要登陆，如果需要的话，登陆处理，不需要的话调用Native.forword*/

            XX.C.loginFilter(url, title, function () {
                // if(!$$.Native.isMobile){
                //     window.location.href = "/tzb" + url;
                // }
                url = url.replace(/(%2F)/ig, "/");
                if(type && type =="local"){
                    $$.platformAdapter.call('forward', title, url);
                }else{
                    $$.platformAdapter.call('forward', title, url,type);
                }
            });
        },
        /**
         * WebView返回
         * @param options {url:""}
         * .url back返回的url,为空默认返回上一个页面
         */
        back: function (options) {
            var url = "",
                data = "";

            if (options && options.url) {
                url = options.url;

                if (/^https*:\/\//.test(url)) {
                    //
                } else {
                    url = htmlPath + url;
                }
            }
            if (options && options.data) {
                data = options.data;
            }

            $$.platformAdapter.call('back', url || "", data || "");
        },
        /**
         * 设置头部信息
         * @param options {title:"标题",isBack:true,backCallback:function(){},isClose:true,closeCallback:function(){}}
         * .title 字符串 设置头部标题
         * .isBack 布尔值 是否有返回图标
         * .backCallback function(){} 函数 设置左边回调
         * .isClose 布尔值 是否有关闭图标
         * .closeCallback function(){} 函数 设置右边回调
         */
        setHeader: function (options) {
            $$.platformAdapter.call('setHeader', options.title || '', !!options.isBack, options.backCallback || defaultCallback, !!options.isClose, options.closeCallback || '');
        },
        /**
         * 调用密码键盘
         * @param options {keyPressCallback:function(){},completeCallback:function(){},defaultValue:"asdfghjkl"}
         * .keyPressCallback 函数 输入时回调
         * .completeCallback 函数 完成时回调
         * .defaultValue 字符串 设置默认值
         */
        keyboard: function (options) {
            $$.Native.hideSysKeyboard();
            $$.platformAdapter.call('keyboard', options.keyPressCallback, options.completeCallback, options.defaultValue);
        },
        /**
         * 关闭密码键盘
         */
        closeKeyboard: function () {
            $$.platformAdapter.call('closeKeyboard');
        },
        /**
         * 获取加密后的密码
         * @param options {timestamp:"dasdasdas",callback:function(){},publicKey:"asddasasd",password:"fasssaasd"}
         * .callback 函数 回调
         * timestamp 时间戳 字符串
         * publicKey 密钥 字符串
         */
        getSavePassword: function (options) {
            $$.platformAdapter.call('getSavePassword', options.timestamp, options.callback, options.publicKey, options.password);
        },

        /**
         * 清空密码
         */
        cleanPassword: function () {
            $$.platformAdapter.call('cleanPassword');
        },

        /**
         * 页面消失时调用 用于登录页面点击返回或者进行跳转页面时候告诉Native需要
         */
        viewDisappear: function () {
            $$.platformAdapter.call('viewDisappear');
        },
        /**
         * 显示加载动画
         *
         * options.isCancel 是否允许取消加载动画
         * options.msg 当不允许取消加载动画时 提示信息
         */
        loadingBegin: function (options) {
            var isCancel = true,
                msg = '';

            if (options) {
                isCancel = options.isCancel;
                msg = options.msg;
            }

            $$.platformAdapter.call('loadingBegin', isCancel, msg);
        },
        /**
         * 关闭加载动画
         */
        loadingFinish: function () {
            $$.platformAdapter.call('loadingFinish');
        },
        /**
         * 弱提示
         * @param options 字符串或者{text:"提示内容"}
         * @param time 设置tip显示时间，默认2000毫秒
         * .text 字符串
         */
        tip: function (options) {
            var text,time = 3500;
            if(options && typeof options == "object"){
                if(options.text){
                    text = options.text;
                }
                if(options.time){
                    time = options.time;
                }
            }else{
                text = options || "";
            }
            $$.platformAdapter.call('tip', text,time);
        },
        /**
         * 强提示
         * @param options
         * .text 字符串 对话框文案
         * .btnText 字符串 按钮文字
         * .btnCallback 函数 按钮回调
         */
        alert: function (options) {
            $$.platformAdapter.call('alert', options.url || locationUrl , options.text, options.btnText, options.btnCallback || defaultCallback);
        },
        /**
         * 确认信息
         * @param options
         *
         */
        confirm: function (options) {
            $$.platformAdapter.call('confirm',options.url || locationUrl , options.text, options.leftBtnText, options.leftBtnCallback || defaultCallback, options.rightBtnText, options.rightBtnCallback);
        },
        /**
         * 开启下拉动作
         * @param options
         */
        pullDown: function (options) {
            $$.platformAdapter.call('pullDown', options.callback || defaultCallback);
        },
        /**
         * 关闭下拉动作
         */
        closePullDown: function () {
            $$.platformAdapter.call('closePullDown');
        },
        /**
         * 隐藏下拉动画
         */
        hidePullDownAnim: function () {
            $$.platformAdapter.call('hidePullDownAnim');
        },
        /**
         * 开启上拉动作
         * @param options
         */
        pullUp: function (options) {
            $$.platformAdapter.call('pullUp', options.callback || defaultCallback);
        },
        /**
         * 关闭上拉动作
         */
        closePullUp: function () {
            $$.platformAdapter.call('closePullUp');
        },
        /**
         * 隐藏上拉动画
         */
        hidePullUpAnim: function () {
            $$.platformAdapter.call('hidePullUpAnim');
        },
        /**
         * 存储本地数据
         * @param options
         */
        setData: function (options) {
            $$.platformAdapter.call('setData', options.name, JSON.stringify(options.value), options.callback || defaultCallback);
        },
        /**
         * 获取本地数据
         * @param options
         */
        getData: function (options) {
            $$.platformAdapter.call('getData', options.name, function (value) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    //
                }

                options.callback(value);
            });
        },
        /**
         * 存储本地数据
         * @param options
         */
        setLocalData: function (options) {
        		var value = options.value;
        		if(typeof(value)==='object'){
        			value = JSON.stringify(options.value);
        		}
            $$.platformAdapter.call('setLocalData', options.name, value, options.callback || defaultCallback);
        },
        /**
         * 获取本地数据
         * @param options
         */
        getLocalData: function (options) {
            $$.platformAdapter.call('getLocalData', options.name, function (value) {
                try {
                		if(typeof(value)==='string' && (value.substr(0,1)==='{'||value.substr(0,1)==='[')){
                    		value = JSON.parse(value);
                    	}
                } catch (e) {
                    //
                }

                options.callback(value);
            });
        },
        /**
         * 获取图片资源
         * @param options
         * */
        requestImage:function(options){
            $$.platformAdapter.call('requestImage',options.url,function(value){
                options.callback(value);
            });
        },
        /**
         * 移除本地数据
         * @param options
         */
        removeData: function (options) {
            $$.platformAdapter.call('removeData', options.name, options.callback || defaultCallback);
        },
        /**
         * 清空本地数据
         * @param options
         */
        clearData: function (options) {
            $$.platformAdapter.call('clearData', options.callback || defaultCallback);
        },
        /**
         * 移除本地数据
         * @param options
         */
        removeLocalData: function (options) {
            $$.platformAdapter.call('removeLocalData', options.name, options.callback || defaultCallback);
        },
        /**
         * 清空本地数据
         * @param options
         */
        clearLocalData: function (options) {
            $$.platformAdapter.call('clearLocalData', options.callback || defaultCallback);
        },

        /**
         * 清除指定key的数据以外的所有数据
         * @param options.data 需要保留的数据 type: array ['key1','key2','key3']
         * @param options.callback 回调函数 type: function
         */
        clearAppointData: function (options){
            var data = options.data || null;
            var callback = (typeof options.callback === 'function') ? options.callback : defaultCallback();

            if(data!==null){
                data = JSON.stringify(data);
            }
            $$.platformAdapter.call('clearAppointData', data, callback);
        },
        /**
         * 获取设备信息
         * @param options
         */
        getDeviceInfo: function (options) {
            $$.platformAdapter.call('getDeviceInfo', options.callback);
        },
        /**
         * 选择日期
         * @param options
         * @param options.format: 字符串 日期格式'Y', 'Y-m', 'm-d', 'Y-m-d' 不设置默认
         * @param options.type 默认0,调用1次拨盘,     1代表连续调用两次拨盘
         * @param completeValue 设置确定按钮，默认显示时间，如果没有默认时间，则不需要社会自
         * @param startValue  //如果有两次选择时间，startValue设置第一次，默认显示时间
         * @param startCallback  如果有两次选择时间，startCallback第一次选择时间，回调方法
         * @param completeCallback: 最后一次回调方法，传递选择的日期，格式YYYY-mm-dd
         */
        selectDate: function (options) {
            $$.platformAdapter.call('selectDate', options.url || locationUrl ,options.format || "Y-m-d", options.type || "0", options.completeValue || "", options.completeCallback, options.startValue || "", options.startCallback, options.leftCallback || defaultCallback);
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
         * @param options.leftBtnText 默认是为空
         * @param options.leftBtnCallback
         * @param options.completeText 默认是确认
         * @param options.completeCallback
         */
        getDial: function (options) {
            var data = options.data || '';
            if (data) {
                JSON.stringify(data);
            }
            $$.platformAdapter.call('getDial', options.url || locationUrl ,data, options.defaultId || '', options.changeCallback || "", options.leftBtnText || "", options.leftBtnCallback, options.completeText, options.completeCallback);
        },
        /**
         * 隐藏系统键盘
         */
        hideSysKeyboard: function () {
            $$.platformAdapter.call('hideSysKeyboard');
        },
        /**
         * 选择开户行
         * @param options.list 开户行列表 [{id: "", name: ""}]
         * @param options.callback 选择开户行回调 function({id: "", name: ""}) {}
         */
        selectBankOfDeposit: function (options) {
            $$.platformAdapter.call('selectBankOfDeposit',options.url || locationUrl , options.list, options.callback);
        },
        /**
         * 选择开户城市
         * @param options.historyList 选择历史 ['上海', '台州']，没有历史传空列表[]
         * @param options.cityList 城市列表 [{province: '广东', citys: ['广州', '深圳']}]
         * @param options.callback 选择城市回调 function('台州') {}
         */
        selectBankOfCity: function (options) {
            $$.platformAdapter.call('selectBankOfCity',options.url || locationUrl , options.historyList, options.cityList, options.callback);
        },
        /**
         * 选择支行
         * @param options.city 当前城市
         * @param options.list 支行列表 [{id: '', name: ''}]
         * @param options.callback 选择支行回调 function({id: '', name: ''}) {}
         */
        selectBranch: function (options) {
            $$.platformAdapter.call('selectBranch',options.url || locationUrl , options.city, options.list, options.callback);
        },

        /**
         * 客户登录成功回调
         * @param options.ssoTicket 登录返回服务端返回的sso ticket
         * @param options.sessionSecret 登录返回服务端返回的sessionSecret
         * @param options.mamcId 任意门用户Id
         *
         */
        anyDoorLoginSuccess: function (options) {

            //$$.platformAdapter.call('back');
            $$.platformAdapter.call("anyDoorLoginSuccess", options.ssoTicket, options.sessionSecret, options.mamcId, options.isAnydoor, options.isOpenAnydoor);

        },

        /**
         * 打开F自己的插件
         *
         * @param options.adr_title 插件名称
         * @param options.url 链接地址
         */
        onAnyDoorEvent: function (options) {
            $$.platformAdapter.call("onAnyDoorEvent", options.adr_title, options.url, options.callback);
        },

        /**
         * 打开任意门插件
         *
         * @param options.adr_pluginUid 插件ID
         * @param options.params 参数
         */
        openAnyDoorPlugin: function (options) {
            $$.platformAdapter.call("openAnyDoorPlugin", options.adr_pluginUid, options.params);
        },
        /*
         * 设置工具箱
         * @param data {
         * "fixedBoxList":["jiaofei","",""],
         * "openBoxList":[,,],
         * "columns":3
         * }
         * @param TDOnEventInfo talking data 信息
         */
        setToolBox: function (options) {
            XX.C.getUserInfo(function (data) {
                var userId = '未登录',
                    opt = {};
                if (data && data.UserId) userId = data.UserId;
                XX.C.getUserLoginType(function (data) {
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
                    opt.UserType = loginType;
                    opt.UserId = userId;
                    //talking data 信息
                    var TDOnEventInfo = JSON.stringify(opt);
                    $$.platformAdapter.call("setToolBox", options.data || "",TDOnEventInfo);
                });
            });
        },
        /*
         *通知Native模块首页是否加载成功
         */
        moduleReady: function (options) {
            $$.platformAdapter.call("moduleReady", options.moduleId || "");
        },
        /*
         * 通知Native回到模块首页
         * @params options.moduleId 主模块ID
         *         options.callback 回调函数
         */
        backToRootModule: function (options) {
            var callback = defaultCallback,
                moduleId = '';

            if(options && options.moduleId){
                moduleId = options.moduleId;
            }

            if(options && options.callback){
                callback = options.callback;
            }

            $$.platformAdapter.call("backToRootModule", moduleId, callback);
        },
        /*
         * 首页fotterBar显示隐藏
         * '0':'隐藏', '1':'显示'
         * @params 
        */
        changeMenu: function(menustate){
            $$.platformAdapter.call("changeMenu", menustate);
        },
        /**
         * 退出登录时调用
         */
        logoutCallAnyDoor: function () {
            $$.platformAdapter.call("logoutCallAnyDoor");
        },
        /*
         *获取app版本信息
         *@param callback回调,callback(data),data为JSON格式
         *   {
         *       appVersion:”1.0.0”,
         *       appNewVersion:”2.0.1”    如果有版本更新，则显示最新版本号，如果没有则不显示，IOS不需要展示个，IOS这个值返回可以为空。
         *  }
         *   
         */ 
        appVersion: function(options){
            $$.platformAdapter.call("appVersion",options.callback || defaultCallback);
        },
        /*
         * 更新版本信息弹窗
         * @param callback 更新成功，callback()
         */ 
        updateApp:function(options){
                callback = options.callback || defaultCallback;
            $$.platformAdapter.call("updateApp",callback);
        },
        /**
         * 监听用户操作数据
         * @param eventId 事件分类
         * @param eventLable事件 事件类型细分
         * @constructor
         */
        TDOnEvent: function (eventId, eventLable, options) {
            if (XX && XX.C) {
                XX.C.getUserInfo(function (data) {
                    var userId = '未登录',
                        opt = {},
                        datas = options || {};

                    if (data && data.UserId) userId = data.UserId;

                    XX.C.getUserLoginType(function (data) {
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

                        opt.UserType = loginType;
                        opt.UserId = userId;
                        if(datas && datas.PluginId) opt.PluginId = datas.PluginId;
                        if(datas && datas.Loc) opt.Loc = datas.Loc;

                        $$.platformAdapter.call("TDOnEvent", eventId || '', eventLable || '', JSON.stringify(opt));
                    });
                });
            }
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
            if(_.isEmpty(arr)){
                $$.platformAdapter.call("updateTab", "");
            }else{
                $$.platformAdapter.call("updateTab", JSON.stringify(arr));
            }
        },

        /**
         * updateAnydoor 更新任意门数据
         * @param options
         */
        updateAnydoor: function(options){
            var callback = options.callback || defaultCallback;
            $$.platformAdapter.call("updateAnydoor", callback);
        },
        
        /**
         * payByPingAnFu 平安付接口缴费
         */
        payByPingAnFu: function(options){
        		var callback = options.callback || defaultCallback;
            $$.platformAdapter.call("payByPingAnFu", options.tranCode, callback);
        },
        
        /**
         * 添加锚点 
         * @param ancho 锚点字符串
         */
        listenH5Event: function(ancho){
			$$.platformAdapter.call("TDOnEvent", ancho);
        },
        
        /**
         * dial-up 市民卡网点拨号
         */
        dialUp: function(options){
            $$.platformAdapter.call("dialing", options.phoneNum);
        },
        
        /**
         * 显示/关闭转圈加载图标
         * @param {String} state 1为开，0为关
         */
        hudState: function(state){
        		$$.platformAdapter.call("hudState", state);
        },
        /**
         * 显示日期组件 
         * 格式：y, y-m, m-d, y-m-d ,H:M
         */
        selectDate: function(options){
    		var options = options || {},
    			formatStr = options.format||'y-m-d',
                yearStart = options.yearStart || '2000',
                yearEnd = options.yearEnd || '2050',
    			leftBtnCB = options.leftBtnCallback || defaultCallback,
    			rightBtnCB = options.rightBtnCallback || defaultCallback;
    		
            $$.platformAdapter.call("selectDate", formatStr, yearStart, yearEnd, leftBtnCB, rightBtnCB);
        }
    };
})();