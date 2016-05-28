/*
 * author:nieyulin756
 * date:2015-11-17
 * 市民卡模块
 */
'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    //主副卡
     .state('app.citizenCard', {
        url: '/citizenCard',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/citizenCard/citizenCard.html',
            controller: 'citizenCardController'
          }
        }
        
     //卡申请流程
      }).state('app.citizenCardProcess',{
    	  url: '/citizenCardProcess',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/citizenCard/citizenCardProcess.html',
              controller: 'citizenCardController'
            }
          }
      //联机账户查询
      }).state('app.citizenAccount',{
    	url: '/citizenAccount/:id',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/citizenCard/citizenAccount.html',
            controller: 'citizenCardController'
          }
        }
      //附近网点
      }).state('app.citizenPoint',{
    	url: '/citizenPoint/:id',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/citizenCard/citizenPoint.html',
            controller: 'citizenCardController'
          }
        }
       //网点搜索
      }).state('app.citizenSearch',{
    	url: '/citizenSearch',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/citizenCard/citizenSearch.html',
            controller: 'citizenCardController'
          }
        }
      });
    });