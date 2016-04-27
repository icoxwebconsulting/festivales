app.controller('ScheduleController', function($scope,ArtistService, ScheduleService, $ionicLoading, GLOBAL, $state) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.ready = false;
        $scope.view.show_list = 'time';
        $scope.view.show_day = 9;
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.scheduleActive = false;

        ScheduleService.resource.getAll().$promise.then(function(response){
            $scope.view.scheduleActive = response.data.status;
        });
    };

    $scope.init();

    $scope.showDetail = function(id){
        if(id > 0)
            $state.go('menu.artist-detail', {'id': id});
        else
            return false;
    };

    self.getArtists = function(){

        // Get all the artists
        ArtistService.getAll().then(function(artists){

            if(artists.length > 0)
            {
                console.info('database', artists);
                $scope.view.artists = artists;
                $scope.view.ready = true;
            }
            else{
                // Setup the loader
                $ionicLoading.show({
                    content: 'Cargando',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                ArtistService.resource.getAll().$promise.then(function(artists){
                    console.info('api', artists);
                    $scope.view.artists = artists.data;
                    angular.forEach(artists.data, function (value, key) {
                        ArtistService.add(value);
                    });
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                },function(error) {
                    console.info('error', error);
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                });
            }

        });
    };


    self.getArtists();






});
