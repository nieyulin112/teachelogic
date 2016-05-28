/*
 * author:nieyulin756
 * date:2015-11-17
 * 市民卡模块
 */
'use strict';

angular.module('RstFrontH5')
    .controller('citizenCardController', ['$rootScope', '$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', 'ApiService', 'citizenCardService', function($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, ApiService, citizenCardService) {
        $scope.change = false;
        $scope.dataArray = [];

        //显示制卡的状态
        $scope.state = '';
        //银行开户的状态
        $scope.openState = '';
        //办卡流程的提示语
        $scope.message = '';
        $scope.mes = '';

        $scope.isShow = true;
        $scope.isHide = false;
        $scope.isShowTips = false;
        $scope.currentSearchWords = '';
        $scope.isData = false;
        $scope.addressItem = [];
        $scope.citizenCardDoc = false;
        $scope.changeText = '取消';

        if ($state.current.name === 'app.citizenCard') {
            $scope.showHud();
            citizenCardService.getCards(true)
                .success(function(data) {
                    if (data.body && data.body.person) {
                        var person = data.body.person;
                        person.image = person.sex === '女' ? 'images/per_female.png' : 'images/per_male.png';
                    }
                    $scope.cards = data.body;
                    if (!data.body.cardList || !data.body.cardList.length) {
                        $scope.citizenCardDoc = true;
                        document.getElementById('cardPadding').style.padding = '15px';
                        document.getElementById('noCardBg').style.display = 'block';
                    }

                    for (var i = 0; i < $scope.cards.cardList.length; i++) {
                        if (i % 4 === 0) {
                            $scope.cards.cardList[i].bgColor = 'payh-bg';
                        } else if (i % 4 === 1) {
                            $scope.cards.cardList[i].bgColor = 'zsyh-bg';
                        } else if (i % 4 === 2) {
                            $scope.cards.cardList[i].bgColor = 'gfyh-bg';
                        } else if (i % 4 === 3) {
                            $scope.cards.cardList[i].bgColor = 'zxyh-bg';
                        }
                        //				if($scope.cards.cardList[i].bankCode==='') {
                        //					$scope.cards.cardList[i].bgColor = 'payh-bg';
                        //				}
                        //				else if($scope.cards.cardList[i].bankCode==='ICBC' || $scope.cards.cardList[i].bankCode==='BOC'){
                        //					$scope.cards.cardList[i].bgColor = 'zsyh-bg';
                        //				} else if($scope.cards.cardList[i].bankCode==='ABC' || $scope.cards.cardList[i].bankCode==='PSBC'){
                        //					$scope.cards.cardList[i].bgColor = 'gfyh-bg';
                        //				}else if($scope.cards.cardList[i].bankCode==='SXB' || $scope.cards.cardList[i].bankCode==='CCB' || $scope.cards.cardList[i].bankCode==='BOCOM'){
                        //					$scope.cards.cardList[i].bgColor = 'zxyh-bg';
                        //				}
                    }
                    $scope.hideHud();
                }).error(function(data) {
                    $scope.hideHud();
                });
        }

        //	if($state.current.name === 'app.citizenCardProcess') {
        //
        //		citizenCardService.getProcessDatas()
        //		.success(function(data){
        //
        //			$scope.processDatas = data.body;
        //
        //			console.log('data',$scope.processDatas.person);
        //openCardState:提交资料
        //			if($scope.processDatas.cardStatus === '提交资料') {
        //				$scope.state ='cur';
        //				$scope.message = '你的资料已提交';
        //				$scope.mes = '正在申请主卡银行账号';
        //				
        //			}
        //			else if($scope.processDatas.cardStatus === '银行开户') {
        //				$scope.state ='cur';
        //				$scope.openState = 'cur'
        //				$scope.message = '主卡已开通银行账户';
        //				$scope.mes = '请耐心等待制卡';
        //				
        //			}
        //			if($scope.processDatas.cardStatus === '提交资料成功') {
        //				$scope.state ='cur';
        //				$scope.arrowState='cur';
        //				$scope.message = '你的资料已提交';
        //				$scope.mes = '正在申请开通银行账号';
        //
        //			}
        //			else if($scope.processDatas.cardStatus === '提交资料失败') {
        //				$scope.state ='cur';
        //				$scope.message = '你的资料提交失败';
        //				$scope.mes = '请重新提交你的资料';
        //
        //			}
        //			else if($scope.processDatas.cardStatus === '银行开户') {
        //				$scope.state ='cur';
        //				$scope.arrowState='cur';
        //				$scope.arrowState2='cur';
        //				$scope.openState = 'cur'
        //				$scope.message = '已开通银行账户';
        //				$scope.mes = '请耐心等待制卡';
        //				
        //			}
        //			else if($scope.processDatas.cardStatus === '银行开户失败') {
        //				$scope.state ='cur';
        //				$scope.arrowState='cur';
        //				$scope.openState = 'cur'
        //				$scope.message = '银行账户开通失败';
        //				$scope.mes = '请耐心等待';
        //				
        //			}
        //			else if($scope.processDatas.cardStatus === '制卡失败') {
        //				$scope.state ='cur';
        //				$scope.arrowState='cur';
        //				$scope.arrowState2='cur';
        //				$scope.openState = 'cur'
        //				$scope.successState = 'cur'
        //				$scope.message = '制卡失败';
        //				$scope.mes = '请耐心等待';
        //			}

        //		}).error(function(data){
        //		});
        //	}

        //	if($state.current.name === 'app.citizenAccount') {
        //		citizenCardService.getAccountData()
        //		.success(function(data) {
        //
        //			$scope.accountData = data.body;
        //
        //		}).error(function(data) {
        //		});
        //	}

        if ($state.current.name === 'app.citizenPoint') {
            citizenCardService.getCitizenArea().success(function(data) {
                $scope.citizenArea = data.body;
            }).error(function(data) {});

            citizenCardService.getAddress().success(function(data) {

                $scope.address = data.body;
                $scope.selectArea({ regionCode: 1, regionName: '市本级' });

            }).error(function(data) {
            	console.log('data',data);
            });
        }

        //点击拨号
        $scope.telephoned = function(item) {
            if (typeof($$) !== 'undefined' && typeof($$.Native) !== 'undefined' && item.phonenumber) {
                $$.Native.dialUp({ phoneNum: item.phonenumber });
            }
        }

        //市民卡网点查询
        $scope.interPoint = function(item) {
            var parmas = $state.parmas;
            $state.go('app.citizenPoint', { id: item });
            $rootScope.citizenCardId = item;
        };

        //跳到服务网点之后，判断从网点跳到相应的前一个页面,使用0或者1判断
        $scope.previous = function() {
            //		if($rootScope.citizenCardId === 0) {

            $state.go('app.citizenCard', { addressItem: $scope.addressItem });

            //		}
            //		else if($rootScope.citizenCardId === 1) {
            //			$state.go('app.citizenCardProcess');
            //		}
        };

        //显示和隐藏
        $scope.showHide = function() {
            $scope.change = !$scope.change;
            if (!$scope.change) {
                $scope.regionName = $scope.nowRegionName;
            }
            //		else{
            //			$scope.regionName ='按区域';
            //		}
        };

        //跳到主副卡的页面,需要判断传递的参数
        $scope.skipMain = function(item) {
            $state.go('app.citizenAccount', { id: item.cardNumber });
        };

        //选择区域,需要给定的数据.
        $scope.selectArea = function(item) {
            $scope.change = false;
            $scope.dataArray.length = 0;
            $scope.regionName = item.regionName;
            $scope.nowRegionName = item.regionName;
            for (var i = 0; i < $scope.address.length; i++) {
                if ($scope.address[i].regionCode === item.regionCode) {
                    $scope.dataArray.push($scope.address[i]);
                }
            }
        };

        //返回到首页
        var backToHome = function() {
            ApiService.backToHome();
        };
        $scope.addressTrim = function(item) {
            var addressShow = "";
            if (item && item.address) {
                addressShow = item.address.replace(/(^\s*)|(\s*$)/g, '');
                if (addressShow) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        $scope.dataTrim = function(item) {
            var tempPhone = "";
            if (item && item.phonenumber) {
                tempPhone = item.phonenumber.replace(/(^\s*)|(\s*$)/g, '');
                if (tempPhone) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        //跳转到网点搜索页面
        if ($state.current.name === 'app.citizenSearch') {
            $scope.go = function() {
                    history.go(-1);
                }
                //清空搜索
            $scope.delKey = function(idx) {
                if ($scope.searchAddress) { $scope.searchAddress = '' };
                $scope.isShowTips = false;
                var nl = $scope.addressItem.length;
                $scope.addressItem.splice(idx, nl);
                localStorage.clear();
                $scope.addressItem = [];
                $scope.isDelete = false;
                $ionicScrollDelegate.scrollTop();
            };

            //切换搜索还是取消
            $scope.changeBtn = function() {
                    var searchVal = event.target.value;
                    //判断输入框中是否有值
                    if (searchVal && searchVal.length) {
                        $scope.changeText = "搜索";
                    } else {
                        $scope.changeText = "取消";
                    }
                }
                //数据匹配的时候切换页面
            $scope.searchChange = function(d) {
                $scope.isShow = false;
                $scope.isHide = true;
                $scope.isShowTips = false;
                var searchWords = document.getElementById('searchWords').value;
                for (var i = 0; i < d - 1; i++) {
                    var b = $scope.listAddress[i].unit.indexOf(searchWords);
                    var c = $scope.listAddress[i].address.indexOf(searchWords);
                    if (b !== -1 || c !== -1) {
                        $scope.isAddressData = true;
                        $scope.isData = false;
                        $scope.isShowTips = false;
                        return;
                    } else {
                        $scope.isData = true;
                        $scope.isHide = false;
                        $scope.isAddressData = false;
                    }
                }
            };

            $scope.addressItem = [];

            $scope.doBack = function() {
                if ($scope.searchAddress) { $scope.searchAddress = '' };
                $state.go('app.citizenPoint', { id: 0, addressItem: $scope.addressItem });

            }

            $scope.searchCardHistory = function() {
                if (localStorage.addressKeys) {
                    $scope.addressItem = JSON.parse(localStorage.addressKeys);
                }
                $scope.isData = false;
                $scope.isHide = true;
                if ($scope.addressItem && $scope.addressItem.length) {
                    $scope.isShowTips = true;
                } else {
                    $scope.isShowTips = false;
                }
            }

            $scope.selectSearchHistoryWowrd = function(searchWords) {
                $scope.searchAddress = searchWords;
                var params = {
                    unit: searchWords,
                };
                getAddressList(params);
                //$scope.searchChange();
                //把搜索内容储存到本地
                var keysWord = localStorage.addressKeys || [];
                if (keysWord && keysWord.length) {
                    keysWord = JSON.parse(keysWord);
                }
                //此布尔值为了标示是否进入到循环
                var bool = false;
                for (var i = 0; i < keysWord.length; i++) {
                    if (keysWord[i].value === searchWords) {
                        bool = true;
                        keysWord[i].id = new Date().getTime();
                        break;
                    }
                }
                if (!bool) {
                    keysWord.push({ id: new Date().getTime(), value: searchWords });
                }
                $scope.addressItem = keysWord;
                localStorage.addressKeys = JSON.stringify(keysWord);
            }

            //点击button按钮执行搜索或取消
            $scope.execute = function() {
                $scope.isShowTips = false;
                if ($scope.changeText === "取消") {
                    $scope.searchAddress = '';
                    $scope.isShow = true;
                    $scope.isHide = false;
                }
                if ($scope.changeText === "搜索") {
                    $scope.changeText = "取消";
                    var searchWords = document.getElementById('searchWords').value;
                    //				var reg=/^[0-9]*$/;
                    var params = {
                        unit: searchWords,
                    };
                    $scope.isDelete = true;
                    //判断是否为数字
                    //				if( reg.test(searchWords)){
                    //					return;
                    //				}
                    getAddressList(params);
                    //$scope.searchChange();
                    //把搜索内容储存到本地
                    var keysWord = localStorage.addressKeys || [];
                    if (keysWord && keysWord.length) {
                        keysWord = JSON.parse(keysWord);
                    }
                    //此布尔值为了标示是否进入到循环
                    var bool = false;
                    for (var i = 0; i < keysWord.length; i++) {
                        if (keysWord[i].value === searchWords) {
                            bool = true;
                            keysWord[i].id = new Date().getTime();
                            break;
                        }
                    }
                    if (!bool) {
                        keysWord.push({ id: new Date().getTime(), value: searchWords });
                    }
                    //				var searchKeys = [];
                    //				 
                    //				for(var i= keysWord.length-1; i>=0; i--){
                    //					searchKeys.push(keysWord[i]);
                    //				}
                    $scope.addressItem = keysWord;
                    localStorage.addressKeys = JSON.stringify(keysWord);
                }
            };

            //点击拨号
            $scope.telephoned = function(item) {
                if (typeof($$) !== 'undefined' && typeof($$.Native) !== 'undefined' && item.phonenumber) {
                    $$.Native.dialUp({ phoneNum: item.phonenumber });
                }
            }
            $scope.addressTrim = function(item) {
                var addressShow = "";
                if (item && item.address) {
                    addressShow = item.address.replace(/(^\s*)|(\s*$)/g, '');
                    if (addressShow) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            $scope.dataTrim = function(item) {
                var tempPhone = "";
                if (item && item.phonenumber) {
                    tempPhone = item.phonenumber.replace(/(^\s*)|(\s*$)/g, '');
                    if (tempPhone) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };

            //获取网点地址
            var getAddressList = function(params) {
                citizenCardService.getAddress()
                    .success(function(data) {
                        if (data.body && data.body.length) {
                            $scope.listAddress = data.body;
                            var d = $scope.listAddress.length;
                            $scope.searchChange(d);
                        } else {}
                    })
                    .error(function() {});
            };
        }

        //获取经纬度
        $scope.getPosition = function(item){

        	//传递对象给你

        	console.log('item',item);

        };

        $scope.listenH5Event('app_citizenCard');
    }]);