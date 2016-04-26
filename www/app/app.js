var app = angular.module('festival',
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

app.run(function ($rootScope, $state, $stateParams, $ionicPlatform, $ionicHistory, $state, UserService, NotificationService) {
    $ionicPlatform.ready(function () {
        //DBService.init();
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

        $ionicPlatform.registerBackButtonAction(function (event) {
            if( ($state.current.name=="base.login" || $state.current.name=="base.register") && (UserService.isLogged()) ){
                event.preventDefault();
                navigator.app.exitApp();
            }
            else if($state.current.name=="base.login" || $state.current.name=="base.register")
            {
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
                    default:
                        $ionicHistory.goBack();
                }


                //navigator.app.backHistory();
            }
        }, 100);


        if (!UserService.isLogged()) {
            $state.go('base.login');
            console.info('redirect login');
        }

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if( (toState.name == "base.login" || toState.name == "base.register"   ) && (UserService.isLogged()) )
            {
                event.preventDefault();
                navigator.app.exitApp();
            }
        });

    });
    //pushNotification = window.plugins.pushNotification;
    //pushNotification.register(
    //    onNotification,
    //    errorHandler,
    //    {
    //        'badge': 'true',
    //        'sound': 'true',
    //        'alert': 'true',
    //        'ecb': 'onNotification',
    //        'senderID': 'YOUR GOOGLE CONSOLE PROJECT NUMBER'
    //    }
    //);
    //window.onNotification = function(e){
    //
    //    switch(e.event){
    //        case 'registered':
    //            if(e.regid.length > 0){
    //
    //                var device_token = e.regid;
    //                NotificationService.register(device_token).then(function(response){
    //                    alert('registered!');
    //                });
    //            }
    //            break;
    //
    //        case 'message':
    //            alert('msg received: ' + e.message);
    //            /*
    //             {
    //             "message": "Hello this is a push notification",
    //             "payload": {
    //             "message": "Hello this is a push notification",
    //             "sound": "notification",
    //             "title": "New Message",
    //             "from": "813xxxxxxx",
    //             "collapse_key": "do_not_collapse",
    //             "foreground": true,
    //             "event": "message"
    //             }
    //             }
    //             */
    //            break;
    //
    //        case 'error':
    //            alert('error occured');
    //            break;
    //
    //    }
    //};
});
