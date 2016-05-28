'use strict';
angular.module('RstFrontH5').factory('drugExpenseFakeService', function(){
	var rsp = {success:10000, message:'查询成功'};
	
	var storeHot = {
		code: rsp.success,
		message: rsp.message,
		body: [
			{drugId:1, drugName:'脑白金', drugType:'中药', chargeLvl:'丙类', dosageForm:'针剂', payscale:'10'},
			{drugId:2, drugName:'东阿阿胶', drugType:'西药', chargeLvl:'乙类', dosageForm:'针剂', payscale:'15'},
			{drugId:3, drugName:'复方氨酚那敏颗粒', drugType:'西药', chargeLvl:'丙类', dosageForm:'药片', payscale:'10'},
			{drugId:4, drugName:'板蓝根', drugType:'西药', chargeLvl:'丙类', dosageForm:'药片', payscale:'10'},
			{drugId:5, drugName:'安神补脑液', drugType:'中药', chargeLvl:'甲类', dosageForm:'针剂', payscale:'20'}
		]
	};
	
	var storeDrug = {
		code: rsp.success,
		message: rsp.message,
		body: [
        {
            "chargeLvl": "乙类",
            "dosageForm": null,
            "drugId": "z090000000230000",
            "drugName": "清感九味丸",
            "drugType": null,
            "payscale": "0.05"
        },
        {
            "chargeLvl": "乙类",
            "dosageForm": null,
            "drugId": "z090000000230001",
            "drugName": "清感九味丸",
            "drugType": null,
            "payscale": "0.05"
        },
        {
            "chargeLvl": "乙类",
            "dosageForm": null,
            "drugId": "e04020009020a000",
            "drugName": "小儿速效感冒灵",
            "drugType": null,
            "payscale": "1"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b007",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b011",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b014",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
           "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b015",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b017",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b019",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        },
        {
            "chargeLvl": "甲类",
            "dosageForm": null,
            "drugId": "z01010200013b023",
            "drugName": "感冒清胶囊（片）",
            "drugType": null,
            "payscale": "0"
        }
    ]
	};
	
	return {
		getHot: function(){return storeHot;},
		getDrugByKey: function(){return storeDrug;}
	};
});