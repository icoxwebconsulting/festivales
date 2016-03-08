'use strict';
app.factory('playerService', function ($rootScope, Spotify) {
    var service = {};

    service.getTopTracks = function(spotifyId, countryIso){
        Spotify.getArtistTopTracks('4wLXwxDeWQ8mtUIRPxGiD6', 'ES').then(function (data) {
            $rootScope.$broadcast('top_tracks', data.tracks);
        });
    };


    service.openSpotify = function(link) {
        window.open(link, '_blank', 'location=yes');
    };


    return service;
});