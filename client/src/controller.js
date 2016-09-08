"use strict"

import babyparse from "../../node_modules/babyparse/babyparse";
export default function controller (moduleName){
  let app = angular.module(moduleName);

  app.controller('formController', (Salary,$stateParams,$scope)=>{
    console.log('creating controller');

    $scope.employees = [];
    $scope.results = [];
    $scope.data = {};

    let filesInput = document.getElementById('file');

    filesInput.addEventListener("change",(event)=>{
      console.log('change');
      let file = event.target.files[0];
      if(file){
        let reader = new FileReader();
        reader.onload = (event)=>{
          let result = babyparse.parse(event.target.result,{'header':true});
          console.log(result);
          if(result && result.data &&result.data.length && result.data.length > 0){
              result.data.forEach((currentValue)=>{

                $scope.addNewRow({
                  'name' : currentValue['姓名'],
                  'salaryBase' :currentValue['基本工资']*1,
                  'score' :currentValue['绩效评分'],
                  'houseAccRate' :currentValue['公积金']*1
                });
                $scope.$apply();
              });
          }
        }
        reader.readAsText(file);
      }

    });

    $scope.addNewRow = (value)=>{
      value = (value) ? value : {};
      console.log("Add New");
      $scope.employees.push({
        'name' : '',
        'salaryBase' : 0,
        'score' : '',
        'houseAccRate' : 0,
        'value' : value
      });
    };
    
    $scope.submit = ()=>{
      let reqWrapper = {};
      let data = [];

      $scope.employees.forEach((currentValue) => {
        data.push({
          'name' : currentValue.value.name,
          'salary' : currentValue.value.salaryBase,
          'score' : currentValue.value.score,
          'accFundRate' : currentValue.value.houseAccRate
        });
      });

      reqWrapper.data = data;

      Salary.getSalaryDetail([],reqWrapper,
        (res)=>{
          console.log(res);
          $scope.employees = [];
          $scope.results = res;
        },
        ()=>{console.log("error")});
    };
  });
}
