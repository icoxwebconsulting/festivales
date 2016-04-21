'use strict';
app.factory('AudioService', function ($rootScope) {

    var tracks = [];
    var id = 0;
    var currentId = 0;

    function add(track){
        var audio = new Audio();
        audio.id = id;
        audio.src = track.url;
        audio.title = track.name;
        audio.artist = track.artist;
        audio.addEventListener('ended', function(){ console.info('hello');$rootScope.$broadcast('audio.ended', this); });
        tracks.push(audio);
        nextId();
    }

    function clear(){
        tracks = [];
        id = 0;
    }

    function play(){
        if(tracks.length > 0)
        {
            tracks[currentId].play();
        }
    }

    function nextId(){
        id = id + 1 ;
    }

    return {
        add: add,
        clear:clear,
        play: play
    };
});