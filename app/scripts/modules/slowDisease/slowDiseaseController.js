'use strict';
angular.module('RstFrontH5')
    .controller('SlowDiseaseController', ['$scope', '$state','$ionicPopup','$ionicScrollDelegate', '$ionicActionSheet', 'SlowDiseaseService', 'ApiService', function($scope, $state, $ionicPopup, $ionicScrollDelegate, $ionicActionSheet, SlowDiseaseService, ApiService) {
        
        $scope.isShowTips = false;
        $scope.isShowEmptyTips = true;
        $scope.initRadio = function() {
        		var diseaseName = document.getElementsByName("DiseaseName");
        		var DiseaseNamei = document.getElementsByName("DiseaseNamei");
        		for(var i=0;i <diseaseName.length;i++){
        			DiseaseNamei[i].style.visibility="hidden";
        			document.getElementById("DiseaseName"+0).checked = false;
        		}
        };
        //根据state判断当前页面决定加载数据
        if($state.current.name === 'app.project') {
            // 得到选择续方项目模块：续方项目数据 
            $scope.diseaseTypeList = SlowDiseaseService.getSlowDiseaseTypes();

            // 得到申请提交对象  用于存储已选择的疾病类型
            $scope.continuePillData = SlowDiseaseService.getContinuePillData();
			$scope.initRadio();
            // 得到选择药品模块的对象           
            $scope.pillListVO = {};

        }else if($state.current.name === 'app.pill') {
            // 得到申请提交对象
            $scope.continuePillData = SlowDiseaseService.getContinuePillData();
            // 得到选择药品模块的对象
            $scope.pillListVO = SlowDiseaseService.getPillListVO();
            if($scope.pillListVO){
            		$scope.isShowEmptyTips = false;
            		$scope.isShowTips = true;
            }else{
            		$scope.isShowEmptyTips = true;
            		$scope.isShowTips = false;
            }
            // 默认选择药品数量为零
            $scope.pillListVO.num = '0';
    
        }else if($state.current.name === 'app.projectApply') {
            // 得到申请提交对象  用于存储已选择的药品清单
            $scope.continuePillData = SlowDiseaseService.getContinuePillData();

            // 得到选择药品模块的对象
            $scope.pillListVO = SlowDiseaseService.getPillListVO();

            // 续方申请确认模块：服务条款对象
            $scope.agree = SlowDiseaseService.getAgree();

            // 得到续方申请确认模块：已选择的药品清单数据
            $scope.continuePillData.pillListCustom = SlowDiseaseService.getPillListCustom($scope.pillListVO);
			$scope.continuePillData.talkContent = '';
			setTimeout(function(){
				$ionicScrollDelegate.$getByHandle('pillScroll').resize();
			}, 1000);
        }else if($state.current.name === 'app.ill') {
            // 得到服务端返回对象数据   
            $scope.continuePillData = SlowDiseaseService.getContinuePillData();

            // 得到选择药品模块的对象
            $scope.pillListVO = SlowDiseaseService.getPillListVO();
        }

        // 返回首页方法
        $scope.backToHome = function(){
            // 返回首页前清除本次操作数据
            $scope.continuePillData.diseaseType = null;
            $scope.continuePillData.talkContent = '';
            $scope.pillListVO.num = '0';
            $scope.continuePillData.myBotton = true;

            ApiService.backToHome();
        };

		 // 续方申请模块：选择药品点击事件来判断下一步按钮的颜色
        
        
        // 续方申请模块：选择药品点击事件来判断下一步按钮的颜色
        $scope.myChooce = function(item,index) {
        		$scope.initRadio();
        		var DiseaseNamei = document.getElementsByName("DiseaseNamei");
        		//console.log(diseaseName);
        		DiseaseNamei[index].style.visibility="visible";
        		var checkDiseaseName = document.getElementById("DiseaseName"+index);
        		checkDiseaseName.checked = true;
            if($scope.continuePillData.myBotton){
                $scope.continuePillData.myBotton = false;
            }
            $scope.continuePillData.diseaseType = checkDiseaseName.value;
        };

        // 选择药品模块：增加药品数量点击事件
        $scope.add = function(item) {
        	if($scope.addPillType(item)){
            	$scope.nativeTip('您最多只能选择5种药物');
            }else {
            	if(item.amount < 99) {
	                item.amount++;
	                pillNum();
	            }
            }
        };

        // 选择药品模块：减少药品数量点击事件
        $scope.minus = function(item) {
        	if(item.amount > 0) {
                item.amount --;
                pillNum();
            }
        };

		$scope.addPillType = function(item){
        	var pillIDs = ',',
        		pillTypes = 0;
			$scope.pillListVO.pillList.forEach(function(nowItem) {
				if(nowItem.amount !== '0'){
	                pillIDs += nowItem.itemCoding+',';
	                pillTypes++;
	            }
            });
            return pillTypes===5 && pillIDs.indexOf(','+item.itemCoding+',')===-1;
		};

        // 该方法用于判断已选择药品种类数
        var pillNum = function() {
            var i = 0;
            $scope.pillListVO.pillList.forEach(function(item) {
                if(item.amount > 0) {
                    i++;
                }
            });
            $scope.pillListVO.num = i;
            // 根据药品种类数来判断下一步按钮的颜色
            if(i > 0){
                $scope.continuePillData.myBottonSecond = false;
            }else{
                $scope.continuePillData.myBottonSecond = true;
            }
        };

        // 选择续方项目模块：下一步点击事件 
        $scope.choosePill = function() {
            // 用于控制选择药品清单页面的下一步按钮的颜色
            if($scope.continuePillData.myBottonThird === true){
                $scope.continuePillData.myBottonSecond = true;
            }
            // 如果已经选择了病种类型才能够跳转到下一页
            if($scope.continuePillData.diseaseType > 0) {
                // 得到选择药品模块的对象
                $scope.pillListVO = SlowDiseaseService.getPillListVO();
                SlowDiseaseService.currentDisType = $scope.continuePillData;
                $state.go('app.pill');
            }
            
            $state.go('app.pill');
        };

		$scope.initPill = function(){
			$scope.pillListVO.pillList = [];
			// 得到选择药品模块：药品信息数据
			$scope.showHud();
            SlowDiseaseService.getPillList(SlowDiseaseService.currentDisType)
                .success(function(data) {  
                	$scope.hideHud();
                    if(data.body && data.body.length){
                        $scope.pillListVO.content = false;
                        $scope.pillListVO.pillList = data.body;
                        if($scope.pillListVO){
                        		 document.getElementById('showContentTips').style.display='block';
                        		 $scope.isShowEmptyTips = false;
            					 $scope.isShowTips = true;
                        }else{
                        		 $scope.isShowEmptyTips = true;
            					 $scope.isShowTips = false;
                        		 document.getElementById('showContentTips').style.display='none';
                        }
                        $scope.pillListVO.pillList.forEach(function(item) {
                            item.amount = '0';
                        });
                    }else {
                        $scope.pillListVO.content = true;
                        $scope.pillListVO.pillList = [];
                        $scope.isShowEmptyTips = true;
            				$scope.isShowTips = false;
                        	document.getElementById('showContentTips').style.display='none';
                    }
                })
                .error(function() {
                		$scope.hideHud();
                });
		};

        // 选择药品模块：下一步点击事件
        $scope.projectApply = function() {
            if($scope.pillListVO.num > 0) {
                $state.go('app.projectApply');
            }
        };
        $scope.showSubmitButton = function(){
    		var submitPill = document.getElementById('submitPill');
    		submitPill.style.display = 'block';
		//$state.go("app.projectApply");
    	}
        $scope.hidSubmitButton = function(){
    		var submitPill = document.getElementById('submitPill');
    		submitPill.style.display = 'none';
    	}

        // 续方申请确认模块：申请提交点击事件
        $scope.applySubmit = function() {
            if($scope.agree.value === true) {
                applyData(); 
            }else {
                warning();
                $state.go('app.projectApply');
            }
        };

        // 没有同意服务条款时点申请提交弹出的下拉框
        var warning = function() {
            $ionicActionSheet.show({
                buttons: [{ text: '<b>我同意</b>' }],
                titleText: '<b>请同意服务条款</b>',
                cancelText: '返回',
                cancel: function() {
                  // add cancel code..
                },
                buttonClicked: function() {
                    $scope.agree.value = true;
                    applyData();
                }
            });
        };

        // 续方申请确认模块：向服务端请求数据
        var applyData = function(){
            // 得到提交模块的返回数据
            $scope.showHud();
            SlowDiseaseService.applySubmit($scope.continuePillData, true)
                .success(function(data) {
                	$scope.hideHud();
                    if(!data.body){
                        data.body = {};
                    }
                    if(data.body.autoAssined === undefined){
                        data.body.autoAssined = '';
                    }
                    if(data.body.autoAssined === true || data.body.autoAssined === false){
                        $scope.continuePillData.autoAssined = data.body.autoAssined;
                        if(data.body.autoAssined){
                        	data.body.doctor.portrait = data.body.doctor.sex==='F' ? 'images/female.png' : 'images/male.png';
                            $scope.continuePillData.doctor = data.body.doctor;
                            if($scope.isMobile){
                            		$$.Native.setLocalData({name:'doctorCode', value:data.body.doctor.doctorCode});
                            }
                        }
                        $scope.continuePillData.result = true;
                        $state.go('app.ill');
                    }else {
                        //$scope.continuePillData.myBottonThird = true;
                        $scope.continuePillData.message = data.message;
                        $scope.nativeTip(data.message);
                        $scope.continuePillData.result = false;
                    }
            })
            .error(function() {
            	$scope.hideHud();
            });

            // 锚点
            $scope.listenH5Event('app_slowDisease_autoSign');
        };

        // 跳转到我的处方模块
        $scope.checkMyPrescription = function() {
            // 操作成功后清除本次操作数据
            $scope.continuePillData.diseaseType = null;
            $scope.continuePillData.talkContent = '';
            $scope.pillListVO.num = '0';
            $scope.continuePillData.myBotton = true;

            $state.go('app.myPrescription');
        };

        //点击向左滚动图片
        $scope.leftScroll = function() {
            var left = $ionicScrollDelegate.$getByHandle('pillScroll');       
            left.scrollBy(-110,0,true);
        };

        //点击向右滚动图片
        $scope.rightScroll = function() {
            var right = $ionicScrollDelegate.$getByHandle('pillScroll');
            right.scrollBy(110,0,true);
        };

    }]);