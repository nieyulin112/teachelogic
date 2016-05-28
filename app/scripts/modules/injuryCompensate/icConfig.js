'use strict';
angular.module('RstFrontH5')
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
$stateProvider
	.state('app.injuryCmpt', {
		url: '/injuryCmpt',
		cache: true,
		views: {
			viewContent: {
				templateUrl: 'templates/views/injuryCompensate/icList.html',
				controller: 'injuryCmptController'
			}
		}
	})
	.state('app.injuryCmptDetail', {
		url: '/injuryCmptDetail/:icCode',
		cache: true,
		views: {
			viewContent: {
				templateUrl: 'templates/views/injuryCompensate/icDetail.html',
				controller: 'injuryCmptController'
			}
		}
	});
});