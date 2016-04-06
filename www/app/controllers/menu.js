app.controller('MenuController', function($scope, $ionicModal, Spotify, $cordovaInAppBrowser) {

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

    //var modalOptions = { scope: $scope, animation: 'slide-in-up' };
    //
    //$ionicModal.fromTemplateUrl('templates/user/modal.html', modalOptions).then(function(modal) {
    //    $scope.modalLogin = modal;
    //    $scope.modalLogin.show();
    //});
    //
    //$scope.later = function() {
    //    $scope.modalLogin.hide();
    //};
    ////Cleanup the modal when we're done with it!
    //$scope.$on('$destroy', function() {
    //    $scope.modalLogin.remove();
    //});
    //
    //
    // Create the settings modal that we will use later
    $ionicModal.fromTemplateUrl('templates/user/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalSettings = modal;
    });

    // Open the login modal
    $scope.openSettings = function() {
        //$scope.modalLogin.show();
        $scope.modalSettings.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSettings = function() {
        $scope.modalSettings.hide();
    };

    $scope.login = function () {
        Spotify.login().then(function (data) {
            console.log(data);
            alert("You are now logged in");
        }, function () {
            console.log('didn\'t log in');
        })
    };

    //$scope.openLink = function(link, type){
    //    window.open(link, '_system', 'location=yes');
    //};




});
