'use strict';

PSA.factory(
	'SunshineService', 
	function ($window, $http, ApiService, SunshineMockService) {

		/**
		 * 分页查询招聘信息
		 * @param  {[type]} pageIdx [description]
		 * @return {[type]}         [description]
		 */
		function getSunshine (pageNo) {
			
			var url = '/open/governmentItem/governmentItemTree.do',
				param = {};

			// 验证是否是本地环境
			if (ApiService.isLocalEnv()) {
				return ApiService.requestFake(SunshineMockService.getSunshine(), false, false, 0);
			} else {
				// return ApiService.request('get', url, param, false);
				return ApiService.requestNoHud('get', url, param);
			}
				
		}

		function getJobsDetail (param) {
			var url = '/open/governmentItem/governmentItemList.do',
				param = {
					pageNo  : param.pageNo,
					typeName: param.rootID
				};

			if (param.pageNo < 1) return;

			// 验证是否是本地环境
			if (ApiService.isLocalEnv()) {
				return ApiService.requestFake(SunshineMockService.getJobsDetail(param.pageNo), false, false, 0);
			} else {
				// return ApiService.request('get', url, param, false);
				return ApiService.requestNoHud('get', url, param);
			}
		}

		return {
			getSunshine  : getSunshine,
			getJobsDetail: getJobsDetail
		}
	}
);
