'use strict';



PSA.controller('injuryCmptController',[
	'$scope', 
	'$state', 
	'$ionicScrollDelegate', 
	'injuryCmptService', 
	'ApiService', 
	function(
		$scope, 
		$state, 
		$ionicScrollDelegate, 
		ics, 
		as
	) {
	
		$scope.initInjuryCmpt = function () {
			$scope.getList(1);
		};
		
		$scope.initInjuryDetail = function () {
			$scope.modelInjury = ics.currentItem || JSON.parse(localStorage.getItem('INJURY_DETAIL'));
			initShowDetail($scope.modelInjury);
		};
		
		$scope.getList = function (pageNum) {
			if($scope.isFetching) return;
			$scope.isFetching = true;
			$scope.isEmpty = false;
			var param = {pageNum:pageNum};
			ics.getInjuryList(param, true)
				.success(function(rsp){
					$scope.callBackGetList(rsp, param);
				})
				.error($scope.errorCallBack);
		};
		
		$scope.getDetail = function (icCode) {
			var param = {icCode:icCode};
			ics.getInjuryDetail(param)
				.success(function(rsp){
					if(rsp && rsp.code === $scope.rspState.success){
						$scope.modelInjury = rsp.body || {};
					}
				})
				.error($scope.errorCallBack);
		};
		
		$scope.callBackGetList = function (rsp, param) {
			if(rsp && rsp.code === $scope.rspState.success){
				var body = rsp.body || [];
				if(body.length){
					for(var i in body){
						var item = body[i];
//						item.injName = item.occurDate+'工伤（'+item.comName+'）';
						item.injName = '工伤'+item.compensationId;
					}
				}
				if(param.pageNum === 1){
					if(body.length){
						$scope.storeInjury = body;
					}else {
						$scope.storeInjury = [];
						$scope.isEmpty = true;
					}
				}else {
					$scope.storeInjury = $scope.storeInjury.concat().concat(body);
				}
				$scope.injuryMore = body.length >= param.limit;
				$scope.injuryPageNum = ++param.pageNum;
			}else {
				$scope.injuryMore = false;
			}
			$scope.defaultCallBack();
		};
		
		$scope.defaultCallBack = function () {
			$scope.isFetching = false;
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};
		
		$scope.errorCallBack = function () {
			$scope.injuryMore = false;
			$scope.isFetching = false;
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};
		
		$scope.goDetail = function (item) {
			localStorage.setItem('INJURY_DETAIL', JSON.stringify(item));
			// ics.currentItem = item;
			$state.go('app.injuryCmptDetail', {icCode:item.injuryId});
		};

		function initShowDetail (item) {
			
			if (!item) return;
			// 数据模型
			var steps = {
				step1_apply: {
					style: '',
					dot  : !item.response ? 1 : 2 
				},
				step2_approve: {
					style: '',
					dot  : '' 
				},
				step3_count: {
					style: '',
					dot  : ''
				},
				step4_pay: {
					style: '',
					dot  : ''
				},
				step5_level: {
					style: '',
					dot  : ''
				},
				step6_check: {
					style: '',
					dot  : ''
				},
				step7_checkPay: {
					style: '',
					dot  : ''
				}
			}

			setSteps(steps, item);

		}
		/**
		dot 标注
		0 none  灰色
		1 进行中 橙色
		2 已结束 绿色
		*/
		function setSteps (steps, item) {
				
			if (!item.response) {
				for (var prop in steps) {
					steps[prop]['style'] = 'white';
					steps[prop]['dot'] = 0;
				}
				steps.step1_apply.style = '';
				steps.step1_apply.dot = 1; // curr 工伤认定申请
				
				$scope.steps = steps; // 重新绑定
				
				return;
			} 

			steps.step1_apply.style = '';
			steps.step1_apply.dot = 2;

			if (item.response === '认定为工伤' || item.response === '工伤') {
				
				switch (true) {
					// 完成全流程
					case !!item.isFinalPay: // 费用总额 与 核定费用支付
						for (var prop in steps) {
							steps[prop]['style'] = '';
							steps[prop]['dot'] = 2;
						}

						if (+item.sumFee <= 0) {
							steps.step3_count.style = 'grey';
							steps.step3_count.dot = 0;
						}

						if (!item.isPay) {
							steps.step4_pay.style = 'grey';
							steps.step4_pay.dot = 0;
						}

						break;
					// 已批复 未有任何结果
					case !item.grade && +item.sumFee < 0:
						
						steps.step2_approve.style = '';
						steps.step2_approve.dot = 1; // curr 批复
						steps.step3_count.style = 'grey';
						steps.step3_count.dot = 0;
						steps.step4_pay.style = 'grey';
						steps.step4_pay.dot = 0;
						steps.step5_level.style = 'white';
						steps.step5_level.dot = 0;
						steps.step6_check.style = 'white';
						steps.step6_check.dot = 0;
						steps.step7_checkPay.style = 'white';
						steps.step7_checkPay.dot = 0;
						
						break;
					
					default:
						
						if (item.grade && (item.details && item.details.length <= 0)) {
							for (var prop in steps) {
								steps[prop]['style'] = '';
								steps[prop]['dot'] = 2;
							}
							steps.step5_level.style = '';
							steps.step5_level.dot = 1;
							steps.step6_check.style = 'white';
							steps.step6_check.dot = 0;
							steps.step7_checkPay.style = 'white';
							steps.step7_checkPay.dot = 0;

						}

						if (item.details && item.details.length > 0 && !item.isFinalPay) {
							for (var prop in steps) {
								steps[prop]['style'] = '';
								steps[prop]['dot'] = 2;
							}
							steps.step6_check.style = '';
							steps.step6_check.dot = 1;
							steps.step7_checkPay.style = 'white';
							steps.step7_checkPay.dot = 0;

						}
				}
			
			} else {

				switch (true) {
					
					case item.sumFee < 0: // 
						steps.step2_approve.style = '';
						steps.step2_approve.dot = 1; // curr 批复
						steps.step3_count.style = 'white';
						steps.step3_count.dot = 0;
						steps.step4_pay.style = 'white';
						steps.step4_pay.dot = 0;
						break;
					
					case item.sumFee >= 0 && !item.isPay:
						steps.step2_approve.style = '';
						steps.step2_approve.dot = 2;
						steps.step3_count.style = '';
						steps.step3_count.dot = 1;
						steps.step4_pay.style = 'white';
						steps.step4_pay.dot = 0;
						break;
					
					default:
						steps.step2_approve.style = '';
						steps.step2_approve.dot = 2;
						steps.step3_count.style = '';
						steps.step3_count.dot = 2;
						steps.step4_pay.style = '';
						steps.step4_pay.dot = 2;

				}

				steps.step5_level.style = 'grey';
				steps.step5_level.dot = 0;
				steps.step6_check.style = 'grey';
				steps.step6_check.dot = 0;
				steps.step7_checkPay.style = 'grey';
				steps.step7_checkPay.dot = 0;
			}

			$scope.steps = steps;
		}
		
		$scope.listenH5Event('app_injuryCmpt');
	}
]);