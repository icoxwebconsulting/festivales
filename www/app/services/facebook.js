'use strict';
app.factory('FacebookService', function ($rootScope, GLOBAL, $http, $q, $localStorage) {
    function fetchFeed() {
        var deferred = $q.defer();

        $http.get('https://graph.facebook.com/'+ GLOBAL.facebook.user_id + '/feed?fields=likes,comments,link,from,message,created_time,picture&' + $localStorage.fbAccessToken)
            .success(function (response) {
                deferred.resolve(response);
            }).error(function () {
        });

        return deferred.promise;
    }

    function getAccessToken() {
        var deferred = $q.defer();

        $http.get('https://graph.facebook.com/oauth/access_token?client_id=' + GLOBAL.facebook.client_id + '&client_secret=' + GLOBAL.facebook.client_secret + '&grant_type=client_credentials')
            .success(function (response) {
                deferred.resolve(response);
            }).error(function () {
        });

        return deferred.promise;
    }

    function getProfilePicture() {
        var deferred = $q.defer();
        $http.get('https://graph.facebook.com/' + GLOBAL.facebook.user_id + '?' + $localStorage.fbAccessToken + '&fields=picture&format=json')
            .success(function (response) {
                deferred.resolve(response.picture.data.url);
            }).error(function () {
        });
        return deferred.promise;
    }

    return {
        fetchFeed:fetchFeed,
        getAccessToken:getAccessToken,
        getProfilePicture:getProfilePicture
    };

});