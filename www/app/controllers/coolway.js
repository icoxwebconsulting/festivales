app.controller('CoolwayController', function($scope, CoolwayService, GLOBAL, $ionicLoading, $state, $stateParams, $cordovaSocialSharing, $ionicPopup){

    $scope.loadPhotos = function(){
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        // Get all the Coolway Photos
        CoolwayService.resource.getAll().$promise.then(function(photos){
            $scope.view.photos = photos.data;
            $ionicLoading.hide();
            $scope.view.ready = true;
        },function(error) {
            $ionicLoading.hide();
            $scope.view.ready = true;
            $ionicPopup.alert({
                title: "Sin conexión a internet"
            });
        });
    };

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.photos = {};
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.feast_id = GLOBAL.api.feast;
        $scope.loadPhotos();
    };

    $scope.init();


    $scope.showDetail = function(image){
        $state.go('menu.coolway-detail', {'image': image});
    };

    if ($state.current.name == 'menu.coolway-detail') {
        $scope.view.image = $stateParams.image;
    }


    $scope.openPage = function(type, url){

        var scheme;
        var link;

        if(type == 'BROWSER')
        {
            window.open(url, '_system', 'location=yes');
        }else{
            switch(type)
            {
                case 'FACEBOOK':
                    link = 'fb://publish/profile/345546062072';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.facebook.katana';
                    else
                        scheme = 'fb://';
                    break;
                case 'TWITTER':
                    link = 'twitter://user?screen_name=coolwayspain';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.twitter.android';
                    else
                        scheme = 'twitter://';
                    break;
                case 'INSTAGRAM':
                    link = 'instagram://user?username=coolway_spain';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.instagram.android';
                    else
                        scheme = 'instagram://';
                    break;
            }

            appAvailability.check(
                scheme, // URI Scheme
                function() {  // Success callback
                    window.open(link, '_system', 'location=no');
                },
                function() {  // Error callback
                    window.open(url, '_system', 'location=yes');
                }
            );
        }

    };


    $scope.shareImage = function(image)
    {
        $cordovaSocialSharing.share(null, null, image, null);
    };


});
