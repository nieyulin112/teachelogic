'use strict';
PSA.factory('SunshineMockService', function () {

	var sunshine = {
		value: [
			{
				id     : 0,
				name   : '1',
				cnName : '公务员管理',
				chilren: [],
				iconClass: 'i-bag' 
			},
			{
				id     : 1,
				name   : '2',
				cnName : '人事管理',
				chilren: [],
				iconClass: 'i-worker'  
			},
			{
				id     : 2,
				name   : '3',
				cnName : '人才工作',
				chilren: [ 
					{
						id     : 21,
						name   : 'xxxx',
						cnName : '人才开发',
						chilren: []
					},
					{
						id     : 22,
						name   : 'xxxx',
						cnName : '专家留学',
						chilren: []
					},
					{
						id     : 23245,
						name   : 'xxxx',
						cnName : '博士后工作',
						chilren: []
					},
					{
						id     : 2423,
						name   : 'xxxx',
						cnName : '职业技能',
						chilren: []
					}					
				],
				iconClass: 'i-work'
			}, {
				id     : 3,
				name   : '2',
				cnName : '社会保险',
				chilren: [],
				iconClass: 'i-society'
			}, {
				id     : 4,
				name   : '2',
				cnName : '就业失业',
				chilren: [],
				iconClass: 'i-job'
			}, {
				id     : 5,
				name   : '2',
				cnName : '劳动关系',
				chilren: [],
				iconClass: 'i-rel'
			}, {
				id     : 6,
				name   : '2',
				cnName : '工资福利',
				chilren: [],
				iconClass: 'i-pay'
			}, {
				id     : 7,
				name   : '2',
				cnName : '其它事项',
				chilren: [],
				iconClass: 'i-detail'
			}
		]
	} 


	var articleList = {
		value: [
			{
				pageNo: 1,
				arts  : [
					{
						name  : '人才xxx1',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx2',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx3',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx4',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx5',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx6',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx7',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx8',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					}, {
						name  : '人才xxx9',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},  {
						name  : '人才xxx10',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					}
				]
			},
			{
				pageNo: 2,
				arts  : [
					{
						name  : '人才xxx1',
						date  : '2016年1月1日',
						detail: {
							// 事项名称
							affairName: '',
							// 事项编码
							affairCode: '',
							// 服务对象
							serviceObject: '',
							// 受理部门
							acceptDeptName:'',
							// 受理地址
							acceptAddress: '',
							// 联系人
							linkman: '',
							// 联系电话
							linkTel: '',
							// 法定办理时限
							lawLimitTime: '',
							// 承诺办理时限
							promiseLimitTime: '',
							// 时限说明
							limitTimeRemark: '',
							// 收费情况
							chargeInfo: '',
							// 监督电话
							controlTel: ''
						}
					},{
						name  : '人才xxx2',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
				        }
					}, {
						name  : '人才xxx3',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					}, {
						name  : '人才xxx4',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx5',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx6',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx7',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},{
						name  : '人才xxx8',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					}, {
						name  : '人才xxx9',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					},  {
						name  : '人才xxx10',
						date  : '2016年1月1日',
						detail: {
							"affairName": "公务员录用计划审核",
				            "chargeInfo": "不收费",
				            "controlTel": "0575-81503219",
				            "linkman": "张张",
				            "linkTel": "8763732",
				            "serviceObject": "单位",
				            "limitTimeRemark": "15个工作日",
				            "affairCode": "3302020-QT-2010",
				            "acceptDeptName": "公务员管理处",
				            "acceptAddress": "XXXX",
				            "lawLimitTime": "无",
				            "promiseLimitTime": "15个工作日"
						}
					}
				]
			},
			{
				pageNo: 3,
				arts  : [
					{
						name  : '人才xxx1',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx2',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx3',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx4',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx5',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx6',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx7',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},{
						name  : '人才xxx8',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					}, {
						name  : '人才xxx9',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					},  {
						name  : '人才xxx10',
						date  : '2016年1月1日',
						detail: {
							key1 : 'value1',
							key2 : 'value1',
							key3 : 'value1',
							key4 : 'value1',
							key5 : 'value1',
							key6 : 'value1',
							key7 : 'value1',
							key8 : 'value1',
							key9 : 'value1',
							key10: 'value1',
							key11: 'value1',
							key12: 'value1',
							key13: 'value1',
							key14: 'value1',
							key15: 'value1',
							key16: 'value1',
							key17: 'value1',
							key18: 'value1',
						}
					}
				]
			}
		]
	}

	function getSunshine () {
		return {
			code   : '10000',
			message: '查询成功',
			body   : sunshine
		};
	}

	function getJobsDetail (pageNo) {
		return {
			code   : '10000',
			message: '查询成功',
			body   : +pageNo > 0 ? articleList['value'][+pageNo - 1] : {}
		}
	}

	return {
		getSunshine  : getSunshine,
		getJobsDetail: getJobsDetail
	}

});