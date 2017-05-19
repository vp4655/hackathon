/**
 * Router
 * @namespace Router
 */
(function(){
    'use strict';

    angular.module('app').run(runner);

    runner.$inject = ['PermissionStore', '$sessionStorage'];

    function runner (PermissionStore, $sessionStorage) {
        PermissionStore.definePermission('anonymous', function(){
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
    function RouterConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/map");

        var getView = function (module) {
            return './js/modules/' + module + '/' + module + '.html';
        };

        var getSubView = function (module, submodule) {
            return './js/modules/' + module + '/' + module + '.' + submodule + '.html';
        };

        $stateProvider
            .state('amex', {
                views: {
                    header: {
                        templateUrl: getView('navbar')
                    },
                    modals: {
                        templateUrl: getView('modals')
                    },
                    main: {},
                    login: {}
                }
            })
                .state('amex.index', {
                    url: '/rankings',
                    data: {
                        permissions: {
                            except: ['anonymous'],
                            redirectTo: 'login'
                        }
                    },
                    views: {
                        'main@amex': {
                            templateUrl: getView('main')
                        }
                    }
                })
                .state('amex.participants', {
                    url: '/participants',
                    data: {
                        permissions: {
                            except: ['anonymous'],
                            redirectTo: 'login'
                        }
                    },
                    views: {
                        'main@amex': {
                            templateUrl: getView('participants')
                        }
                    }
                })
                .state('amex.map', {
                    url: '/map',
                    data: {
                        permissions: {
                            except: ['anonymous'],
                            redirectTo: 'login'
                        }
                    },
                    views: {
                        'main@amex': {
                            templateUrl: getView('map')
                        }
                    }
                })
            .state('login',{
                url: '/login',
                views: {
                    'login@': {
                        templateUrl:getView('login')
                    }
                }
            });


        //$locationProvider.html5Mode(true);
    }
})();