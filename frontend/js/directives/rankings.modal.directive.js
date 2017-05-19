/**
 * Rankings Modal Directive
 * @namespace Directives
 */
(function () {
    'use strict';

    angular.module('app.directives').directive('participantsModal', ParticipantsModal);

    ParticipantsModal.$inject = ['$state', '$rootScope', '$http'];

    /**
     * @namespace RankingModalDirective
     * @desc Directive for showing rankings
     * @memberOf Directives
     * @returns {{restrict: string, replace: boolean, templateUrl: string, link: directive.link}}
     * @constructor
     */
    function ParticipantsModal($state, $rootScope, $http) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/templates/participants.modal.html',
            link: function (scope, element, attributes) {
                scope.closeParticipantsModal = closeParticipantsModal;
                scope.participant = {};

                $rootScope.$on('openParticipantsModal', function(event, response) {
                    scope.participant.email = response.email;
                });

                /**
                 * @name closeStickerModal
                 * @desc Closes modal window.
                 * @memberOf Directives.StickerEditModalDirective
                 */
                function closeParticipantsModal() {
                    scope.vm.participantsModalOpened = false;
                }

                scope.inviteClicked = false;

                scope.inviteParticipant = function() {
                    if(scope.participantsForm.$valid) {
                        scope.inviteClicked = false;

                        $http({
                            method: 'PUT',
                            url: 'http://api.chow.pub/rest/api/events/invite/1?email=' + scope.participant.email +'&first_name=' + scope.participant.first_name + '&last_name=' + scope.participant.last_name
                        }).then(function(response) {
                            scope.vm.participantsModalOpened = false;
                            $rootScope.$emit('participantInvited', {email: scope.participant.email})
                        }, function(error) {
                            console.log(error);
                        });
                    }
                    else {
                        scope.inviteClicked = true;
                    }
                }
            }
        };

        return directive;
    }

})();