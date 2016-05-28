'use strict';
angular.module('RstFrontH5').factory('MightyTestService', function($window, ApiService) {
      
      var getTestData = function(param) {
        return ApiService.request('get', '/security/news/show.do', param, true);
      }

      return {
          getTestData : function(param){return getTestData(param);}
      };

  });