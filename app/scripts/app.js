'use strict';

/**
 * @ngdoc overview
 * @name RstFrontH5
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

var PSA = angular.module('RstFrontH5', ['ionic', 'ngCordova', 'ngResource', 'LocalStorageModule'])

.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // save to use plugins here
    });

    // add possible global event handlers here   

})

.config(function($httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    localStorageServiceProvider.setPrefix('rst');

    // Application routing
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/main.html',
            controller: 'MainController'
        })
        .state('app.debug', {
            url: '/debug',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/debug.html',
                    controller: 'DebugController'
                }
            }
        })
        .state('app.empty', {
            url: '/empty',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/empty.html',
                    controller: 'MainController'
                }
            }
        })
        .state('app.question', {
            url: '/question',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/userDoc/question.html',
                    controller: 'MainController'
                }
            }
        })
        .state('app.registerDoc', {
            url: '/registerDoc',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/userDoc/registerDoc.html',
                    controller: 'MainController'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/empty');

});