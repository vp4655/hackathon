/**
 * StickerSidebar Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('stickerSidebar', StickerSidebarModal);

    StickerSidebarModal.$inject = ['$state', '$rootScope', '$timeout'];

    /**
     * @namespace StickerSidebarModalDirective
     * @desc Directive for editing stickers
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function StickerSidebarModal($state, $rootScope, $timeout) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/sticker.sidebar.html',
            link: function (scope, element, attributes) {
                scope.stickerSidebarOpened = false;
                scope.stickerSidebarEvent = {};
                scope.stickerSidebarSearchText = '';


                $rootScope.$on('eventSelected', function(event, response) {
                    scope.stickerSidebarEvent = response.event;
                    if($state.current.name === 'amex.map') {
                        scope.stickerSidebarOpened = true;
                    }
                });

                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams){
                        scope.stickerSidebarOpened = toState.name === 'amex.map';
                    }
                );

                $rootScope.$on('stickerDeleted', function(event, response) {
                    var index = scope.stickerSidebarEvent.stickers.findIndex(function(sticker) {
                        return sticker.id === response.id
                    });
                    scope.stickerSidebarEvent.stickers = scope.stickerSidebarEvent.stickers.slice(0, index).concat(index + 1);
                });

                $rootScope.$on('newStickerAdded', function(event, response) {
                    scope.stickerSidebarEvent.stickers.push(response.sticker);
                });

                scope.openAddStickerModal = function() {
                    $rootScope.$emit('openAddStickerModal', {});
                };

                scope.openEditStickerModal = function(sticker) {
                    $rootScope.$emit('openStickerModal', {sticker: sticker})
                };

                scope.hoverMap = function(id) {
                    $rootScope.$emit('hoverMap', {id: id});
                };

                scope.unHoverMap = function(id) {
                    $rootScope.$emit('unHoverMap', {id: id})
                };

                /**
                 * @name closeStickerModal
                 * @desc Closes modal window.
                 * @memberOf Directives.StickerSidebarModalDirective
                 */
                function closeStickerModal() {
                    scope.vm.stickerModalOpened = false;
                }
            }
        };

        return directive;
    }

})();