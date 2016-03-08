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
            templateUrl: 'templates/menu.html',
            controller: 'MenuController'
        })
        .state('menu.main', {
            url: 'main',
            views: {
                'content': {
                    templateUrl: 'templates/artist/main.html',
                    controller: 'MainController'
                }
            }
        })
        .state('menu.ticket', {
            url: 'ticket',
            views: {
                'content': {
                    templateUrl: 'templates/ticket.html',
                    controller: 'TicketController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.views.maxCache(0);
});