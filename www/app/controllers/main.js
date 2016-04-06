app.controller('MainController', function($scope, $timeout, playerService) {

    $scope.init = function()
    {
        $scope.audio = new Audio();
        $scope.view = {};
       // playerService.getTopTracks();
    };

    $scope.init();

    self.chunk = function(arr, size) {
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
        console.info('return', newArr);
        return newArr;
    };


    $scope.$on('top_tracks', function(evt, data) {
        $scope.view.tracks = self.chunk(data, 2);
    });



    $scope.playTrack = function(spotifyId) {
        $scope.audio.src = track.preview_url;
        $scope.audio.play();
    };

    $scope.play = function() {
        if ($scope.audio.src) {
            $scope.audio.play();
        }
    };

    $scope.stop = function() {
        if ($scope.audio.src) {
            $scope.audio.pause();
        }
    };



});
