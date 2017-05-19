(function() {
    'use strict';

    angular.module('app.services').factory('AuthService', AuthService);

    AuthService.$inject = ['$sessionStorage', 'API', '$timeout', '$q', 'Restangular'];

    function AuthService($sessionStorage, API, $timeout, $q, Restangular) {

        return {
            login: function(user) {
                return $q(function(resolve, reject) {
                    resolve({
                        token: 'jok'
                    })
                });
            },
            logout: function() {
                return $q(function(resolve, reject) {
                    var tokenClaims = {};
                    delete $sessionStorage.token;
                    $timeout(function() {
                        resolve();
                    }, 110);
                });
            },
            logoutOnLeave: function() {
                delete $sessionStorage.token;
            },
            getTokenClaims: function() {
                return $q(function(resolve, reject) {
                    var claims = getClaimsFromToken();

                    if (claims) {
                        resolve(claims);
                    } else {
                        reject('Could not get token claims');
                    }
                });
            },
            getCurrentUser: function() {
                return $q(function(resolve, reject) {
                    var token = $sessionStorage.token;
                    //var currentUser = getClaimsCurrent(token);
                    var currentUser = {
                        username: 'jok',
                        id: 1
                    };

                    if (currentUser) {
                        resolve(currentUser);
                    } else {
                        reject('There is no current user');
                    }

                });
            }
        };

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');

            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);

        }

        function getClaimsFromToken() {
            if ($sessionStorage.token) {
                var token = $sessionStorage.token;
            }
            var user = {};

            if (typeof token != 'undefined') {
                var encode = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encode));
            }

            return user;

        }

        function getClaimsCurrent(token) {
            var user = {};

            if (typeof token != 'undefined' && token != null) {
                var encode = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encode));
            }

            return user;

        }
    }

})();