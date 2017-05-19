/**
 * Initialization
 * @desc Initializes angular global modules and their dependencies
 * @namespace Initialization
 */
(function(){
    'use strict';

    angular.module('app',[
        'ngMaterial',
        'app.config',
        'app.constants',
        'app.filters',
        'app.routes',
        'app.services',
        'app.directives',
        'app.controllers'
    ]);

    angular.module('app.routes', ['ui.router', 'permission']);

    angular.module('app.config', ['ngStorage', 'uiGmapgoogle-maps']);

    angular.module('app.constants', []);

    angular.module('app.services', ['restangular']);

    angular.module('app.controllers', ['ui.bootstrap', 'ngStorage', 'uiGmapgoogle-maps', 'angularSpinner']);

    angular.module('app.directives', ['ngSanitize', 'angularSpinner', 'angularFileUpload']);

    angular.module('app.filters', []);

})();
