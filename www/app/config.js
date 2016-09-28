app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').icon('my-back-button');

    $stateProvider
        .state('base', {
            url: '/',
            abstract: true,
            templateUrl: 'templates/base.html',
            controller: 'BaseController'
        })
        .state('base.login', {
            url: 'login',
            views: {
                'content': {
                    templateUrl: 'templates/user/sign_in.html',
                    controller: 'LoginController',
                    resolve: {
                        data: function ($ionicPlatform, UserService, $state, $cordovaGoogleAnalytics) {
                            $ionicPlatform.ready(function() {
                                function _waitForAnalytics(){
                                    if(typeof analytics !== 'undefined'){
                                        $cordovaGoogleAnalytics.trackView('Login screen');
                                    }
                                    else{
                                        setTimeout(function(){
                                            _waitForAnalytics();
                                        },250);
                                    }
                                }
                                _waitForAnalytics();
                                if (UserService.isLogged()) {
                                    $state.go('menu.artist-discover');
                                    console.info('is logged');
                                } else
                                    console.info('is not logged');
                            });
                        }
                    }
                }
            }
        })
        .state('base.register', {
            url: 'register',
            views: {
                'content': {
                    templateUrl: 'templates/user/sign_up.html',
                    controller: 'RegisterController',
                    resolve: {
                        data: function ($ionicPlatform, UserService, $state, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Register screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                            $ionicPlatform.ready(function() {
                                if (UserService.isLogged()) {
                                    $state.go('menu.artist-discover');
                                    console.info('is logged');
                                } else
                                    console.info('is not logged');
                            });
                        }
                    }
                }
            }
        })
        .state('base.recover', {
            url: 'recover',
            views: {
                'content': {
                    templateUrl: 'templates/user/recover_password.html',
                    controller: 'RecoverController',
                    resolve: {
                        data: function ($ionicPlatform, UserService, $state) {
                            $ionicPlatform.ready(function() {
                                if (UserService.isLogged()) {
                                    $state.go('menu.artist-discover');
                                    console.info('is logged');
                                } else
                                    console.info('is not logged');
                            });
                        }
                    }
                }
            }
        })
        .state('menu', {
            url: '/app/',
            abstract: true,
            templateUrl: 'templates/menu/main.html',
            controller: 'MenuController'
        })
        .state('menu.artist-discover', {
            url: 'artists/discover',
            views: {
                'content': {
                    templateUrl: 'templates/artist/main.html',
                    controller: 'ArtistController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Artist home screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.artist-list', {
            url: 'artists',
            views: {
                'content': {
                    templateUrl: 'templates/artist/list.html',
                    controller: 'ArtistController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Artist list screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.artist-detail', {
            url: 'artist/:id',
            views: {
                'content': {
                    templateUrl: 'templates/artist/detail.html',
                    controller: 'ArtistController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Artist detail screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.poster', {
            url: 'poster',
            views: {
                'content': {
                    templateUrl: 'templates/poster/main.html',
                    controller: 'PosterController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Poster screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.schedule', {
            url: 'schedule',
            views: {
                'content': {
                    templateUrl: 'templates/schedule/main.html',
                    controller: 'ScheduleController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Schedule screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.map', {
            url: 'map',
            views: {
                'content': {
                    templateUrl: 'templates/map/main.html',
                    controller: 'MapController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Map screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.ticket', {
            url: 'ticket',
            views: {
                'content': {
                    templateUrl: 'templates/ticket/main.html',
                    controller: 'TicketController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Ticket screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.coolway', {
            url: 'coolway',
            views: {
                'content': {
                    templateUrl: 'templates/coolway/main.html',
                    controller: 'CoolwayController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Coolway screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.foodies', {
            url: 'foodies',
            views: {
                'content': {
                    templateUrl: 'templates/foodies/main.html',
                    controller: 'FoodiesController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Foodies list screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.foodies-detail', {
            url: 'foodies/:id',
            views: {
                'content': {
                    templateUrl: 'templates/foodies/detail.html',
                    controller: 'FoodiesController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Foodies detail screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.streaming', {
            url: 'streaming',
            views: {
                'content': {
                    templateUrl: 'templates/streaming/main.html',
                    controller: 'StreamingController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Streaming list screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.info', {
            url: 'info',
            views: {
                'content': {
                    templateUrl: 'templates/info/main.html',
                    controller: 'InfoController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Info screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.map-how-get', {
            url: 'map-how-get',
            views: {
                'content': {
                    templateUrl: 'templates/info/map.html',
                    controller: 'MapHowGetController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Map Info screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        })
        .state('menu.sponsor', {
            url: 'sponsor',
            views: {
                'content': {
                    templateUrl: 'templates/info/sponsor.html'
                }
            }
        })
        .state('menu.weather', {
            url: 'weather',
            views: {
                'content': {
                    templateUrl: 'templates/info/weather.html'
                }
            }
        })
        .state('menu.social', {
            url: 'social',
            views: {
                'content': {
                    templateUrl: 'templates/social/main.html',
                    controller: 'SocialController',
                    resolve: {
                        data: function ($ionicPlatform, $cordovaGoogleAnalytics) {
                            function _waitForAnalytics(){
                                if(typeof analytics !== 'undefined'){
                                    $cordovaGoogleAnalytics.trackView('Social screen');
                                }
                                else{
                                    setTimeout(function(){
                                        _waitForAnalytics();
                                    },250);
                                }
                            }
                            _waitForAnalytics();
                        }
                    }
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/artists/discover');
    $ionicConfigProvider.views.maxCache(0);
});