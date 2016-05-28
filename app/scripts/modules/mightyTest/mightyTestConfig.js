'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.mightyTest', {
          url: '/mightyTest',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/mightyTest/clickTest.html',
                controller: 'MightyTestController'
            }
          }
        })
    })