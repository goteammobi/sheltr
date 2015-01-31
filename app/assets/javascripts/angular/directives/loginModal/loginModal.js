angular.module('directives.loginModal', [])
.directive('loginModal', ['LoginModalService', function(LoginModalService) {
	return {
		restrict: 'AE',
		scope: {},
		transclude: true,
		templateUrl: 'assets/angular/directives/loginModal/loginModal.html',
		controller: function($scope, $element) {

			function initModal() {
				$scope.displayModal = false;
				$scope.show = false;
			}

			$scope.showModal = function() {
				$scope.displayModal = true;
				$scope.show = true;
			};

			$scope.hideModal = function() {
				$scope.displayModal = false;
				$scope.show = false;
				$scope.showLoginOriginal = false;
			};

			var updateLoginModal = function() {
				if(LoginModalService.showLoginModal()) {
					$scope.showModal();
				}
				else {
					$scope.hideModal();
				}
			}

			LoginModalService.registerObserverCallback(updateLoginModal);
		},
		link: function(scope, element, attrs) {
			scope.displayModal = false;
		}
	}

}]);