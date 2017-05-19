/**
 * Login Controller
 * @namespace Controller
 */
(function() {
    'use strict';

    angular.module('app.controllers').controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$sessionStorage', '$state', 'UserService', 'usSpinnerService'];

    function LoginController(AuthService, $sessionStorage, $state, UserService, usSpinnerService) {
        var vm = this;

        vm.loginOpened = true;
        vm.user = {};
        vm.login = login;

        function login() {
            $state.go('dashboard');

            // usSpinnerService.spin('spinner-1');
            // AuthService.login(vm.user).then(function(response) {
            //     $sessionStorage.token = response.token;

            //     var user = AuthService.getCurrentUser().then(function(response) {
            //         UserService.setUserProfile(response.sub, response).then(function() {
            //             $state.go('amex.map');
            //         }, function(error) {
            //             console.error(error);
            //             usSpinnerService.stop('spinner-1');
            //         });
            //     });
            // });
        }
    }
})();