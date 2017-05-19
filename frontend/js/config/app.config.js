/**
 * Config
 * @namespace Config
 */
(function(){
    'use strict';

    angular.module('app.config').config(Configuration);

    Configuration.$inject = ['uiGmapGoogleMapApiProvider', '$qProvider'];

    /**
     * @namespace Configuration
     * @desc Angular configuration function
     * @memberOf Config
     * @constructor
     */
    function Configuration(GoogleMapApi, $qProvider){
        $qProvider.errorOnUnhandledRejections(false);
        GoogleMapApi.configure({
            key: 'AIzaSyB9XAKU8MK0_IN1ZT5DtTpGQs-WlNLa634',
            v: '3.26',
            libraries: 'weather,geometry,visualization'
        });
    }
})();