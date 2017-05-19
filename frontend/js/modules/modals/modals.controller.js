(function(){
    'use strict';

    angular.module('app.controllers').controller('ModalsController', MainController);

    MainController.$inject = ['$document', '$scope', '$state', '$rootScope', '$timeout'];

    function MainController($document, $scope, $state, $rootScope, $timeout){
        var vm = this;

        vm.addModalOpened = false;
        vm.editModalOpened = false;
        vm.deleteModalOpened = false;
        vm.stickerModalOpened = false;
        vm.stickerAddModalOpened = false;
        vm.stickerDeleteModalOpened = false;
        vm.rankingModalOpened = false;
        vm.stickerSidebarOpened = false;
        vm.participantsModalOpened = false;
        vm.stickerEvent = {};
        vm.mapPickerOpened = false;
        vm.mainDocument = document;

        $rootScope.$on('openAddModal', function () {
            vm.addModalOpened = true;
        });

        $rootScope.$on('openEditModal', function (event) {
            vm.editModalOpened = true;
        });

        $rootScope.$on('openDeleteModal', function () {
            vm.deleteModalOpened = true;
        });

        $rootScope.$on('openStickerModal', function () {
            vm.stickerModalOpened = true;
        });

        $rootScope.$on('openAddStickerModal', function() {
            vm.stickerAddModalOpened = true;
        });

        $rootScope.$on('openStickerDeleteModal', function () {
            vm.stickerDeleteModalOpened = true;
        });

        $rootScope.$on('openRankingModal', function () {
            vm.rankingModalOpened = true;
        });

        $rootScope.$on('openParticipantsModal', function(event, response) {
            vm.participantsModalOpened = true;
        });

        $rootScope.$on('addSticker', function(event, response) {
            vm.mapPickerOpened = true;
            $timeout(function() {
                $rootScope.$emit('addingSticker', {location: response.location});
            }, 200);
        });

        $rootScope.$on('editSticker', function(event, response) {
            vm.mapPickerOpened = true;
            $timeout(function() {
                $rootScope.$emit('editingSticker', {location: response.location});
            }, 200);
        });

        $rootScope.$on('addEventMap', function(event, response) {
            vm.mapPickerOpened = true;
            $timeout(function() {
                $rootScope.$emit('addingEvent', {location: response.location});
            }, 200);
        });

        $rootScope.$on('editEventMap', function(event, response) {
            vm.mapPickerOpened = true;
            $timeout(function() {
                $rootScope.$emit('editingEvent', {location: response.location});
            }, 200);
        })
    }

})();