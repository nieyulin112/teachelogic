/**
 * 定义与Native相关的事件监听
 */
(function () {

    $$.EventListener = {
        /**
         * 返回（点击返回按钮或Android物理返回键）
         * @param url
         */
        onBack: function (url,data) {

        },
		test123:function(){
			alert(123);
		},
        /*
         * onChange调用模块首页
         */
        onChange: function(moduleId) {
            //$$.Native.tip({text:moduleId});
        },
        /*
         * Native主动调Native的forward 
         * data forward类型
         */
        onForward: function(url,title,data){
            if(url){
                if(url.indexOf('pLogin/logout.html') !== -1){

                    if(typeof data === 'string'){
                        try{
                            data = JSON.parse(data);
                        }catch(e){
                            $$.Native.tip({
                               text: '解析错误'
                            });
                        }
                    }

                    if(!!data && !!data.source && data.source === 'anydoor'){
                        F.C.Logout();
                    }else{
                        $$.Native.alert({
                            text:'确定要登出账号吗?',
                            btnText: '确定',
                            btnCallback: function(){
                                F.C.Logout();
                            }
                        });
                    }
                }else{
                    $$.Native.forward({
                        url:url,
                        data:data,
                        title:(title || "")
                    });
                }
            }
        },
        anydoorLogin: function(pluginId){
            var param = (_.isEmpty(pluginId)) ? "" : "&pluginId="+pluginId;
            $$.Native.forward({
                'url': 'pLogin/login.html?type=anyDoor'+param
            });
        },
        openAnydoorPersonInfo: function(){
            F().gotoAnyDoorGRZX();
        },
        jumpToUrl: function(stateName, param){
            var scope = angular.element(document.getElementById('viewContent')).scope();
            scope.jumpToState(stateName, param);
        }
    };

})();