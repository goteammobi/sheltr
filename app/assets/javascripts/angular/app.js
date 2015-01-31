angular.module('sheltr', [
	'ui.router',
	'ngRoute',
	'ngResource',
	'ngCookies',
	'common.authentication',
	'controllers.mainCtrl',
	'controllers.homeCtrl',
	'directives.navbar',
	'directives.loginModal',
	'directives.loginDialogBox',
	'directives.loginOriginal',
	'services.authService',
	'services.loginModalService',
])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomeCtrl',
			templateUrl: 'assets/angular/views/home.html'
		});
		$urlRouterProvider.otherwise('/');
	}
]);