'use strict';

/**
 * @ngdoc function
 * @name RstFrontH5.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('RstFrontH5')
  // use factory for services
  .factory('ExampleService', function($http, $timeout, $q, ApiService) {

    var kindOfPrivateVariable = 42;

    var doSomethingAsync = function() {
      var deferred = $q.defer();
      $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
      return deferred.promise;
    };

    var fetchSomethingFromServer = function() {
      return $http({
          url: 'http://hipsterjesus.com/api',
          params: {
              paras: 2
          },
          method: 'GET'
        })
        .success(function(data) {
          console.log('fetched this stuff from server:', data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var testServiceRequest = function(){
        var data = {test: 'test data'};
        if (ApiService.isLocalEnv()){
          return ApiService.request('get', null, 'test');
        }
    };

    // public api
    return {
      doSomethingAsync: doSomethingAsync,
      fetchSomethingFromServer: fetchSomethingFromServer,
      testServiceRequest: testServiceRequest
    };

  });
