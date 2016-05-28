'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
      .state('app.ill', {
          url: '/ill',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/slowDisease/sd_ill.html',
              controller: 'SlowDiseaseController'
            }
        }
      }).state('app.project', {
          url: '/project',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/slowDisease/sd_project.html',
              controller: 'SlowDiseaseController'
            }
        }
      }).state('app.pill', {
          url: '/pill',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/slowDisease/sd_pill.html',
              controller: 'SlowDiseaseController'
            }
        }
      }).state('app.projectApply', {
          url: '/projectApply',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/slowDisease/sd_projectApply.html',
              controller: 'SlowDiseaseController'
            }
          }
      });
});