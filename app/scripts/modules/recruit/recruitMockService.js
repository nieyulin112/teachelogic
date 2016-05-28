'use strict';
PSA.factory('RecruitMockService', function() {

    var recArr = [
        // page 1
        {
            zenCode: '010',
            pageIdx: 0,
            pageNum: 1,
            body: [{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null },
        		{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null }]

        }
    ];

    function getRecruitDetail(pageNum) {

        console.log('PageNum:' + pageNum);
        
        return {
            code: '10000',
            message: '查询成功',
            //body: +pageNum > 0 ? recArr[+pageNum - 1] : {}
            body:recArr[0].body
        };
    }


    var rsp = { success: 10000, message: '查询成功' };

    var storeHot = {
        code: rsp.success,
        message: rsp.message,
        body: [{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null },
        		{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null }]
    };

    var storeDrug = {
        code: rsp.success,
        message: rsp.message,
        body: [{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null },
        		{ age: "22", 
        		companyAddr: "南京", 
        		companyName: "平安保险", 
        		companyNo: null, 
        		dataFrom: "人才市场", 
        		degree: "初中", 
        		degree2: null, 
        		endTime: "2016-03-15", 
        		insertTime: "2016-01-25 10:18:50", 
        		jobDescriptions: null, 
        		position: "销售", 
        		salary: "1000~1500", 
        		sex: "女", 
        		startTime: "2016-01-25", 
        		workKind: "全职", 
        		workYears: null }]
    };

    function getHot() {

    	return storeHot;
    };
    function getDrugByKey() {

    	return storeDrug;
    }
    return {
        getRecruitDetail: getRecruitDetail,
        getHot: getHot,
        getDrugByKey: getDrugByKey
    }
});