(function(){
    'use strict';

    angular.module('app.services').factory('UserService', UserService);

    UserService.$inject = ['API', '$q', '$sessionStorage', '$log'];

    function UserService(API, $q, $sessionStorage, $log){

        var self = this;
        self.currentUser = {};

        return{
            getUserProfile: getUserProfile,
            setUserProfile: setUserProfile
        };

        /**
         * Gets user profile (name, picture, ...)
         * @returns {$Promise} after service is sure that user exists return that user.
         */
        function getUserProfile(){
            return $q(function(resolve, reject){
                if(self.currentUser.id){
                    resolve(self.currentUser);
                }
                else if($sessionStorage.currentUser){
                    setUserProfile($sessionStorage.currentUser).then(function(){
                        resolve(self.currentUser);
                    }, function(error){
                        $log.debug(error);
                    })
                }
                else{
                    reject('There is no current user!');
                }
            });
        }

        /**
         * Sets user_id in $sessionStorage and gets user with that
         *  id and saves it in variable.
         * @param id - user's id
         * @returns {$Promise} resolve after user is set
         */
        function setUserProfile(id, user){
            $sessionStorage.currentUser = id;

            return $q(function(resolve, reject){
                resolve(user);
            });

        }

    }

})();