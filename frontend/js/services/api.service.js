(function() {
    "use strict";

    angular.module('app.services').factory('API', API);

    API.$inject = ['Restangular', '$localStorage'];

    function API(Restangular, $localStorage) {
        //content negotiation
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json'
        };

        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl('http://api.chow.pub/rest/api')
                .setDefaultHeaders(headers)
                .setErrorInterceptor(function(response) {
                    if (response.status === 422) {
                        for (var error in response.data.errors) {
                            return ToastService.error(response.data.errors[error][0]);
                        }
                    }
                })
                .addFullRequestInterceptor(function(element, operation, what, url, headers) {
                    if ($localStorage.jwt) {
                        headers.Authorization = 'Bearer ' + $localStorage.jwt;
                    }
                });
        });
    }

})();
