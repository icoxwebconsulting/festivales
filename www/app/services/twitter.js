'use strict';
app.factory('TwitterService', function ($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q, $localStorage, $twitterApi) {
    //var twitterKey = "STORAGE.TWITTER.KEY";
    var clientId = 'EUWrUcoeBsyc3WXcCeL7y3Cvl';
    var clientSecret = '1Dx2MY7zbypUPVK7anjIaTEb3fKxuwbeyC7mEV7MFvEULvJhz5';

    function storeUserToken(data) {
        $localStorage.twAccessToken = JSON.stringify(data);
    }

    function getStoredToken() {
        return $localStorage.twAccessToken;
    }

    function getTimeLine(){
        var params = {};
        params.screen_name = 'lesartsfest';
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
                $cordovaOauth.twitter(clientId, clientSecret).then(function (response) {
                    storeUserToken(response);
                    deferred.resolve(true);
                    $twitterApi.configure(clientId, clientSecret, response);
                }, function(error) {
                    console.info('error', error);
                    deferred.reject(false);
                });
            } else {
                $twitterApi.configure(clientId, clientSecret, token);
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