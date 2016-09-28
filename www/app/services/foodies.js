'use strict';
app.factory('FoodiesService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/foodies', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/foodies/' + GLOBAL.api.feast
        }
    });


    return {
        resource: resource
    };
});