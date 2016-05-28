'use strict';
angular.module('RstFrontH5').factory('NewsLetterFakeService', function() {
    
    //所有的tab的类别集合
    var tabItem = [
        {idTab:0, tag:'企业版', menuType:'1', tab:'0'},
        {idTab:1, tag:'个人版', menuType:'1' ,tab:'1'},
        {idTab:2, tag:'养老', menuType:'2' ,tab:'1'},
        {idTab:3, tag:'医疗', menuType:'2' ,tab:'2'},
        {idTab:4, tag:'生育', menuType:'2' ,tab:'3'},
        {idTab:5, tag:'工伤', menuType:'2' ,tab:'4'},
        {idTab:6, tag:'公积金', menuType:'2' ,tab:'5'},
        {idTab:7, tag:'招聘信息', menuType:'3' ,tab:'0'},
        {idTab:8, tag:'招考信息', menuType:'3' ,tab:'1'}
    ];
    
    //所有实时通讯列表信息
    var NewsletterItems = [
        {idNews:0, title:'什么是城镇企业职工基本养老保险？', menuType:'1', tag:'', newsFrom:'养老', dateNews:'2015-02-06'},
        {idNews:1, title:'深圳哪些人员应参加基本医疗保险二档', menuType:'1', tag:'', newsFrom:'医疗', dateNews:'2015-11-01'},
        {idNews:2, title:'大病医疗保险是什么？包含哪些疾病？', menuType:'2', tag:'养老', tabStr:'养老', newsFrom:'养老', dateNews:'2015-01-28'},
        {idNews:3, title:'市人社局召开2015冬季创业项目', menuType:'2', tag:'医疗', tabStr:'医疗', newsFrom:'医疗', dateNews:'2015-11-01'},
        {idNews:4, title:'缴纳住房公积金对职工个人有何益处', menuType:'2', tag:'生育', tabStr:'生育', newsFrom:'生育', dateNews:'2015-10-28'},
        {idNews:5, title:'城镇居民基本医疗政策保险宣传单', menuType:'2', tag:'工伤', tabStr:'工伤', newsFrom:'工伤', dateNews:'2015-10-28'},
        {idNews:6, title:'11月我市调整失业保险标准', menuType:'2', tag:'公积金', tabStr:'公积金', newsFrom:'公积金', dateNews:'2015-11-01'},
        {idNews:7, title:'集美区公益帮助困难人士', menuType:'3', tag:'招聘信息', newsFrom:'社保', dateNews:'2015-01-28'},
        {idNews:8, title:'同安区人社局召开会议', menuType:'3', tag:'招考信息', newsFrom:'民政局', dateNews:'2015-02-06'},
        {idNews:9, title:'市人社局召开冬季创业项目', menuType:'3', tag:'招考信息', newsFrom:'民政局', dateNews:'2015-11-01'}
    ];

    //资讯正文的数据信息
    var informationBody = [{
            idNews:1, title:'11月我市调整失业保险标准',
            zonetag:'北京',
            newsFrom:'公积金',  
            dateNews:'2015-01-28',
            content:'一、参保范围和参保管理'+ 
				'（一）本县范围内，因公共利益和项目建设需要'+
				'（不包括本集体经济组织建设项目）征收土地，致人均耕地面积低于0.2亩（含本数）的村（社）（按土地征用时的在册农业人口计算）'+
				'列入被征地农民基本生活保障范围。下列人员不列入被征地农民基本生活保障范围：'+
				'1.机关、事业单位在职职工、离退休（职）人员; '+
				'2.参加职工基本养老保险和领取职工基本养老金待遇的人员。'
        },{       	
            idNews:2, title:'深圳哪些人员应参加基本医疗保险二档',
            zonetag:'深圳',
            newsFrom:'医疗',  
            dateNews:'2015-10-28',
            content:'设立依据'+
				'《武义县城镇职工基本医疗保险暂行办法》（武政发[2000]186号）'+
				'受理条件'+
				'医保年度内住院和特殊病种门诊费用累计发生的由统筹基金与个人比例承担的总额13万元以上的医疗费用人员'+
				'申请材料'+
				'1、住院发票、出院汇总清单、出院小结、转院证明'+ 
				'2、门诊发票、特殊病种病历本首页复印件、年度内门诊记录复印件'+ 
				'3、参保人身份证复印件、医保卡复印件'+ 
				'4、参保人年度内结报单复印件、转院证明复印件、发票复印件'+ 
				'5、若住院期间曾用白蛋白、血液及血液制品治疗的，出院时请复印相应期间的肝功能（含白蛋白指标）血常规化验单'+ 
				'6、参保人的银行账户'
        },{
            idNews:3, title:'保险宣传单城镇居民基本医疗政策',
            zonetag:'上海',
            newsFrom:'医疗',  
            dateNews:'2015-08-10',
            content:'<h5>一、模拟数据，时间很紧</h5>'+
            '<p>&nbsp;&nbsp;&nbsp;&nbsp;到底能有多少数据啊'+
            '怎么会这样模拟数据，时间很紧，到底能有多少数据啊模拟数据，'+
            '时间很紧，到底能有多少数据啊模拟数据，时间很紧，'+
            '到底能有多少数据啊模拟数据，时间很紧，到底能有多少数据啊!</p>'+
            '<h5>二、压力山大，在暴风雨中成长</h5>'+
            '<p>&nbsp;&nbsp;&nbsp;&nbsp;小学中学大学都可以买保险咯'+
            '怎么会这样模拟数据，时间很紧，到底能有多少数据啊模拟数据，'+
            '时间很紧，到底能有多少数据啊模拟数据，时间很紧，'+
            '到底能有多少数据啊模拟数据，时间很紧，呵呵就是瞎玩没有挑战性!</p>'
        }];
    
    //阳光政务列表信息
    var sunChiefItems = [
        {idNews:0, title:'什么是城镇企业职工基本养老保险？', menuType:'0', newsFrom:'养老', dateNews:'2015-02-06'},
        {idNews:1, title:'深圳哪些人员应参加基本医疗保险二档', menuType:'0', newsFrom:'医疗', dateNews:'2015-11-01'},
        {idNews:2, title:'大病医疗保险是什么？包含哪些疾病？', menuType:'1', tabStr:'养老', newsFrom:'生育', dateNews:'2015-01-28'},
        {idNews:3, title:'市人社局召开2015冬季创业项目', menuType:'1', tabStr:'医疗', newsFrom:'工伤', dateNews:'2015-11-01'}
    ];
    
    //资讯正文的数据信息
    var sunChiefDetail = [{
            idNews:1, title:'城镇居民基本医疗政策保险宣传单',
            regionCode:'北京',
            newsFrom:'公积金',  
            dateNews:'2015-01-28',
            newsContent:'<h5>一、模拟数据，时间很紧</h5>'+
            '<p>&nbsp;&nbsp;&nbsp;&nbsp;到底能有多少数据啊'+
            '怎么会这样模拟数据，时间很紧，到底能有多少数据啊模拟数据，'+
            '时间很紧，到底能有多少数据啊模拟数据，时间很紧，'+
            '到底能有多少数据啊模拟数据，时间很紧，到底能有多少数据啊!</p>'+
            '<h5>二、压力山大，在暴风雨中成长</h5>'+
            '<p>&nbsp;&nbsp;&nbsp;&nbsp;小学中学大学都可以买保险咯'+
            '怎么会这样模拟数据，时间很紧，到底能有多少数据啊模拟数据，'+
            '时间很紧，到底能有多少数据啊模拟数据，时间很紧，'+
            '到底能有多少数据啊模拟数据，时间很紧，呵呵就是瞎玩没有挑战性!</p>'
        }];
    //初始化查询的列表结果集
    var partItems = [];
    
    //获取阳光政务的列表信息
    var getSunChiefItems = function(param){
    	if(param.title == ''){     //如果参数title为空字符，则不是模糊查询
    		partItems = [];
        	for (var i = sunChiefItems.length - 1; i >= 0; i--) {
                if(sunChiefItems[i].menuType == param.typeID) {
                    partItems.push(sunChiefItems[i]);
                }
            }
        	//返回结果集
            return {code:'10000',message:'查询成功',body:partItems};
    	}else{
    		partItems = [];
        	for (var i = sunChiefItems.length - 1; i >= 0; i--) {
                if(sunChiefItems[i].menuType == param.typeID && sunChiefItems[i].title.indexOf(param.title) != -1) {
                    partItems.push(sunChiefItems[i]);
                }
            }
        	//返回结果集
            return {code:'10000',message:'查询成功',body:partItems};
    	}
    	
    	
    }
    //获取文章详情
    var getSunChiefDetail = function(param){
                return {code:'10000',message:'查询成功',body:sunChiefDetail[0]};
    }

    //初始化查询的tab结果集
    var partTabItem = [];

    //根据传入的num参数来筛选对应的文章信息
    var getNewsletterItems = function(param) {  
        partItems = [];
        partTabItem = [];
        //遍历资讯列表
        if(param.info_type === '2' && param.tag === '') {
        //遍历整改办事指南文章信息结果集
            for (var i = NewsletterItems.length - 1; i >= 0; i--) {
                if(NewsletterItems[i].menuType === param.info_type) {
                    partItems.push(NewsletterItems[i]);
                }
            }
        }else{
            for (var k = NewsletterItems.length - 1; k >= 0; k--) {
                if(NewsletterItems[k].menuType === param.info_type && NewsletterItems[k].tag === param.tag) {
                    partItems.push(NewsletterItems[k]);
                }
            }
        }
        if(param.isFind === true && param.info_type == '3'){
        	partTabItem.push(tabItem[7]);
        	partTabItem.push(tabItem[8]);
        }else if (param.isFind === true && param.info_type != '1') {
            for (var j = 0; j < tabItem.length; j++) {
                if (tabItem[j].menuType === param.info_type) {
                    partTabItem.push(tabItem[j]);
                }
            }
        }
        //返回结果集
        return {code:'10000',message:'查询成功',body:{dataList:partItems,tabItem:partTabItem}};
    };

    //根据传入的文章id拿到相应的结果数据
    var getInformationBody = function(param) {
        for (var i = informationBody.length - 1; i >= 0; i--) {
            if(param.idNews == 6) {
                return {code:'10000',message:'查询成功',body:informationBody[0]};   
            }
            if(param.idNews == 1) {
                return {code:'10000',message:'查询成功',body:informationBody[1]};   
            }
            if(i === 0) {
                return {code:'10000',message:'查询成功',body:informationBody[0]};
            }
        }
    };

    return {
      getNewsletterItems: function(param) {return getNewsletterItems(param);},
      getInformationBody: function(param) {return getInformationBody(param);},
      getSunChiefItems: function(param) {return getSunChiefItems(param);},
      getSunChiefDetail: function(param){return getSunChiefDetail(param)}
    };

  });