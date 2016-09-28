'use strict';
app.factory('WeatherService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/weathers', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/weathers/' + GLOBAL.api.feast
        }
    });

    return{
        resource:resource
    }
});