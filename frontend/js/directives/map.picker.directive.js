/**
 * MapPicker Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('mapPicker', MapPickerModal);

    MapPickerModal.$inject = ['$state', '$rootScope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', '$sessionStorage'];

    /**
     * @namespace MapPickerModalDirective
     * @desc Directive for editing stickers
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function MapPickerModal($state, $rootScope, uiGmapGoogleMapApi, uiGmapIsReady, $sessionStorage) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/map.picker.html',
            link: function (scope, element, attributes) {
                scope.showMap = false;

                $rootScope.$on('addingSticker', function(event, response) {
                    scope.map2.control.refresh();
                    scope.marker.coords.latitude = (
                            response && response.location && response.location.latitude
                        ) ||
                        scope.marker.coords.latitude;
                    scope.marker.coords.longitude = (
                            response && response.location && response.location.longitude
                        ) ||
                        scope.marker.coords.longitude;
                    scope.confirmPick = function() {
                        scope.vm.mapPickerOpened = false;
                        $rootScope.$emit('stickerAdded', {newLocation: scope.marker.coords})
                    };

                    if(response && response.location && response.location.latitude && response.location.longitude) {
                        scope.map2.center = {
                            latitude: response.location.latitude,
                            longitude: response.location.longitude
                        };
                        scope.map2.zoom = 15;
                    }
                    else if($sessionStorage.selectedEvent && $sessionStorage.selectedEvent.location && $sessionStorage.selectedEvent.location.longitude && $sessionStorage.selectedEvent.location.latitude) {
                        scope.map2.center = {
                            latitude: $sessionStorage.selectedEvent.location.latitude,
                            longitude: $sessionStorage.selectedEvent.location.longitude
                        };
                        scope.map2.zoom = 15;
                        scope.marker = {coords: {longitude: '', latitude: ''}};
                    }
                });

                $rootScope.$on('editingSticker', function(event, response) {
                    scope.map2.control.refresh();
                    scope.confirmPick = function() {
                        scope.vm.mapPickerOpened = false;
                        $rootScope.$emit('stickerEdited', {newLocation: scope.marker.coords})
                    };
                    scope.marker.coords.latitude = (
                            response && response.location && response.location.latitude
                        ) ||
                        scope.marker.coords.latitude;
                    scope.marker.coords.longitude = (
                            response && response.location && response.location.longitude
                        ) ||
                        scope.marker.coords.longitude;

                    if(response && response.location && response.location.latitude && response.location.longitude) {
                        scope.map2.center = {
                            latitude: response.location.latitude,
                            longitude: response.location.longitude
                        };
                        scope.map2.zoom = 15;
                    }
                    else if($sessionStorage.selectedEvent && $sessionStorage.selectedEvent.location && $sessionStorage.selectedEvent.location.longitude && $sessionStorage.selectedEvent.location.latitude) {
                        scope.map2.center = {
                            latitude: $sessionStorage.selectedEvent.location.latitude,
                            longitude: $sessionStorage.selectedEvent.location.longitude
                        };
                        scope.map2.zoom = 15;
                        scope.marker = {coords: {longitude: '', latitude: ''}};
                    }
                });

                $rootScope.$on('addingEvent', function(event, response) {
                    scope.map2.control.refresh();
                    scope.marker.coords.latitude = (
                            response && response.location && response.location.latitude
                        ) ||
                        scope.marker.coords.latitude;
                    scope.marker.coords.longitude = (
                            response && response.location && response.location.longitude
                        ) ||
                        scope.marker.coords.longitude;
                    scope.confirmPick = function() {
                        scope.vm.mapPickerOpened = false;
                        $rootScope.$emit('eventMapAdded', {newLocation: scope.marker.coords})
                    };

                    if(response && response.location && response.location.latitude && response.location.longitude) {
                        scope.map2.center = {
                            latitude: response.location.latitude,
                            longitude: response.location.longitude
                        };
                        scope.map2.zoom = 10;
                    }
                    else {
                        scope.map2.center = {
                            latitude: 48.137154, longitude: 11.576124
                        };
                        scope.map2.zoom = 10;
                        scope.marker = {coords: {longitude: '', latitude: ''}};
                    }
                });

                $rootScope.$on('editingEvent', function(event, response) {
                    scope.map2.control.refresh();

                    scope.confirmPick = function() {
                        scope.vm.mapPickerOpened = false;
                        $rootScope.$emit('eventMapEdited', {newLocation: scope.marker.coords})
                    };
                    scope.marker.coords.latitude = (
                            response && response.location && response.location.latitude
                        ) ||
                        scope.marker.coords.latitude;
                    scope.marker.coords.longitude = (
                            response && response.location && response.location.longitude
                        ) ||
                        scope.marker.coords.longitude;

                    if(response && response.location && response.location.latitude && response.location.longitude) {
                        scope.map2.center = {
                            latitude: response.location.latitude,
                            longitude: response.location.longitude
                        };
                        scope.map2.zoom = 10;
                    }
                    else {
                        scope.map2.center = {
                            latitude: 48.137154, longitude: 11.576124
                        };
                        scope.map2.zoom = 10;
                        scope.marker = {coords: {longitude: '', latitude: ''}};
                    }
                });

                scope.closeMapPicker = function() {
                    scope.vm.mapPickerOpened = false;
                };

                $(document).bind('click', function(event) {
                    if(event.target === $('#map-picker')[0]) {
                        scope.$apply(function () {
                            scope.vm.mapPickerOpened = false;
                        })
                    }
                });

                uiGmapGoogleMapApi.then(initializeMap, reportError);

                function reportError(error){
                    console.error(error);
                }

                scope.map2 = {
                    center: {
                        latitude: 48.137154, longitude: 11.576124
                    },
                    control: {},
                    options: {
                        scrollwheel: true
                    },
                    zoom: 10,
                    events: {
                        click: function (map, eventName, originalEventArgs) {
                            var e = originalEventArgs[0];
                            var lat = e.latLng.lat(),lon = e.latLng.lng();
                            scope.marker.coords.latitude = lat;
                            scope.marker.coords.longitude = lon;
                            scope.$apply();
                        }
                    }
                };

                scope.marker = {
                    id: 'event',
                    options: {draggable: true},
                    coords: {
                        latitude: 48.137154,
                        longitude: 11.576124
                    }
                };

                function initializeMap(maps){
                    scope.showMap = true;
                    maps.visualRefresh = true;
                }
            }
        };

        return directive;
    }

})();