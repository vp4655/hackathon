(function(){
    'use strict';

    angular.module('app.controllers').controller('MainController', MainController);

    MainController.$inject = ['$document', '$scope', '$state', '$rootScope', '$sessionStorage', '$http', 'usSpinnerService'];

    function MainController($document, $scope, $state, $rootScope, $sessionStorage, $http, usSpinnerService){
        var vm = this;
        vm.rankings = [];
        vm.originalRankings = [];
        vm.first = {};
        vm.second = {};
        vm.third = {};
        vm.rankingsEvent = {};

        $rootScope.$on('eventSelected', function(event, response) {
            vm.rankingsEvent = response.event;

        });

        if(vm.rankingsEvent !== $sessionStorage.selectedEvent) {

        }
    }

})();