/**
 * EventAdd Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('eventAddModal', EventAddModal);

    EventAddModal.$inject = ['$state', 'EventService', '$rootScope', 'FileUploader', '$sessionStorage'];

    /**
     * @namespace EventAddModalDirective
     * @desc Directive for add event form
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function EventAddModal($state, EventService, $rootScope, FileUploader, $sessionStorage) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/event.add.modal.html',
            link: function (scope, element, attributes) {
                scope.closeAddModal = closeAddModal;
                scope.createModal = createModal;
                scope.newEvent = {location: {}};

                /**
                 * @name closeAddModal
                 * @desc Closes modal window.
                 * @memberOf Directives.EventAddModalDirective
                 */
                function closeAddModal() {
                    scope.vm.addModalOpened = false;
                }

                var uploaderAdd = new FileUploader({
                    url: 'http://api.chow.pub/rest/api/images',
                    headers: {'Authorization': 'Bearer ' + $sessionStorage.token}
                });

                uploaderAdd.filters.push({
                    name: 'imageFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });

                uploaderAdd.onAfterAddingFile = function(item) {
                    item.alias = 'image';
                    item.formData.push({name: 'name'});
                };

                uploaderAdd.onAfterAddingAll = function () {
                    if (uploaderAdd.getNotUploadedItems().length > 1)
                    {
                        uploaderAdd.removeFromQueue(0);
                    }
                };

                uploaderAdd.onSuccessItem = function(item, response, status, headers){
                    console.log(scope);
                    scope.newEvent.image_url = response.url;
                };

                uploaderAdd.onErrorItem = function(item, response, status, headers){
                    console.log(response);
                };

                scope.uploaderAdd = uploaderAdd;

                $(document).bind('click', function(event) {
                    if(event.target === $('#add-event')[0]) {
                        scope.$apply(function () {
                            scope.vm.addModalOpened = false;
                        })
                    }
                });

                scope.openAddMapPicker = function() {
                    scope.vm.addModalOpened = false;
                    if($state.current.name === 'amex.map') {
                        $rootScope.$emit('addMapEvent', {location: {
                            latitude: scope.newEvent.location && scope.newEvent.location.latitude,
                            longitude: scope.newEvent.location && scope.newEvent.location.longitude
                        }})
                    }
                    else {
                        $rootScope.$emit('addEventMap', {location: {
                            latitude: scope.newEvent.location && scope.newEvent.location.latitude,
                            longitude: scope.newEvent.location && scope.newEvent.location.longitude
                        }})
                    }
                };

                $rootScope.$on('eventMapAdded', function(event, response) {
                    scope.vm.addModalOpened = true;
                    scope.newEvent.location.latitude = response.newLocation.latitude;
                    scope.newEvent.location.longitude = response.newLocation.longitude;
                    scope.newEvent.latitude = response.newLocation.latitude;
                    scope.newEvent.longitude = response.newLocation.longitude;
                });

                scope.addEventClicked = false;

                function createModal () {
                    if(scope.newEvent.location.latitude && scope.newEvent.location.longitude && scope.newEvent.image_url && scope.newEvent.start_date && scope.newEvent.end_date && scope.newEventForm.$valid) {
                        scope.addEventClicked = false;
                        scope.newEvent.starts_at = moment(scope.newEvent.start_date).format('YYYY-MM-DD hh:mm:ss');
                        scope.newEvent.ends_at = moment(scope.newEvent.end_date).format('YYYY-MM-DD hh:mm:ss');
                        EventService.create(scope.newEvent).then(
                            function (response) {
                                scope.vm.addModalOpened = false;
                                $rootScope.$emit('eventAdded', {event: scope.newEvent});
                                scope.newEvent = {location: {}};
                            },
                            function (error) {
                                console.error(error);
                            }
                        );
                    }
                    else {
                        scope.addEventClicked = true;
                    }
                }
            }
        };

        return directive;
    }

})();