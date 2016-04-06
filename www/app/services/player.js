'use strict';
app.factory('playerService', function ($rootScope, Spotify, GLOBAL) {
    var service = {};

    service.getTopTracks = function(spotifyId){
        Spotify.getArtistTopTracks(spotifyId, GLOBAL.spotify.country_iso).then(function (data) {
            $rootScope.$broadcast('top_tracks', data.tracks);
        });
    };


    service.openSpotify = function(link) {
        window.open(link, '_blank', 'location=yes');
    };


    return service;
});