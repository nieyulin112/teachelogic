'use strict';
angular.module('RstFrontH5')
.controller('MightyTestController',['$scope', '$state', '$stateParams', 'MightyTestService', 
function($scope, $state, $stateParams, MightyTestService) {
    //初始化所有属性为空
    $scope.testData = {
    	address :'',
    	content :'',
    	dateTime:'',
    	title:''
    } 
    $scope.getMessage = function(){
    	var param = {
        // zoneCode : '0592',
    		id:'23C8C829823F53BDE0531480140AE0DE'
    	}
    	MightyTestService.getTestData(param)
    	.success(function(data){
                  $scope.testData = {
                  	address : data.body.address,
                  	content : data.body.content,
                  	dateTime : data.body.dateTime,
                  	title : data.body.title
                  }
                })
                .error(function(data){
                  console.log("in error main");
                  alert('in error httprequest');
                });
    }
}]
);