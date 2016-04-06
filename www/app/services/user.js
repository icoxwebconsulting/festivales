app.directive('UserService', ['$window', '$q', function ($window, $q) {
    var service = {};


    service.isLogged = function()
    {
        return window.localStorage.getItem('is_logged');
    };

    return service;
}]);