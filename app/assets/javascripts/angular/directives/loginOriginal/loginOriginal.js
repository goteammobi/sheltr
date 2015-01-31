angular.module('directives.loginOriginal', [])
.directive('loginOriginal', ['AuthService', 'LoginModalService', function(AuthService, LoginModalService) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'assets/angular/directives/loginOriginal/loginOriginal.html',
		controller: function($scope, $element) {

			function initForm() {
				$scope.email = "";
				$scope.password = "";
			}

			$scope.login = function(email, password){
		  	AuthService.login(email, password)
		  	.then(function(data) {
		  		if(data.success){
						AuthService.redirectToAttemptedUrl();
        		LoginModalService.hideLoginModal();
		  		}
		  		else {
			      initForm();
			      console.log(data);
		  		}
		  	});
		  };
		},
		link: function(scope, element, attrs) {

		}
	}
}]);