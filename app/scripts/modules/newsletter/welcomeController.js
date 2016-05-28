'use strict';
angular.module('RstFrontH5')
.controller('WelcomeController',['$scope', '$state', '$stateParams', 'NewsLetterService', 
function($scope, $state) {
 	//跳转  
    $scope.jump = function(menuType) {
    	$state.go('app.newsletterPage', {menuType: menuType});
    };
}]
);