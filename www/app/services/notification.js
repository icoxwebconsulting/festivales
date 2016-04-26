'use strict';
app.factory('NotificationService', function ($rootScope, $resource, GLOBAL, $http, $q, $ionicLoading) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/notifications', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/notifications/' + GLOBAL.api.feast
        }
    });


    var base_url = 'http://{YOUR SERVER}';

    function register(device_token){

        var deferred = $q.defer();
        $ionicLoading.show();

        $http.post(base_url + '/register', {'device_token': device_token})
            .success(function(response){
                $ionicLoading.hide();
                deferred.resolve(response);
            })
            .error(function(data){
                deferred.reject();
            });


        return deferred.promise;

    }

    return {
        resource: resource,
        register:register
    };
});