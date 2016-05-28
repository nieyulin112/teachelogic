'use strict';
// 招聘公示列表
PSA.controller('recruitController', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicScrollDelegate',
    // 'CommonUtility', 
    'RecruitService',
    'ApiService',
    function(
        $scope,
        $state,
        $stateParams,
        $ionicScrollDelegate,
        // cUtil,
        service,
        apiService
    ) {

        $scope.pageNo = 1; // 首页
        $scope.recruits = []; // 每次分页数据
        $scope.recruit = {}; // 单个职位对象 
        // $scope.narture = []; // 职位关键字

        $scope.scrollFlag = true;
        $scope.isScrolling = false;

        //初始化数据
        $scope.initRecruits = function() {

            if ($scope.isScrolling) return;

            $scope.pageNo = 1;

            getRecruitsByPage($scope.pageNo);
        };
        //初始化详情数据
        $scope.initRecruitDetail = function() {
            var rec = localStorage.getItem('RECRUIT_DETAIL');
            $scope.recruit = rec && JSON.parse(rec) || {};
            // $scope.narture = $scope.recruit.rNature ? $scope.recruit.rNature.split(';') : [];
        };

        $scope.onScrollHandler = function(pageNo) {
            if (pageNo < 1) return;
            console.log('pageNo:' + pageNo);
            getRecruitsByPage(pageNo, true);
        };

        function getRecruitsByPage(pageNo, scrollFlag) {

            if (pageNo < 1) return;
            if ($scope.isScrolling) return;
            if (scrollFlag) $scope.isScrolling = true;

            // console.log('pageNo:' + pageNo);
            service
                .getRecruitDetail(pageNo)
                .success(function(data) {
                    hideEmptyLayer();

                    data = data || {};
                    console.log('data',data);

                    if (data.body && data.body.length > 0) {
                        $scope.recruits = data.body.length > 0 && $scope.recruits.concat(data.body);;
                        
                        console.log('$scope.recruits',$scope.recruits);

                        $scope.pageNo = pageNo; //
                    } else {
                        $scope.scrollFlag = scrollFlag && false;
                        // 空数据打开empty层
                        $scope.recruits.length <= 0 && showEmptyLayer();
                    }

                    if (scrollFlag) {
                        $scope.isScrolling = false;
                        $ionicScrollDelegate.$getByHandle('rec_scroll').resize();
                        // $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }

                })
                .error(function() {
                    showEmptyLayer();

                    $scope.scrollFlag = false;
                    $scope.isScrolling = false;
                    // $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }
        /**
         * Page jump include params
         */
        $scope.jumpToDetail = function(item) {

            localStorage.setItem('RECRUIT_DETAIL', JSON.stringify(item));
            $state.go("app.recruit_detail");
        }

        function showEmptyLayer(content, className) {
            $scope.eptCont = content || '暂无数据';
            $scope.eptCls = className;
            $scope.isEmpty = true;
        };

        function hideEmptyLayer() {
            $scope.isEmpty = false;
        };


        //搜索数据的分页
        // $scope.initDrugExpense = function() {
        //     $scope.hotPageNum = $scope.drugPageNum = 1;
        //     $scope.getHot(1);
        // };

        // $scope.initDESearch = function() {
        //     $scope.getHistory();
        // };

        // $scope.btnAction = function(event) {
        //     if (event.target.textContent === '搜索') {
        //         $scope.getDrugByKeyHud();
        //     } else {
        //         $scope.showDefault();
        //     }
        // };

        $scope.showDefault = function() {
            $scope.isSearch = true;
            //$scope.initDESearch();
            $scope.initRecruits();
            $scope.recruitKey = '';
            $scope.clearKey();
        };

        $scope.recruitKeyUp = function(event) {
            $scope.recruitKey = event.target.value;
            if (event.keyCode === 13) {
                $scope.getRecruitByKeyHud();
            }
        };

        $scope.clearKey = function() {
            document.getElementById('recruit_Search').value = '';
        };

        $scope.getHot = function(pageNum) {
            if ($scope.isFetching) return;
            $scope.isFetching = true;
            $scope.isHotEmpty = false;
            var param = { pageNum: pageNum, drugParam: '' };
            service.getHot(param, true)
                .success(function(rsp) {
                    $scope.callBackGetHot(rsp, param);
                })
                .error($scope.errorCallBackHot);
        };

        $scope.callBackGetHot = function(rsp, param) {
            if (rsp && rsp.code === $scope.rspState.success) {
                var body = rsp.body || [];
                if (param.pageNum === 1) {
                    if (body.length) {
                        $scope.storeHot = body;

                    } else {
                        $scope.hotMore = false;
                        $scope.storeHot = [];
                        $scope.isHotEmpty = true;
                    }
                } else {
                    $scope.storeHot = $scope.storeHot.concat().concat(body);
                    
                }
                $scope.hotMore = body.length >= $scope.reqParam.limit;
                $scope.hotPageNum = ++param.pageNum;
            } else {
                $scope.hotMore = false;
            }
            $scope.defaultCallBack();
        };

        $scope.getRecruitByKeyHud = function() {

            if ($scope.isFetching) return;
            clearTimeout($scope.timeoutId);
            var keyWord = document.getElementById('recruit_Search').value,
                param = { pageNum: 1, query: keyWord };

            if (!keyWord) return;
            $scope.isEmpty = false;
            $scope.keyWord = keyWord;
            $scope.isFetching = true;
            $scope.isSearch = true;

            service.getRecuritByKey(param)
                .success(function(rsp) {
                    //$scope.callBackGetDrug(rsp, param); //没有看懂的代码
                })
                .error($scope.errorCallBack);

            $scope.isHistory = false;
            $scope.isSearch = true;
            // $scope.addHistory();

        };

        $scope.getRecuritByKey = function(pageNum) {
            if ($scope.isFetching) return;
            if (!$scope.keyWord) {
                $scope.defaultCallBack();
                return;
            };
            var param = { pageNum: pageNum, query: $scope.keyWord };

            $scope.isFetching = true;

            service.getRecuritByKey(param, true)
                .success(function(rsp) {
                    //$scope.callBackGetDrug(rsp, param);
                })
                .error($scope.errorCallBack);
        };

        // $scope.callBackGetDrug = function(rsp, param) {
        //     if (rsp && rsp.code === $scope.rspState.success) {
        //         var body = rsp.body || [];
        //         if (body.length) {
        //             for (var i in body) {
        //                 var item = body[i];
        //                 item.searchName = item.drugName.replace($scope.keyWord, '<span class="de_imptText">' + $scope.keyWord + '</span>')
        //             }
        //         }
        //         if (param.pageNum === 1) {
        //             if (body.length) {
        //                 $scope.storeDrug = body;
        //             } else {
        //                 $scope.storeDrug = [];
        //                 $scope.isEmpty = true;
        //             }
        //         } else {
        //             $scope.storeDrug = $scope.storeDrug.concat().concat(body);
                    
        //         }
        //         $scope.drugMore = body.length > 0 ? true : false;
        //         $scope.drugPageNum = ++param.pageNum;
        //     } else {
        //         $scope.drugMore = false;
        //     }
        //     $scope.defaultCallBack();
        // };

        $scope.defaultCallBack = function() {
            $scope.isFetching = false;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.errorCallBack = function() {
            $scope.drugMore = false;
            $scope.isFetching = false;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.errorCallBackHot = function() {
            $scope.hotMore = false;
            $scope.isFetching = false;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.addHistory = function(searchRecruitName) {
            var local = JSON.parse(localStorage.getItem('recruits_History') || '[]'),
                newLocal = [],
                newName = searchRecruitName || $scope.keyWord;

                console.log('newName',newName);

            if (local.length) {
                for (var i in local) {
                    var item = local[i];
                    if (item.companyName !== newName ||item.position !== newName) {
                        newLocal.push(item);
                    }
                }
            }
            newLocal.push({ id: new Date().getTime(), searchRecruitName: newName });
            localStorage.setItem('recruits_History', JSON.stringify(newLocal.slice(-5)));
        };
        //获取历史数据
        $scope.getHistory = function() {
            $scope.storeHistory = JSON.parse(localStorage.getItem('recruits_History') || '[]');
        };
        //清除历史数据
        $scope.clearHistory = function() {
            localStorage.removeItem('recruits_History');
            $scope.getHistory();
        };

        $scope.goSearch = function(item) {
            var recruitsName = item.position||item.companyName;
            console.log('recruitsName',recruitsName);
            document.getElementById('recruit_Search').value = recruitsName;
            $scope.getRecruitByKeyHud();
        };

        $scope.inputChange = function() {
            if ($scope.timeoutId) {
                clearTimeout($scope.timeoutId);
            }
            $scope.timeoutId = setTimeout(function() {
                $scope.getRecruitByKeyHud();
            }, 1000);
        };

        //跳转到搜索页面
        $scope.getSearchData = function(){

            $state.go('app.recruitSearch');
        };

        //返回列表页面
        $scope.goBack = function(){

          $state.go('app.recruit');  
        }

        $scope.listenH5Event('app_drugExpense');

    }
]);