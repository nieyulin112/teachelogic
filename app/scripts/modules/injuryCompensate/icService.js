'use strict';
angular.module('RstFrontH5').factory('injuryCmptService', 
function($window, ApiService, injuryCmptFakeService){
	var isLocal = ApiService.isLocalEnv(),
		ics = {};

	ics.getInjuryList = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(injuryCmptFakeService.getInjuryList(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/jobCompensation/jobCompensation.do', param);
		}else {
			return ApiService.request('get', '/security/jobCompensation/jobCompensation.do', param, true);
		}
	}

	return ics;
});