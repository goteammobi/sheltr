/* Authentication module, redirects to homepage if not logged in */
angular.module('common.authentication', [])

.config(function($httpProvider){
  // Intercepts every http request.  If the response is success, pass it through.  If the response is an
  // error, and that error is 401 (unauthorised) then the user isn't logged in, redirect to the login page 
  var interceptor = function($q, $location, $rootScope, $injector) {
    return {
      'responseError': function(rejection) {
        if (rejection.status == 401) {
          console.log("Authentication Interrcept");
          $rootScope.$broadcast('event:unauthorized');
          var AuthService = $injector.get('AuthService');
          var LoginModalService = $injector.get('LoginModalService');
          if($location.path() != '/login' && $location.path() != '/sign_up'){
            AuthService.setAttemptedUrl($location.path());
            LoginModalService.displayLoginModal();
          }
        }
        return $q.reject(rejection);        
      }
    };
  };

  $httpProvider.interceptors.push(interceptor);
});