angular.module('services.authService', ['ngCookies'])
.factory('AuthService', 
  ['$q', '$http', '$location', '$window', '$cookieStore', 'LoginModalService',
  function($q, $http, $location, $window, $cookieStore, LoginModalService){

	var current_user = {
		email: null,
		id: null
  };

  var clearCurrentUser = function() {
    current_user = {
      email: null,
      id: null
    };
  };

  var setCurrentUser = function() {
    current_user.email = $cookieStore.get('X-API-EMAIL');
    current_user.id = $cookieStore.get('X-API-USER-ID');
  }

  var getAuth = function() {
    return {
      'X-API-EMAIL': $cookieStore.get('X-API-EMAIL'),
      'X-API-TOKEN': $cookieStore.get('X-API-TOKEN')
    };
  };

  var setAuth = function(auth) {
    $cookieStore.put("X-API-EMAIL", auth.email);
    $cookieStore.put("X-API-TOKEN", auth.auth_token);
    $cookieStore.put("X-API-USER-ID", auth.id);

    setCurrentUser();
  }

  var removeAuth = function(auth) {
    $cookieStore.remove('X-API-EMAIL');
    $cookieStore.remove('X-API-TOKEN');
    $cookieStore.remove('X-API-USER-ID');
  }

  var attemptedUrl = '/';

  var observerCallbacks = [];

  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

	return{
    registerObserverCallback: function(callback) {
      observerCallbacks.push(callback);
    },
    loginWithFacebook: function() {
      var deferred = $q.defer();

      FB.login(function(response){
        if (response.authResponse) {
          req = {
            method: 'GET',
            url: '/users/auth/facebook/callback'
          }

          $http(req)
          .success(function(data){
            setAuth({
              email: data.user.email,
              auth_token: data.user.auth_token,
              id: data.user.id
            });

            setCurrentUser();

            notifyObservers();

            deferred.resolve(data);
          })
        }
      });

      return deferred.promise;
    },
		login: function(email, password){
      var deferred = $q.defer();

      var req = {
        method: 'POST',
        url: '/users/sign_in.json',
        data: {
          email: email,
          password: password
        }
      };

      $http(req)
      .success(function(data){
        setAuth({
          email: data.user.email,
          auth_token: data.user.auth_token,
          id: data.user.id
        });

        setCurrentUser();
        
        deferred.resolve(data);
      })
      .error(function(data){
        deferred.resolve(data);
      });

      return deferred.promise;
		},
		logout: function(){
      var deferred = $q.defer();

      var req = {
        method: 'DELETE',
        url: '/users/sign_out.json',
        headers: getAuth()
      };

      $http(req)
      .success(function(data){
        removeAuth();
        clearCurrentUser();
        $window.location.reload();
      });

      return deferred.promise;
		},
		signUp: function(email, password, password_confirmation){
      var deferred = $q.defer();

      var req = {
        method: 'POST',
        url: '/users.json',
        data: { 
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      };

      $http(req)
      .success(function(data){
        setAuth({
          email: data.user.email,
          auth_token: data.user.auth_token,
          id: data.user.id
        });

        setCurrentUser();

        deferred.resolve(data);
      });

      return deferred.promise;
		},
		currentUser: function(){
      if(current_user.id === null){
        setCurrentUser();
      }

			return current_user
		},
    setAttemptedUrl: function(url){
      attemptedUrl = url;
    },
    redirectToAttemptedUrl: function(){
      $location.path(attemptedUrl);
    }
	}
}]);