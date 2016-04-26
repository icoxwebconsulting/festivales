'use strict';
app.factory('VersionService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/versions', {}, {
        'get': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/versions/' + GLOBAL.api.feast
        }
    });

    return{
        resource:resource
    }
});