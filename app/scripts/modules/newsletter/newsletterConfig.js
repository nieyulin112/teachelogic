'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
      .state('app.informationBody', {
          url: '/informationBody?idNews',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/newsletter/informationBody.html',
                controller: 'InformationBodyController'
            }
          }
        })
      .state('app.newsletterPage', {
          url: '/newsletterPage/:menuType',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/newsletter/newsletterPage.html',
                controller: 'newsletterController'
            }
          }
        })
      .state('app.welcome', {
          url: '/welcome',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/newsletter/welcome.html',
                controller: 'WelcomeController'
            }
          }
       })
       .state('app.sunChief', {
          url: '/sunChief',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/newsletter/sunChief.html',
                controller: 'sunChiefController'
            }
          }
        })
        .state('app.sunChiefDetail', {
	        url: '/sunChiefDetail?idNews',
	        cache: true,
	        views: {
	          'viewContent': {
	            templateUrl: 'templates/views/newsletter/sunChiefDetail.html',
	              controller: 'sunChiefDetailController'
	          }
	        }
	      })
        .state('app.sunChiefSearch', {
          url: '/sunChiefSearch',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/newsletter/sunChiefSearch.html',
                controller: 'sunChiefSearchController'
            }
          }
        })
   });