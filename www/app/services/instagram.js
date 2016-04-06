'use strict';
app.factory('InstagramService', function ($rootScope, $http, GLOBAL) {
    var service = {};

    function fetchImages(callback) {
        var endPoint = 'https://api.instagram.com/v1/users/' + GLOBAL.instagram.user_id + '/media/recent/?client_id=' + GLOBAL.instagram.client_id + '&callback=JSON_CALLBACK';
        $http.jsonp(endPoint).success(function (response) {
            callback(response.data);
        });
    };

    return {
        fetchImages:fetchImages
    };
});