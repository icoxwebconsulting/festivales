'use strict';
app.factory('MapService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/maps', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/maps/' + GLOBAL.api.feast
        }
    });

    function add(map) {

        var sql = "INSERT OR IGNORE INTO maps (name, image, latitude, longitude) VALUES(?,?,?,?)";
        var params = [map.name, map.image, map.latitude, map.longitude];

        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});
    }


    function addLocation(location) {

        var sql = "INSERT OR IGNORE INTO locations (name, image, detail, latitude, longitude) VALUES(?,?,?,?,?)";
        var params = [location.name, location.detail, location.image, location.latitude, location.longitude];

        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});
    }

    function drop() {
        return DBService.query('DROP TABLE IF EXISTS maps')
            .then(function (result) {
                return DBService.fetch(result);
            });
    }

    function getAll() {
        return DBService.query('SELECT * FROM maps')
            .then(function (result) {
                return DBService.fetchAll(result);
            });
    }

    function getAllLocations(id) {
        return DBService.query('SELECT * FROM locations')
            .then(function (result) {
                return DBService.fetchAll(result);
            });
    }

    return {
        resource: resource,
        add: add,
        addLocation: addLocation,
        drop: drop,
        getAll: getAll,
        getAllLocations: getAllLocations
    };
});