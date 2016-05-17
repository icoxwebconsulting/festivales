var app = angular.module('lesarts',
    [
        'ionic',
        'ngCordova',
        'ngCordovaOauth',
        'angular.filter',
        'ngStorage',
        'ngResource',
        'ngTwitter',
        'spotify',
        'ionic-zoom-view'
    ]);

app.run(function ($rootScope, $state, $stateParams, $ionicPlatform, $ionicHistory, $state, DBService, UserService, NotificationService, $cordovaGoogleAnalytics) {
    $ionicPlatform.ready(function () {
        DBService.init();
        function _waitForAnalytics(){
            if(typeof analytics !== 'undefined'){
                $cordovaGoogleAnalytics.debugMode();
                $cordovaGoogleAnalytics.startTrackerWithId('UA-57340953-2');
                $cordovaGoogleAnalytics.trackView('Open app');
            }
            else{
                setTimeout(function(){
                    _waitForAnalytics();
                },250);
            }
        }
        _waitForAnalytics();


        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        $ionicPlatform.registerBackButtonAction(function (event) {
            //if( ($state.current.name=="base.login" || $state.current.name=="base.register") && (UserService.isLogged()) ){
            //    event.preventDefault();
            //    navigator.app.exitApp();
            //}
            if($state.current.name=="base.login" || $state.current.name=="base.register" || $state.current.name=="menu.artist-discover") {
                event.preventDefault();
                navigator.app.exitApp();
            }
            else {
                event.preventDefault();
                switch($ionicHistory.currentView().stateId) {
                    case "menu.artist-list":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.poster":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.schedule":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.map":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.ticket":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.coolway":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.info":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    case "menu.social":
                        $ionicHistory.clearHistory();
                        $state.go('menu.artist-discover');
                        break;
                    default:
                        $ionicHistory.goBack();
                }


                //navigator.app.backHistory();
            }
        }, 100);


        if (!UserService.isLogged()) {
            $state.go('base.login');
            console.info('redirect login');
        }else
            UserService.registerNotifications();

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if( (toState.name == "base.login" || toState.name == "base.register"   ) && (UserService.isLogged()) )
            {
                event.preventDefault();
                navigator.app.exitApp();
            }
        });
    });
});
