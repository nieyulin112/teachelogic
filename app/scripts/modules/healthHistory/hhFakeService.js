'use strict';
angular.module('RstFrontH5').factory('healHisFakeService', function(){
	var rsp = {success:10000, fail:20000, message:'查询成功'};
	
	var storeSift = {
		code: rsp.success,
		message: rsp.message,
		body: {
			modes: [
				{code:2, name:'门（急）诊'},
				{code:3, name:'住院'},
				{code:4, name:'购药'}
			],
			diseases: [
				{diseaseName:'感冒'},
				{diseaseName:'发烧'},
				{diseaseName:'慢性咽炎'}
			],
			years: ['2016年', '2015年', '2014年', '更多']
		}
	};
	
	var storeDisHis = {
		code: rsp.success,
		message: rsp.message,
		body: {
			records: [
				{visitNo:1, visitDate:'20150418', diseaseName:'喉咙发炎', hospitalName:'厦门市中山医院', visitType:'住院', visitAmount:'211'},
				{visitNo:2, visitDate:'20150417', diseaseName:'粉碎性骨折', hospitalName:'厦门市中山医院', visitType:'门诊', visitAmount:'1280'},
				{visitNo:3, visitDate:'20140516', diseaseName:'股骨颈骨骨折', hospitalName:'厦门市中山医院', visitType:'药店购药', visitAmount:'1255'},
				{visitNo:4, visitDate:'20140313', diseaseName:'原生性高血压', hospitalName:'厦门市中山医院', visitType:'住院', visitAmount:'356'}
			],
			expenses: {
				cash: 0,
				medical: 39742.62,
				total: 60928.9
			}
		}
	};
	
	var storeBloodPre = {
		code: rsp.success,
		message: rsp.message,
		body: [
			{id:1, dbp:75, sbp:110, bodyMass:70, heartRate:70, inputDate:'2015/02/04 09:24'},
			{id:2, dbp:85, sbp:135, bodyMass:71, heartRate:78, inputDate:'2015/02/02 12:09'},
			{id:3, dbp:73, sbp:112, bodyMass:72, heartRate:73, inputDate:'2015/02/01 09:24'},
			{id:4, dbp:72, sbp:123, bodyMass:71, heartRate:76, inputDate:'2015/01/31 09:24'},
			{id:5, dbp:82, sbp:130, bodyMass:70, heartRate:72, inputDate:'2015/01/30 09:24'}
		]
	};
	
	var modelDisHis = {
		code: rsp.success,
		message: rsp.message,
		body: {
			visitDate:'2015-05-11',
			hospitalName:'中医药大学附属曙光医院',
			deptName:'内科',
			doctorName: '张小玲',
			diseaseName:'原生性高血压',
			visitAmount:2000.00,
			//自付和基金
			selfPay: 800.00,
			fundPay:1200.00,
			data1:[
				{
					projectName: '阿司匹林1',
					sumNumber: 3,
					sumAmount:400.00,
					projectType:'药品',
					projectCode:'1',
					billDetailNo:'1'

				},{
					projectName: '阿司匹林2',
					sumNumber: 1,
					sumAmount:200.00,
					projectType:'药品',
					projectCode:'1',
					billDetailNo:'2'

				},{
					projectName: '阿司匹林3',
					sumNumber: 2,
					sumAmount:300.00,
					projectType:'药品',
					projectCode:'1',
					billDetailNo:'3'
				}
			],
			data2:[
				{
					projectName: 'CT',
					sumNumber: 3,
					sumAmount:101.00,
					projectType:'诊疗项目',
					projectCode:'2',
					billDetailNo:''
				},{
					projectName: 'B超',
					sumNumber: 3,
					sumAmount:101.00,
					projectType:'诊疗项目',
					projectCode:'2',
					billDetailNo:''
				}
			],
			data3:[
				{
					projectName: '检测试管',
					sumNumber: 4,
					sumAmount:101.00,
					projectType:'材料及服务项目',
					projectCode:'3',
					billDetailNo:''
				},{
					projectName: '检测试纸',
					sumNumber: 3,
					sumAmount:101.00,
					projectType:'材料及服务项目',
					projectCode:'3',
					billDetailNo:''
				},{
					projectName: '新电仪',
					sumNumber: 2,
					sumAmount:101.00,
					projectType:'材料及服务项目',
					projectCode:'3',
					billDetailNo:''
				},{
					projectName: '血压计',
					sumNumber: 1,
					sumAmount:101.00,
					projectType:'材料及服务项目',
					projectCode:'3',
					billDetailNo:''
				}
			]
		}
	};
	
	var modelPill = {
		code: rsp.success,
		message: rsp.message,
		body: {
			pillName: '阿司匹林1',
			type: '干粉1',
			specification: '101毫克',
			unit: '支',
			reimburseLevel:'A类',
			selfPay: '21%',
			medicalProgrem: '是',
			workInjuries: '否',
			nonPrescription: '否',
			companyName: '国药一心制药有限公司',
			invoice: '西药费',
			notes: '限两性用药',
			fileName:'夏卫基妇［2011］285号',
			billDetailNo:'1'
		}
	};

	return {
		getSift: function(){return storeSift;},
		getDisHis: function(){return storeDisHis;},
		getBloodPre: function(){return storeBloodPre;},
		getHisDetail: function(){return modelDisHis;},
		getPillDetail:function(){return modelPill;}
	};
});