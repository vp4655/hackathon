(function(){
    'use strict';

    angular.module('app.controllers').controller('ParticipantsController', ParticipantsController);

    ParticipantsController.$inject = ['$document', '$scope', '$http', '$rootScope', '$timeout', '$sessionStorage', 'usSpinnerService'];

    function ParticipantsController($document, $scope, $http, $rootScope, $timeout, $sessionStorage, usSpinnerService){
        var vm = this;
        vm.originalRankingsP = [];
        vm.participants = [];
        vm.participantsEvent = {};
        vm.inviteMessage = '';

        vm.inviteMeClicked = false;

        vm.invite = function() {
            if($scope.participantsMainForm.$valid) {
                vm.inviteMeClicked = false;
                $rootScope.$emit('openParticipantsModal', {email: vm.email});
            }
            else {
                vm.inviteMeClicked = true;
            }
        };

        $rootScope.$on('participantInvited', function(event, response) {
            vm.participants.push({
                email: response.email
            });
            vm.email = '';
            $scope.participantsMainForm.$setPristine();
        });

        $rootScope.$on('eventSelected', function(event, response) {
            if (response.event) {
                document.getElementById('main-body')
                    .querySelector('[spinner-key=spinner-1]').children.length < 1 && usSpinnerService.spin('spinner-1');
                $http({
                    method: 'GET',
                    url: 'http://api.chow.pub/rest/api/events/' + response.event.id
                }).then(function(response) {
                    if(response.data.rankings && response.data.rankings !== vm.originalRankingsP) {
                        vm.originalRankingsP = response.data.rankings;
                        vm.participants = [];
                        vm.originalRankingsP.forEach(function(ranking, index) {
                            vm.participants.push(ranking.user);
                        });
                    }
                    usSpinnerService.stop('spinner-1');
                }, function (error) {
                    console.log(error);
                    usSpinnerService.stop('spinner-1');
                });
            }
        });

        if(vm.participantsEvent !== $sessionStorage.selectedEvent) {
            if ($sessionStorage.selectedEvent) {
                document.getElementById('main-body')
                    .querySelector('[spinner-key=spinner-1]').children.length < 1 && usSpinnerService.spin('spinner-1');
                $http({
                    method: 'GET',
                    url: 'http://api.chow.pub/rest/api/events/' + $sessionStorage.selectedEvent.id
                }).then(function(response) {
                    if(response.data.rankings && response.data.rankings !== vm.originalRankingsP) {
                        vm.originalRankingsP = response.data.rankings;
                        vm.participants = [];
                        vm.originalRankingsP.forEach(function (ranking, index) {
                            vm.participants.push(ranking.user);
                        });
                    }
                    usSpinnerService.stop('spinner-1');
                }, function(error) {
                    console.log(error);
                    usSpinnerService.stop('spinner-1');
                });
            }
        }
    }

})();