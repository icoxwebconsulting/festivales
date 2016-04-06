'use strict';
app.factory('UserService', function ($rootScope, Spotify) {
    var service = {};


    service.isLogged = function()
    {
        return window.localStorage.getItem('is_logged');
    };

    return service;
});