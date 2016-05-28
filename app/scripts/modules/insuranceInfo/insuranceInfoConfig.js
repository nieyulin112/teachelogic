/*
 * author:nieyulin756
 * date:2015-11-15
 * 参保信息
 */
'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
      .state('app.insuranceInfo', {
          url: '/insuranceInfo',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/insuranceInfo/insuranceInfo.html',
              controller: 'insuranceInfoController'
            }
          }
      });
});