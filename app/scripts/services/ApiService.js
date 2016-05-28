'use strict';
/**
 * @ngdoc service
 * @name RstFrontH5.ApiService
 * @description
 */
PSA.factory('ApiService', function($window, $http, $q, $timeout, $ionicLoading, $state,siConfig) {
    // activate for basic auth
    // if (_api.needsAuth) {
    //   $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
    // }

    var  
        //http_token = 'bd2d6528-f9cc-4e4a-bb18-27c94c1e59c3', http_zoneCode = '0579';
        // http_token = '9e563d47-06ba-4be1-97c7-5aa507ff0f25', http_zoneCode = '0579';
        http_token = 'cc884d50-3350-4087-8aac-256fccb083ba', http_zoneCode = '0575';
        // http_token = 'b018e750-e002-4227-a8e9-dd56b4303d64', http_zoneCode = '0575';
    		
    
    var showLoading = function(){
    		if(isLocalEnv()){// Native端提供加载动画
	      	$ionicLoading.show({
	        		template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
	        		delay: 500,
	        		noBackdrop: true,
	        		hideOnStateChange: true
	      	});
	     }
    };

    var hideLoading = function(){
      $ionicLoading.hide();
    };

    var apiMode = siConfig.statu;

    var endPoint = '';
    if (apiMode === 'dev' || apiMode === 'dev-http'){
      endPoint = siConfig.serverName_dev;
    }
    else if(apiMode === 'stg'){
      endPoint = siConfig.serverName_stg;
    }
    else if(apiMode === 'prd'){
      endPoint = siConfig.serverName_prd;
    }

    var bSkipNextPageTransition = false;
    var skipNextPageTransition = function(bSkip){
      if(bSkip === undefined)
        return bSkipNextPageTransition;
      bSkipNextPageTransition = bSkip;
    };

    var getEndPoint = function(){
      return endPoint;
    };

    var setEndPoint = function(ep){
      endPoint = ep;
    };

    var backToHome = function(){
      $$.Native.backToRootModule();
    };
    
	var showFooterMenu = function(){
    	  if(isMobile){
    	  	$$.Native.changeMenu('1');
    	  }
    };
    
    var hideFooterMenu = function(){
    	  if(isMobile){
    	  	$$.Native.changeMenu('0');
    	  }
    };
    
    //解析param参数
    var resolveParams = function (params) {
        if(!params  || params === '') {
          return;
        }
        var addUrl = '';
        for (var obj in params) {
            addUrl += obj+'='+params[obj]+'&';
        }
        return addUrl.substr(0,addUrl.length-1);
    };
    
    var requestFake = function(returnData, bShowLoading, forceFailed, delayTime){
      var deferred = $q.defer();
      extendPromise(deferred.promise);
      if(bShowLoading){
        showLoading();
      }
      var successPromiseFuncWrapper = function(response){
        if(bShowLoading){
          hideLoading();
        }
        deferred.resolve(response);
      };

      var errorPromiseFuncWrapper = function(response){
        if(bShowLoading){
          hideLoading();
        }
        deferred.reject(response);
      };

      if(!delayTime){
        delayTime = 1;
      }

      var timer = $timeout(
        function() {
          if(forceFailed){
            errorPromiseFuncWrapper(returnData);
          }
          else{
            successPromiseFuncWrapper(returnData);
          }
        }, delayTime);
      return deferred.promise;
    };

    var request = function(type, url, data, bShowLoading){
      if(undefined === bShowLoading){
        bShowLoading = true;
      }
      var deferred = $q.defer();
      extendPromise(deferred.promise);

      var successPromiseFuncWrapper = function(response){
          deferred.resolve(response);
        if(bShowLoading){
          hideLoading();
        }
      };
      var errorPromiseFuncWrapper = function(response){
        deferred.reject(response);
        if(bShowLoading){
          hideLoading();
        }
      };

      if(bShowLoading){
        showLoading();
      }
      var requestBody = {
        'url': url,
        'type': type,
        'data': data,
        'success': successPromiseFuncWrapper,
        'error': errorPromiseFuncWrapper
      };
      if(!url && data === 'test'){
        var timer = $timeout(
          function() {
            successPromiseFuncWrapper(data);
          }, 2000);
      }else{
        //如果使用了get请求方式，将进行url拼接字符模式
        if(type === 'GET' || type === 'get' || type === 'Get') { 
            if(data){
              url = url +'?'+resolveParams(data);
            }else{
              url = url;
            }
        }
        var config;
        //本次请求将通过$http请求方式发送请求
        if(apiMode === 'dev-http'){
          var url = getEndPoint() + url;
          if(type === 'GET' || type === 'get' || type === 'Get') {
              config = {
              method : type,
              cache : false,
              url : url,
              headers : {
                Token : http_token,
                zoneCode: http_zoneCode
              }
            };
          }else {
            config = {
              method : type,
              cache : false,
              url : url,
              data : data,
              headers : {
                Token : http_token,
                zoneCode: http_zoneCode
              }
            };
          } 
          $http(config).success(function(response)
                {
                  successPromiseFuncWrapper(response);
                }
            ).error(function(response)
                {
                   errorPromiseFuncWrapper(response);
                }
            );
        }else{
          var timer = $timeout(
          function() {
            hideLoading()
          }, 7000);
          $$.Native.request(requestBody);
        }
      }
      return deferred.promise;
    };
    
    var requestNoHud = function(type, url, data){
      var deferred = $q.defer();
      extendPromise(deferred.promise);

      var successPromiseFuncWrapper = function(response){
          deferred.resolve(response);
      };
      var errorPromiseFuncWrapper = function(response){
        deferred.reject(response);
      };
      var requestBody = {
        'url': url,
        'type': type,
        'data': data,
        'success': successPromiseFuncWrapper,
        'error': errorPromiseFuncWrapper
      };
      if(!url && data === 'test'){
        var timer = $timeout(
          function() {
            successPromiseFuncWrapper(data);
          }, 2000);
      }else{
        //如果使用了get请求方式，将进行url拼接字符模式
        if(type === 'GET' || type === 'get' || type === 'Get') { 
            if(data){
              url = url +'?'+resolveParams(data);
            }else{
              url = url;
            }
        }
        var config;
        //本次请求将通过$http请求方式发送请求
        if(apiMode === 'dev-http'){
          var url = getEndPoint() + url;
          if(type === 'GET' || type === 'get' || type === 'Get') {
              config = {
              method : type,
              cache : false,
              url : url,
              headers : {
                Token : http_token,
                zoneCode: http_zoneCode
              }
            };
          }else {
            config = {
              method : type,
              cache : false,
              url : url,
              data : data,
              headers : {
                Token : http_token,
                zoneCode: http_zoneCode
              }
            };
          } 
          $http(config).success(function(response)
                {
                  successPromiseFuncWrapper(response);
                }
            ).error(function(response)
                {
                   errorPromiseFuncWrapper(response);
                }
            );
        }else{
          var timer = $timeout(
          function() {
            hideLoading()
          }, 7000);
          $$.Native.requestNoHud(requestBody);
        }
      }
      return deferred.promise;
    };

	var showHud = function(){
		if(isProEnv){
			$$.Native.hudState('1');
		}
	}
	
	var hideHud = function(){
		if(isProEnv){
			$$.Native.hudState('0');
		}
	}

    var isLocalEnv = function(){
      return apiMode === 'dev-fake';
    };
    
    var isProEnv = !isLocalEnv() && typeof($$)!=='undefined' && typeof($$.Native)!=='undefined';
	var isMobile = typeof($$)!=='undefined' && typeof($$.Native)!=='undefined';

    //private
    var extendPromise = function(promise){
      promise.success = function(fn) {  
          promise.then(function(response) {
            //fn(response.data, response.status, response.headers, config);
            fn(response);
          });
          return promise;
        };

      promise.error = function(fn) {  
          promise.then(null, function(response) {
            fn(response);
          });
          return promise;
        };
    };

    //
    var setApiMode = function(mode){
      apiMode = mode;
    };

    var getApiMode = function(){
      return apiMode;
    };
    // public api
    return {
      getEndPoint: getEndPoint,
      setEndPoint: setEndPoint,
      isLocalEnv: isLocalEnv,
      backToHome: backToHome,
      request: request,
      requestNoHud: requestNoHud,
      showHud: showHud,
      hideHud: hideHud,
      skipNextPageTransition: skipNextPageTransition,
      getApiMode:getApiMode,
      setApiMode:setApiMode,
      requestFake:requestFake,
      showLoading:showLoading,
      hideLoading:hideLoading,
      showFooterMenu:showFooterMenu,
      hideFooterMenu:hideFooterMenu
    };
  });

