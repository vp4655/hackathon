/**
 * EventEdit Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('eventEditModal', EventEditModal);

    EventEditModal.$inject = ['$state', '$rootScope', 'EventService', 'FileUploader', '$sessionStorage'];

    /**
     * @namespace EventEditModalDirective
     * @desc Directive for event edit form
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function EventEditModal($state, $rootScope, EventService, FileUploader, $sessionStorage) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/event.edit.modal.html',
            link: function (scope, element, attributes) {
                scope.closeEidtModal = closeEditModal;
                scope.openDeleteModal = openDeleteModal;
                scope.editEvent = editEvent;

                $rootScope.$on('openEditModal', function (event, response) {
                    scope.updateEvent = response.event;
                    scope.updateEvent.start_date = new Date(response.event.starts_at);
                    scope.updateEvent.end_date = new Date(response.event.ends_at);
                });

                scope.openEditMapPicker = function() {
                    scope.vm.editModalOpened = false;
                    if($state.current.name === 'amex.map') {
                        $rootScope.$emit('editMapEvent', {location: {
                            latitude: scope.updateEvent.location && scope.updateEvent.location.latitude,
                            longitude: scope.updateEvent.location && scope.updateEvent.location.longitude
                        }})
                    }
                    else {
                        $rootScope.$emit('editEventMap', {location: {
                            latitude: scope.updateEvent.location && scope.updateEvent.location.latitude,
                            longitude: scope.updateEvent.location && scope.updateEvent.location.longitude
                        }})
                    }
                };

                $rootScope.$on('eventMapEdited', function(event, response) {
                    scope.vm.editModalOpened = true;
                    if(!scope.updateEvent.location) {
                        scope.updateEvent.location = {};
                    }
                    scope.updateEvent.location.latitude = response.newLocation.latitude;
                    scope.updateEvent.location.longitude = response.newLocation.longitude;
                });

                /**
                 * @name closeEditModal
                 * @desc Closes modal window.
                 * @memberOf Directives.EventDeleteModalDirective
                 */
                function closeEditModal() {
                    scope.vm.editModalOpened = false;
                }

                $(document).bind('click', function(event) {
                    if(event.target === $('#edit-event')[0]) {
                        scope.$apply(function () {
                            scope.vm.editModalOpened = false;
                        })
                    }
                });

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
                    scope.updateEvent.image_url = response.url;
                };

                uploaderAdd.onErrorItem = function(item, response, status, headers){
                    console.log(response);
                };

                scope.uploaderEdit = uploaderAdd;

                scope.editEventClicked = false;

                function editEvent() {
                    if(scope.updateEvent.location.latitude && scope.updateEvent.location.longitude && scope.updateEvent.image_url && scope.updateEvent.starts_at && scope.updateEvent.ends_at && scope.updateEventForm.$valid) {
                        scope.editEventClicked = false;
                        scope.updateEvent.starts_at = moment(scope.updateEvent.start_date).format('YYYY-MM-DD hh:mm:ss');
                        scope.updateEvent.ends_at = moment(scope.updateEvent.end_date).format('YYYY-MM-DD hh:mm:ss');
                        EventService.update({
                            id: scope.updateEvent.id,
                            title: scope.updateEvent.title,
                            image_url: scope.updateEvent.image_url,
                            starts_at: scope.updateEvent.starts_at,
                            ends_at: scope.updateEvent.ends_at,
                            description: scope.updateEvent.description,
                            latitude: scope.updateEvent.latitude,
                            longitude: scope.updateEvent.longitude
                        }).then(function(response) {
                            scope.vm.editModalOpened = false;
                        }, function(error) {
                            console.error(error);
                        });
                    }
                    else {
                        scope.editEventClicked = true;
                    }
                }

                function openDeleteModal() {
                    scope.vm.editModalOpened = false;
                    $rootScope.$emit('openDeleteModal', {event: scope.updateEvent});
                }
            }
        };

        return directive;
    }

})();