app.controller('MapHowGetController', function ($scope, $cordovaGeolocation, $ionicLoading, GLOBAL, MapService, $cordovaDevice, $ionicPopup) {

    self.getMapAndLocations = function(){
        return MapService.resource.getAll().$promise.then(function(map){
            return map;
        },function(error) {
            return error;
        });
    };

    $scope.init = function(){
        $scope.server_image = GLOBAL.server.image;
        $scope.view.ready = false;
        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        // Get all the artists
        MapService.getAll().then(function(map){

            if(map.length > 0)
            {
                $scope.mapData = map[0];
                self.loadMap();
            }
            else{
                self.getMapAndLocations().then(function(map){
                    $scope.mapData = map.data;
                    MapService.add(map.data);
                    self.loadMap();
                });
            }

            $ionicLoading.hide();
            $scope.view.ready = true;
        });
    };



    self.loadMap = function() {

        console.info('$scope.mapData how',$scope.mapData);

        if($scope.mapData.latitude.length > 0)
            $scope.centroLatlng = new google.maps.LatLng($scope.mapData.latitude, $scope.mapData.longitude);

        var mapOptions = {
            center: $scope.centroLatlng,
            scrollwheel: false,
            zoom: 15,
            maxZoom: 19,
            streetViewControl: false,
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-how-get"), mapOptions);

        $scope.map = map;
        $scope.directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: { strokeColor: 'red' }});


        //var image = 'images/beachflag.png';
        var beachMarker = new google.maps.Marker({
            position: $scope.centroLatlng,
            map: $scope.map
            //icon: image
        });
        $scope.map.setZoom(15);
        $scope.map.setCenter($scope.centroLatlng);
    };




    $scope.goFromMyLocation = function(mode)
    {
        //document.getElementById("id_waiting").style.visibility = 'visible';
        //navigator.geolocation.getCurrentPosition(function(position) {
        var posOptions = {timeout: 10000, enableHighAccuracy: true, maximumAge: 1000 * 60 * 60};
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
            var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           // var myLocation = new google.maps.LatLng(39.456673, -0.363268);
            var directionsService = new google.maps.DirectionsService;
            $scope.directionsDisplay.setMap($scope.map);

            directionsService.route(
                {
                    origin: myLocation,
                    destination: $scope.centroLatlng,
                    travelMode: google.maps.TravelMode[mode]
                },
                function(response, status)
                {
                    if (status === google.maps.DirectionsStatus.OK) {
                        $scope.directionsDisplay.setDirections(response);
                    } else {
                        $ionicPopup.show({
                            template: '<p style="color:#000;">Desde tu ubicación no se puede realizar el recorrido.</p>',
                            title: 'Recorrido no disponible',
                            buttons: [
                                {
                                    text: '<b>Aceptar</b>',
                                    type: 'button-positive'
                                }
                            ]
                        });
                    }
                });
           // document.getElementById("id_waiting").style.visibility = 'hidden';
        }, function (err) {

                $ionicPopup.show({
                    template: '<p style="color:#000;">Para poder usar tu ubicación debes tener activado tu gps.</p>',
                    title: 'Activar GPS',
                    buttons: [
                        {
                            text: '<b>Aceptar</b>',
                            type: 'button-positive'
                        }
                    ]
                });
            });

        //var options = {timeout: 40000, enableHighAccuracy: false};
        //$cordovaGeolocation.getCurrentPosition(options).then(function(position)
        //{
        //    console.info('My position: ', position);
        //    var myLocation = new google.maps.LatLng(39.456673, -0.363268);
        //   // var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //    var directionsService = new google.maps.DirectionsService;
        //    $scope.directionsDisplay.setMap($scope.map);
        //
        //    directionsService.route(
        //        {
        //            origin: myLocation,
        //            destination: $scope.centroLatlng,
        //            travelMode: google.maps.TravelMode[metodo]
        //        },
        //        function(response, status)
        //        {
        //            if (status === google.maps.DirectionsStatus.OK) {
        //                $scope.directionsDisplay.setDirections(response);
        //            } else {
        //                window.alert(status);
        //            }
        //        });
        //    document.getElementById("id_waiting").style.visibility = 'hidden';
        //}, function(error) {
        //    console.info('error location', error);
        //});
    };

    $scope.init();

});