export default function route (moduleName){
  let app = angular.module(moduleName);
  app.config(($stateProvider,$urlRouterProvider)=>{
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('form',{
      url : '/',
      templateUrl: './template/form.html',
      controller : 'formController'
    });
  });
}
