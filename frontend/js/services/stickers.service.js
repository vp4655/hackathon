(function(){
    'use strict';

    angular.module('app.services').factory('StickersService', EventService);

    EventService.$inject = ['API', '$http'];

    function EventService(API, $http){

        return{
            create: function(sticker) {
                return API.all('stickers').post(sticker);
            },
            update: function(sticker) {
                var query = '?title=' + sticker.title + '&event_id=' + sticker.event_id + '&description=' + sticker.description + '&longitude=' + sticker.longitude + '&latitude=' + sticker.latitude + '&image_url=' + sticker.image_url + '&value=' + sticker.value;

                return $http({
                    method: 'PUT',
                    url: 'http://api.chow.pub/rest/api/stickers/' + sticker.id + '/' + query
                });
            },
            remove: function(id) {
                return API.one('stickers', id).remove();
            },
            getSticker: function(id) {
                return API.one('stickers', id).get();
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