'use strict';
angular.module('RstFrontH5').factory('paymentDetailFakeService', function(){
	var rsp = {success:10000, fail:20000, message:'查询成功'};
	var month ="0"+parseInt(Math.random()*10+1);
	var paytotal =parseInt(Math.random()*100000)+".00";
	var companyPaymentAmount=[];
	var personalPaymentAmount=[];
	var paymentAmount=[];
	for(var i=0;i<9;i++){
		companyPaymentAmount[i] = (parseInt(Math.random()*1000))+(".0"+i);
		personalPaymentAmount[i] =(parseInt(Math.random()*1000))+(".0"+i);
		paymentAmount[i] = parseFloat(companyPaymentAmount[i])+parseFloat(personalPaymentAmount[i]);
	}
	var paymentInfoByYearMonth = {
		code: rsp.success,
		message: rsp.message,
		body:{
				currentYear: '2015',
				currentMonth:month.substr(month.length-2),
				companySum:paytotal,
				personSum:paytotal,
				yearList:[{paymentYear:2015},{paymentYear:2010}],
				paymentList:[
					{id:1, paymentMonth:8,paymentBase:3843, insuranceType:'机关生育保险', arrivalStatus:'已到账', paymentAmount:paymentAmount[0], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[0], personalPaymentAmount:personalPaymentAmount[0]},
					{id:2, paymentMonth:7,paymentBase:3843, insuranceType:'养老保险7', arrivalStatus:'未到账', paymentAmount:paymentAmount[1], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[1], personalPaymentAmount:personalPaymentAmount[1]},
					{id:3, paymentMonth:6,paymentBase:3843, insuranceType:'养老保险6', arrivalStatus:'已到账', paymentAmount:paymentAmount[2], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[2], personalPaymentAmount:personalPaymentAmount[2]},
					{id:4, paymentMonth:5,paymentBase:3843, insuranceType:'养老保险5', arrivalStatus:'未到账', paymentAmount:paymentAmount[3], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[3], personalPaymentAmount:personalPaymentAmount[3]},
					{id:5, paymentMonth:4,paymentBase:3843, insuranceType:'养老保险4', arrivalStatus:'已到账', paymentAmount:paymentAmount[4], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[4], personalPaymentAmount:personalPaymentAmount[4]},
					{id:6, paymentMonth:3,paymentBase:3843, insuranceType:'养老保险3', arrivalStatus:'已到账', paymentAmount:paymentAmount[5], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[5], personalPaymentAmount:personalPaymentAmount[5]},
					{id:7, paymentMonth:2,paymentBase:3843, insuranceType:'养老保险2', arrivalStatus:'已到账', paymentAmount:paymentAmount[6], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[6], personalPaymentAmount:personalPaymentAmount[6]},
					{id:8, paymentMonth:1, paymentBase:3843,insuranceType:'大病医疗保险', arrivalStatus:'已到账', paymentAmount:paymentAmount[7], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[7], personalPaymentAmount:personalPaymentAmount[7]}
				]
			}
	};
	var paymentInfoByYearMonthSearch = {
		code: rsp.success,
		message: rsp.message,
		body:{
				currentYear: '2015',
				currentMonth:'05',
				companySum:paytotal,
				personSum:paytotal,
				yearList:[{paymentYear:2015},{payment:2010}],
				paymentList:[
					{id:1, paymentMonth:8, insuranceType:'机关生育保险', arrivalStatus:'已到账', paymentAmount:paymentAmount[0], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[0], personalPaymentAmount:personalPaymentAmount[0]},
					{id:2, paymentMonth:7, insuranceType:'养老保险7', arrivalStatus:'未到账', paymentAmount:paymentAmount[1], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[1], personalPaymentAmount:personalPaymentAmount[1]},
					{id:3, paymentMonth:6, insuranceType:'养老保险6', arrivalStatus:'未到账', paymentAmount:paymentAmount[2], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[2], personalPaymentAmount:personalPaymentAmount[2]},
					{id:4, paymentMonth:5, insuranceType:'养老保险5', arrivalStatus:'未到账', paymentAmount:paymentAmount[3], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[3], personalPaymentAmount:personalPaymentAmount[3]},
					{id:5, paymentMonth:4, insuranceType:'养老保险4', arrivalStatus:'未到账', paymentAmount:paymentAmount[4], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[4], personalPaymentAmount:personalPaymentAmount[4]},
					{id:6, paymentMonth:3, insuranceType:'养老保险3', arrivalStatus:'未到账', paymentAmount:paymentAmount[5], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[5], personalPaymentAmount:personalPaymentAmount[5]},
					{id:7, paymentMonth:2, insuranceType:'养老保险2', arrivalStatus:'未到账', paymentAmount:paymentAmount[6], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[6], personalPaymentAmount:personalPaymentAmount[6]},
					{id:8, paymentMonth:1, insuranceType:'大病医疗保险', arrivalStatus:'已到账', paymentAmount:paymentAmount[7], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[7], personalPaymentAmount:personalPaymentAmount[7]}
				]
			}
	};
	var insuranceOfPayByYear = {
		code: rsp.success,
		message: rsp.message,
		body:{
			companyPay:'3223',
			personPay:'324',
			insuranceYear:'2014',
			insuranceDetailList:[
			{id:1, paymentBase:2434,paymentMonth:12, arrivalStatus:'已到账', paymentAmount:paymentAmount[0], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[0], personalPaymentAmount:personalPaymentAmount[0]},
			{id:2, paymentBase:2434, paymentMonth:11, arrivalStatus:'未到账', paymentAmount:paymentAmount[1], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[1], personalPaymentAmount:personalPaymentAmount[1]},
			{id:3, paymentBase:2434,paymentMonth:10, arrivalStatus:'已到账', paymentAmount:paymentAmount[2], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[2], personalPaymentAmount:personalPaymentAmount[2]},
			{id:1, paymentBase:2434,paymentMonth:8, arrivalStatus:'已到账', paymentAmount:paymentAmount[0], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[0], personalPaymentAmount:personalPaymentAmount[0]},
			{id:2, paymentBase:2434,paymentMonth:6, arrivalStatus:'未到账', paymentAmount:paymentAmount[1], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[1], personalPaymentAmount:personalPaymentAmount[1]},
			{id:3, paymentBase:2434,paymentMonth:5, arrivalStatus:'已到账', paymentAmount:paymentAmount[2], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[2], personalPaymentAmount:personalPaymentAmount[2]},
			{id:1, paymentBase:2434,paymentMonth:4, arrivalStatus:'已到账', paymentAmount:paymentAmount[0], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[0], personalPaymentAmount:personalPaymentAmount[0]},
			{id:2, paymentBase:2434,paymentMonth:3, arrivalStatus:'未到账', paymentAmount:paymentAmount[1], paymentStatus:'补缴', companyPaymentAmount:companyPaymentAmount[1], personalPaymentAmount:personalPaymentAmount[1]},
			{id:3, paymentBase:2434,paymentMonth:1, arrivalStatus:'已到账', paymentAmount:paymentAmount[2], paymentStatus:'正常缴纳', companyPaymentAmount:companyPaymentAmount[2], personalPaymentAmount:personalPaymentAmount[2]}
		]}
	};
	
	return {
		getPaymentInfoByYearMonthSearch: function(){return paymentInfoByYearMonthSearch},
		getPaymentInfoByYearMonth: function(){return paymentInfoByYearMonth},
		getInsuranceOfPayByYear: function(){return insuranceOfPayByYear;}
	};
});