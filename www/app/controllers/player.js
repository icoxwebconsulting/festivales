app.controller('PlayerController', function ($scope, $ionicModal, $cordovaOauth, $localStorage, Spotify, SpotifyService, $ionicLoading, GLOBAL, MusicService) {

    $scope.init = function(){
        $scope.view = {};
        $scope.view.playslist = [];
    };

    $scope.init();

    $scope.performLogin = function() {
        $cordovaOauth.spotify(GLOBAL.spotify.client_id, ['user-read-private', 'playlist-read-private']).then(function(result) {
            $localStorage.spotify_token = result.access_token;
            Spotify.setAuthToken(result.access_token);
            $scope.updateInfo();
        }, function(error) {
        });
    };


    $scope.loadPlayList = function(){
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SpotifyService.gerPlayList().then(function(data){
            if(data.tracks.items.length > 0)
            {
                $scope.view.playslist = data.tracks.items;
                MusicService.clear();
                angular.forEach(data.tracks.items, function(value, key) {
                    var track = {};
                    track.spotify_id = value.track.id;
                    track.artist  = value.track.artists[0].name;
                    track.name = value.track.name;
                    track.url = value.track.preview_url;
                    MusicService.add(track, true);
                });
                MusicService.play();
                $scope.modal.show();
                $ionicLoading.hide();
            }

        });
    };

    $scope.updateInfo = function() {
        Spotify.getCurrentUser().then(function (data) {
            $scope.loadPlayList();
        }, function(error) {
            $scope.performLogin();
        });
    };


    $ionicModal.fromTemplateUrl('templates/player/main.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Open the modal player
    $scope.openPlayList = function() {

        var storedToken = $localStorage.spotify_token;
        if (storedToken !== null) {
            Spotify.setAuthToken(storedToken);
            $scope.updateInfo();
        } else {
            $scope.performLogin();
        }

    };

    $scope.openPlaylistModal = function(){
        $scope.modal.show();
    };

    // Triggered in the player modal to close it
    $scope.closePlayer = function() {
        $scope.modal.hide();
    };


    $scope.playTrack = function(id) {
        MusicService.play(id);
    };

    $scope.pauseTrack = function(){
        MusicService.pause();
    };


    $scope.$on('music:play', function(event, args) {
        $scope.view.isPlaying = true;
        $scope.view.isPause = false;
        $scope.view.currentTrack = args;
    });

    $scope.$on('music:pause', function(event, args) {
        $scope.view.isPlaying = false;
        $scope.view.isPause = true;
        $scope.view.currentTrack = args;
    });

    $scope.$on('music:clear', function(event, args) {
        $scope.view.playslist = [];
    });

});