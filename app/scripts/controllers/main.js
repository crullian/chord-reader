'use strict';

/**
 * @ngdoc function
 * @name chordReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chordReaderApp
 */
angular.module('chordReaderApp')
	.controller('MainCtrl', function($rootScope, $scope, chordFingeringService) {

    chordFingeringService.on('ready', function () {
      console.log('Hey what are the fingerings for the chord of C?');
      console.log(chordFingeringService.getFingerings('C'));
    });

		$rootScope.currentPage = 'home';

		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma',
			'Fourth thing'
		];
	});