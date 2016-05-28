'use strict';
angular.module('RstFrontH5').factory('injuryCmptFakeService', function(){
	var rsp = {success:10000, message:'查询成功'};
	
	var storeInjury = {
		code: rsp.success,
		message: rsp.message,
		body: [
			{
				occurDate: '2015-12-22',  // 工伤报案时间
				comName: '华为',  // 企业名称
				applyDate: '2015-12-23',  // 工伤认定申请时间
				responseDate: '2015-12-24',  // 工伤认定批复时间
				response: '认定为工伤',  // 工伤认定批复结果
				sumFee: '332.2',  // 工伤医疗费用总额
				reimburseFee: '222.2',  // 工伤医疗报销金额
				isPay: '是',  // 医疗费用支付标记
				grade: 'A',  // 工伤认定等级
				finalFee: '232.4',  // 核定金额
				remark: '正确',  // 核定金额备注
				isFinalPay: '是'  // 核定金额支付标记
			},
			{
			  	"compensationId": "28D27F9003A85DFAE0531480140A726B",
	            "occurDate": "2002-08-26",
	            "comName": "qqq",
	            "applyDate": "2002-08-26",
	            "responseDate": "2002-08-26",
	            "response": "认定为工伤",
	            "sumFee": null,
	            "reimburseFee": null,
	            "isPay": "",
	            "grade": "A",
	            "finalFee": 232.4,
	            "remark": "(一次性伤残补助金: 300003 : 1728.0 * 7.0 = 12096.0 ; )(一次性医疗补助金:  309961 : 3340.6 * 2.0 = 6681.0 ; )",
	            "isFinalPay": "oooo",
	            "details": [
	                {
	                    "first": "一次性伤残补助金",
	                    "second": "12096.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                }
	            ]
			},
			{
			  	"compensationId": "28D27F9003A85DFAE0531480140A726B",
	            "occurDate": "2002-08-26",
	            "comName": "qqq",
	            "applyDate": "2002-08-26",
	            "responseDate": "2002-08-26",
	            "response": "工伤",
	            "sumFee": 0,
	            "reimburseFee": 222.2,
	            "isPay": "呵呵",
	            "grade": "a",
	            "finalFee": 232.4,
	            "remark": "(一次性伤残补助金: 300003 : 1728.0 * 7.0 = 12096.0 ; )(一次性医疗补助金:  309961 : 3340.6 * 2.0 = 6681.0 ; )",
	            "isFinalPay": "",
	            "details": [
	                
	            ]
			},
			{
	            "compensationId": "28D27F9003A95DFAE0531480140A726B",
	            "occurDate": "2002-08-26",
	            "comName": "qqq",
	            "applyDate": "2012-08-26",
	            "responseDate": "2002-08-26",
	            "response": "不认定为工伤",
	            "sumFee": 332.2,
	            "reimburseFee": 222.2,
	            "isPay": "呵呵",
	            "grade": "A",
	            "finalFee": 232.4,
	            "remark": "(一次性伤残补助金: 300003 : 1728.0 * 7.0 = 12096.0 ; )(一次性医疗补助金:  309961 : 3340.6 * 2.0 = 6681.0 ; )",
	            "isFinalPay": "....",
	            "details": [
	                {
	                    "first": "一次性伤残补助金",
	                    "second": "12096.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                }
	            ]
	        },
	        {
	            "compensationId": "28D27F9003A95DFAE0531480140A726B",
	            "occurDate": "2002-08-26",
	            "comName": "qqq",
	            "applyDate": "2012-08-26",
	            "responseDate": "2002-08-26",
	            "response": "ewww",
	            "sumFee": 232,
	            "reimburseFee": 222.2,
	            "isPay": "",
	            "grade": "A",
	            "finalFee": 232.4,
	            "remark": "(一次性伤残补助金: 300003 : 1728.0 * 7.0 = 12096.0 ; )(一次性医疗补助金:  309961 : 3340.6 * 2.0 = 6681.0 ; )",
	            "isFinalPay": "",
	            "details": [
	                {
	                    "first": "一次性伤残补助金",
	                    "second": "12096.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                }
	            ]
	        },
	        {
	            "compensationId": "28D27F9003A95DFAE0531480140A726B",
	            "occurDate": "2002-08-26",
	            "comName": "qqq",
	            "applyDate": "2012-08-26",
	            "responseDate": "2002-08-26",
	            "response": "",
	            "sumFee": 232,
	            "reimburseFee": 222.2,
	            "isPay": "",
	            "grade": "A",
	            "finalFee": 232.4,
	            "remark": "(一次性伤残补助金: 300003 : 1728.0 * 7.0 = 12096.0 ; )(一次性医疗补助金:  309961 : 3340.6 * 2.0 = 6681.0 ; )",
	            "isFinalPay": "",
	            "details": [
	                {
	                    "first": "一次性伤残补助金",
	                    "second": "12096.0"
	                },
	                {
	                    "first": "一次性医疗补助金",
	                    "second": "6681.0"
	                }
	            ]
	        }
//			{
//				occurDate: '',
//				comName: '',
//				applyDate: '',
//				responseDate: '',
//				response: '',
//				sumFee: '',
//				reimburseFee: '',
//				isPay: '',
//				grade: '',
//				finalFee: '',
//				remark: '',
//				isFinalPay: ''
//			},
		]
	};
	
	return {
		getInjuryList: function(){return storeInjury;},
	};
});