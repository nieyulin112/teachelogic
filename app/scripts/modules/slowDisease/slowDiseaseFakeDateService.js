'use strict';
angular.module('RstFrontH5').factory('SlowDiseaseFakeDataService', function() {

    // 药品清单中药品数据
    /*
      ** itemCoding: 药品ID
      ** itemName: 药品名称
      ** specifications: 药品规格
      ** imageUrl: 药品图片
      */
    var pillList = //{};
        [{
            itemCoding:'1',
            itemName: '血管紧血管',
            specifications: '10毫克/6毫克/100片',
            imageUrl:'images/113.png'
        }, {
            itemCoding:'2',
            itemName: '酶抑酶抑制抑',
            specifications: '100毫克/6毫克/10片',
            imageUrl: 'images/49.png'
        }, {
            itemCoding:'3',
            itemName: '血管紧血管紧血',
            specifications: '10毫克/6毫克/10片',
            imageUrl: 'images/84.png'
        }, {
            itemCoding:'4',
            itemName: '血管紧血管紧血管',
            specifications: '10毫克/6毫克/10片',
            imageUrl: 'images/99.png'
        }, {
            itemCoding:'5',
            itemName: '血管紧血管紧血',
            specifications: '10毫克/6毫克/10片',
            imageUrl: 'images/84.png'
        }, {
            itemCoding:'6',
            itemName: '血管紧血管紧血',
            specifications: '10毫克/6毫克/10片',
            imageUrl: 'images/84.png'
        }];

    // 提交成功,家庭医生的信息数据
    /*
      ** name: 医生姓名
      ** contractNum: 已签约人数
      ** department: 所属部门
      ** jobTitle: 职称
      ** hospital: 医院名称
      ** portrait: 医生头像
      */
    var doctor = //{};
        {
            name: '黄奇芳',
            contractNum: '233',
            department: '全科',
            jobTitle: '副主任医师',
            hospital:'厦门思明区卫生服务中心',
            portrait: 'images/male.png',
            sex:'F'
        };

    // 提交模块：是否已自动签约医生
    var autoAssined = true;

    // 提交模块：返回错误信息
    var message = '网络请求失败';

    // 选择药品模块：根据对应疾病找到药品清单数据
    var getPillList = function() {
        return {message:message, body: pillList, code:'10000'};
    };

    // 提交模块：获取医生的基本信息
    var getDoctor = function() {
        return  {message:message, body:{doctor:doctor,autoAssined:autoAssined},code:'10000'};
    };

    return {
        getPillList: function(){return getPillList();},
        getDoctor: function(){return getDoctor();}
    };

});