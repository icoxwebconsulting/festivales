'use strict';
app.factory('ArtistService', function ($rootScope, $resource, GLOBAL, DBService) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/artists', {}, {
        'getAll': {
            method: 'GET',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/artists/' + GLOBAL.api.feast
        }
    });

    function add(artist) {

        var sql = "INSERT OR IGNORE INTO artists (id, name, description, image_profile, image_cover, stage_id, " +
            " stage_name, schedule, spotify_id, facebook, twitter, instagram) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

        if(artist.name.toUpperCase().charCodeAt(0) > 90 )
            artist.name = '!'+artist.name;


        var params = [artist.id, artist.name, artist.description, artist.image_profile, artist.image_cover, artist.stage_id, artist.stage_name, artist.schedule.date, artist.spotify_id, artist.facebook, artist.twitter, artist.instagram];


        return DBService.query(sql, params)
            .then(function (response) {
                return response;
            }).catch(function(error){console.log(error)});

    }

    function drop() {
        return DBService.query('DROP TABLE IF EXISTS artists')
            .then(function (result) {
                return DBService.fetch(result);
            });
    }

    function getAll() {
        return DBService.query('SELECT * FROM artists')
            .then(function (result) {
                return DBService.fetchAll(result);
            });
    }

    function getFavorites(ids) {

        var args = "";
        for (i = 1; i <= ids.length; i++) {
            args+="?";
            if(i < ids.length)
                args+=",";
        }

        console.info('ids', ids);

        var sql = "SELECT * FROM artists WHERE id IN ("+args+")";

        return DBService.query(sql, ids)
            .then(function (result) {
                console.log('result all', result);
                return DBService.fetchAll(result);
            }).catch(function(error){console.log(error)});
    }

    function getById(id) {
        return DBService.query('SELECT * FROM artists WHERE id = ?', [id])
            .then(function (result) {
                return DBService.fetch(result);
            });
    }

    return {
        resource: resource,
        add: add,
        drop: drop,
        getAll: getAll,
        getById: getById,
        getFavorites:getFavorites
    };
});