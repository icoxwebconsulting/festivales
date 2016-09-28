'use strict';
app.factory('DeviceService', function ($rootScope, $resource, GLOBAL, $http, $q, $ionicLoading) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/devices', {}, {
        'register': {
            method: 'POST',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/devices/' + GLOBAL.api.feast
        },
        'unRegister': {
            method: 'DELETE',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/devices/' + GLOBAL.api.feast
        }
    });


    return {
        resource: resource
    };
});