app.controller('SocialController', function($scope, FacebookService, InstagramService, TwitterService, $localStorage) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.pics = [];
        $scope.newItemsIT = [];
        $scope.noMoreItemsAvailableIT = false;
        $scope.have = [];
        $scope.view.orderBy = "-likes.count";
        $scope.view.show = "facebook";
    };

    $scope.init();

    self.chunk = function(arr, size) {
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
        console.info('return', newArr);
        return newArr;
    };

    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };


    $scope.showTimeLine = function() {
        TwitterService.getTimeLine().then(function(data) {
            $scope.view.twTimeline = data;
        }, function(error) {
            console.info(error);
        });
    };
    $scope.doRefresh = function() {
        $scope.showTimeLine();
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.loadTwitter = function(){
        $scope.view.show = 'twitter';
        if (TwitterService.isAuthenticated()) {
            $scope.showTimeLine();
        } else {
            TwitterService.initialize().then(function(result) {
                if(result === true) {
                    $scope.showTimeLine();
                }
            });
        }
    };


    $scope.getData = function() {
        //InstagramService.fetchImages(function(data) {
        //    console.info('instagram', data);
        //    for(var i=0; i<data.length; i++) {
        //        if (typeof $scope.have[data[i].id]==="undefined") {
        //            $scope.view.pics.push(data[i]) ;
        //            $scope.have[data[i].id] = "1";
        //        }
        //    }
        //});
        InstagramService.GetFeed().then(function(items) {
            $scope.view.pics = items.concat($scope.items);
        });
        if ($localStorage.hasOwnProperty("fbAccessToken") === true) {
            FacebookService.fetchFeed().then(function (response) {
                $scope.view.facebookFeed = response.data;
                console.info('facebook',$scope.view.facebookFeed);
            });
            FacebookService.getProfilePicture().then(function (response) {
                $scope.view.facebookPicture = response;
            });

        }else{
            FacebookService.getAccessToken().then(function (data) {
                $localStorage.fbAccessToken = data;
                FacebookService.fetchFeed().then(function (response) {
                    $scope.view.facebookFeed = response.data;
                    console.info('facebook',$scope.view.facebookFeed);
                });
            });
        }

    };

    $scope.getData();




    $scope.doRefreshInstagram = function() {
        if ($scope.newItems.length > 0) {
            $scope.view.pics = $scope.newItems.concat($scope.view.pics);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

            $scope.newItems = [];
        } else {
            InstagramService.GetNewPhotos().then(function(items) {


                $scope.view.pics = items.concat($scope.view.pics);

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };
    $scope.LoadMoreInstagram = function() {
        InstagramService.GetOldPhotos().then(function(items) {

            $scope.view.pics = $scope.view.pics.concat(items);

            $scope.$broadcast('scroll.infiniteScrollComplete');

            // an empty array indicates that there are no more items
            if (items.length === 0) {
                $scope.noMoreItemsAvailableIT = true;
            }

        });
    };

});