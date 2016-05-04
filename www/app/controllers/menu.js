app.controller('MenuController', function($rootScope, $scope, $ionicModal, ScheduleService, $ionicPopup, $ionicPlatform, DBService, $state, GLOBAL, Spotify, UserService, $ionicLoading, FavoriteService, ArtistService, NotificationService, WeatherService, $cordovaSocialSharing, $filter) {
//app.controller('MenuController', function($rootScope, $scope, $ionicModal, ScheduleService, $ionicPopup, $ionicPlatform, $state, GLOBAL, Spotify, UserService, $ionicLoading, FavoriteService, ArtistService, NotificationService, WeatherService, $cordovaSocialSharing, $filter) {
    $scope.init = function(){
        console.info('init db');
        DBService.init();
        $scope.view = {};
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.show_list = 'favorites';
        $scope.view.favorites = false;
        $scope.view.notifications = false;

        $scope.view.setting = {};
        $scope.view.setting.notifications = true;
        $scope.view.pass = new UserService.resource();
        $scope.view.weathers = {};

        if(UserService.isLogged())
        {
            $scope.view.user = UserService.getUser();
        }

        $scope.view.scheduleActive = false;

        ScheduleService.resource.getAll().$promise.then(function(response){
            $scope.view.scheduleActive = response.data.status;
            $rootScope.$broadcast('schedule:change', response.data.status);
        });

    };

    $scope.init();

    $scope.$on('favorite:change', function(event, args) {
        console.info('favorite change');
        if(UserService.isLogged())
            self.getFavorites();

    });

    $scope.$on('artist:ready', function(event, args) {
        if(UserService.isLogged())
        {
            console.info('entro favoritos logeados');
            self.getFavorites();
            self.getNotifications();
        }else
            console.info("no logged");

    });

    self.getFavorites = function(){
        //$ionicLoading.show({
        //    content: 'Cargando',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});
        // Get all the favorites
        FavoriteService.getAll().then(function(favorites){
            console.info('database favs out', favorites);
            if(favorites.length > 0)
            {
                var ids = [];
                angular.forEach(favorites, function (value, key) {
                    ids.push(value.artist_id);
                });
                ArtistService.getFavorites(ids).then(function(favorites){
                    console.info('database favs', favorites);
                    $scope.view.favorites = favorites;
                    $scope.view.ready = true;
                    //$ionicLoading.hide();
                });
            }
            else{
                console.info('api favs 1');
                FavoriteService.resource.getAll().$promise.then(function(favorites){
                    if(favorites.data.length > 0)
                    {
                        var ids = [];
                        angular.forEach(favorites.data, function (value, key) {
                            FavoriteService.add(value.id);
                            ids.push(value.id);
                        });
                        ArtistService.getFavorites(ids).then(function(favorites){
                            console.info('api favs final', favorites);
                            $scope.view.favorites = favorites;
                            $scope.view.ready = true;
                            //$ionicLoading.hide();
                        });
                    }else{
                        $scope.view.favorites = {};
                        $scope.view.ready = true;
                        //$ionicLoading.hide();
                    }

                },function(error) {
                    console.info('error', error);
                    $scope.view.ready = true;
                    //$ionicLoading.hide();
                });
            }

        });
    };

    self.getNotifications = function(){
        // Get all the notifications
        NotificationService.resource.getAll().$promise.then(function(notifications){
            console.info('notifications', notifications);
            if(notifications.data.length > 0)
            {
                $scope.view.notifications = notifications.data;
            }else{
                $scope.view.notifications = {};
                $scope.view.ready = true;
            }

        },function(error) {
            console.info('error', error);
            $scope.view.ready = true;
            //$ionicLoading.hide();
        });
    };


    // Create the settings modal that we will use later
    $ionicModal.fromTemplateUrl('templates/user/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalSettings = modal;
    });

    // Open the login modal
    $scope.openSettings = function() {
        console.info($scope.view.user);

        if(UserService.isLogged())
            $scope.modalSettings.show();
        else{
            var confirmPopup = $ionicPopup.confirm({
                title: 'Iniciar sesión',
                template: 'Para ingresar debes estar logeado'
            });

            confirmPopup.then(function(response) {
                if(response)
                    $state.go("base.login");
            });
        }


    };

    // Triggered in the login modal to close it
    $scope.closeSettings = function() {
        $scope.modalSettings.hide();
    };

    $scope.changePassword = function () {
        if (!$scope.view.pass.current_password) {
            $ionicPopup.alert({
                title: "Ingrese su contraseña actual"
            });
        }
        else if (!$scope.view.pass.new_password) {
            $ionicPopup.alert({
                title: "Ingrese su nueva contraseña"
            });
        }
        else if ($scope.view.pass.new_password == $scope.view.confirm) {
            $ionicPopup.alert({
                title: "Las contraseñas deben ser iguales"
            });
        }
        else if ($scope.view.pass.current_password.length < 8 || $scope.view.pass.new_password.length < 8 || $scope.view.pass.confirm.length < 8 ) {
            $ionicPopup.alert({
                title: "Las contraseña debe tener al menos 8 caracteres"
            });
        }
        else {
            $ionicLoading.show({
                template: 'Actualizando...'
            });

            $scope.view.pass.email = UserService.getUser().email;
            $scope.view.pass.$updatePassword(function (response){
                UserService.setUser(response);
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: error.data.message
                });
            });
        }
    };



    $scope.logout = function(){
        $ionicLoading.show({
            template: 'Cerrando...'
        });
        UserService.logout();
        $state.go("base.login");
        $scope.closeSettings();
        $ionicLoading.hide();
    };

    $scope.openLink = function(link){
        window.open(link, '_system', 'location=yes');
    };

    $scope.showArtistDetail = function(id){
        if(id > 0)
            $state.go('menu.artist-detail', {'id': id});
        else
            return false;
    };


    $scope.shareFavorites = function() {
        var message = "";
        angular.forEach($scope.view.favorites, function (value, key) {
                message += " \r\n"+$filter('cleanName')(value.name)+" \r\n"+$filter('parseDate')(value.schedule)+" - "+$filter('parseDate')(value.schedule, 'HH:mm')+"\r\n"+value.stage_name+" \r\n";
        });
        $cordovaSocialSharing.share("Mis artistas favoritos  en el #FestivalDeLesArts: \r\n"+message, "Festival de les arts", '', "\r\n http://www.festivaldelesarts.com/");
    };

    $scope.getWeather = function(){
        console.info('weather afuera', $scope.view.weathers.length);
        if($scope.view.weathers)
        {
            WeatherService.resource.getAll().$promise.then(function(weathers){
                console.info('weather', weathers);
                $scope.view.weathers = weathers.data;
            });
        }
    };


});
