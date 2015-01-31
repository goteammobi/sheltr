angular.module('directives.loginDialogBox', [])
.directive('loginDialogBox', ['AuthService', 'LoginModalService', function(AuthService, LoginModalService) {
	return {
		restrict: 'AE',
		scope: {
			showLoginOriginal: '='
		},
		templateUrl: 'assets/angular/directives/loginDialogBox/loginDialogBox.html',
		controller: function($scope, $element) {

			$scope.displayLoginOriginal = function() {
				$scope.showLoginOriginal = true;
			};

			$scope.facebookLogin = function() {
		    AuthService.loginWithFacebook()
		    .then(function(response) {
		      AuthService.redirectToAttemptedUrl();
        	LoginModalService.hideLoginModal();
		    })
			};
		},
		link: function(scope, element, attrs) {

		}
	}
}]);