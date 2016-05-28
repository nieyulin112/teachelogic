'use strict';
angular.module('RstFrontH5').factory('familyDoctorFakeService', function(){
//	Token : 'dc5766f9-3e19-43e2-a21f-eca0f6293891',
	var rsp = {success:10000, fail:20000};
//	推荐医生
	var storeRecmd = {
		code: rsp.success,
		message: '',
		body: [
			{doctorCode: '001',name: '张三',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '002',name: '李四',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '003',name: '王五',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '004',name: '赵六',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '005',name: '孙七',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '006',name: '周八',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/female.png',sex:'F'},
			{doctorCode: '007',name: '张三',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '008',name: '李四',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '009',name: '王五',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '010',name: '赵六',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '011',name: '孙七',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '012',name: '周八',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/female.png',sex:'F'},
		]
	};
//	所有医生
	var storeAll = {
		code: rsp.success,
		message: '',
		body: [
			{doctorCode: '001',name: '黄奇芬1',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '002',name: '黄奇芬2',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/female.png',sex:'F'}, 
			{doctorCode: '003',name: '黄奇芬3',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '004',name: '张三',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '005',name: '李四',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'}, 
			{doctorCode: '006',name: '王五',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '007',name: '赵六',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '008',name: '孙七',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/male.png',sex:'M'},
			{doctorCode: '009',name: '周八',department:'全科',jobTitle: '主任医师',hospital: '厦门市中山医院',contractNum: 4500,slowNum: 580,portrait: 'images/female.png',sex:'F'}
		]
	};
//	区域
	var storeArea = {
		code: rsp.success,
		message: '',
		body: [
		    {regionCodeXM:1, content:'思明区'},
		    {regionCodeXM:2, content:'同安区'},
		    {regionCodeXM:3, content:'翔安区'},
		    {regionCodeXM:4, content:'集美区'},
		    {regionCodeXM:5, content:'海沧区'},
		    {regionCodeXM:6, content:'湖里区'}
		]
	};
//	区域内的医院
	var storeHospital = {
		code: rsp.success,
		message: '',
		body: [
			{hospitalCode:1, name:'第一医院', address:'人民路1号', population:(Math.floor(Math.random()*198+1))},
			{hospitalCode:2, name:'第二医院', address:'人民路2号', population:(Math.floor(Math.random()*198+1))},
			{hospitalCode:3, name:'第三医院', address:'人民路3号', population:(Math.floor(Math.random()*198+1))},
			{hospitalCode:4, name:'第四医院', address:'人民路4号', population:(Math.floor(Math.random()*198+1))},
			{hospitalCode:5, name:'第五医院', address:'人民路5号', population:(Math.floor(Math.random()*198+1))}
		]
	};
//	科室
	var storeSubject = {
		code: rsp.success,
		message: '',
		body: [
		    {departmentCode:1, departmentName:'心血管内科'},
		    {departmentCode:2, departmentName:'心胸外科'},
		    {departmentCode:3, departmentName:'神经内科'},
		    {departmentCode:4, departmentName:'肝胆外科'},
		    {departmentCode:5, departmentName:'肛肠外科'},
		    {departmentCode:6, departmentName:'肾内科'},
		    {departmentCode:7, departmentName:'儿科'},
		    {departmentCode:8, departmentName:'全科'},
		    {departmentCode:9, departmentName:'口腔科'},
		    {departmentCode:10, departmentName:'皮肤科'},
		    {departmentCode:11, departmentName:'妇科'},
		    {departmentCode:12, departmentName:'产科'}
	    ]
	};
//  医生详情
	var modelDoctor = {
		code: rsp.success,
		message: '',
		body: {
			doctorCode: '001',
			name: '黄奇芬6',
			department: '全科',
			portrait: 'images/female.png',
		    jobTitle: '主任医师',
		    hospital: '厦门市中山医院',
		    contractNum: 4500,
		    slowNum: 580,
		    intro: '对于处理胰腺、胆道疾病有丰富的临床经验，道疾病有丰富的临床经验道疾病有丰富的临床，经验道疾病有丰富的临床经验道疾病有丰富的临床经验，道疾病有丰富的临床经验道疾病有丰富的临床经验道疾病有丰富的临床经验，道疾病有丰富的临床经验。',
		    signDate: '2014-12-10',
		    signDays: 200,
		    lastDate: '2015-02-15',
		    selfNum: 15,
		    changeTimes: 0
		}
	};
	
	return {
		getRecmd: function(){return storeRecmd;},
		getAll: function(){return storeAll;},
		getArea: function(){return storeArea;},
		getHospital: function(area){return storeHospital;},
		getSubject: function(){return storeSubject;},
		getDoctor: function(){return modelDoctor;}
	};
});