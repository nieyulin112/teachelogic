'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
      .state('app.myPrescription', {
        url: '/myPrescription',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myPrescription/myPrescription.html',
            controller: 'prescriptionController'
          }
        }
      })
      .state('app.prescriptionDetail', {
        url: '/prescriptionDetail/:anagraphCode/:anagraphStatus',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myPrescription/prescriptionDetail.html',
            controller: 'prescriptionController'
          }
        }
      })
      .state('app.prescriptionPillDetail', {
        url: '/prescriptionPillDetail/:itemId/:itemCode/:anagraphStatus',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myPrescription/prescriptionPillDetail.html',
            controller: 'prescriptionController'
          }
      
        }
      });
   });