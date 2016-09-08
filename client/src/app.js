import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import controller from './controller';
import route from './route';
import service from './service';
let moduleName = 'salaryCalculator'
angular.module(moduleName,['ui.router','ngResource']);
service(moduleName);
controller(moduleName);
route(moduleName);
