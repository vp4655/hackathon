/**
 * Login Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('loginModal', LoginModal);

    LoginModal.$inject = ['$state'];

    /**
     * @namespace LoginModalDirective
     * @desc Directive for login form
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function LoginModal($state) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/login-modal.html',
            link: function (scope, element, attributes) {
                scope.login = scope.vm.login;
            }
        };

        return directive;
    }

})();