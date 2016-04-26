'use strict';
app.factory('PosterService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/posters', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/posters/' + GLOBAL.api.feast
        }
    });

    function add(poster) {

        var sql = "INSERT OR IGNORE INTO posters (id, image) VALUES(?,?)";
        var params = [poster.id, poster.name];

        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});
    }


    function drop() {
        return DBService.query('DROP TABLE IF EXISTS posters')
            .then(function (result) {
                return DBService.fetch(result);
            });
    }

    function get() {
        return DBService.query('SELECT * FROM posters ORDER BY id DESC LIMIT 1')
            .then(function (result) {
                return DBService.fetchAll(result);
            });
    }

    return {
        resource: resource,
        add: add,
        drop: drop,
        get: get
    };
});