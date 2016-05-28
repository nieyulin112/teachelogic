'use strict';
angular.module('RstFrontH5').factory('familyDoctorService', 
function($window, ApiService, familyDoctorFakeService){
	var isLocal = ApiService.isLocalEnv();
	var fds = {
		isChange: false,
		isFromList: false,
		isFromSearch: false,
		modelDoctor: null,
		allFirstPage: null,
		signDoctorCode: '',
		success: 10000,
		emptyMsg: '查询数据为空',
		errorMsg: '操作失败，请检查网络连接成功后再重试'
	};
	
//	推荐医生
	fds.getRecmd = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getRecmd(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/queryFamilyDoctor.do', param);
		}else {
			return ApiService.request('get', '/security/familyDoctor/queryFamilyDoctor.do', param, param.start===1);
		}
	};
//	所有医生
	fds.getAll = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getAll(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/queryFamilyDoctor.do', param);
		}else {
			return ApiService.request('get', '/security/familyDoctor/queryFamilyDoctor.do', param, param.start===1);
		}
	};
//	区域
	fds.getArea = function(isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getArea(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/listArea.do', {}, true);
		}else {
			return ApiService.request('get', '/security/familyDoctor/listArea.do', {}, true);
		}
	};
//	区域内的医院
	fds.getHospital = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getHospital(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/listHospitalDetail.do', param);
		}else {
			return ApiService.request('get', '/security/familyDoctor/listHospitalDetail.do', param, param.start===1);
		}
	};
//	科室
	fds.getSubject = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getSubject(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/getdepartment.do', param, true);
		}else {
			return ApiService.request('get', '/security/familyDoctor/getdepartment.do', param, true);
		}
	};
//	医生详情
	fds.getDoctor = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(familyDoctorFakeService.getDoctor(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/showFamilyDoctorDetail.do', param, true);
		}else {
			return ApiService.request('get', '/security/familyDoctor/showFamilyDoctorDetail.do', param, true);
		}
	};
//	签约医生
	fds.setSign = function(param, isNoHud){
		if(isLocal){
			this.isSign = true;
			return ApiService.requestFake({code:10000, body:{action:1}}, false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/signedDoctor.do', param, true);
		}else {
			return ApiService.request('get', '/security/familyDoctor/signedDoctor.do', param, true);
		}
	};
	
	fds.autoSign = function(isNoHud){
		if(isLocal){
			this.isSign = true;
			return ApiService.requestFake({code:10000}, false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/familyDoctor/autoSignDoctor.do', {}, true);
		}else {
			return ApiService.request('get', '/security/familyDoctor/autoSignDoctor.do', {}, true);
		}
	};
	
	return fds;
});