'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
//   .state('app.familyDoctor', {
//      url: '/familyDoctor',
//      cache: true,
//      views: {
//        'viewContent': {
//          templateUrl: 'templates/views/familyDoctor/familyDoctor.html',
//          controller: 'familyDoctorController'
//        }
//      }
//    })
.state('app.familyDoctor', {
        url: '/familyDoctor:doctorCode',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/familyDoctor/familyDoctor.html',
            controller: 'familyDoctorController'
          }
        }
      })
      .state('app.doctorDetail', {
        url: '/doctorDetail/:doctorCode/:timeIndex',
        cache: false,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/familyDoctor/doctorDetail.html',
            controller: 'doctorDetailController',
          }
        }
      })
      .state('app.signSuccess', {
        url: '/signSuccess?autoSign/:actCode',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/familyDoctor/signSuccess.html',
            controller: 'signSuccessController'
          }
        }
      })
      .state('app.search', {
        url: '/search/:doctorCode',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/familyDoctor/search.html',
            controller: 'searchController'
          }
        }
      });
    });