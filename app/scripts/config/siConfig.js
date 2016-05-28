'use strict';

/**
 * @ngdoc constant
 * @name RstFrontH5.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('RstFrontH5')
  .constant('siConfig', {
    //this is fake data
    statu: 'dev-fake', //dev, dev-fake, dev-http,stg, prd
    version: '2.1.x',
    serverName_dev: 'http://10.20.8.249:8083/mhis-siapp',
    //serverName_dev: 'https://test-mhis-siapp.pingan.com.cn:57443/mhis-siapp',
    serverName_stg: 'https://test-mhis-siapp.pingan.com.cn:57443/mhis-siapp',
    serverName_prd: 'https://ehs.pingan.com.cn/mhis-siapp'
  });

  // development
  // .constant('API_ENDPOINT', {
  //   host: 'http://localhost',
  //   port: 3000,
  //   path: '',
  //   needsAuth: false
  // });


  // live example with HTTP Basic Auth
  /*
  .constant('API_ENDPOINT', {
    host: 'http://yourserver.com',
    path: '/api/v2',
    needsAuth: true,
    username: 'whatever',
    password: 'foobar'
  });
  */
