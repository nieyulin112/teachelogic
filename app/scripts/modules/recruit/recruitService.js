'use strict';

PSA.factory(
    'RecruitService',
    function($window, $http, ApiService, RecruitMockService) {
        var des = {};
        var isLocal = ApiService.isLocalEnv();
        /**
         * 分页查询招聘信息
         * @param  {[type]} pageIdx [description]
         * @return {[type]}         [description]
         */
        des.getRecruitDetail = function(pageIdx) {

            var url = '/open/recruitment/jobs.do',
                param = {
                    pageNum: pageIdx
                };

            // 验证是否是本地环境
            if (ApiService.isLocalEnv()) {
                return ApiService.requestFake(RecruitMockService.getRecruitDetail(pageIdx), false, false, 0);
            } else {
                // return ApiService.request('get', url, param, false);
                return ApiService.requestNoHud('get', url, param);
            }
        }

        /**
         * 加搜索条件(职业和单位名称)的分页查询招聘信息
         * @param  {number} pageNum [页码]
         * @param  {string} query   [单位名称或职位名称]
         *
         */

        des.getHot = function(param, isNoHud) {

            var url = '/open/recruitment/jobs.do';
            if (isLocal) {
                return ApiService.requestFake(RecruitMockService.getHot(), false);
            } else if (isNoHud) {
                return ApiService.requestNoHud('get', url, param);
            } else {
                return ApiService.request('get', url, param, true);
            }
        }

        des.getRecuritByKey = function(param, isNoHud) {

            var url = '/open/recruitment/jobs.do';

            if (isLocal) {
            	
                return ApiService.requestFake(RecruitMockService.getDrugByKey(), false);
            } else if (isNoHud) {
                return ApiService.requestNoHud('get', url, param);
            } else {
                return ApiService.request('get', url, param, true);
            }
        };
        return des;
    }
);