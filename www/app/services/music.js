'use strict';
app.factory('MusicService', function ($rootScope) {

    var tracks = [];
    var id = 0;
    var currentId = 0;

    function add(track, toPlaylist){
        var audio = new Audio();
        audio.id = id;
        audio.src = track.url;
        audio.title = track.name;
        audio.artist = track.artist;
        audio.addEventListener('play', function(){ console.info('music:play',track); $rootScope.$broadcast('music:play', track); });
        audio.addEventListener('pause', function(){ console.info('music:pause',track); $rootScope.$broadcast('music:pause', track); });
        if(toPlaylist)
        {
            audio.addEventListener('ended', function(){ console.info('music:next',track); next() });
            setCurrentId(0);
        }
        else
        {
            audio.addEventListener('ended', function(){ console.info('music:ended',track); $rootScope.$broadcast('music:ended', track); });
            setCurrentId(id);
        }
        tracks.push(audio);

        nextId();
    }

    function play(id){
        if(id >= 0)
        {
            pause();
            tracks[id].play();
            setCurrentId(id);
        }
        else{
            if(tracks.length > 0)
                tracks[currentId].play();
        }

    }

    function pause(){
        if(tracks.length > 0)
            tracks[currentId].pause();
    }

    function clear(){
        pause();
        tracks = [];
        id = 0;
    }

    function next(){
        var last = getLastId() - 1;
        if(getCurrentId() < last)
            setCurrentId(getCurrentId()+1);
        else
            setCurrentId(0);
        play();
    }


    function nextId(){
        id = id + 1 ;
    }

    function getLastId(){
        return id;
    }

    function getCurrentId()
    {
        return currentId;
    }

    function setCurrentId(id)
    {
        currentId = id;
    }

    return {
        add: add,
        clear:clear,
        play: play,
        pause: pause,
        getLastId: getLastId
    };
});