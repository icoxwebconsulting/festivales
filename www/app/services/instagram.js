'use strict';
app.factory('InstagramService', function ($rootScope,$q,  $http, GLOBAL) {
    var service = {};

    //function fetchImages(callback) {
    //    var endPoint = 'https://api.instagram.com/v1/users/' + GLOBAL.instagram.user_id + '/media/recent/?client_id=' + GLOBAL.instagram.client_id + '&callback=JSON_CALLBACK';
    //    $http.jsonp(endPoint).success(function (response) {
    //        callback(response.data);
    //    });
    //};

    var endPoint = 'https://api.instagram.com/v1/users/' + GLOBAL.instagram.user_id + '/media/recent/?client_id=' + GLOBAL.instagram.client_id + '&callback=JSON_CALLBACK';
    var items = [];
    var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos

    return {
        GetFeed: function() {
            return $http.jsonp(endPoint).then(function(response) {
                console.info('instagram', response.data.data);
                items = response.data.data;
                nextUrl = response.data.pagination.next_url;
                NewInsta = response.data.pagination.next_max_id;
                return items;

            });
        },
        GetNewPhotos: function() {
            return $http.jsonp(endPoint + '&min_tag_id=' + NewInsta).then(function(response) {

                items = response.data.data;
                if(response.data.data.length > 0){
                    NewInsta = response.data.pagination.next_max_id;
                }

                return items;

            });
        },

        /**
         * Always returns a promise object. If there is a nextUrl,
         * the promise object will resolve with new instragram results,
         * otherwise it will always be resolved with [].
         **/
        GetOldPhotos: function() {
            if (typeof nextUrl != "undefined") {
                return $http.jsonp(endPoint + '&max_tag_id=' + nextUrl).then(function(response) {

                    if(response.data.data.length > 0){
                        nextUrl = response.data.pagination.next_url;
                    }

                    items = response.data.data;


                    return items;

                });
            } else {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            }
        }

    };

});