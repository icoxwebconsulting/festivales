'use strict';
app.factory('PlayerService', function ($rootScope, Spotify, GLOBAL, $q) {

    function getTopTracks(spotifyId){
        return Spotify.getArtistTopTracks(spotifyId, GLOBAL.spotify.country_iso).then(function (data) {
            return data.tracks;
        });
    }

    function gerPlayList(){
        return Spotify.getPlaylist(GLOBAL.spotify.user_id, GLOBAL.spotify.playlist_id).then(function(data){
            return data;
        });
    }


    function openSpotify(link) {
        window.open(link, '_blank', 'location=yes');
    }



    //service.onUpdateState = function (state, index) {
    //    if (state === 'play') {
    //        // pause other players
    //        for (var i=0, l=this.players.length; i<l; i++) {
    //            if (i !== index) {
    //                this.players[i].pause();
    //            }
    //        }
    //    }
    //};


    return {
        getTopTracks: getTopTracks,
        gerPlayList: gerPlayList
    };
});