app.controller('playerController', function ($scope, $state, $ionicModal) {
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

    $ionicModal.fromTemplateUrl('templates/player/main.html', {
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


});