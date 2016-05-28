'use strict';
angular.module('RstFrontH5')
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
$stateProvider
	.state('app.medicalRecord', {
		url: '/medicalRecord',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/healthHistory/hhIndex.html',
				controller: 'healHisController'
			}
		}
	})
	.state('app.medicalState', {
		url: '/medicalState',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/healthHistory/hhState.html',
				controller: 'hhStateController'
			}
		}
	})
	.state('app.medicalDetail', {
          url: '/medicalDetail/:visitNo',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/healthHistory/hhDetail.html',
              controller: 'hhDetailController'
          }
        }
      })
	.state('app.pillRecordDetail', {
	      url: '/pillRecordDetail/:billDetailNo',
	      cache: true,
	      views: {
	        'viewContent': {
	          templateUrl: 'templates/views/healthHistory/pillDetail.html',
	          controller: 'hhDetailController'
	      }
	    }
	  });
});