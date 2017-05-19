(function(){
    'use strict';

    angular.module('app.services').factory('EventService', EventService);

    EventService.$inject = ['API', '$http'];

    function EventService(API, $http){

        return{
            create: function(event) {
                return API.all('events').post(event);
            },
            update: function(event) {
                var query = '?title=' + event.title + '&description=' + event.description + '&longitude=' + event.longitude + '&latitude=' + event.latitude + '&image_url=' + event.image_url + '&starts_at=' + event.starts_at + '&ends_at=' + event.ends_at;

                return $http({
                    method: 'PUT',
                    url: 'http://api.chow.pub/rest/api/events/' + event.id + '/' + query
                });
            },
            remove: function(id) {
                return API.one('events', id).remove();
            },
            getAll: function() {
                return $http({
                    method: 'GET',
                    url: 'http://api.chow.pub/rest/api/events'
                });
            }
        };
    }

})();