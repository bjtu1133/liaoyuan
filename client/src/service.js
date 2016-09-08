'use strict'
export default function service(moduleName){
  let app = angular.module(moduleName);
  console.log("creating Service");
  app.factory('Salary',($resource) => {
    console.log("salary");
    return $resource('/salary',null,{
      'get' : {method : 'GET', isArray : false},
      'getSalaryDetail' : {method : 'POST', isArray : true} 
    });
  });
}
