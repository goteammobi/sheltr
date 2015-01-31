angular.module('services.loginModalService', [])
.factory('LoginModalService', [function() {
	var showLoginModal = false;

	var observerCallbacks = [];

  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

	return {
		registerObserverCallback: function(callback) {
      observerCallbacks.push(callback);
    },
    displayLoginModal: function() {
    	showLoginModal = true;
    	notifyObservers();
    },
    hideLoginModal: function() {
    	showLoginModal = false;
    	notifyObservers();
    },
    showLoginModal: function() {
    	return showLoginModal;
    }
  }
}]);