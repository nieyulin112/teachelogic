'use strict';
angular.module('RstFrontH5').factory('stuInsFakeService', function(){
	var rsp = {success:10000, fail:20000};
	
	var storeSchool = {
		code: rsp.success,
		message: '查询成功',
		body: [
			{schoolCode:'sx001', schoolName:'北海学校'},
			{schoolCode:'sx002', schoolName:'成章学校'},
			{schoolCode:'sx003', schoolName:'昌安学校'},
			{schoolCode:'sx004', schoolName:'北海学校'},
			{schoolCode:'sx005', schoolName:'城南中心学校'}
		]
	};
	
	var storeClass = {
		code: rsp.success,
		message: '查询成功',
		body: [
			{classCode:'bj001', className:'测试一班'},
			{classCode:'bj002', className:'测试二班'},
			{classCode:'bj003', className:'测试三班'},
			{classCode:'bj004', className:'测试四班'},
			{classCode:'bj005', className:'测试五班'}
		]
	};
	
	var storeBill = {
		code: rsp.success,
		message: '查询成功',
		body: [
			{billsNo:'bill001', stuName:'张三', stuSex:'0', idCard:'142************823', result:'00', canPay:'01'},
			{billsNo:'bill002', stuName:'李四', stuSex:'1', idCard:'143************873', result:'01', canPay:'01'},
			{billsNo:'bill003', stuName:'王五', stuSex:'0', idCard:'148************032', result:'02', canPay:'01'}
		]
	};
	
	var modelDetail = {
		code: rsp.success,
		message: '查询成功',
		body: {
			billsNo: 'NO.ZH909876678',
			stuName: '王明明',
			stuSex: '0',
			idCard: '210*********467110',
			result: '02',
			canPay: '00',
			payYear: '2016年',
			schoolName: '灵芝镇初级中学',
			className: '初二（3）班',
			payAmount: '100',
			mobile: '134****8909'
		}
	};
	
	var refModelDetail = {
		code: rsp.success,
		message: '查询成功',
		body: {
			billsNo: 'NO.ZH909876678',
			stuName: '王明明',
			stuSex: '0',
			idCard: '210*********467110',
			result: '00',
			canPay: '01',
			payYear: '2016年',
			schoolName: '灵芝镇初级中学',
			className: '初二（3）班',
			payAmount: '100',
			mobile: '134****8909'
		}
	};
	
	return {
		getSchoolByKey: function(){return storeSchool;},
		getClassByKey: function(){return storeClass;},
		getResult: function(){return storeBill;},
		getDetail: function(){return modelDetail;},
		refreshDetail: function(){return refModelDetail;}
	};
});