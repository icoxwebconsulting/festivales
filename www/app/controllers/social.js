app.controller('SocialController', function($scope, FacebookService, InstagramService, $localStorage) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.pics = [];
        $scope.have = [];
        $scope.view.orderBy = "-likes.count";
        $scope.view.show = "instagram";
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


    $scope.getData = function() {
        InstagramService.fetchImages(function(data) {
            console.info('instagram', data);
            for(var i=0; i<data.length; i++) {
                if (typeof $scope.have[data[i].id]==="undefined") {
                    $scope.view.pics.push(data[i]) ;
                    $scope.have[data[i].id] = "1";
                }
            }
        });
        if ($localStorage.hasOwnProperty("accessToken") === true) {
            FacebookService.fetchFeed().then(function (response) {
                $scope.view.facebookFeed = response.data;
                console.info('facebook',$scope.view.facebookFeed);
            });
            FacebookService.getProfilePicture().then(function (response) {
                $scope.view.facebookPicture = response;
            });

        }else{
            FacebookService.getAccessToken().then(function (data) {
                $localStorage.accessToken = data;
                service.fetchFeed();
            });
        }

    };

    $scope.getData();

});