'use strict';

/**
 * @ngdoc function
 * @name chordReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chordReaderApp
 */
angular.module('chordReaderApp')
	.controller('MainCtrl', function($rootScope, $scope) {

		$rootScope.currentPage = 'home';

		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma',
			'Fourth thing'
		];
	});