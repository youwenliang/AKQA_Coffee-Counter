'use strict';

/**
 * @ngdoc function
 * @name coffeecounterWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coffeecounterWebApp
 */
angular.module('coffeecounterWebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
