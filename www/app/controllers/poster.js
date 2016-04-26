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

        // Get the poster
        //PosterService.get().then(function(poster){
        //
        //    if(poster.length > 0)
        //    {
        //        console.info('database', poster);
        //        $scope.view.poster = poster;
        //        $ionicLoading.hide();
        //    }
        //    else{
                PosterService.resource.getAll().$promise.then(function(poster){
                    console.info('api', poster);
                    $scope.view.poster = poster.data;
                 //   PosterService.add(poster.data);
                    $ionicLoading.hide();
                });
            //}
        //});
    };

    $scope.init();

});