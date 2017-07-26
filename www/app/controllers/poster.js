app.controller('PosterController', function ($scope, $cordovaGeolocation, $ionicLoading, GLOBAL, PosterService) {

    $scope.init = function(){
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.feast = GLOBAL.api.feast;
        $scope.view.ready = false;
        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        //Get the poster
        PosterService.get().then(function(poster){

            if(poster.length > 0)
            {
                $scope.view.poster = poster[0];
                $ionicLoading.hide();
                $scope.view.ready = true;
            }
            else{
                PosterService.resource.getAll().$promise.then(function(poster){
                    $scope.view.poster = poster.data;
                    PosterService.add(poster.data);
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                },function(error) {
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                });
            }
        });
    };

    $scope.init();

});
