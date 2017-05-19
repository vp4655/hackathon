(function(){
    "use strict";

    angular.module('app.config').config(jwtConfiguration);

    jwtConfiguration.$inject = ['$httpProvider'];

    function jwtConfiguration($httpProvider){
        $httpProvider.interceptors.push(['$q', '$location', '$sessionStorage', function ($q, $location, $sessionStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (angular.isDefined($sessionStorage.token)) {
                        config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }

})();