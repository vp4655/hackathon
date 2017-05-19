/**
 * Router
 * @namespace Router
 */
(function() {
    'use strict';

    angular.module('app').run(runner);

    runner.$inject = ['PermissionStore', '$sessionStorage'];

    function runner(PermissionStore, $sessionStorage) {
        PermissionStore.definePermission('anonymous', function() {
            return !$sessionStorage.token;
        });
    }

    angular.module('app.routes').config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /**
     * @namespace RouterConfig
     * @name RouterConfig
     * @desc Routing configuration on angular frontend MVC
     * @memberOf Router
     * @param $stateProvider
     * @param $urlRouterProvider
     * @constructor
     */
    function RouterConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        var getView = function(module) {
            return './js/modules/' + module + '/' + module + '.html';
        };

        var getSubView = function(module, submodule) {
            return './js/modules/' + module + '/' + module + '.' + submodule + '.html';
        };

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: getView('navbar'),
                        controller: 'NavbarController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('dashboard', {
                parent: 'app',
                url: '/dashboard',
                // data: {
                //     permissions: {
                //         except: ['anonymous'],
                //         redirectTo: 'login'
                //     }
                // },
                views: {
                    'main@': {
                        templateUrl: getView('dashboard'),
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'login@': {
                        templateUrl: getView('login'),
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();