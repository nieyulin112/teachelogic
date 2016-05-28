/*
 * author:nieyulin756
 * date:2015-11-15
 * 参保信息
 */
'use strict';

angular.module('RstFrontH5')
	.factory('insuranceInfoFakeService', function() {

		var insuranceInfoData = {
			image: 'images/per_male.png',
			NAME: '黄晓明',
			SEX: '男',
			AGE: '45',
			IDCARD: '36252***********12',
			record: [{
				insuranceType:'机关工伤',
				paymentUnit: '厦门市人力资源和社会保障局',
				insuranceStatus: '参保',
				baseNumber: 333370
			},{
				insuranceType:'机关工伤',
				paymentUnit: '厦门市人力资源和社会保障局',
				insuranceStatus: '过保',
				baseNumber: 333370
			}] 
		};

		var getInsuranceInfoData = function() {

			return {code:'10000',message:'查询成功', body:insuranceInfoData};
		};

		return {
			getInsuranceInfoData:getInsuranceInfoData
		};
});