app.controller('ScheduleController', function($scope,ArtistService, ScheduleService, $ionicLoading, GLOBAL, $state, $filter) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.ready = false;
        $scope.view.show_list = 'time';
        $scope.view.show_day = 6;
        $scope.view.show_day_from = '2017-07-06 00:00';
        $scope.view.show_day_to = '2017-07-07 06:00';
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.scheduleActive = false;
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        ScheduleService.resource.getAll().$promise.then(function(response){
            $scope.view.scheduleActive = response.data.status;
            $scope.view.ready = true;
            $ionicLoading.hide();
        },function(error) {
            $scope.view.ready = true;
            $ionicLoading.hide();
        });
    };

    $scope.init();


    $scope.setDay = function(day, from, to){
        $scope.view.show_day = day;
        $scope.view.show_day_from = from;
        $scope.view.show_day_to = to;
    };

    $scope.validateDate = function(date){
        if(date > $scope.view.show_day_from && $scope.view.show_day_to > date)
            return true;
        else
            return false;
    };


    $scope.validateStage = function(artists){

        var valid = false;

        angular.forEach(artists, function (value, key) {
            if(valid == false) {
                if ($scope.validateDate(value.schedule)){
                    valid = true;
                }
            }

        });

        return valid;
    };


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
                $scope.view.artists = artists;
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
                    $scope.view.artists = artists.data;
                    angular.forEach(artists.data, function (value, key) {
                        ArtistService.add(value);
                    });
                    $ionicLoading.hide();
                },function(error) {
                    $ionicLoading.hide();
                });
            }

        });
    };


    self.getArtists();






});
