app.controller('PlayerController', function ($scope, $state, $ionicModal, $ionicPlatform, $cordovaOauth, Spotify) {
    $scope.state = $state;
    $scope.view = {};

    $scope.stop = function() {
        if ($scope.audio.src) {
            $scope.audio.pause();
        }
    };

    $scope.play = function() {
        if ($scope.audio.src) {
            $scope.audio.play();
        }
    };

    $ionicModal.fromTemplateUrl('templates/player/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Open the player modal
    $scope.openPlayer = function() {
        $scope.modal.show();
    };

    // Triggered in the player modal to close it
    $scope.closePlayer = function() {
        $scope.modal.hide();
    };

    var clientId = '77b0545674984c768ed449759d5911c8';
    $scope.playlists = [];

    $scope.performLogin = function() {
        $cordovaOauth.spotify(clientId, ['user-read-private', 'playlist-read-private']).then(function(result) {
            window.localStorage.setItem('spotify-token', result.access_token);
            Spotify.setAuthToken(result.access_token);
            $scope.updateInfo();
        }, function(error) {
            console.log("Error -> " + error);
        });
    };

    $scope.updateInfo = function() {
        Spotify.getCurrentUser().then(function (data) {
            $scope.getUserPlaylists(data.id);
        }, function(error) {
            $scope.performLogin();
        });
    };

    $ionicPlatform.ready(function() {
        var storedToken = window.localStorage.getItem('spotify-token');
        if (storedToken !== null) {
            Spotify.setAuthToken(storedToken);
            $scope.updateInfo();
        } else {
            $scope.performLogin();
        }
    });

    $scope.getUserPlaylists = function(userid) {
        Spotify.getUserPlaylists(userid).then(function (data) {
            $scope.playlists = data.items;
        });
    };


});