/**
 * StickerDelete Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('stickerDeleteModal', StickerDeleteModal);

    StickerDeleteModal.$inject = ['$state', '$rootScope', 'StickersService'];

    /**
     * @namespace StickerDeleteModalDirective
     * @desc Directive for confirming event delete action
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function StickerDeleteModal($state, $rootScope, StickersService) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/sticker.delete.modal.html',
            link: function (scope, element, attributes) {
                scope.closeStickerDeleteModal = closeDeleteModal;
                scope.deleteSticker = deleteSticker;
                scope.deleteingSticker = {};

                /**
                 * @name closeDeleteModal
                 * @desc Closes modal window.
                 * @memberOf Directives.StickerDeleteModalDirective
                 */
                function closeDeleteModal() {
                    scope.vm.stickerDeleteModalOpened = false;
                    $rootScope.$emit('openStickerModal', {sticker: scope.deleteingSticker})
                }

                $(document).bind('click', function(event) {
                    if(event.target === $('#delete-event')[0]) {
                        scope.$apply(function () {
                            scope.vm.deleteModalOpened = false;
                        })
                    }
                });

                $rootScope.$on('openStickerDeleteModal', function(event, response) {
                    scope.deleteingSticker = response.sticker;
                });

                function deleteSticker() {
                    StickersService.remove(scope.deleteingSticker.id).then(function(response) {
                        scope.vm.stickerDeleteModalOpened = false;
                        $rootScope.$emit('stickerDeleted', {id: scope.deleteingSticker.id});
                    }, function(error) {
                        console.error(error);
                    });
                }
            }
        };

        return directive;
    }

})();