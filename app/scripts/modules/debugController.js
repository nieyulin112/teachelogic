'use strict';

/**
 * @ngdoc function
 * @name RstFrontH5.controller:MainController
 * @description
 * # MainController
 */
angular.module('RstFrontH5')

  .controller('DebugController',['$scope','$state', '$rootScope', '$ionicConfig', '$ionicPopup','siConfig','ExampleService', 'ApiService', function($scope, $state, $rootScope, $ionicConfig, $ionicPopup,siConfig, ExampleService, ApiService) {
//$ionicConfig.views.transition('none');

    // do something with $scope
    //apiMode
    //console.log('statu',siConfig.statu);
    //$scope.disable;
    //$scope.devHttp;
    var apiMode = ApiService.getApiMode();
    $scope.settings = {}//.useFake;
    //$scope.settings.devHttp;
    if(apiMode ==='dev-fake'){

      $scope.settings.useFake = true;

    }
    if(apiMode =='dev-http'){

      $scope.settings.useFake = false;
      $scope.settings.devHttp = true;
    }
    if(apiMode == 'dev'){
      $scope.settings.useFake = false;
      $scope.settings.devHttp = false;
    }

    $scope.settings.endPoint = ApiService.getEndPoint();
    if(!$scope.settings.endPoint || $scope.settings.endPoint == ''){
      $scope.settings.endPoint = siConfig.serverName_dev;
    }

    var applySettings = function(){
        if($scope.settings.useFake){
          ApiService.setApiMode('dev-fake');
        }
        else if ($scope.settings.devHttp){
          ApiService.setApiMode('dev-http');
          ApiService.setEndPoint($scope.settings.endPoint);
        }
        else{
          ApiService.setApiMode('dev');
        }
        console.log(ApiService.getApiMode());
    }

    $scope.apply = function(){
        applySettings();
        ApiService.backToHome();
    }

    $scope.cancel=function(){
        ApiService.backToHome();
    }

    var showAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'debug',
        template: msg
      });
    };

    $scope.testNetwork = function(){
      applySettings();
        ApiService.request('get', '/security/familyDoctor/queryFamilyDoctor.do'
                          , {name:'', type:1, start:0, limit:7, zoneCode:'0432'})
        .success(function(data){
            showAlert('success:' + JSON.stringify(data));

        })
        .error(function(data){
            showAlert('error:' + JSON.stringify(data));
        });
    }
    //切换成
    // $scope.$watch('useFake',function(newValue,oldValue){

    //   if(newValue){
    //     $scope.settings.useFake = false;

    //     ApiService.setApiMode('dev-fake');
    //     console.log(ApiService.getApiMode());
    //   }
    //   else{
    //     $scope.settings.useFake = true;
    //     if($scope.settings.devHttp){
    //       ApiService.setApiMode('dev-http');
    //       console.log(ApiService.getApiMode());
    //     }

    //     else{
    //         ApiService.setApiMode('dev');
    //         console.log(ApiService.getApiMode());
    //     }  
    //   } 
    // });

    // // //切换成请求
    // $scope.$watch('devHttp',function(newValue,oldValue){

    //   if(newValue){
    //     ApiService.setApiMode('dev-http');
    //     console.log(ApiService.getApiMode());
    //   }
    //   else{
    //       ApiService.setApiMode('dev');
    //       console.log(ApiService.getApiMode());
    //   }

    // });

  }]);
