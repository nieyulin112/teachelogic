'use strict';
angular.module('RstFrontH5').factory('prescriptionService',function($window, ApiService, prescriptionFakeDataService) {
	//分页的每页显示几条数据
	var limit=10;
	var getLimit = function(){
		return limit;
	};
	//处方
	var getPrescriptionList = function(start, isNoHud){
        if (ApiService.isLocalEnv()){
 			return ApiService.requestFake(prescriptionFakeDataService.getPrescriptionList(),false,false,0);
        }else if(isNoHud){
        		var type='get';
	        var url='/security/continueAnagraph/listAnagraph.do';
	        var data={start:start,limit:limit};
	        return ApiService.requestNoHud(type, url, data);
        }else{
	        var type='get';
	        var url='/security/continueAnagraph/listAnagraph.do';
	        var data={start:start,limit:limit};
	        var showLoading=false;
	        return ApiService.request(type, url, data, showLoading);
        }      
	};
	  
	//处方详情
	var getPrescriptionDetail = function(anagraphCode,anagraphStatus, isNoHud) {
        if (ApiService.isLocalEnv()){
        		return ApiService.requestFake(prescriptionFakeDataService.getPrescriptionDetail(),false,false,0);
        }else if(isNoHud){
        	var type ='get';
	        var url = '/security/continueAnagraph/listAnagraphDetail.do';
	        var data = {anagraphCode:anagraphCode,anagraphStatus:anagraphStatus};
	        var showLoading = false;
	        return ApiService.requestNoHud(type, url, data, showLoading);
        }else{
	        var type ='get';
	        var url = '/security/continueAnagraph/listAnagraphDetail.do';
	        var data = {anagraphCode:anagraphCode,anagraphStatus:anagraphStatus};
	        var showLoading = false;
	        return ApiService.request(type, url, data, showLoading);
        }           
	};
	
	//处方药品详情
	var getPrescriptionPillDetailList = function(itemId,itemCode,anagraphStatus, isNoHud) {
        if (ApiService.isLocalEnv()) {
          	return ApiService.requestFake(prescriptionFakeDataService.getPrescriptionPillDetaillist(),false,false,0);
        }else if(isNoHud){
        	var type = 'get';  
	        var url = '/security/continueAnagraph/drugDetail.do';
	        var data = {itemId:itemId,itemCode:itemCode,anagraphStatus:anagraphStatus};
	        var showLoading = false;
	        return ApiService.requestNoHud(type, url, data, showLoading);
        }else{
	        var type = 'get';  
	        var url = '/security/continueAnagraph/drugDetail.do';
	        var data = {itemId:itemId,itemCode:itemCode,anagraphStatus:anagraphStatus};
	        var showLoading = false;
	        return ApiService.request(type, url, data, showLoading);
		}
	};
	return {
		getLimit: function() {return getLimit();},
	    getPrescriptionList: function(start, isNoHud){return getPrescriptionList(start, isNoHud);},
	    getPrescriptionDetail: function(anagraphCode,anagraphStatus){return getPrescriptionDetail(anagraphCode,anagraphStatus);},
	    getPrescriptionPillDetailList: function(itemId,itemCode,anagraphStatus) {return getPrescriptionPillDetailList(itemId,itemCode,anagraphStatus);}
	};
});