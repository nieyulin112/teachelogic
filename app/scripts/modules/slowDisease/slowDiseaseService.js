'use strict';
angular.module('RstFrontH5').factory('SlowDiseaseService', function($window, $http, ApiService, SlowDiseaseFakeDataService) {

      // 定义选择药品模块：药品清单对象
      var pillListVO = {};

      // 定义选择续方项目模块：申请提交的对象
      var continuePillData = {
        myBotton:true,
        myBottonSecond:true,
        myBottonThird:true
      };

      // 默认同意服务条款
      var getAgree = function() {
          var agree = { value:true };
          return agree;
      };

      // 得到选择续方模块：病种类型数据
      var getSlowDiseaseTypes = function() {

          var slowDiseaseTypes = [
              { diseaseId: 1,
                diseaseType: '高血压'
            },{ diseaseId: 5,
                diseaseType: '糖尿病'
            },{ diseaseId: 2,
                diseaseType: '高血脂'
            },{ diseaseId: 3,
                diseaseType: '冠心病'
            },{ diseaseId: 4,
                diseaseType: '脑血管疾病'
            }];

          if(ApiService.isLocalEnv()) {
              return slowDiseaseTypes;
          }
          else {
              return slowDiseaseTypes;
          }      
      };

      // 得到选择药品模块：药品清单数据
      var getPillList = function(continuePillData, isNoHud) {

          if(ApiService.isLocalEnv()) {
              return ApiService.requestFake(SlowDiseaseFakeDataService.getPillList(),false,false,0);
          }else if(isNoHud){
          	    var param = {diseaseType : continuePillData.diseaseType};
              var url = '/security/continueAnagraph/listContinueAnagraphDrug.do';
              return ApiService.requestNoHud('get', url, param, true);
          }else {
              var param = {diseaseType : continuePillData.diseaseType};
              var url = '/security/continueAnagraph/listContinueAnagraphDrug.do';
              return ApiService.request('get', url, param, true);
          }           
      };

      // 得到续方申请确认模块：已选择药品清单数据
      var getPillListCustom = function(pillListVO) {

          var pillListCustom = [];

          if(pillListVO.pillList !== null) {
              pillListVO.pillList.forEach(function(item) {
                  if(item.amount > 0) {
                      pillListCustom.push(item);
                  }
              });
          }

          if(ApiService.isLocalEnv()) {
              return pillListCustom;
          }  
          else {
              return pillListCustom;
          }          
      };

      // 得到提交结果模块：医生对象数据
      var applySubmit = function(continuePillData, isNoHud) {

          if(ApiService.isLocalEnv()) {
              return ApiService.requestFake(SlowDiseaseFakeDataService.getDoctor(),false,false,0);
          }else if(isNoHud){
          	    var param = {
                  diseaseType: continuePillData.diseaseType,
                  drugDetail: JSON.stringify(continuePillData.pillListCustom),
                  talkContent: continuePillData.talkContent
              };
              var url = '/security/continueAnagraph/applyAnagraph.do';
              var str = JSON.stringify(param);

              return ApiService.requestNoHud('post', url, str, true);
          }else {
              var param = {
                  diseaseType: continuePillData.diseaseType,
                  drugDetail: JSON.stringify(continuePillData.pillListCustom),
                  talkContent: continuePillData.talkContent
              };
              var url = '/security/continueAnagraph/applyAnagraph.do';
              var str = JSON.stringify(param);

              return ApiService.request('post', url, str, true);
          }   
      };

      return {
          getPillListVO: function(){return pillListVO;},
          getAgree: function(){return getAgree();},
          applySubmit: function(continuePillData){return applySubmit(continuePillData);},
          getContinuePillData: function(){return continuePillData;},
          getSlowDiseaseTypes: function(){return getSlowDiseaseTypes();},
          getPillList: function(continuePillData) {return getPillList(continuePillData);},
          getPillListCustom: function(pillListVO) {return getPillListCustom(pillListVO);},
      };
  });