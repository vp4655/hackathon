/**
 * EventDelete Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('eventDeleteModal', EventDeleteModal);

    EventDeleteModal.$inject = ['$state', '$rootScope', 'EventService'];

    /**
     * @namespace EventDeleteModalDirective
     * @desc Directive for confirming event delete action
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function EventDeleteModal($state, $rootScope, EventService) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/event.delete.modal.html',
            link: function (scope, element, attributes) {
                scope.closeDeleteModal = closeDeleteModal;
                scope.deleteEvent = deleteEvent;
                scope.deleteingEvent = {};

                /**
                 * @name closeDeleteModal
                 * @desc Closes modal window.
                 * @memberOf Directives.EventDeleteModalDirective
                 */
                function closeDeleteModal() {
                    scope.vm.deleteModalOpened = false;
                    $rootScope.$emit('openEditModal', {event: scope.deleteingEvent})
                }

                $(document).bind('click', function(event) {
                    if(event.target === $('#delete-event')[0]) {
                        scope.$apply(function () {
                            scope.vm.deleteModalOpened = false;
                        })
                    }
                });

                $rootScope.$on('openDeleteModal', function(event, response) {
                    scope.deleteingEvent = response.event;
                });

                function deleteEvent() {
                    EventService.remove(scope.deleteingEvent.id).then(function(response) {
                        scope.vm.deleteModalOpened = false;
                        $rootScope.$emit('eventDeleted', {id: scope.deleteingEvent.id});
                    }, function(error) {
                        console.error(error);
                    });
                }
            }
        };

        return directive;
    }

})();