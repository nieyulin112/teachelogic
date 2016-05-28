'use strict';
angular.module('RstFrontH5')
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('app.stuInsIndex', {
		url: '/stuInsIndex',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/index.html',
				controller: 'stuInsController'
			}
		}
	})
	.state('app.stuInsParent', {
		url: '/stuInsParent',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/parent.html',
				controller: 'stuInsController'
			}
		}
	})
	.state('app.stuInsChild', {
		url: '/stuInsChild',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/child.html',
				controller: 'stuChildController'
			}
		}
	}).state('app.stuInsChildParams', {
		url: '/stuInsChild/:goBackIndex',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/child.html',
				controller: 'stuChildController'
			}
		}
	})
	.state('app.stuInsSchool', {
		url: '/stuInsSchool',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/school.html',
				controller: 'stuSclController'
			}
		}
	})
	.state('app.stuInsClass', {
		url: '/stuInsClass',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/class.html',
				controller: 'stuClsController'
			}
		}
	})
	.state('app.stuInsResult', {
		url: '/stuInsResult',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/result.html',
				controller: 'stuRltController'
			}
		}
	})
	.state('app.stuInsDetail', {
		url: '/stuInsDetail',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/detail.html',
				controller: 'stuRltController'
			}
		}
	})
	.state('app.stuInsRefresh', {
		url: '/stuInsRefresh',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/refresh.html',
				controller: 'stuRefController'
			}
		}
	})
	.state('app.stuInsArticle', {
		url: '/stuInsArticle',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/article.html',
				controller: 'stuInsController'
			}
		}
	})
	.state('app.stuInsSuccess', {
		url: '/stuInsSuccess',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/success.html',
				controller: 'stuInsController'
			}
		}
	})
	.state('app.stuInsIntroduce', {
		url: '/stuInsIntroduce',
		cache: true,
		views: {
			'viewContent': {
				templateUrl: 'templates/views/stuInsurance/introduce.html',
				controller: 'stuInsController'
			}
		}
	});
});