/*
** author:nieyulin
** date:2015-11-06
** 账户查询
** fake data
*/
'use strict';
angular.module('RstFrontH5').factory('accountSearchFakeDataService', function() {

    var body = {
    "record" : [
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "正常月缴费到账划入",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "889816007",
        "date" : "2016\/02\/02",
        "amountInclude" : "94.18",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "正常月缴费到账划入",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "888306874",
        "date" : "2016\/01\/02",
        "amountInclude" : "94.18",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "个人账户年度结息",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "888260522",
        "date" : "2015\/12\/31",
        "amountInclude" : "2.70",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "医保消费",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "888153929",
        "date" : "2015\/12\/30",
        "amountInclude" : "0.00",
        "consumption" : "-49.20"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "正常月缴费到账划入",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "886660515",
        "date" : "2015\/12\/03",
        "amountInclude" : "94.18",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "医保消费",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "886261616",
        "date" : "2015\/11\/24",
        "amountInclude" : "0.00",
        "consumption" : "-64.50"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "正常月缴费到账划入",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "885176296",
        "date" : "2015\/11\/03",
        "amountInclude" : "94.18",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "医保消费",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "884422659",
        "date" : "2015\/10\/18",
        "amountInclude" : "0.00",
        "consumption" : "-138.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "正常月缴费到账划入",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "883885982",
        "date" : "2015\/10\/08",
        "amountInclude" : "94.18",
        "consumption" : "0.00"
      },
      {
        "personMoney" : "0.00",
        "personalaNo" : "0030496092",
        "includedType" : "医保消费",
        "companyMoney" : "0.00",
        "healthAdd" : "0.00",
        "paymentId" : "883186223",
        "date" : "2015\/09\/22",
        "amountInclude" : "0.00",
        "consumption" : "-82.50"
      }
    ],
    "account" : "00******92"
  }
    //账户查询
    var recordMoney = {
        
        account: '10******22', //社保卡号
        record:[
            {
                date:'2015-08-01',        //日期
                amountInclude: 5000.02, //划入金额
                personMoney: 200.00,  //个人缴纳
                companyMoney:300.02, //公司缴纳
                //healthAdd:3000,   //转入健康账户
                consumption:3000.00 //支出金额
                    
            },{
                date:'2015-07-29',
                amountInclude: 0, 
                personMoney: '',  
                companyMoney:'',  
                //healthAdd: 400 ,  
                consumption:0.00  
            },{
                date:'2015-07-15',
                amountInclude: 0, 
                personMoney: '',  
                companyMoney:'',  
                //healthAdd:0.00,
                consumption: 600 //支出金额
            },{
                date:'2015-06-29',
                amountInclude: 400, 
                personMoney: 200,  
                companyMoney:200,  
                //healthAdd:0.00,   
                consumption:0.00 
            },{
                date:'2015-05-23',
                amountInclude: 0.00, 
                personMoney: '',  
                companyMoney:'',  
                //healthAdd:0.00,
                consumption: 600 //支出金额
            },{
                date:'2015-04-29',
                amountInclude: '', 
                personMoney: '',  
                companyMoney:'',  
                //healthAdd:'',
                consumption: 600 //支出金额
            },{
                date:'2015-03-23',
                amountInclude: 400, 
                personMoney: 200,  
                companyMoney:200,  
                //healthAdd:0.00,   
                consumption:0.00 
            }]

    };
    

    var recordAccountMoney = {
        account: '10******22', 
        balance: 1000.02, //账户余额
        health:500,   //健康账户
        totalAdd: 5800.02,
        totalConsume:4800
    };
    //zoneCode
    //需要分页的数据
    var getRecordMoney = function() {
        return {code:'10000',message:'查询成功',body: body};
    };

    //获取账户查询的数据
    var getRecordAccountMoney = function(){
        return {code:'1000',message:'查询成功',body:recordAccountMoney}
    };


    return {
        getRecordMoney: getRecordMoney,

        getRecordAccountMoney:getRecordAccountMoney
    };

});