'use strict';
app.factory('ScheduleService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/schedules', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/schedules/' + GLOBAL.api.feast
        }
    });

    return {
        resource: resource
    };
});