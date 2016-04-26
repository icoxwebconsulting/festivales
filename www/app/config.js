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
        .state('base.register', {
            url: 'register',
            views: {
                'content': {
                    templateUrl: 'templates/user/sign_up.html',
                    controller: 'RegisterController',
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
                    controller: 'ArtistController'
                }
            }
        })
        .state('menu.artist-list', {
            url: 'artists',
            views: {
                'content': {
                    templateUrl: 'templates/artist/list.html',
                    controller: 'ArtistController'
                }
            }
        })
        .state('menu.artist-detail', {
            url: 'artist/:id',
            views: {
                'content': {
                    templateUrl: 'templates/artist/detail.html',
                    controller: 'ArtistController'
                }
            }
        })
        .state('menu.poster', {
            url: 'poster',
            views: {
                'content': {
                    templateUrl: 'templates/poster/main.html',
                    controller: 'PosterController'
                }
            }
        })
        .state('menu.schedule', {
            url: 'schedule',
            views: {
                'content': {
                    templateUrl: 'templates/schedule/main.html',
                    controller: 'ScheduleController'
                }
            }
        })
        .state('menu.map', {
            url: 'map',
            views: {
                'content': {
                    templateUrl: 'templates/map/main.html',
                    controller: 'MapController'
                }
            }
        })
        .state('menu.ticket', {
            url: 'ticket',
            views: {
                'content': {
                    templateUrl: 'templates/ticket/main.html',
                    controller: 'TicketController'
                }
            }
        })
        .state('menu.coolway', {
            url: 'coolway',
            views: {
                'content': {
                    templateUrl: 'templates/coolway/main.html',
                    controller: 'CoolwayController'
                }
            }
        })
        .state('menu.streaming', {
            url: 'streaming',
            views: {
                'content': {
                    templateUrl: 'templates/streaming/main.html',
                    controller: 'StreamingController'
                }
            }
        })
        .state('menu.info', {
            url: 'info',
            views: {
                'content': {
                    templateUrl: 'templates/info/main.html',
                    controller: 'InfoController'
                }
            }
        })
        .state('menu.map-how-get', {
            url: 'map-how-get',
            views: {
                'content': {
                    templateUrl: 'templates/info/map.html',
                    controller: 'MapHowGetController'
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
                    controller: 'SocialController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/artists/discover');
    $ionicConfigProvider.views.maxCache(0);
});