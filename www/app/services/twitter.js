'use strict';
app.factory('TwitterService', function ($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q, $localStorage, $twitterApi, GLOBAL) {

    function storeUserToken(data) {
        $localStorage.twAccessToken = JSON.stringify(data);
    }

    function getStoredToken() {
        return $localStorage.twAccessToken;
    }

    function getTimeLine(){
        var params = {};
        params.screen_name = GLOBAL.twitter.screen_name;
        return $twitterApi.getUserTimeline(params).then(function(data) {
            return data;
        }, function(error) {
            return error
        });
    }


    return {
        initialize: function() {
            var deferred = $q.defer();
            var token = getStoredToken();
            if (typeof token == "undefined") {
                $cordovaOauth.twitter(GLOBAL.twitter.client_id, GLOBAL.twitter.client_secret).then(function (response) {
                    storeUserToken(response);
                    deferred.resolve(true);
                    $twitterApi.configure(GLOBAL.twitter.client_id, GLOBAL.twitter.client_secret, response);
                }, function(error) {
                    console.info('error', error);
                    deferred.reject(false);
                });
            } else {
                $twitterApi.configure(GLOBAL.twitter.client_id, GLOBAL.twitter.client_secret, token);
                deferred.resolve(true);
            }

            return deferred.promise;
        },
        isAuthenticated: function() {
            return typeof getStoredToken() != "undefined";
        },
        getTimeLine: getTimeLine
    };

});