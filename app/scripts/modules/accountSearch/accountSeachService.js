/*
** author:nieyulin
** date:2015-11-06
** 账户查询
** real data
*/

'use strict';
angular.module('RstFrontH5').factory('accountSearchService', function($window, ApiService, accountSearchFakeDataService) {
    //获取账户的金额记录的数据
    var getRecordMoney = function(params, isNoHud) {
      var isLocalEnv = ApiService.isLocalEnv();
      var url = '/security/accountQuery/accountListQuery.do';
      if(isLocalEnv) {
        return ApiService.requestFake(accountSearchFakeDataService.getRecordMoney(),false,false,0);
      }else if(isNoHud){
    	  	return ApiService.requestNoHud('get', url, params);
      }else {
        return ApiService.request('get', url, params, true);
      }
    };

    //获取不需要分页的数据
    var getRecordAccountMoney = function(isNoHud){
      var isLocalEnv = ApiService.isLocalEnv();
      var data = {};
      var url = '/security/accountQuery/accountQuery.do';
      if(isLocalEnv) {
        return ApiService.requestFake(accountSearchFakeDataService.getRecordAccountMoney(),false,false,0);
      }else if(isNoHud){
    	  	return ApiService.requestNoHud('get', url, data);
      }else {
        return ApiService.request('get', url, data, true);
      }
    };

    return {
        getRecordMoney: getRecordMoney,
        getRecordAccountMoney:getRecordAccountMoney
    };
});