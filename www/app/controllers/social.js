app.controller('SocialController', function($scope, FacebookService, InstagramService, TwitterService, $localStorage, $ionicLoading, $ionicPopup) {

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
        return newArr;
    };

    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };


    $scope.showTimeLine = function() {
        TwitterService.getTimeLine().then(function(data) {
            $scope.view.twTimeline = data;
        }, function(error) {
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
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        //InstagramService.GetFeed().then(function(items) {
        //    $scope.view.pics = items.concat($scope.items);
        //},function(error) {
        //    $ionicPopup.alert({
        //        title: "Sin conexión a internet"
        //    });
        //    $ionicLoading.hide();
        //});
        if ($localStorage.hasOwnProperty("fbAccessToken") === true) {
            FacebookService.fetchFeed().then(function (response) {
                $scope.view.facebookFeed = response.data;
                $ionicLoading.hide();
            });
            FacebookService.getProfile().then(function (response) {
                $scope.view.facebookProfile = response;
            });

        }else{
            FacebookService.getAccessToken().then(function (data) {
                $localStorage.fbAccessToken = data;
                FacebookService.fetchFeed().then(function (response) {
                    $scope.view.facebookFeed = response.data;
                    $ionicLoading.hide();
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