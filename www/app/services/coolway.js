'use strict';
app.factory('CoolwayService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/coolways', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/coolways/' + GLOBAL.api.feast
        }
    });

    return {
        resource: resource
    };
});