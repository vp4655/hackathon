/**
 * Sidebar Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('app.controllers').controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$rootScope', 'EventService', 'AuthService', 'usSpinnerService', '$sessionStorage'];

    function NavbarController($scope, $state, $rootScope, EventService, AuthService, usSpinnerService, $sessionStorage) {
        var vm = this;

        // vm.searchText = '';
        // vm.selectedEvent = {};

        // document.getElementById('main-body')
        //         .querySelector('[spinner-key=spinner-1]').children.length < 1 && usSpinnerService.spin('spinner-1');

        // EventService.getAll().then(
        //     function(response) {
        //         vm.events = response.data;
        //         console.log(vm.events);
        //         vm.selectedEvent = vm.events[0] || {};
        //         vm.selectedEvent && $rootScope.$emit('eventSelected', {event: vm.selectedEvent});
        //         $sessionStorage.selectedEvent = vm.selectedEvent;
        //         usSpinnerService.stop('spinner-1');
        //     },
        //     function(error) {
        //         console.log(error);
        //     }
        // );

        // $rootScope.$on('eventAdded', function(event, response) {
        //     vm.events.push(response.event);
        // });

        // $rootScope.$on('eventDeleted', function(event, response) {
        //     var index = vm.events.findIndex(function(event) {
        //         return event.id === response.id
        //     });
        //     vm.events = vm.events.slice(0, index).concat(vm.events.slice(index + 1));
        //     vm.selectedEvent = vm.events[0] || {};
        // });

        // vm.openAddModal = function () {
        //     $rootScope.$emit('openAddModal', {})
        // };

        // vm.selectEvent = function (event) {
        //     vm.selectedEvent = event;
        //     $sessionStorage.selectedEvent = vm.selectedEvent;
        //     $rootScope.$emit('eventSelected', {event: event})
        // };

        // vm.openEditModal = function() {
        //     if (vm.selectedEvent && vm.selectedEvent.title) {
        //         $rootScope.$emit('openEditModal', {event: vm.selectedEvent})
        //     }
        // };

        // vm.openStickerModal = function () {
        //     $rootScope.$emit('openStickerModal', {})
        // };

        // vm.openParticipantsModal = function() {
        //     $rootScope.$emit('openParticipantsModal', {})
        // };

        // vm.openRankingsModal = function() {
        //     if (vm.selectedEvent && vm.selectedEvent.title) {
        //         $rootScope.$emit('openRankingModal', {})
        //     }
        // };

        // vm.getEventSelected = function() {
        //     if (vm.selectedEvent && vm.selectedEvent.title) {
        //         return vm.selectedEvent.title;
        //     }
        //     else {
        //         return 'Events';
        //     }
        // };

        // vm.goToMap = function() {
        //     $state.go('amex.map');
        // };

        // vm.goToParticipants = function() {
        //     $state.go('amex.participants');
        // };

        // vm.goToRankings = function() {
        //     $state.go('amex.index')
        // };

        // vm.logout = function() {
        //     AuthService.logout().then(function(response) {
        //         $state.go('login');
        //     }, function(error) {
        //         console.log(error)
        //     })
        // }
    }

})();