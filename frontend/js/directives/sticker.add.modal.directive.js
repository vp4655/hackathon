/**
 * StickerAdd Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('stickerAddModal', StickerAddModal);

    StickerAddModal.$inject = ['$state', '$rootScope', 'FileUploader', '$sessionStorage', 'StickersService'];

    /**
     * @namespace StickerAddModalDirective
     * @desc Directive for editing stickers
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function StickerAddModal($state, $rootScope, FileUploader, $sessionStorage, StickersService) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/sticker.add.modal.html',
            link: function (scope, element, attributes) {
                scope.closeAddStickerModal = closeAddStickerModal;
                scope.createSticker = createSticker;
                scope.stickerAdd = {};

                scope.pickAddMap = function() {
                    scope.vm.stickerAddModalOpened = false;
                    if($state.current.name === 'amex.map') {
                        $rootScope.$emit('addMapSticker', {location: {
                            latitude: scope.stickerAdd && scope.stickerAdd.latitude,
                            longitude: scope.stickerAdd && scope.stickerAdd.longitude
                        }})
                    }
                    else {
                        $rootScope.$emit('addSticker', {location: {
                            latitude: scope.stickerAdd && scope.stickerAdd.latitude,
                            longitude: scope.stickerAdd && scope.stickerAdd.longitude
                        }})
                    }
                };

                $rootScope.$on('stickerMapAdded', function(event, response) {
                    scope.vm.stickerAddModalOpened = true;
                    scope.stickerAdd.latitude = response.newLocation.latitude;
                    scope.stickerAdd.longitude = response.newLocation.longitude;
                });

                $rootScope.$on('stickerAdded', function(event, response) {
                    scope.vm.stickerAddModalOpened = true;
                    scope.stickerAdd.latitude = response.newLocation.latitude;
                    scope.stickerAdd.longitude = response.newLocation.longitude;
                });

                /**
                 * @name closeStickerModal
                 * @desc Closes modal window.
                 * @memberOf Directives.StickerAddModalDirective
                 */
                function closeAddStickerModal() {
                    scope.vm.stickerAddModalOpened = false;
                }

                scope.addStickerClicked = false;

                function createSticker() {
                    if(scope.stickerAdd.latitude && scope.stickerAdd.longitude && scope.stickerAdd.image_url && scope.stickerAddForm.$valid) {
                        scope.addStickerClicked = false;
                        scope.stickerAdd.event_id = $sessionStorage.selectedEvent.id;
                        StickersService.create(scope.stickerAdd).then(function(response) {
                            $rootScope.$emit('newStickerAdded', {sticker: scope.stickerAdd});
                            scope.vm.stickerAddModalOpened = false;
                            scope.stickerAdd = {};
                        }, function(error) {
                            console.log(error);
                        })
                    }
                    else {
                        scope.addStickerClicked = true;
                    }
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
                    scope.stickerAdd.image_url = response.url;
                };

                uploaderAdd.onErrorItem = function(item, response, status, headers){
                    console.log(response);
                };

                scope.uploaderStickerAdd = uploaderAdd;

                $(document).bind('click', function(event) {
                    if(event.target === $('#add-sticker')[0]) {
                        scope.$apply(function () {
                            scope.vm.stickerAddModalOpened = false;
                        })
                    }
                })
            }
        };

        return directive;
    }

})();