'use strict';

PSA.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state(
            'app.sunshine', 
            {
                url: '/sunshine',
                cache: true,
                views: {
                    viewContent: {
                        templateUrl: 'templates/views/sunshine/sunshine.html',
                        controller : 'sunshineController'
                    }
                }
            }
        )
        .state(
            'app.sunshine_jobs', 
            {
                url: '/sunshine/jobs',
                cache: false,
                views: {
                    viewContent: {
                        templateUrl: 'templates/views/sunshine/jobs.html',
                        controller : 'sunshineController'
                    }
                }
            }
        )
        .state(
            'app.sunshine_detail', 
            {
                url: '/sunshine/jobs/detail',
                cache: false,
                views: {
                    viewContent: {
                        templateUrl: 'templates/views/sunshine/jobsDetail.html',
                        controller : 'sunshineController'
                    }
                }
            }
        );
});