'use strict';
angular.module('RstFrontH5')
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
$stateProvider
	.state('app.drugExpense', {
		url: '/drugExpense',
		cache: true,
		views: {
			viewContent: {
				templateUrl: 'templates/views/drugExpense/deList.html',
				controller: 'drugExpenseController'
			}
		}
	})
	.state('app.drugExpenseSearch', {
		url: '/drugExpenseSearch',
		cache: true,
		views: {
			viewContent: {
				templateUrl: 'templates/views/drugExpense/deSearch.html',
				controller: 'drugExpenseController'
			}
		}
	})
	.state('app.drugExpenseDetail', {
		url: '/drugExpenseDetail/:drugCode',
		cache: true,
		views: {
			viewContent: {
				templateUrl: 'templates/views/drugExpense/deDrug.html',
				controller: 'drugExpenseDetailController'
			}
		}
	});
});