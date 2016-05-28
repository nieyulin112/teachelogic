'use strict';
angular.module('RstFrontH5').factory('NewsLetterService', function($window, ApiService, NewsLetterFakeService) {
		
      //获取资讯列表分页信息
      var getNewsletterItems = function(param, isNoHud){
          if (ApiService.isLocalEnv()){
            return ApiService.requestFake(NewsLetterFakeService.getNewsletterItems(param));
          }else if(isNoHud){
        	  	return ApiService.requestNoHud('get', '/open/newsletter/getNewsletterList.do', param);
          }else{
            return ApiService.request('get', '/open/newsletter/getNewsletterList.do', param, true);
          }      
      };

      //获取资讯正文信息
      var getInformationBody = function(param, isNoHud){
          if (ApiService.isLocalEnv()){
            return ApiService.requestFake(NewsLetterFakeService.getInformationBody(param));
          }else if(isNoHud){
          	return ApiService.requestNoHud('get', '/open/newsletter/getNewsletterById.do', param, true);
          }else{
            return ApiService.request('get', '/open/newsletter/getNewsletterById.do', param, true);
          }      
      };
      
      	//获取资讯列表分页信息(绍兴版阳光政务特例)
		var getSunChiefItems = function(param, isNoHud){
		    if (ApiService.isLocalEnv()){
		      return ApiService.requestFake(NewsLetterFakeService.getSunChiefItems(param));//
		    }else if(isNoHud){
		    		return ApiService.requestNoHud('get', '/open/policyQuery/indistinctlist.do', param);
		    }else{
		    		return ApiService.request('get', '/open/policyQuery/indistinctlist.do', param, true);		      
		    }      
		};
		
		//获取资讯正文信息(绍兴版阳光政务特例)
		var getSunChiefDetail = function(param, isNoHud){
	        if (ApiService.isLocalEnv()){
	          return ApiService.requestFake(NewsLetterFakeService.getSunChiefDetail(param));//
	        }else if(isNoHud){
	          return ApiService.requestNoHud('get', '/open/policyQuery/show.do', param, true);
	        }else{
	          return ApiService.request('get', '/open/policyQuery/show.do', param, true);
	        }      
		};

      //返回首页
      var backToHome = function () {
          ApiService.backToHome();
      };
      return {
          getNewsletterItems: function(param, isNoHud) {return getNewsletterItems(param, isNoHud);},
          getInformationBody: function(param) {return getInformationBody(param);},
          getSunChiefItems: function(param, isNoHud) {return getSunChiefItems(param, isNoHud);},
          getSunChiefDetail: function(param) {return getSunChiefDetail(param);},
          backToHome : function() {return backToHome();}
      };

  });