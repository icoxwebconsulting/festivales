var app = angular.module('festival',
    [
        'ionic',
        'ngCordova',
        'ngCordovaOauth',
        'ngStorage',
        'ngResource',
        'spotify'
    ]);

app.run(function ($rootScope, $state, $stateParams, $ionicPlatform, $cordovaSplashscreen, $state, DBService) {
    $ionicPlatform.ready(function () {
        DBService.init();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});
