/**
 * Login Controller
 * @namespace Controller
 */
(function(){
    'use strict';

    angular.module('app.controllers').controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$sessionStorage', '$state', 'UserService', 'usSpinnerService'];

    /**
     * @namespace LoginController
     * @desc Controller for login handling
     * @memberOf Controller
     * @param AuthService
     * @param $sessionStorage
     * @param $state
     * @param UserService
     * @constructor
     */
    function LoginController(AuthService, $sessionStorage, $state, UserService, usSpinnerService) {
        var vm = this;

        vm.loginOpened = true;
        vm.user = {};
        vm.login = login;

        function login(){
            usSpinnerService.spin('spinner-1');
            AuthService.login(vm.user).then(function(response){
                $sessionStorage.token = response.token;

                var user = AuthService.getCurrentUser().then(function(response) {
                    UserService.setUserProfile(response.sub, response).then(function(){
                        $state.go('amex.map');
                    }, function(error){
                        console.error(error);
                        usSpinnerService.stop('spinner-1');
                    });
                });
            });
        }
    }
})();