angular.module('directives.navbar', [])
.directive('navbar', ['AuthService', 'LoginModalService', function(AuthService, LoginModalService) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'assets/angular/directives/navbar/navbar.html',
		controller: function($scope, $element) {

			var updateCurrentUser = function() {
				$scope.currentUser = AuthService.currentUser();
				console.log("UPDATING CURRENTUSER");
			};

			updateCurrentUser();

			AuthService.registerObserverCallback(updateCurrentUser);

			$scope.showLoginModal = function(){
				LoginModalService.displayLoginModal();
		  };

		  $scope.logout = function(){
				AuthService.logout()
				.then(function(data){
					$location.path('/login');
				})
			}

			$scope.selectLink = function(id) {
				if (!AuthService.currentUser().email) {
					switch (id) {
						case 1:
							$scope.loggedOutPublicLink.addClass("navbar-selected");
							$scope.loginLink.removeClass("navbar-selected");
							break;
						case 0:
							$scope.showLoginModal();
							$scope.loginLink.addClass("navbar-selected");
							$scope.loggedOutPublicLink.removeClass("navbar-selected");
							break;
					}
				}
				else {
					switch (id) {
						case 2:
							$scope.logout();
							$scope.nameLink.addClass("navbar-selected");
							$scope.friendsLink.removeClass("navbar-selected");
							$scope.publicLink.removeClass("navbar-selected");
							break;
						case 1:
							$scope.friendsLink.addClass("navbar-selected");
							$scope.nameLink.removeClass("navbar-selected");
							$scope.publicLink.removeClass("navbar-selected");
							break;
						case 0:
							$scope.publicLink.addClass("navbar-selected");
							$scope.nameLink.removeClass("navbar-selected");
							$scope.friendsLink.removeClass("navbar-selected");
							break;
					}
				}
			}
		},
		link: function(scope, element, attrs) {
			var loggedOutNavEl = angular.element(document.getElementsByClassName('navbar-links logged-out'));
			var loggedOutListEl = angular.element(loggedOutNavEl[0].getElementsByClassName('navbar-select-line'));
			var loggedInNavEl = angular.element(document.getElementsByClassName('navbar-links logged-in'));
			var loggedInListEl = angular.element(loggedInNavEl[0].getElementsByClassName('navbar-select-line'));

			scope.loggedOutPublicLink = angular.element(loggedOutListEl[1]);
			scope.loginLink = angular.element(loggedOutListEl[0]);

			scope.publicLink = angular.element(loggedInListEl[2]);
			scope.friendsLink = angular.element(loggedInListEl[1]);
			scope.nameLink = angular.element(loggedInListEl[0]);

			scope.publicLink.addClass("navbar-selected");
			scope.loggedOutPublicLink.addClass("navbar-selected");
		}
	};
}]);