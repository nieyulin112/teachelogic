/*
** author:nieyulin
** date:2015-11-06
** 账户查询
** 路由配置
*/
'use strict';
angular.module('RstFrontH5')
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.accountSearch', {
          url: '/accountSearch',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/accountSearch/account.html',
              controller: 'accountSearchController'
            }
        }
      });
});