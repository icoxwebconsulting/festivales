app.controller('MenuController', function($scope, $ionicModal, $timeout) {

    $scope.init = function(){
        $scope.view = {};
        $scope.view.show_list = 'favorites';

        //$scope.view.favorites =
        //    [
        //        {'name' : 'Marc Antony'},
        //        {'name' : 'Victor Manuelee'}
        //    ];
        $scope.view.favorites = false;
        $scope.view.notifications = false;

        $scope.view.setting = {};
        $scope.view.setting.notifications = true;
    };

    $scope.init();


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/user/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Open the login modal
    $scope.openSettings = function() {
        $scope.modal.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSettings = function() {
        $scope.modal.hide();
    };




});
