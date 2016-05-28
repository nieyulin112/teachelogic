/*
 * author:nieyulin756
 * date:2015-11-17
 * 市民卡模块
 */
'use strict';
angular.module('RstFrontH5').factory('citizenCardService', function($window,$http,ApiService, citizenCardFakeService) {
    
    //获取市民卡主副卡数据
    var getCards = function(isNoHud) {
    	
    	var isLocalEnv = ApiService.isLocalEnv();
    	
    	var url = '/security/citypeople/cardAccountQuery.do';

    	var data = {} ;

    	if(isLocalEnv) {
    		return ApiService.requestFake(citizenCardFakeService.getCards(),false,false,0);
    	}else if(isNoHud){
    		return ApiService.requestNoHud('get',url,data,false);
    	}else{
    	 	return ApiService.request('get',url,data,false);
    	}
    };
    //申请卡的流程数据
    var getProcessDatas = function() {

        var isLocalEnv = ApiService.isLocalEnv();
        var url = '/security/citypeople/makeCardSchedule.do';
        var data = {};

        if(isLocalEnv) {
            return ApiService.requestFake(citizenCardFakeService.getProcessDatas(),false,false,0);
        }
        else{
            return ApiService.request('get',url,data,false);
        }
    };

    //联机账户查询数据
    var getAccountData = function() {

        var isLocalEnv = ApiService.isLocalEnv();
        var url = '/security/citizen/account.do';

        var data = {};

        if(isLocalEnv) {
            return ApiService.requestFake(citizenCardFakeService.getAccountData(),false,false,0);
        }
        else{
            return ApiService.request('get',url,data,false);
        }
    };

    //获取区域数据
    var getCitizenArea = function(){

        return ApiService.requestFake(citizenCardFakeService.getCitizenArea(),false,false,0);
        
    };
    //获取区域地址数据
    var getAddress = function() {

        return ApiService.requestFake(citizenCardFakeService.getAddress(),false,false,0);
    };

    return {
    	getCards: getCards,
        getProcessDatas: getProcessDatas,
        getAccountData: getAccountData,
        getCitizenArea: getCitizenArea,
        getAddress: getAddress
    };

 });