'use strict';
angular.module('RstFrontH5').factory('prescriptionFakeDataService', function() {
    
    var prescriptionList = [
     	{
		 anagraphCode:'1',
		 anagraphDate:'2015-05-05',
		 disease:'高血压',
		 imageURLList:[
		 	     {imageURL:'images/113.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/49.png',name:'李梅尼丁2'},
		 		 {imageURL:'images/84.png',name:'李梅尼丁3'},
		 		 {imageURL:'images/99.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/162-163.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/156.png',name:'李梅尼丁2'}
		 		], 
		 doctorName:'李天天',
		 anagraphStatusStr:'等待医生确认',
		 anagraphStatus:'1'
        },{  
    	 anagraphCode:'2',
	     anagraphDate:'2013-03-03',
		 disease:'心脏病',
		 imageURLList:[
		 		 {imageURL:'images/113.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/49.png',name:'李梅尼丁2'},
		 		 {imageURL:'images/84.png',name:'李梅尼丁3'},
		 		 {imageURL:'images/99.png',name:'李梅尼丁1'}
		 		], 
		 doctorName:'李天一',
		 anagraphStatusStr:'已取药',
		 anagraphStatus:'3'
		},{  
    	 anagraphCode:'3',
	     anagraphDate:'2013-03-03',
		 disease:'心脏病',
		 imageURLList:[
		 		 {imageURL:'images/113.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/49.png',name:'李梅尼丁2'},
		 		 {imageURL:'images/84.png',name:'李梅尼丁3'},
		 		 {imageURL:'images/99.png',name:'李梅尼丁1'}
		 		], 
		 doctorName:'李天一',
		 anagraphStatusStr:'已取药',
		 anagraphStatus:'3'
		},{  
    	 anagraphCode:'4',
	     anagraphDate:'2013-03-03',
		 disease:'心脏病',
		 imageURLList:[
		 		 {imageURL:'images/113.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/49.png',name:'李梅尼丁2'},
		 		 {imageURL:'images/84.png',name:'李梅尼丁3'},
		 		 {imageURL:'images/99.png',name:'李梅尼丁1'}
		 		], 
		 doctorName:'李天一',
		 anagraphStatusStr:'已取药',
		 anagraphStatus:'3'
		},{  
    	 anagraphCode:'5',
	     anagraphDate:'2013-03-03',
		 disease:'心脏病',
		 imageURLList:[ 
		         {imageURL:'images/113.png',name:'李梅尼丁1'},
		 		 {imageURL:'images/49.png',name:'李梅尼丁2'},
		 		 {imageURL:'images/84.png',name:'李梅尼丁3'},
		 		 {imageURL:'images/99.png',name:'李梅尼丁1'}
		 		],
		 doctorName:'李天一',
		 anagraphStatusStr:'已取药',
		 anagraphStatus:'3'
		}
    ];
    
    
	var prescriptionDetail = {
	   anagraphDate:'2012-05-05',
	   disease:'高血压',
	   drugList:[ 
	    {
	  	 itemCode:'1',
	     itemName: '血管紧张转换酶抑制剂',
	     specifications: '10毫克/100片',
	     advice: '每天两次30份，原发性高血压见于中老年，起病隐匿。',
	     amount: 1,
	     imageUrl: 'images/113.png'
		},{
	  	 itemCode:'2',
	     itemName: '利美尼定',
	     specifications: '10毫克/100片',
	     advice: '每天两次30份，原发性高血压见于中老年，起病隐匿。',
	     amount: 3,
	     imageUrl: 'images/49.png'
		},{
		 itemCode:'3',
	     itemName: '血管紧张转换酶抑制剂',
	     specifications: '10毫克/100片',
	     advice: '每天两次30份，原发性高血压见于中老年，起病隐匿。',
	     amount: 2,
	     imageUrl: 'images/84.png'
		}  
	   ],
	   doctorName:'李天一',
	   anagraphStatusStr:'等待医生确认',
	   anagraphStatus:'1',
	   anagraphTrackingList:[
	     {changeDate:'2015-05-03 13:30:50',changeType:'等待医生确认'},
	     {changeDate:'2015-05-03 13:30:50',changeType:'处方申请已提交'}		  
	   ]
    };


    var prescriptionPillDetailList = {
       name: '双模达令',
	   specification: '10毫克/100片',
	   single:'10毫克',
	   soseUnit:'微克',
	   useWay:'口服',
	   useFrequence:'一天2次',
	   useDay:'一个月',
	   number: '2瓶',
	   unit:'瓶',
	   price:'¥3.38',
	   totalAmount:'¥7.67',
	   remark: '限二次性用药'
    };
  
    var prescriptionListMethod=function(){
	    return {body:prescriptionList};
    };
  
    var prescriptionDetailMethod=function(){
	    return {body:prescriptionDetail};
    };
  
    var prescriptionPillDetailListMethod=function(){
	    return {body:prescriptionPillDetailList};
    };
  
    return {
   	  getPrescriptionList: function() {return prescriptionListMethod();},
      getPrescriptionDetail: function() {return prescriptionDetailMethod();},
      getPrescriptionPillDetaillist: function() {return prescriptionPillDetailListMethod();}
    };
});