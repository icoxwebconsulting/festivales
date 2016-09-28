'use strict';
app.factory('NotificationService', function ($rootScope, $resource, GLOBAL, $http, $q, $ionicLoading) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/notifications', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/notifications/' + GLOBAL.api.feast
        }
    });


    return {
        resource: resource
    };
});