'use strict';
angular.module('RstFrontH5')
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
$stateProvider
	.state('app.paymentDetail', {
		url: '/paymentDetail',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/paymentDetail/paymentDetail.html',
				controller: 'paymentDetailController'
			}
		}
	}).state('app.insuranceDetail', {
		url: '/insuranceDetail/:latestYear/:earliestYear/:insuranceType/:selectedPaymentYear',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/paymentDetail/insuranceDetail.html',
				controller: 'paymentDetailController'
			}
		}
	});
});