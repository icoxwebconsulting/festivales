app.controller('PlayerController', function ($scope, $state, $ionicModal, $ionicPlatform, $cordovaOauth, $localStorage, Spotify) {

    $scope.performLogin = function() {
        $cordovaOauth.spotify($scope.clientId, ['user-read-private', 'playlist-read-private']).then(function(result) {
            $localStorage.spotify_token = result.access_token;
            Spotify.setAuthToken(result.access_token);
            $scope.updateInfo();
        }, function(error) {
            console.log("Error -> " + error);
        });
    };


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

    $ionicModal.fromTemplateUrl('templates/player/main.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Open the player modal
    $scope.openPlayer = function() {
        //$scope.modal.show();
        var storedToken = $localStorage.spotify_token;
        if (storedToken !== null) {
            Spotify.setAuthToken(storedToken);
            $scope.updateInfo();
        } else {
            $scope.performLogin();
        }
    };

    // Triggered in the player modal to close it
    $scope.closePlayer = function() {
        $scope.modal.hide();
    };

    $scope.updateInfo = function() {
        Spotify.getCurrentUser().then(function (data) {
            $scope.getUserPlaylists(data.id);
        }, function(error) {
            $scope.performLogin();
        });
    };


    $scope.getUserPlayLists = function(userId) {
        Spotify.getUserPlaylists(userId).then(function (data) {
            $scope.playlists = data.items;
        });
    };

    $scope.init = function(){
        $scope.state = $state;
        $scope.view = {};
        $scope.clientId = '77b0545674984c768ed449759d5911c8';
        $scope.playlists = [];
    };

    $scope.init();


});