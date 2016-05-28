/*
 * author:nieyulin756
 * date:2015-11-17
 * 市民卡模块
 */
'use strict';
angular.module('RstFrontH5').factory('citizenCardFakeService', function() {

    //citizenCard的模拟数据

    var cards = {
        //银行卡数据
        // socialCardNumber: '1239990002352525****524',

        // mainCardNumber:'1239990002352525****524',

        // mainCardBank: '平安银行',

        // bunding:true,//是否绑定卡

        // bgColor:'payh-bg',//主卡的背景颜色

        // image: 'images/placeholder/avatars/avatar-1.png',//银行卡图片

        cardList: [
            //		{
            //			handledCardNumber:'1239990002352525****524',
            ////			cardNumber:'1239990002352525****524',
            //			bankName:'交通银行',
            //			//bgColor:'',
            //			bankCode:'BOCOM',
            //			//bankImg:'images/placeholder/avatars/avatar-1.png'
            //		},{
            //			handledCardNumber:'63366666666****2266',
            ////			cardNumber:'63366666666****2266',
            //			bankName:'中国工商银行',
            //			//bgColor:'',
            //			bankCode:'ICBC',
            //			//bankImg:'images/placeholder/avatars/avatar-1.png'
            //		},{
            ////			cardNumber:'1239990002352525****524',
            //			handledCardNumber:'1239990002352525****524',
            //			bankName:'农业银行',
            //			//bgColor:'',
            //			bankCode:'ABC',
            //			//bankImg:'images/placeholder/avatars/avatar-1.png'
            //		},{
            ////			cardNumber:'1239990002352525****524',
            //			handledCardNumber:'1239990002352525****524',
            //			bankName:'绍兴银行',
            //			//bgColor:'',
            //			bankCode:'SXB',
            //			//bankImg:'images/placeholder/avatars/avatar-1.png'
            //		}
        ],
        //个人信息
        person: {
            image: 'images/placeholder/avatars/avatar-1.png', //头像

            name: '张晓敏',

            sex: '男',

            age: '43',

            siCard: '35021119900901293'

        }
        //副卡数据
        // assistCard:[
        // 	{

        // 		image: 'images/placeholder/avatars/avatar-2.png',//副卡的图片

        // 		cardName :'招商银行',

        // 		cardType:'市民卡-副卡',

        // 		cardNumber: '62264532356****2268',

        // 		bgColor:'zsyh-bg'
        // 	},{
        // 		image: 'images/placeholder/avatars/avatar-1.png',

        // 		cardName :'广发银行',

        // 		cardType:'市民卡-副卡',

        // 		cardNumber: '63366666666****2266',

        // 		bgColor:'gfyh-bg'
        // 	},{
        // 		image: 'images/placeholder/avatars/avatar-1.png',

        // 		cardName :'中信银行',

        // 		cardType:'市民卡-副卡',

        // 		cardNumber: '63322226666****2266',

        // 		bgColor:'zxyh-bg'
        // 	}
        // ]
    };
    //process的模拟数据

    var processDatas = {
        person: {
            image: 'images/placeholder/avatars/avatar-1.png',

            name: '张晓敏',

            sex: '男',

            age: '56',

            siCard: '3502111990090****123',

        },
        cardStatus: '银行开户失败'

    };

    //主卡账户余额
    var accountData = {

        card: {
            money: '12090',
            bankName: '平安银行',
            bankNum: '8181812637678****9087',
            year: '2015',
            type: '市民卡-主卡',

            data: [{
                date: '08-22', //日期
                amountInclude: '500', //充值金额
                consumption: '' //支出金额
            }, {

                date: '07-01',
                amountInclude: '500', //充值金额
                consumption: '' //支出金额
            }, {

                date: '06-01',
                amountInclude: '', //充值金额
                consumption: '500' //支出金额
            }, {

                date: '05-01',
                amountInclude: '500', //充值金额
                consumption: '' //支出金额
            }, {

                date: '04-01',
                amountInclude: '', //充值金额
                consumption: '500' //支出金额
            }, {

                date: '03-01',
                amountInclude: '', //充值金额
                consumption: '500' //支出金额
            }, {

                date: '02-01',
                amountInclude: '', //充值金额
                consumption: '500' //支出金额
            }]
        }


    };

    //市民卡网点区域数据

    var citizenArea = [
        { regionCode: 1, regionName: '市本级' },
        { regionCode: 2, regionName: '柯桥' },
        { regionCode: 3, regionName: '上虞' },
        { regionCode: 4, regionName: '诸暨' },
        { regionCode: 5, regionName: '嵊州' },
        { regionCode: 6, regionName: '新昌' }
    ];

    //地址数据
    var citizenAddress = [
        {
            unit: '工商银行城北支行营业部',
            address: '越城区凤林西路美林公寓20幢101-201室',
            phonenumber: '85124921',
            regionCode: 1,
            longitude: '4234',
            latitude: '35543'
        },{
            unit: '工商银行绍兴市分行胜利路支行',
            address: '越城区解放北路205.207.209号',
            phonenumber: '85132063',
            regionCode: 1,
            longitude: '4234',
            latitude: '35543'
        },{
            unit: '工商银行越城支行营业部',
            address: '越城区解放南路655号',
            phonenumber: '88311266',
            regionCode: 1
        },{
            unit: '工商银行袍江支行营业部',
            address: '袍江开发区世纪街南岸花园1号商务楼',
            phonenumber: '88133501',
            regionCode: 1
        },{
            unit: '工商银行城东江家溇支行',
            address: '越城区中兴南路730-742号（逢双号）',
            phonenumber: '',
            regionCode: 1
        },{
            unit: '工商银行柯桥支行营业部',
            address: '柯桥区鉴湖路29号',
            phonenumber: '84128505',
            regionCode: 2
        },

        {
            unit: '工商银行柯桥社保专柜',
            address: '柯桥区华齐路1066号公共服务大楼 ',
            phonenumber: '84787933',
            regionCode: 2
        },

        {
            unit: '工商银行上虞支行营业部',
            address: '上虞区新建路2号',
            phonenumber: '82214379',
            regionCode: 3
        },

        {
            unit: '工商银行上虞社保专柜',
            address: '上虞区市民中心一路8号区便民服务中心',
            phonenumber: '81260656',
            regionCode: 3
        },

        {
            unit: '工商银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '81781957',
            regionCode: 4
        },

        {
            unit: '工商银行诸暨支行营业部',
            address: '诸暨市暨阳路158号',
            phonenumber: '87015240',
            regionCode: 4
        },

        {
            unit: '工商银行嵊州支行营业部',
            address: '嵊州市鹿山路178号',
            phonenumber: '83033383',
            regionCode: 5
        },

        {
            unit: '工商银行嵊州社保专柜',
            address: '嵊州市鹿山街道长丰路100号',
            phonenumber: '83278074',
            regionCode: 5
        },

        {
            unit: '工商银行新昌支行营业部',
            address: '新昌县鼓山中路159号',
            phonenumber: '86252602',
            regionCode: 6
        },

        {
            unit: '农业银行越城支行营业中心',
            address: '越城区人民中路349号',
            phonenumber: '85124446',
            regionCode: 1
        },

        {
            unit: '农业银行绍兴东浦支行',
            address: '越城区东浦镇锡麟路70号',
            phonenumber: '85199264',
            regionCode: 1
        },

        {
            unit: '农业银行绍兴强头废丝市场支行',
            address: '越城区东浦镇强头废丝市场南首',
            phonenumber: '85190413',
            regionCode: 1
        },

        {
            unit: '农业银行绍兴陶堰支行',
            address: '越城区陶堰农贸市场18号',
            phonenumber: '88011884',
            regionCode: 1
        },

        {
            unit: '农业银行绍兴越东支行',
            address: '越城区越东南路328号',
            phonenumber: '85224249',
            regionCode: 1
        },

        {
            unit: '农业银行柯桥支行营业中心',
            address: '柯桥区金柯桥大道333号',
            phonenumber: '84131240',
            regionCode: 2
        },

        {
            unit: '农业银行上虞支行营业中心',
            address: '上虞区人民中路497路',
            phonenumber: '82130515',
            regionCode: 3
        },

        {
            unit: '农业银行诸暨支行营业中心',
            address: '诸暨市暨阳街道艮塔路9号',
            phonenumber: '87013512/87024190',
            regionCode: 4
        },

        {
            unit: '农业银行诸暨牌头支行',
            address: '诸暨市牌头镇光明路19号',
            phonenumber: '87051132',
            regionCode: 4
        },

        {
            unit: '农业银行诸暨草塔支行',
            address: '诸暨市草塔镇大元路63号草塔汽车站旁',
            phonenumber: '87071771',
            regionCode: 4
        },

        {
            unit: '农业银行嵊州支行营业中心',
            address: '嵊州市东南路2号',
            phonenumber: '83012527',
            regionCode: 5
        },

        {
            unit: '农业银行嵊州社保专柜',
            address: '嵊州市鹿山街道长丰路100号',
            phonenumber: '83278084',
            regionCode: 5
        },

        {
            unit: '农业银行嵊州崇仁支行',
            address: '嵊州市崇仁镇新街西路1号',
            phonenumber: '83091156',
            regionCode: 5
        },

        {
            unit: '农业银行嵊州城西支行',
            address: '嵊州市鹿山街道东南路736-750号',
            phonenumber: '83034613',
            regionCode: 5
        },

        {
            unit: '农业银行嵊州石璜支行',
            address: '嵊州市石璜镇会稽路282号',
            phonenumber: '83691007',
            regionCode: 5
        },

        {
            unit: '农业银行新昌支行营业中心',
            address: '新昌县鼓山中路1号',
            phonenumber: '86024586',
            regionCode: 6
        },

        {
            unit: '农业银行新昌东区支行',
            address: '新昌县人民东路177号',
            phonenumber: '86122146',
            regionCode: 6
        },

        {
            unit: '农业银行新昌七星支行',
            address: '新昌县鼓山西路129-1号',
            phonenumber: '86237000',
            regionCode: 6
        },

        {
            unit: '农业银行新昌澄潭支行',
            address: '新昌县澄潭镇曙光路29号',
            phonenumber: '86050123',
            regionCode: 6
        },

        {
            unit: '农业银行新昌儒岙支行',
            address: '新昌县儒岙镇天姥一路258号',
            phonenumber: '86060216',
            regionCode: 6
        },

        {
            unit: '农业银行新昌大市聚支行',
            address: '新昌县大市聚镇西大将路1号',
            phonenumber: '86591130',
            regionCode: 6
        },

        {
            unit: '中国银行绍兴市分行营业部',
            address: '越城区人民中路231号',
            phonenumber: '85094028',
            regionCode: 1
        },

        {
            unit: '中国银行越城支行营业部',
            address: '越城区大校场沿187号',
            phonenumber: '85111214/85081435',
            regionCode: 1
        },

        {
            unit: '中国银行绍兴高新技术开发区支行',
            address: '高新技术开发区迪荡新城崇贤街7号',
            phonenumber: '88640152',
            regionCode: 1
        },

        {
            unit: '中国银行绍兴袍江开发区支行',
            address: '袍江开发区华欣大厦一楼',
            phonenumber: '88131137',
            regionCode: 1
        },

        {
            unit: '中国银行柯桥支行营业部',
            address: '绍兴市柯桥区山阴路299号',
            phonenumber: '84130509',
            regionCode: 2
        },

        {
            unit: '中国银行上虞支行营业部',
            address: '绍兴市上虞区百官街道新建路119号',
            phonenumber: '81260711',
            regionCode: 3
        },

        {
            unit: '中国银行诸暨支行营业部',
            address: '诸暨市暨阳路102号',
            phonenumber: '87112240',
            regionCode: 4
        },

        {
            unit: '中国银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '80701976',
            regionCode: 4
        },

        {
            unit: '中国银行诸暨经济开发区支行',
            address: '诸暨市艮塔西路88号',
            phonenumber: '87214222',
            regionCode: 4
        },

        {
            unit: '中国银行嵊州支行营业部',
            address: '嵊州市东南路1号',
            phonenumber: '83036929',
            regionCode: 5
        },

        {
            unit: '中国银行新昌支行营业部',
            address: '新昌县鼓山中路125号',
            phonenumber: '86024721',
            regionCode: 6
        },

        {
            unit: '建设银行绍兴市分行营业部',
            address: '越城区中兴南路2号',
            phonenumber: '88162109',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴高新技术开发区支行',
            address: '越城区人民东路333号',
            phonenumber: '88162230',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴大通支行',
            address: '越城区胜利西路605号',
            phonenumber: '88162206',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴解放南路支行',
            address: '越城区城南大道452号',
            phonenumber: '88162507',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴袍江支行',
            address: '袍江开发区世纪街益泉大酒店东南角',
            phonenumber: '88162544',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴皋埠支行',
            address: '高新技术开发区皋埠镇银桥路232号',
            phonenumber: '88162575',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴马山支行',
            address: '袍江开发区马山镇海南路66号',
            phonenumber: '88162585',
            regionCode: 1
        },

        {
            unit: '建设银行绍兴支行营业部',
            address: '柯桥区鉴湖路27号',
            phonenumber: '81189050',
            regionCode: 2
        },

        {
            unit: '建设银行柯桥社保专柜',
            address: '柯桥区华齐路1066号公共服务大楼',
            phonenumber: '84787772',
            regionCode: 2
        },

        {
            unit: '建设银行绍兴齐贤支行',
            address: '柯桥区齐贤聚贤街35号',
            phonenumber: '81189121',
            regionCode: 2
        },

        {
            unit: '建设银行绍兴平水支行',
            address: '柯桥区平水镇平绍路阳光华庭小区',
            phonenumber: '81189145',
            regionCode: 2
        },

        {
            unit: '建设银行绍兴福全支行',
            address: '柯桥区福全环岛嘉丰大厦一楼营业厅',
            phonenumber: '81189136',
            regionCode: 2
        },

        {
            unit: '建设银行上虞支行营业部',
            address: '上虞区市民大道666号',
            phonenumber: '81225111',
            regionCode: 3
        },

        {
            unit: '建设银行上虞社保专柜',
            address: '上虞区百官街道市民一路8号区便民服务中心',
            phonenumber: '81225130',
            regionCode: 3
        },

        {
            unit: '建设银行上虞东关支行',
            address: '上虞区东关街道镇东北路',
            phonenumber: '81225166',
            regionCode: 3
        },

        {
            unit: '建设银行上虞海滨支行',
            address: '上虞区沥海镇北门',
            phonenumber: '81225182',
            regionCode: 3
        },

        {
            unit: '建设银行上虞章镇支行',
            address: '上虞区章镇振兴路51号',
            phonenumber: '81225172',
            regionCode: 3
        },

        {
            unit: '建设银行诸暨东风支行',
            address: '诸暨市滨江南路8号',
            phonenumber: '87917133',
            regionCode: 4
        },

        {
            unit: '建设银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '81781955',
            regionCode: 4
        },

        {
            unit: '建设银行诸暨支行营业部',
            address: '诸暨市暨东路68号',
            phonenumber: '87917138',
            regionCode: 4
        },

        {
            unit: '建设银行诸暨璜山支行',
            address: '诸暨市璜山镇建新路２号',
            phonenumber: '87917212',
            regionCode: 4
        },

        {
            unit: '建设银行诸暨枫桥支行',
            address: '诸暨市枫桥镇步森大道295号',
            phonenumber: '87917206',
            regionCode: 4
        },

        {
            unit: '建设银行嵊州支行营业部',
            address: '嵊州市城中路2号',
            phonenumber: '83333099',
            regionCode: 5
        },

        {
            unit: '建设银行新昌支行营业部',
            address: '新昌县人民中路263号',
            phonenumber: '86166227',
            regionCode: 6
        },

        {
            unit: '交通银行绍兴市分行营业部',
            address: '越城区人民中路283号',
            phonenumber: '85202817',
            regionCode: 1
        },

        {
            unit: '交通银行绍兴城东支行',
            address: '越城区延安东路161号',
            phonenumber: '88654142',
            regionCode: 1
        },

        {
            unit: '交通银行绍兴文锦支行',
            address: '越城区环城西路496号',
            phonenumber: '85138437',
            regionCode: 1
        },

        {
            unit: '交通银行绍兴迪荡支行',
            address: '越城区胜利东路377号',
            phonenumber: '85146270',
            regionCode: 1
        },

        {
            unit: '交通银行轻纺城支行营业部',
            address: '金柯桥大道232号',
            phonenumber: '81169210',
            regionCode: 2
        },

        {
            unit: '交通银行上虞支行营业部',
            address: '上虞青春路5号',
            phonenumber: '82426981',
            regionCode: 3
        },

        {
            unit: '交通银行诸暨支行营业部',
            address: '诸暨市暨阳街道环城东路1号',
            phonenumber: '87376922',
            regionCode: 4
        },

        {
            unit: '交通银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '87260776',
            regionCode: 4
        },

        {
            unit: '交通银行诸暨城东支行',
            address: '诸暨市暨阳街道环城东路207号',
            phonenumber: '87261207',
            regionCode: 4
        },

        {
            unit: '交通银行诸暨经济开发区支行',
            address: '诸暨市暨阳街道艮塔西路26-3号',
            phonenumber: '87381599',
            regionCode: 4
        },

        {
            unit: '交通银行诸暨店口支行',
            address: '诸暨市店口镇中央大道海亮商务酒店北侧',
            phonenumber: '87399669',
            regionCode: 4
        },

        {
            unit: '交通银行嵊州支行营业部',
            address: '嵊州大道338号',
            phonenumber: '83011587',
            regionCode: 5
        },

        {
            unit: '交通银行新昌支行营业部',
            address: '新昌人民中路154号',
            phonenumber: '86036609',
            regionCode: 6
        },

        {
            unit: '绍兴银行总行营业部',
            address: '越城区中兴南路1号',
            phonenumber: '85120681',
            regionCode: 1
        },

        {
            unit: '绍兴银行鉴湖支行',
            address: '越城区解放南路1101号',
            phonenumber: '88377695',
            regionCode: 1
        },

        {
            unit: '绍兴银行越城营业部',
            address: '越城区劳动路20号',
            phonenumber: '85122539',
            regionCode: 1
        },

        {
            unit: '绍兴银行新兴产业支行',
            address: '越城区中心北路291号',
            phonenumber: '88013459',
            regionCode: 1
        },

        {
            unit: '绍兴银行镜湖支行',
            address: '越城区马臻路126号',
            phonenumber: '85154590',
            regionCode: 1
        },

        {
            unit: '绍兴银行袍江支行',
            address: '绍兴袍江世纪街越中新天地98号',
            phonenumber: '88175788',
            regionCode: 1
        },

        {
            unit: '绍兴银行开发区支行',
            address: '越城区鲁迅东路147号',
            phonenumber: '88641687',
            regionCode: 1
        },

        {
            unit: '绍兴银行轻纺城支行',
            address: '柯桥区群贤路2003号兴银大厦一楼',
            phonenumber: '81185577',
            regionCode: 2
        },

        {
            unit: '绍兴银行上虞支行',
            address: '上虞区市民大道588号',
            phonenumber: '82195911',
            regionCode: 3
        },

        {
            unit: '绍兴银行诸暨支行',
            address: '诸暨市永昌路1-8号',
            phonenumber: '87021806',
            regionCode: 4
        },

        {
            unit: '绍兴银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '87229175',
            regionCode: 4
        },

        {
            unit: '绍兴银行安华支行',
            address: '诸暨安华镇逸江华庭二号楼110-113号',
            phonenumber: '87979772',
            regionCode: 4
        },

        {
            unit: '绍兴银行店口支行',
            address: '诸暨市店口镇铭仕路8号',
            phonenumber: '87618032',
            regionCode: 4
        },

        {
            unit: '绍兴银行大唐支行',
            address: '诸暨市大唐镇开元西路357号',
            phonenumber: '87731210',
            regionCode: 4
        },

        {
            unit: '绍兴银行嵊州支行',
            address: '嵊州市三江街道一景路2号',
            phonenumber: '83002270',
            regionCode: 5
        },

        {
            unit: '绍兴银行新昌支行',
            address: '新昌县鼓山西路650号',
            phonenumber: '86623658/86021062',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行绍兴市分行营业部',
            address: '越城区延安东路558号',
            phonenumber: '88616558',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴城东支行',
            address: '越城区延安东路312号',
            phonenumber: '88651498',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴城南支行',
            address: '越城区中成公寓17-19号',
            phonenumber: '88052985',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴中兴路支行',
            address: '越城区中兴南路171号',
            phonenumber: '85125950',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴东浦镇支行',
            address: '越城区东浦镇锡麟路155号',
            phonenumber: '85199118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴陶堰镇支行',
            address: '绍兴市陶堰镇陶堰街',
            phonenumber: '88734118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴东湖镇支行',
            address: '越城区中兴南路809--813号',
            phonenumber: '85123544',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴府山桥支行',
            address: '越城区府山西路257号',
            phonenumber: '85166418',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴袍江世纪街营业所',
            address: '袍江世纪街美安居小区26-27号',
            phonenumber: '88157059',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴中兴南路支行',
            address: '越城区中兴南路809、811、813号',
            phonenumber: '85133234',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴马山镇支行',
            address: '越城区马山镇镇中东街22号',
            phonenumber: '88047118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴袍江支行',
            address: '越城区斗门镇王斗公路旁',
            phonenumber: '88038118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴富盛镇支行',
            address: '绍兴市富盛镇倪家娄村566号',
            phonenumber: '88714118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴灵芝镇支行',
            address: '绍兴市灵芝镇凤林西路与后墅路交叉口',
            phonenumber: '85132273',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴鉴湖镇支行',
            address: '越城区环城东路1853号',
            phonenumber: '88651498',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴偏门支行',
            address: '越城区环城西路404-406号',
            phonenumber: '85146152',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴孙端镇支行',
            address: '绍兴市孙端镇又新路12号',
            phonenumber: '88217118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴东街支行',
            address: '越城区东街27号',
            phonenumber: '85135000',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴皋埠镇支行',
            address: '越城区皋埠镇银春路46号',
            phonenumber: '88084118',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行绍兴城北支行',
            address: '越城区中兴北路349号',
            phonenumber: '88260656',
            regionCode: 1
        },

        {
            unit: '邮政储蓄银行柯桥支行营业部',
            address: '柯桥区财智国际商务大厦1幢',
            phonenumber: '84078267',
            regionCode: 2
        },

        {
            unit: '邮政储蓄银行柯桥福全支行',
            address: '绍兴市福全小任家坂',
            phonenumber: '84022118',
            regionCode: 2
        },

        {
            unit: '邮政储蓄银行绍兴市平水镇营业所',
            address: '绍兴市绍兴县平水镇平兴路2号',
            phonenumber: '85767118',
            regionCode: 2
        },

        {
            unit: '邮政储蓄银行柯桥钱清镇营业所',
            address: '柯桥区钱清镇小马路口',
            phonenumber: '84056118',
            regionCode: 2
        },

        {
            unit: '邮政储蓄银行柯桥柯岩支行',
            address: '柯桥区轻纺东区1楼57-58号',
            phonenumber: '84090428',
            regionCode: 2
        },

        {
            unit: '邮政储蓄银行上虞支行营业部',
            address: '上虞区百官街道市民大道1692-1706、1712-B号',
            phonenumber: '82009796',
            regionCode: 3
        },

        {
            unit: '邮政储蓄银行滨海新城沥海镇支行',
            address: '滨海新城沥海镇北门外海滨大道',
            phonenumber: '82771352',
            regionCode: 3
        },

        {
            unit: '邮政储蓄银行诸暨支行营业部',
            address: '诸暨市暨阳街道暨阳路108号',
            phonenumber: '87019142',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨社保专柜',
            address: '诸暨市暨东路58号市公共服务中心',
            phonenumber: '81781953',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨城东支行',
            address: '诸暨市东兴路28号',
            phonenumber: '87019142',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨阮市镇支行',
            address: '诸暨市阮市镇振兴路100号',
            phonenumber: '87601166',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨江藻营业所',
            address: '诸暨市江藻镇共青路',
            phonenumber: '87673112',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨浬浦镇支行',
            address: '诸暨市浬浦镇书院路306号',
            phonenumber: '87741141',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨王家井镇支行',
            address: '诸暨市王家井镇市场南路83号',
            phonenumber: '87571384',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨陈蔡营业所',
            address: '诸暨市东白湖镇陈蔡光明路70号',
            phonenumber: '87951184',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨狮象营业所',
            address: '诸暨市五泄镇五泄路100号',
            phonenumber: '87773202',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨赵家镇支行',
            address: '诸暨市赵家镇保安路95号',
            phonenumber: '87461899',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨石壁营业所',
            address: '诸暨市陈宅镇诸东路',
            phonenumber: '87971134',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行诸暨市枫桥镇支行',
            address: '诸暨市枫桥镇步森大道505号30－33',
            phonenumber: '87042268',
            regionCode: 4
        },

        {
            unit: '邮政储蓄银行嵊州支行营业部',
            address: '嵊州市官河路501号',
            phonenumber: '83182014',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州社保专柜',
            address: '嵊州市鹿山街道长丰路100号',
            phonenumber: '83278087',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州北直街营业所',
            address: '嵊州市东后街41号',
            phonenumber: '83023014',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州城西支行',
            address: '嵊州市长春路113号',
            phonenumber: '83211441',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州谷来营业所',
            address: '嵊州市谷来镇振兴路65号',
            phonenumber: '83900104',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州黄泽镇支行',
            address: '嵊州市黄泽镇东直街2号',
            phonenumber: '83051423',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州三江营业所',
            address: '嵊州市一景路597-605号',
            phonenumber: '83113448',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州城东支行',
            address: '嵊州市剡兴路16号',
            phonenumber: '83346661',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州官河营业所',
            address: '嵊州市官河路262号',
            phonenumber: '83331799',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州鹿山支行',
            address: '嵊州市东南路818号',
            phonenumber: '83298116',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州崇仁镇支行',
            address: '嵊州市崇仁镇新街南路1号',
            phonenumber: '83091303',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行嵊州长乐镇支行',
            address: '嵊州市长乐镇环镇东路238号佳乐苑1幢',
            phonenumber: '83785198',
            regionCode: 5
        },

        {
            unit: '邮政储蓄银行新昌支行营业部',
            address: '新昌县鼓山中路29号',
            phonenumber: '86024493',
            regionCode: 6
        },

        {
            unit: '中国邮政储蓄银行新昌横街营业所',
            address: '新昌县横街37号',
            phonenumber: '86024924',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌镜岭镇支行',
            address: '新昌县镜岭镇振兴路17号',
            phonenumber: '86071115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌回山营业所',
            address: '新昌县回山镇金龙街92号',
            phonenumber: '86076115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌儒岙营业所',
            address: '新昌县儒岙镇天姥路35-2号',
            phonenumber: '86060115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌大市聚营业所',
            address: '新昌县大市聚镇直街23号',
            phonenumber: '86591115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌小将营业所',
            address: '新昌县小将镇小将中路',
            phonenumber: '86081115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌沙溪营业所',
            address: '新昌县沙溪镇新街',
            phonenumber: '86187115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌拔茅营业所',
            address: '新昌县羽林街道拔茅村金三路86号',
            phonenumber: '86096114',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌城东营业所',
            address: '新昌县南明街道江南路118号',
            phonenumber: '86122004',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌南明路支行',
            address: '新昌县阳光路242-248号',
            phonenumber: '86047356',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌澄潭镇支行',
            address: '新昌县澄潭镇凤山大街',
            phonenumber: '86050115',
            regionCode: 6
        },

        {
            unit: '邮政储蓄银行新昌城北支行',
            address: '新昌县七星街道大道西路202号',
            phonenumber: '86256198',
            regionCode: 6
        },

        {
            unit: '恒信银行营业部',
            address: '越城区中兴中路159号',
            phonenumber: '85114474',
            regionCode: 1
        },

        {
            unit: '恒信银行鉴湖支行',
            address: '越城区解放南路1128号',
            phonenumber: '88321184',
            regionCode: 1
        },

        {
            unit: '恒信银行鉴湖支行中兴南路分理处',
            address: '越城区中兴南路559号',
            phonenumber: '88336261',
            regionCode: 1
        },

        {
            unit: '恒信银行鉴湖支行南池分理处',
            address: '越城区城南街道九一村',
            phonenumber: '88060276',
            regionCode: 1
        },

        {
            unit: '恒信银行鉴湖支行坡塘分理处',
            address: '越城区鉴湖镇坡塘村',
            phonenumber: '88060279',
            regionCode: 1
        },

        {
            unit: '恒信银行鉴湖支行联合分理处',
            address: '越城区鉴湖镇南池村',
            phonenumber: '88371704',
            regionCode: 1
        },

        {
            unit: '恒信银行东浦支行',
            address: '越城区东浦镇洋江西路3184-3186号',
            phonenumber: '85199015',
            regionCode: 1
        },

        {
            unit: '恒信银行东浦支行鉴湖分理处',
            address: '越城区东浦镇壶觞村',
            phonenumber: '85190022',
            regionCode: 1
        },

        {
            unit: '恒信银行东浦支行越州分理处',
            address: '越城区越州轻纺工贸园区一区2幢508',
            phonenumber: '85169671',
            regionCode: 1
        },

        {
            unit: '恒信银行东浦支行强头分理处',
            address: '越城区东浦镇强头村',
            phonenumber: '85190540',
            regionCode: 1
        },

        {
            unit: '恒信银行东浦支行金昌分理处',
            address: '越城区东浦镇耶溪路611号',
            phonenumber: '81161980',
            regionCode: 1
        },

        {
            unit: '恒信银行皋埠支行',
            address: '越城区皋埠镇银桥路113号',
            phonenumber: '88084312',
            regionCode: 1
        },

        {
            unit: '恒信银行皋埠支行樊江分理处',
            address: '越城区皋埠镇滨河路',
            phonenumber: '88084120',
            regionCode: 1
        },

        {
            unit: '恒信银行皋埠支行上蒋分理处',
            address: '越城区皋埠镇上蒋澄江',
            phonenumber: '88754146',
            regionCode: 1
        },

        {
            unit: '恒信银行皋埠支行龙山分理处',
            address: '越城区皋埠镇东龙山村',
            phonenumber: '88120630',
            regionCode: 1
        },

        {
            unit: '恒信银行马山支行',
            address: '袍江开发区马山镇海南路2号',
            phonenumber: '88047168',
            regionCode: 1
        },

        {
            unit: '恒信银行马山支行安城分理处',
            address: '袍江开发区世纪街东方都市39-41号',
            phonenumber: '88047369',
            regionCode: 1
        },

        {
            unit: '恒信银行马山支行豆姜分理处',
            address: '袍江开发区马山镇东豆姜村',
            phonenumber: '88152485',
            regionCode: 1
        },

        {
            unit: '恒信银行斗门支行',
            address: '袍江开发区西湖头教育路2―4号',
            phonenumber: '88037456',
            regionCode: 1
        },

        {
            unit: '恒信银行斗门支行袍江分理处',
            address: '袍江开发区寺东街越商大厦3-5号',
            phonenumber: '88221056',
            regionCode: 1
        },

        {
            unit: '恒信银行斗门支行袍谷分理处',
            address: '袍江开发区西一路富陵路口',
            phonenumber: '88131572',
            regionCode: 1
        },

        {
            unit: '恒信银行斗门支行东昌分理处',
            address: '袍江开发区东昌公寓南区96号',
            phonenumber: '88130709',
            regionCode: 1
        },

        {
            unit: '恒信银行斗门支行老街分理处',
            address: '袍江开发区斗门镇百盛路5号',
            phonenumber: '88131183',
            regionCode: 1
        },

        {
            unit: '恒信银行东湖支行',
            address: '越城区东湖镇会龙大道口',
            phonenumber: '88013990',
            regionCode: 1
        },

        {
            unit: '恒信银行东湖支行皋北分理处',
            address: '越城区东湖镇小皋埠村',
            phonenumber: '88084305',
            regionCode: 1
        },

        {
            unit: '恒信银行城西支行',
            address: '越城区胜利西路1197号',
            phonenumber: '85153363',
            regionCode: 1
        },

        {
            unit: '恒信银行镜湖支行',
            address: '越城区灵芝镇洋渎村委旁',
            phonenumber: '88029513',
            regionCode: 1
        },

        {
            unit: '恒信银行镜湖支行灵芝分理处',
            address: '越城区灵芝镇张市村张市路8号',
            phonenumber: '85163839',
            regionCode: 1
        },

        {
            unit: '恒信银行府山支行',
            address: '越城区环城西路情缘龙山商业楼A118号',
            phonenumber: '85090611',
            regionCode: 1
        },

        {
            unit: '恒信银行城东支行',
            address: '越城区鲁迅东路535-539号',
            phonenumber: '88655241',
            regionCode: 1
        },

        {
            unit: '恒信银行迪荡支行',
            address: '越城区胜利东路359号',
            phonenumber: '88312950',
            regionCode: 1
        },

        {
            unit: '恒信银行陶堰支行',
            address: '　',
            phonenumber: '',
            regionCode: 1
        },

        {
            unit: '恒信银行孙端支行',
            address: '　',
            phonenumber: '',
            regionCode: 1
        },

        {
            unit: '恒信银行富盛支行',
            address: '　',
            phonenumber: '',
            regionCode: 1
        },

        {
            unit: '瑞丰银行越州支行',
            address: '越城区环城北路33号',
            phonenumber: '85358175',
            regionCode: 1
        },

        {
            unit: '瑞丰银行新城支行',
            address: '越城区人民东路188号',
            phonenumber: '85202181',
            regionCode: 1
        },

        {
            unit: '瑞丰银行陶堰支行',
            address: '越城区陶堰镇市街',
            phonenumber: '88734265',
            regionCode: 1
        },

        {
            unit: '瑞丰银行富盛支行',
            address: '越城区富盛镇富盛村新纪元公寓2＃楼',
            phonenumber: '88713222',
            regionCode: 1
        },

        {
            unit: '瑞丰银行孙端支行',
            address: '越城区孙端镇中兴路88号鲁易大厦',
            phonenumber: '88210597',
            regionCode: 1
        },

        {
            unit: '瑞丰银行孙端支行皇甫分理处',
            address: '越城区孙端镇张家沥村',
            phonenumber: '88217492',
            regionCode: 1
        },

        {
            unit: '瑞丰银行孙端支行孙端分理处',
            address: '越城区孙端镇见龙路2号',
            phonenumber: '88217265',
            regionCode: 1
        },

        {
            unit: '瑞丰银行营业部行政服务中心分理处',
            address: '柯桥区华舍街道金柯桥大道水务大厦',
            phonenumber: '84138293',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥社保专柜',
            address: '柯桥区华齐路1066号公共服务大楼 ',
            phonenumber: '85679823',
            regionCode: 2
        },

        {
            unit: '瑞丰银营业部',
            address: '柯桥区笛扬路1363号',
            phonenumber: '84569723',
            regionCode: 2
        },

        {
            unit: '瑞丰银行齐贤支行',
            address: '柯桥区齐贤镇阳嘉龙越剑大厦',
            phonenumber: '85181125',
            regionCode: 2
        },

        {
            unit: '瑞丰银行齐贤支行陶里分理处',
            address: '柯桥区齐贤镇陶里汽车站西面',
            phonenumber: '85660603',
            regionCode: 2
        },

        {
            unit: '瑞丰银行羊山支行',
            address: '柯桥区齐贤镇聚贤街53号',
            phonenumber: '85181134',
            regionCode: 2
        },

        {
            unit: '瑞丰银行齐贤支行央茶湖分理处',
            address: '柯桥区齐贤镇镜湖村',
            phonenumber: '85521347',
            regionCode: 2
        },

        {
            unit: '瑞丰银行安昌支行',
            address: '柯桥区安昌镇红桥头村齐大公路北侧',
            phonenumber: '85654406',
            regionCode: 2
        },

        {
            unit: '瑞丰银行安昌支行大和分理处',
            address: '柯桥区安昌镇大和小西庄',
            phonenumber: '85654369',
            regionCode: 2
        },

        {
            unit: '瑞丰银行安昌支行安昌分理处',
            address: '柯桥区安昌镇新街',
            phonenumber: '85640278',
            regionCode: 2
        },

        {
            unit: '瑞丰银行安昌支行昌盛分理处',
            address: '柯桥区安昌镇新街十字路口',
            phonenumber: '85646708',
            regionCode: 2
        },

        {
            unit: '瑞丰银行安昌支行盛陵分理处',
            address: '柯桥区安昌镇盛陵村',
            phonenumber: '85657394',
            regionCode: 2
        },

        {
            unit: '瑞丰银行钱清支行',
            address: '柯桥区钱清镇东江永通国贸大厦',
            phonenumber: '84517921',
            regionCode: 2
        },

        {
            unit: '瑞丰银行新甸支行',
            address: '柯桥区钱清镇新甸',
            phonenumber: '84552289',
            regionCode: 2
        },

        {
            unit: '瑞丰银行钱清支行南钱清分理处',
            address: '柯桥区钱清镇南钱清',
            phonenumber: '84056296',
            regionCode: 2
        },

        {
            unit: '瑞丰银行钱清支行锦江分理处',
            address: '柯桥区钱清镇西后街锦江苑3幢3—4号',
            phonenumber: '84054742',
            regionCode: 2
        },

        {
            unit: '瑞丰银行杨汛桥支行',
            address: '柯桥区杨汛桥镇杨汛商贸中心',
            phonenumber: '84067205',
            regionCode: 2
        },

        {
            unit: '瑞丰银行江桥支行',
            address: '柯桥区杨汛桥镇江桥',
            phonenumber: '81171835',
            regionCode: 2
        },

        {
            unit: '瑞丰银行夏履支行',
            address: '柯桥区夏履镇',
            phonenumber: '84061162',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥支行',
            address: '柯桥区柯桥街道鉴湖路168号',
            phonenumber: '85563906',
            regionCode: 2
        },

        {
            unit: '瑞丰银行双梅支行',
            address: '柯桥区柯桥街道耶溪路248-252号',
            phonenumber: '85563935',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥支行万达广场分理处',
            address: '柯桥区柯桥万达广场步行街11幢1楼',
            phonenumber: '81190180',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥支行柯北分理处',
            address: '柯桥区柯桥街道兴越路1290-1294号',
            phonenumber: '84569931',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥支行柯亭分理处',
            address: '柯桥区柯桥街道万商路800号',
            phonenumber: '84071829',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯桥支行轻纺城分理处',
            address: '柯桥区柯桥街道鉴湖路和育才路交汇处',
            phonenumber: '85563956',
            regionCode: 2
        },

        {
            unit: '瑞丰银行华舍支行',
            address: '柯桥区华舍街道解放居委会41号',
            phonenumber: '84081393',
            regionCode: 2
        },

        {
            unit: '瑞丰银行华舍支行管墅分理处',
            address: '柯桥区华舍街道华墟村',
            phonenumber: '84885273',
            regionCode: 2
        },

        {
            unit: '瑞丰银行华舍支行双周分理处',
            address: '柯桥区华舍街道群贤路太平路口双周小区2幢',
            phonenumber: '81108855',
            regionCode: 2
        },

        {
            unit: '瑞丰银行漓渚支行',
            address: '柯桥区漓渚镇新街',
            phonenumber: '84011240',
            regionCode: 2
        },

        {
            unit: '瑞丰银行漓渚支行棠棣分理处',
            address: '柯桥区漓渚镇红星村',
            phonenumber: '84011321',
            regionCode: 2
        },

        {
            unit: '瑞丰银行漓渚支行漓渚分理处',
            address: '柯桥区漓渚镇横路51号',
            phonenumber: '84014555',
            regionCode: 2
        },

        {
            unit: '瑞丰银行福全支行',
            address: '柯桥区福全镇花为媒汽配城B1',
            phonenumber: '84021248',
            regionCode: 2
        },

        {
            unit: '瑞丰银行福全支行胜利分理处',
            address: '柯桥区福全镇峡山村',
            phonenumber: '84021106',
            regionCode: 2
        },

        {
            unit: '瑞丰银行福全支行金三角分理处',
            address: '柯桥区福全镇金三角47号',
            phonenumber: '84022420',
            regionCode: 2
        },

        {
            unit: '瑞丰银行福全支行福全分理处',
            address: '柯桥区福全镇劳家畈',
            phonenumber: '84023185',
            regionCode: 2
        },

        {
            unit: '瑞丰银行福全支行梅里分理处',
            address: '柯桥区福全镇梅里村',
            phonenumber: '84022889',
            regionCode: 2
        },

        {
            unit: '瑞丰银行兰亭支行',
            address: '柯桥区兰亭镇咸亨佳苑3幢101、201室',
            phonenumber: '84023716',
            regionCode: 2
        },

        {
            unit: '瑞丰银行兰亭支行娄宫分理处',
            address: '柯桥区兰亭镇娄宫农贸市场旁',
            phonenumber: '84601939',
            regionCode: 2
        },

        {
            unit: '瑞丰银行平水支行',
            address: '柯桥区平水镇平兴路1号',
            phonenumber: '85760388',
            regionCode: 2
        },

        {
            unit: '瑞丰银行平水支行平水分理处',
            address: '柯桥区平水镇汽车站旁新大楼',
            phonenumber: '85767188',
            regionCode: 2
        },

        {
            unit: '瑞丰银行平水支行上灶分理处',
            address: '柯桥区平水镇上灶',
            phonenumber: '85722045',
            regionCode: 2
        },

        {
            unit: '瑞丰银行平水支行横溪分理处',
            address: '柯桥区平水镇岔路口',
            phonenumber: '85767346',
            regionCode: 2
        },

        {
            unit: '瑞丰银行平水支行王化分理处',
            address: '柯桥区平水镇宋家店村',
            phonenumber: '85732501',
            regionCode: 2
        },

        {
            unit: '瑞丰银行王坛支行',
            address: '柯桥区王坛镇西后街7号',
            phonenumber: '85788008',
            regionCode: 2
        },

        {
            unit: '瑞丰银行王坛支行稽江分理处',
            address: '柯桥区稽东镇车头',
            phonenumber: '85778393',
            regionCode: 2
        },

        {
            unit: '瑞丰银行王坛支行稽东分理处',
            address: '柯桥区稽东镇竹田头',
            phonenumber: '85779388',
            regionCode: 2
        },

        {
            unit: '瑞丰银行滨海支行',
            address: '柯桥区滨海旺角商贸城',
            phonenumber: '85624702',
            regionCode: 2
        },

        {
            unit: '瑞丰银行马鞍支行',
            address: '柯桥区马鞍镇车站北路47号',
            phonenumber: '85102831',
            regionCode: 2
        },

        {
            unit: '瑞丰银行滨海支行新围分理处',
            address: '柯桥区滨海开发区镜海大道919号-923号、春华路489号-491号',
            phonenumber: '85626011',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯岩支行',
            address: '柯桥区柯岩街道柯南大道与文明路交叉口',
            phonenumber: '84311166',
            regionCode: 2
        },

        {
            unit: '瑞丰银行阮社支行',
            address: '柯桥区柯岩街道信心村绍兴建栋纺织有限公司办公大楼',
            phonenumber: '85563920',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯岩支行新未庄分理处',
            address: '柯桥区柯岩大道332-336号',
            phonenumber: '84310501',
            regionCode: 2
        },

        {
            unit: '瑞丰银行州山支行',
            address: '柯桥区柯岩街道友谊村',
            phonenumber: '84361357',
            regionCode: 2
        },

        {
            unit: '瑞丰银行柯岩支行独山分理处',
            address: '柯桥区柯岩街道笛扬路鉴水人家42幢',
            phonenumber: '84098815',
            regionCode: 2
        },

        {
            unit: '瑞丰银行湖塘支行',
            address: '柯桥区湖塘街道湖塘村西跨湖362号',
            phonenumber: '84382262',
            regionCode: 2
        },

        {
            unit: '瑞丰银行湖塘支行型塘分理处',
            address: '柯桥区湖塘街道东方村',
            phonenumber: '84361320',
            regionCode: 2
        },

        {
            unit: '瑞丰银行湖塘支行湖塘分理处',
            address: '柯桥区湖塘街道湖塘村后畈村',
            phonenumber: '84388070',
            regionCode: 2
        },

        {
            unit: '上虞农商银行总行营业部',
            address: '上虞区德盛路55号',
            phonenumber: '82112550',
            regionCode: 3
        },

        {
            unit: '上虞农商银行社保专柜',
            address: '上虞区市民中心一路8号区便民服务中心',
            phonenumber: '82112063',
            regionCode: 3
        },

        {
            unit: '上虞农商银行东关支行',
            address: '上虞区东关街道建东西路1号',
            phonenumber: '82570187',
            regionCode: 3
        },

        {
            unit: '上虞农商银行道墟支行',
            address: '上虞区道墟镇泾肖北路1号',
            phonenumber: '82519291',
            regionCode: 3
        },

        {
            unit: '上虞农商银行曹娥支行',
            address: '上虞区曹娥街道人民中路108号',
            phonenumber: '82213525',
            regionCode: 3
        },

        {
            unit: '上虞农商银行梁湖支行',
            address: '上虞区梁湖镇华光村',
            phonenumber: '82439597',
            regionCode: 3
        },

        {
            unit: '上虞农商银行汤浦支行',
            address: '上虞区汤浦镇舜源头路104号',
            phonenumber: '82336514',
            regionCode: 3
        },

        {
            unit: '上虞农商银行上浦支行',
            address: '上虞区上浦镇新街',
            phonenumber: '82366356',
            regionCode: 3
        },

        {
            unit: '上虞农商银行丰惠支行',
            address: '上虞区丰惠镇人民路135号',
            phonenumber: '82872008',
            regionCode: 3
        },

        {
            unit: '上虞农商银行永和支行',
            address: '上虞区永和镇永梁路4号',
            phonenumber: '82931357',
            regionCode: 3
        },

        {
            unit: '上虞农商银行小越支行',
            address: '上虞区小越镇越兴西路2号',
            phonenumber: '82036302',
            regionCode: 3
        },

        {
            unit: '上虞农商银行章镇支行',
            address: '上虞区章镇镇开发区章丰公路199号',
            phonenumber: '82096033',
            regionCode: 3
        },

        {
            unit: '上虞农商银行驿亭支行',
            address: '上虞区驿亭镇振新北路',
            phonenumber: '82415992',
            regionCode: 3
        },

        {
            unit: '上虞农商银行崧厦支行',
            address: '上虞区崧厦镇环城东路269号',
            phonenumber: '82061300',
            regionCode: 3
        },

        {
            unit: '上虞农商银行沥海支行',
            address: '滨海新城沥海镇海城路1号',
            phonenumber: '82778789',
            regionCode: 3
        },

        {
            unit: '上虞农商银行虞城支行',
            address: '上虞区人民中路250号',
            phonenumber: '82211014',
            regionCode: 3
        },

        {
            unit: '上虞农商银行下管支行',
            address: '上虞区下管镇工商南路15号',
            phonenumber: '82891025',
            regionCode: 3
        },

        {
            unit: '上虞农商银行百官支行',
            address: '上虞区百官街道解放街203号',
            phonenumber: '81225585',
            regionCode: 3
        },

        {
            unit: '上虞农商银行新区支行',
            address: '杭州湾上虞工业园区纬九路',
            phonenumber: '82738198',
            regionCode: 3
        },

        {
            unit: '上虞农商银行东关支行长塘分理处',
            address: '上虞区长塘镇新街',
            phonenumber: '82599075',
            regionCode: 3
        },

        {
            unit: '上虞农商银行下管支行陈溪分理处',
            address: '上虞区陈溪乡大庙',
            phonenumber: '82922016',
            regionCode: 3
        },

        {
            unit: '上虞农商银行下管支行丁宅分理处',
            address: '上虞区丁宅乡上宅村',
            phonenumber: '82811524',
            regionCode: 3
        },

        {
            unit: '上虞农商银行下管支行岭南分理处',
            address: '上虞区岭南乡丰树坪村',
            phonenumber: '82912526',
            regionCode: 3
        },

        {
            unit: '上虞农商银行新区支行盖北分理处',
            address: '上虞区盖北镇新河村',
            phonenumber: '82739810',
            regionCode: 3
        },

        {
            unit: '上虞农商银行新区支行谢塘分理处',
            address: '上虞区谢塘镇晋生街76号',
            phonenumber: '82076040',
            regionCode: 3
        },

        {
            unit: '诸暨农商银行社保专柜',
            address: '诸暨市行政服务中心',
            phonenumber: '80707726',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行赵家支行东和分理处',
            address: '诸暨市东和乡',
            phonenumber: '87471773',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行牌头支行同山分理处',
            address: '诸暨市同山镇',
            phonenumber: '87561107',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行五泄支行马剑分理处',
            address: '诸暨市马剑镇',
            phonenumber: '87781142',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行璜山支行岭北分理处',
            address: '诸暨市岭北镇',
            phonenumber: '87991110',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行应店街支行',
            address: '诸暨市应店街镇',
            phonenumber: '87081924',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行应店街支行十二都分理处',
            address: '诸暨市应店街镇十二都村',
            phonenumber: '87811203',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行应店街支行云石分理处',
            address: '诸暨市应店街镇乌石庙村',
            phonenumber: '87087439',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行次坞支行',
            address: '诸暨市次坞镇',
            phonenumber: '87852222',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行次坞支行大桥分理处',
            address: '诸暨市次坞镇大桥村',
            phonenumber: '87866910',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行次坞支行思安分理处',
            address: '诸暨市次坞镇凰桐村',
            phonenumber: '87861607',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行直埠支行',
            address: '诸暨市直埠镇',
            phonenumber: '87641556',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行直埠支行姚公埠分理处',
            address: '诸暨市直埠镇桌东村',
            phonenumber: '87648173',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行暨阳支行',
            address: '诸暨市滨江北路38号',
            phonenumber: '87012401',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行城中支行',
            address: '诸暨市艮塔东路29号',
            phonenumber: '87115103',
            regionCode: 4
        },

        {
            unit: '诸暨农商银行街亭支行',
            address: '诸暨市街亭镇',
            phonenumber: '87361330',
            regionCode: 4
        },

        {
            unit: '嵊州农村合作银行社保专柜',
            address: '嵊州市鹿山街道长丰路100号',
            phonenumber: '83278089',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行营业部',
            address: '嵊州市剡湖街道官河路398号',
            phonenumber: '83180317',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行城关支行',
            address: '嵊州市剡湖街道嵊州大道255号',
            phonenumber: '83182545',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行鹿山支行',
            address: '嵊州市鹿山街道东南路434-442号',
            phonenumber: '83226288',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行三江支行',
            address: '嵊州市三江城惠民街121-137号',
            phonenumber: '83345111',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行甘霖支行',
            address: '嵊州市甘霖镇秀山路农贸市场综合大楼',
            phonenumber: '83061287',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行甘霖支行博济分理处',
            address: '嵊州市甘霖镇博济直街',
            phonenumber: '83611575',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行长乐支行',
            address: '嵊州市长乐镇商业街1号',
            phonenumber: '83071282',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行长乐支行贵门分理处',
            address: '嵊州市贵门乡贵门村',
            phonenumber: '83712543',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行石璜支行',
            address: '嵊州市石璜镇会稽路',
            phonenumber: '83691206',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行谷来支行',
            address: '嵊州市谷来镇来山路',
            phonenumber: '83900629',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行谷来支行王院分理处',
            address: '嵊州市王院乡王院村',
            phonenumber: '83940373',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行崇仁支行',
            address: '嵊州市崇仁镇镇东路新综合楼',
            phonenumber: '83092143',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行三界支行',
            address: '嵊州市三界镇青春路1号',
            phonenumber: '83083266',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行仙岩支行',
            address: '嵊州市仙岩镇仙岩村化工路南侧',
            phonenumber: '83150773',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行下王支行',
            address: '嵊州市下王镇市心街',
            phonenumber: '83190815',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行浦口支行',
            address: '嵊州市浦口街道浦口村',
            phonenumber: '83165666',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行黄泽支行',
            address: '嵊州市黄泽镇东直街',
            phonenumber: '83055636',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行金庭支行',
            address: '嵊州市金庭镇华堂村',
            phonenumber: '83515866',
            regionCode: 5
        },

        {
            unit: '嵊州农村合作银行金庭支行北漳分理处',
            address: '嵊州市北漳镇溪东路1－5号',
            phonenumber: '83581266',
            regionCode: 5
        },

        {
            unit: '新昌农商银行营业部',
            address: '新昌县七星街道七星路18号',
            phonenumber: '86266976',
            regionCode: 6
        },

        {
            unit: '新昌农商银行城西支行',
            address: '新昌县南明街道人民西路216号',
            phonenumber: '86229982',
            regionCode: 6
        },

        {
            unit: '新昌农商银行城东支行',
            address: '新昌县南明街道江南北路122-138号',
            phonenumber: '86026147',
            regionCode: 6
        },

        {
            unit: '新昌农商银行城中支行',
            address: '新昌县南明街道鼓山东路167号',
            phonenumber: '86383985',
            regionCode: 6
        },

        {
            unit: '新昌农商银行澄潭支行',
            address: '新昌县澄潭镇凤山大街18号',
            phonenumber: '',
            regionCode: 6
        },

        {
            unit: '新昌农商银行大市聚支行',
            address: '新昌县大市聚镇新街76号',
            phonenumber: '',
            regionCode: 6
        },

        {
            unit: '新昌农商银行儒岙支行',
            address: '新昌县儒岙镇天姥一路1号',
            phonenumber: '',
            regionCode: 6
        }

    ];
    //获取主副卡的数据
    var getCards = function() {
        return { code: '10000', message: '查询成功', body: cards };
    };
    //获取办卡流程的数据
    var getProcessDatas = function() {
        return { code: '10000', message: '查询成功', body: processDatas };
    };
    //获取账户数据
    var getAccountData = function() {
        return { code: '10000', message: '查询成功', body: accountData };
    };

    //获取市民区域数据
    var getCitizenArea = function() {
        return { code: '1000', message: '查询成功', body: citizenArea };
    };
    var getAddress = function() {
        return { code: '1000', message: '查询成功', body: citizenAddress };
    };

    return {
        getCards: getCards,
        getProcessDatas: getProcessDatas,
        getAccountData: getAccountData,
        getCitizenArea: getCitizenArea,
        getAddress: getAddress
    };

});