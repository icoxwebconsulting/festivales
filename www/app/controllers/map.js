app.controller('MapController', function ($scope, $cordovaGeolocation, $ionicLoading, $cordovaDevice, GLOBAL, MapService) {

    self.getMapAndLocations = function(){
       // console.info('getMapAndLocations');
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

        // Get all the Locations
        MapService.getAll().then(function(map){

            if(map.length > 0)
            {
                //console.info('database', map);
                $scope.mapData = map[0];

                MapService.getAllLocations().then(function(locations){
                    if(locations.length > 0)
                    {
                        $scope.locations = locations;
                        self.loadMap();
                    }else{
                        self.getMapAndLocations().then(function(map){
                            //console.info('api', map);
                            $scope.mapData = map.data;
                            $scope.locations = [];
                            MapService.add(map.data);

                            var cont = 0;
                            angular.forEach(map.data.locations, function (value, key) {
                                MapService.addLocation(value);
                                $scope.locations.push(value);
                                cont = cont+1;
                            });

                            self.loadMap();
                        });
                    }
                });
            }
            else{
                self.getMapAndLocations().then(function(map){
                   // console.info('api', map);
                    $scope.mapData = map.data;
                    $scope.locations = [];
                    MapService.add(map.data);

                    var cont = 0;
                    angular.forEach(map.data.locations, function (value, key) {
                        MapService.addLocation(value);
                        $scope.locations.push(value);
                        cont = cont+1;
                    });
                    self.loadMap();
                });
            }

            $ionicLoading.hide();
            $scope.view.ready = true;
        });
    };



    self.loadMap = function() {
        var marker, i;
        var infoWindow = new google.maps.InfoWindow();
        var imgOver;

        if($scope.mapData.latitude.length > 0)
            $scope.centroLatlng = new google.maps.LatLng($scope.mapData.latitude, $scope.mapData.longitude);

        var mapOptions = {
            center: $scope.centroLatlng,
            streetViewControl: false,
            zoomControl: false,
            zoom: 15,
            maxZoom: 19,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        if($scope.locations.length > 0)
        {
            angular.forEach($scope.locations, function (value, key) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.latitude, value.longitude),
                    map: map,
                    title: value.name,
                    icon: new google.maps.MarkerImage($scope.server_image+'googlemap/'+value.image)
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i)
                {
                    return function() {
                        infoWindow.setContent(value.detail);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            });
        }

        var imageBounds = {
            north: 39.458577,
            south: 39.452215,
            east: -0.347785,
            west: -0.356626
        };
        var overlayOpts = {
            opacity: 1
        };
        //imgOver = new google.maps.GroundOverlay($scope.server_image+'feast/'+$scope.mapData.image, imageBounds, overlayOpts);
        imgOver = new google.maps.GroundOverlay('img/map/precint.png', imageBounds, overlayOpts);
        imgOver.setMap(map);

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



    $scope.showMyLocation = function()
    {
        document.getElementById("id_waiting").style.visibility = 'visible';
        navigator.geolocation.getCurrentPosition(function(position) {
            console.info('my location', position);
            var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var myMarker = new google.maps.Marker({
                position: mypos,
                map: $scope.map
            });
            var myInfoWindow = new google.maps.InfoWindow({
                map: $scope.map,
                position: mypos,
                content: 'Tú estás aquí',
                pixelOffset: new google.maps.Size(0, -40)
            });
            $scope.map.setZoom(17);
            $scope.map.setCenter(mypos);

            document.getElementById("id_waiting").style.visibility = 'hidden';
        });
    };


    $scope.init();

});