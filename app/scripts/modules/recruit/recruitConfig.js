'use strict';

PSA.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state(
            'app.recruit', 
            {
                url: '/recruit',
                cache: true,
                views: {
                    viewContent: {
                        templateUrl: 'templates/views/recruit/recruit.html',
                        controller : 'recruitController'
                    }
                }
            }
        )
        .state(
            'app.recruit_detail', 
            {
                url: '/recruit/detail/:recruit',
                cache: true,
                views: {
                    viewContent: {
                        templateUrl: 'templates/views/recruit/recruitDetail.html',
                        controller : 'recruitController'
                    }
                }
            }
        ).state('app.recruitSearch',{
            url:'/recruitSearch',
            cache: true,
            views: {
                viewContent: {
                    templateUrl: 'templates/views/recruit/recruitSearch.html',
                    controller : 'recruitController'
                }
            }
        });
});