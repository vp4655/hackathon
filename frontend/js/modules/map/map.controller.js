(function(){
    'use strict';

    angular.module('app.controllers').controller('MapController', MapController);

    MapController.$inject = ['$document', '$scope', '$state', '$rootScope', '$timeout', 'uiGmapGoogleMapApi', '$sessionStorage', 'uiGmapIsReady'];

    function MapController($document, $scope, $state, $rootScope, $timeout, uiGmapGoogleMapApi, $sessionStorage, uiGmapIsReady){
        var vm = this;
        var GREEN_MARKER = 'https://mt.google.com/vt/icon?psize=30&font=fonts/arialuni_t.ttf&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2';
        var RED_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';

        vm.stickers = [];
        vm.stickersEvent = {};

        vm.map = {
            center: {
                latitude: 48.137154,
                longitude: 11.576124
            },
            control: {},
            options: {
                scrollwheel: true
            },
            zoom: 10
        };

        vm.showMapMap = false;

        vm.mapMap = {
            center: {
                latitude: 48.437154, longitude: 10.676124
            },
            control: {},
            options: {
                scrollwheel: true
            },
            zoom: 9,
            events: {
                click: function (map, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(),lon = e.latLng.lng();
                    vm.mapMarker.coords.latitude = lat;
                    vm.mapMarker.coords.longitude = lon;
                    $scope.$apply();
                }
            }
        };

        vm.mapMarker = {
            id: 'event',
            options: {draggable: true},
            coords: {
                latitude: 48.137154,
                longitude: 11.576124
            }
        };

        uiGmapGoogleMapApi.then(function(maps) {
            maps.visualRefresh = true;
        });

        uiGmapIsReady.promise(2).then(function (instances) {
            instances.forEach(function(inst){
                inst.map.ourID = inst.instance;
            });
        });
    }

})();