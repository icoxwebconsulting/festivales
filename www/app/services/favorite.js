'use strict';
app.factory('FavoriteService', function ($rootScope, $resource, GLOBAL, DBService, UserService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/favorites', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/favorites/:user_id',
            params: {
                user_id: '@user_id'
            }
        },
        'create': {
            method: 'POST',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version +'/favorites/:user_id',
            params: {
                user_id: '@user_id'
            }
        },
        'delete': {
            method: 'DELETE',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version +'/favorites/:user_id',
            params: {
                user_id: '@user_id'
            }
        }
    });

    function add(artistId) {
        var sql = "INSERT OR IGNORE INTO favorites (artist_id, user_id) VALUES(?,?)";
        var params = [artistId, UserService.getUser().id ];

        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});

    }

    function remove(artistId) {
        var sql = "DELETE FROM favorites WHERE artist_id = ? AND user_id = ?";
        var params = [artistId, UserService.getUser().id ];

        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});

    }

    function drop() {
        return DBService.query('DROP TABLE IF EXISTS favorites')
            .then(function (result) {
                return DBService.fetch(result);
            });
    }

    function getAll() {
        return DBService.query('SELECT * FROM favorites WHERE user_id ='+UserService.getUser().id)
            .then(function (result) {
                return DBService.fetchAll(result);
            });
    }

    function getArtistById(id) {
        return DBService.query('SELECT * FROM favorites WHERE artist_id = ? AND user_id = ?', [id, UserService.getUser().id])
            .then(function (result) {
                if (result.rows.length > 0)
                    return DBService.fetch(result);
                else
                    return false;
            }).catch(function(error){console.log(error)});
    }


    return {
        resource: resource,
        add: add,
        remove:remove,
        drop: drop,
        getAll: getAll,
        getArtistById:getArtistById
    };
});