/**
 * StickerEdit Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('stickerEditModal', StickerEditModal);

    StickerEditModal.$inject = ['$state', '$rootScope', 'FileUploader', 'StickersService', '$sessionStorage'];

    /**
     * @namespace StickerEditModalDirective
     * @desc Directive for editing stickers
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function StickerEditModal($state, $rootScope, FileUploader, StickersService, $sessionStorage) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/sticker.edit.modal.html',
            link: function (scope, element, attributes) {
                scope.closeStickerModal = closeStickerModal;
                scope.openStickerDelete = openDeleteModal;
                scope.stickerEdit = { location: {} };

                $rootScope.$on('openStickerModal', function(event, response) {
                    scope.stickerEdit = response.sticker;
                    scope.stickerEdit.latitude = response.sticker.location && response.sticker.location.latitude;
                    scope.stickerEdit.longitude = response.sticker.location && response.sticker.location.longitude;
                });

                scope.pickEditMap = function() {
                    scope.vm.stickerModalOpened = false;
                    if($state.current.name === 'amex.map') {
                        $rootScope.$emit('editMapSticker', {location: scope.stickerEdit.location})
                    }
                    else {
                        $rootScope.$emit('editSticker', {location: scope.stickerEdit.location})
                    }
                };

                $rootScope.$on('stickerEdited', function(event, response) {
                    scope.vm.stickerModalOpened = true;
                    scope.stickerEdit.latitude = response.newLocation.latitude;
                    scope.stickerEdit.longitude = response.newLocation.longitude;
                    scope.stickerEdit.location = {};
                    scope.stickerEdit.location.latitude = response.newLocation.latitude;
                    scope.stickerEdit.location.longitude = response.newLocation.longitude;
                });

                $rootScope.$on('stickerMapEdited', function(event, response) {
                    scope.vm.stickerModalOpened = true;
                    scope.stickerEdit.latitude = response.newLocation.latitude;
                    scope.stickerEdit.longitude = response.newLocation.longitude;
                    scope.stickerEdit.location = {};
                    scope.stickerEdit.location.latitude = response.newLocation.latitude;
                    scope.stickerEdit.location.longitude = response.newLocation.longitude;
                });

                /**
                 * @name closeStickerModal
                 * @desc Closes modal window.
                 * @memberOf Directives.StickerEditModalDirective
                 */
                function closeStickerModal() {
                    scope.vm.stickerModalOpened = false;
                }

                scope.editStickerClicked = false;

                scope.editSticker = function() {
                    if(scope.stickerEdit.latitude && scope.stickerEdit.longitude && scope.stickerEdit.icon_url && scope.stickerEditForm.$valid) {
                        scope.editStickerClicked = false;
                        scope.stickerEdit.event_id = $sessionStorage.selectedEvent.id;
                        StickersService.update(scope.stickerEdit).then(function(response) {
                            console.log(response);
                            scope.vm.stickerModalOpened = false;
                        }, function(error) {
                            console.log(error);
                        })
                    }
                    else {
                        scope.editStickerClicked = true;
                    }
                };

                function openDeleteModal() {
                    scope.vm.stickerModalOpened = false;
                    $rootScope.$emit('openStickerDeleteModal', {sticker: scope.stickerEdit});
                }

                var uploaderAdd = new FileUploader({
                    url: 'http://api.chow.pub/rest/api/images',
                    headers: {'Authorization': 'Bearer ' + $sessionStorage.token}
                });

                uploaderAdd.onAfterAddingFile = function(item) {
                    item.alias = 'image';
                    item.formData.push({name: 'name'});
                };

                uploaderAdd.filters.push({
                    name: 'imageFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });

                uploaderAdd.onAfterAddingAll = function () {
                    if (uploaderAdd.getNotUploadedItems().length > 1)
                    {
                        uploaderAdd.removeFromQueue(0);
                    }
                };

                uploaderAdd.onSuccessItem = function(item, response, status, headers){
                    scope.stickerEdit.image_url = response.url;
                };

                uploaderAdd.onErrorItem = function(item, response, status, headers){
                    console.log(response);
                };

                scope.uploaderStickerEdit = uploaderAdd;

                $(document).bind('click', function(event) {
                    if(event.target === $('#edit-sticker')[0]) {
                        scope.$apply(function () {
                            scope.vm.stickerModalOpened = false;
                        })
                    }
                })
            }
        };

        return directive;
    }

})();