'use strict';
// 招聘公示列表
PSA.controller('sunshineController', [
	'$scope',
	'$state', 
	'$stateParams',
	'$ionicScrollDelegate',
	// 'CommonUtility', 
	'SunshineService', 
	'ApiService',
	function (
		$scope,
		$state,
		$stateParams,
		$ionicScrollDelegate,
		// cUtil,
		service,
		apiService
	) { 

		$scope.pageNo = 1; // 首页
		$scope.sunList = []; //

		$scope.jobs = []; 
		$scope.jobsFlag = false; // 判断jobs subheader展示 
		$scope.jobsHeader = '';
		$scope.currJobsID = -1;  // 为jobs的ID || 为子jobs的ID

		$scope.arts = []; // 文章列表
		$scope.arc = {}; // 文章详情
		$scope.arc.contentData = {}; // 分类查看

		$scope.scrollFlag = true; // 自动发起分页请求
		$scope.isScrolling = false;

		$scope.isEnough = true; // 没有更多了

		$scope.ARC_SUB_DETAILS = [
			{
				itemID   : 0,
				itemName : '基本情况',
				isActive : true,
				isDisplay: true
			}, {
				itemID   : 1,
				itemName : '设定依据',
				isActive : false,
				isDisplay: false
			}, {
				itemID   : 2,
				itemName : '申请材料',
				isActive : false,
				isDisplay: false
			}, {
				itemID   : 3,
				itemName : '办理流程',
				isActive : false,
				isDisplay: false
			}
		];

		$scope.jobServiceFlag = false; // 接口熔断Flag


		$scope.initSunshine = function () {
			getSunshine();
		}

		$scope.initJobs = function () {

			var jobs = JSON.parse(localStorage.getItem('SUNSHINE_JOBS'));
			console.log(jobs);
			$scope.jobsHeader = jobs && jobs['root']['second'];
			$scope.jobs = jobs.children.length > 0 ?  jobs.children : jobs;
			
			// 判断是否是当前jobs
			if ($scope.jobs.length > 0) {
				$scope.currJobsID = $scope.jobs[0]['root']['first'];
				$scope.jobs[0].isActive = true; // 点亮
				$scope.jobsFlag = true;
			} else {
				$scope.currJobsID = jobs['root']['first'];
				$scope.jobsFlag = false;
			}

			$scope.pageNo = 1;
			$scope.arts = [];
			$scope.scrollFlag = true;

			getJobsByPage($scope.pageNo, $scope.currJobsID);
		}

		$scope.initJobsDetail = function () {
			var jobsDetail = JSON.parse(localStorage.getItem('JOBS_DETAIL'));
			$scope.arc = jobsDetail || {};
			
			hideEmptyLayer();

			console.log($scope.arc);
			initArcData ($scope.arc);
		}

		$scope.jumpJobsHandler = function (item) {
			localStorage.setItem('SUNSHINE_JOBS', JSON.stringify(item));
			$state.go('app.sunshine_jobs');
		}
	
		$scope.activeJobsHandler = function (currJobs) {
			var idx = 0, len = $scope.jobs.length;

			if (currJobs) {

				for (; idx < len; idx++) {
					$scope.jobs[idx]['isActive'] = false;
				}

				currJobs.isActive = true;
				// Page置顶
				$ionicScrollDelegate.$getByHandle('job_scroll').scrollTop();
				
				$scope.currJobsID = currJobs['root']['first'];
				$scope.pageNo = 1;
				$scope.arts = [];
				$scope.scrollFlag = true;

				getJobsByPage($scope.pageNo, $scope.currJobsID);

			}
		}

		$scope.activeArcHandler = function (currItem) {
			// console.log(currItem);
			if (!currItem) return
			
			hideActive($scope.ARC_SUB_DETAILS);
			hideDetail($scope.ARC_SUB_DETAILS);

			currItem.isActive = true;
			currItem.isDisplay = true;
			
			hideEmptyLayer();
			showEmptyCtrl(+currItem.itemID);
//			 if (currItem.itemID !== 0) showEmptyLayer();

			
			console.log(currItem);
		}

		$scope.onScrollHandler = function (pageNo) {
			
			if (pageNo < 0) return;		
			console.log('pageNo:' + pageNo)
			// console.log($ionicScrollDelegate.$getByHandle('job_scroll').getScrollPosition());	
			getJobsByPage(pageNo, $scope.currJobsID, true);
		}

		/**
		 * Page jump include params
		 */
		$scope.jumpToDetail = function (item) {
			
			localStorage.setItem('RECRUIT_DETAIL', JSON.stringify(item));
			$state.go("app.recruit_detail");

			localStorage.setItem('JOBS_DETAIL', JSON.stringify(item));
			$state.go("app.sunshine_detail");
		}

		function showEmptyCtrl (currItemID) {
			if (currItemID < 1) return;
			console.log($scope.arc);
			switch (currItemID) {
				case 1: 
					if (!$scope.arc.basis) showEmptyLayer();
					break;
				case 2: 
					if (!$scope.arc.applyData) showEmptyLayer();
					break;
				case 3: 
					if (!$scope.arc.procedures) showEmptyLayer();
					break;
			}
		}

		function showEmptyLayer (content, className) {
			$scope.eptCont = content || '暂无数据';
			$scope.eptCls = className;
			$scope.isEmpty = true;
		}

		function hideEmptyLayer () {
			$scope.isEmpty = false;
		}

		/**
		 * [getJobsByPage 分页获取Jobs对应的文章列表]
		 * @param  {Number}  pageNo     页码
		 * @param  {String}  currJobsID 暂时未传递参数
		 * @param  {Boolean} scrollFlag 继续下滑
		 */
		function getJobsByPage (pageNo, currJobsID, scrollFlag) {
			
			// if ($scope.jobServiceFlag) return;
			if (pageNo < 1) return;
			console.log(111);
			// $scope.jobServiceFlag = true;

			service
				.getJobsDetail({
					pageNo: pageNo,
					rootID: currJobsID
				})
				.success(function (data) {
					hideEmptyLayer();
					data = data || {};
					
					if (data.body && data.body.length > 0) {
						$scope.arts = $scope.arts.concat(data.body);;
						$scope.pageNo = pageNo;
					} else {
						$scope.scrollFlag = scrollFlag && false;
						$scope.arts.length <= 0 && showEmptyLayer();
					}

					if (scrollFlag) {
						$scope.isScrolling = false;
						$ionicScrollDelegate.$getByHandle('job_scroll').resize();
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}

					// $scope.jobServiceFlag = false;
					
				})
				.error(function () {
					showEmptyLayer();
					// $scope.jobServiceFlag = false;
					$scope.scrollFlag = false;
					$scope.isScrolling = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}

		/**
		 * [initArcData 整理事项详情数据]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		function initArcData (data) {
							
			$scope.arc.contentData = {
				arr_0: [
					{
						key   : '事项编码',
						value : $scope.arc['affairCode'] || '',
						isLeft: false
					}, {
						key   : '服务对象',
						value : $scope.arc['serviceObject'] || '',
						isLeft: $scope.arc['serviceObject'] && $scope.arc['serviceObject'].length > 14 ? true : false
					}, {
						key   : '受理部门',
						value : $scope.arc['acceptDeptName'] || '',
						isLeft: $scope.arc['acceptDeptName'] && $scope.arc['acceptDeptName'].length > 14 ? true : false 
					}, {
						key   : '受理地址',
						value : $scope.arc['acceptAddress'] || '',
						isLeft: $scope.arc['acceptAddress'] && $scope.arc['acceptAddress'].length > 14 ? true : false
					}, {
						key   : '联系人',
						value : $scope.arc['linkman'] || '',
						isLeft: false
					}, {
						key   : '联系电话',
						value : $scope.arc['linkTel'] || '',
						isLeft: false
					}
				],
				arr_1: [
					{
						key  : '法定办理时限',
						value: $scope.arc['lawLimitTime'] || ''
					}, {
						key  : '承诺办理时限',
						value: $scope.arc['promiseLimitTime'] || ''
					}, {
						key  : '时限说明',
						value: $scope.arc['limitTimeRemark'] || ''
					}
				],
				arr_2: [
					{
						key  : '收费情况',
						value: $scope.arc['chargeInfo'] || ''
					}				],
				arr_3: [
					{
						key  : '监督投诉电话',
						value: $scope.arc['controlTel'] || ''
					}
				]
			};
		}

		function hideActive (arr) {
			
			var arr = arr || [], 
				idx = 0, 
				len = arr.length;
			
			for (; idx < len; idx++) {
				arr[idx]['isActive'] = false;
			}

		}

		function hideDetail (arr) {
			var arr = arr || [], 
				idx = 0, 
				len = arr.length;
			
			for (; idx < len; idx++) {
				arr[idx]['isDisplay'] = false;
			}
		}

		function getSunshine () {

			service
				.getSunshine()
				.success(function (data) {
					
					var index = 0,
						sunObj = '',
						sunName = '';

					data = data || {};

					if (data.body.length > 0) {
						$scope.sunList = [];

						for (; index < data.body.length; index++) {
							sunObj = data.body[index];
							switch (+sunObj["root"]["first"]) {
								case 10: sunObj.iconClass = 'i-bag'; break;
								case 20: sunObj.iconClass = 'i-worker'; break;
								case 30: sunObj.iconClass = 'i-work'; break;
								case 40: sunObj.iconClass = 'i-society'; break;
								case 50: sunObj.iconClass = 'i-job'; break;
								case 60: sunObj.iconClass = 'i-rel'; break;
								case 70: sunObj.iconClass = 'i-pay'; break;
								case 80: sunObj.iconClass = 'i-detail'; break;
								default : sunObj.iconClass = 'i-bag';
							}

							$scope.sunList.push(sunObj);
						}
					}

					
				})
				.error(function () {
					
				});
		}

	}
]);