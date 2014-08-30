'use strict';

/**
 * @ngdoc function
 * @name chordReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chordReaderApp
 */
angular.module('chordReaderApp')
	.controller('AboutCtrl', function($rootScope, $scope) {

		$rootScope.currentPage = 'about';

		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});