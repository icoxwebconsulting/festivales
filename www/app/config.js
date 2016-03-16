app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
                    templateUrl: 'templates/user/login.html',
                    controller: 'LoginController'
                }
            }
        })
        .state('base.register', {
            url: 'register',
            views: {
                'content': {
                    templateUrl: 'templates/user/register.html',
                    controller: 'RegisterController'
                }
            }
        })
        .state('menu', {
            url: 'app/',
            abstract: true,
            templateUrl: 'templates/menu/main.html',
            controller: 'MenuController'
        })
        .state('menu.artist-discover', {
            url: 'artist/discover',
            views: {
                'content': {
                    templateUrl: 'templates/artist/main.html',
                    controller: 'MainController'
                }
            }
        })
        .state('menu.artist-list', {
            url: 'artist',
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
        .state('menu.schedule', {
            url: 'schedule',
            views: {
                'content': {
                    templateUrl: 'templates/schedule/main.html',
                    controller: 'ScheduleController'
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
        .state('menu.organizer', {
            url: 'organizer',
            views: {
                'content': {
                    templateUrl: 'templates/info/organizer.html'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.views.maxCache(0);
});