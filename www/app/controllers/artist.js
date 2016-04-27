app.controller('ArtistController', function ($rootScope, $scope,DBService,  $state, $filter, $ionicPopup, $ionicScrollDelegate, filterFilter, $anchorScroll, ArtistService, SpotifyService, ScheduleService, GLOBAL, $ionicActionSheet, $ionicLoading, $stateParams, $cordovaSocialSharing, MusicService, VersionService, $localStorage) {

    $scope.init = function () {
        $scope.view = {};
        $scope.view.ready = false;
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.feast_id = GLOBAL.api.feast;
        $scope.audio = new Audio();
        $scope.pause = true;

        $scope.view.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.view.feastDate =  $filter('date')(new Date('2016-06-10'), 'yyyy-MM-dd');

        $scope.view.scheduleActive = false;
    };

    $scope.init();


    $scope.$on('schedule:change', function(event, args) {
        $scope.view.scheduleActive = args;
    });

    $scope.showDetail = function(id){
        if(id > 0)
            $state.go('menu.artist-detail', {'id': id});
        else
            return false;
    };

    self.getArtists = function(sort){
        // Get all the artists
        ArtistService.getAll().then(function(artists){

            if(artists.length > 0)
            {
               // console.info('database', artists);
                $scope.view.artists = artists;
                if(sort === true)
                    self.sort();

                $scope.view.ready = true;
                $scope.$emit('artist:ready', true);
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
                  //  console.info('api', artists);
                    $scope.view.artists = artists.data;
                    if(sort === true)
                        self.sort();

                    angular.forEach(artists.data, function (value, key) {
                        ArtistService.add(value);
                    });
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                    $scope.$emit('artist:ready', true);
                },function(error) {
                   // console.info('error', error);
                    $ionicLoading.hide();
                    $scope.view.ready = true;
                });
            }

        });
    };


    self.sort = function(){
        var currentCharCode = ' '.charCodeAt(0) - 1;

        $scope.view.artists
            .sort(function(a, b) {
                return a.name > b.name ? 1 : -1;
            })
            .forEach(function(artist) {
                //Get the first letter of the last name, and if the last name changes
                //put the letter in the array
                var artistCharCode = artist.name.toUpperCase().charCodeAt(0);
                if (artistCharCode < 65 ){
                    artistCharCode = 35;
                }

                //if (artistCharCode > 90) {
                //    artistCharCode = 35;
                //}

                var difference = artistCharCode - currentCharCode;

                //console.info('difference', difference, ' artist ', artist.name, ' artistCharCode ',artistCharCode);

                for (var i = 1; i <= difference; i++) {
                    //console.info('entra: ',artist.name, ' currentCharCode: ',currentCharCode );
                    addLetter(currentCharCode + i);
                }
                currentCharCode = artistCharCode;
                artists.push(artist);
            });

        //If names ended before Z, add everything up to Z
        for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
            addLetter(i);
        }

        function addLetter(code) {
            var letter = String.fromCharCode(code);

            artists.push({
                isLetter: true,
                letter: letter
            });

            letters.push(letter);
        }

    };


    if ($state.current.name == 'menu.artist-list') {
        var letters = $scope.letters = [];
        var artists = $scope.artists = [];
        self.getArtists(true);

        //Letters are shorter, everything else is 52 pixels
        $scope.getItemHeight = function(item) {
            return item.isLetter ? 40 : 100;
        };

        $scope.scrollTop = function() {
            $ionicScrollDelegate.scrollTop();
        };

        $scope.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };

        var letterHasMatch = {};
        $scope.getArtistsList = function() {
            letterHasMatch = {};
            //Filter contacts by $scope.search.
            //Additionally, filter letters so that they only show if there
            //is one or more matching contact
            return artists.filter(function(item) {
                var itemDoesMatch = !$scope.view.search || item.isLetter ||
                    item.name.toLowerCase().indexOf($scope.view.search.toLowerCase()) > -1;

                //console.log(item.last_name.toString().charAt(0));

                //Mark this person's last name letter as 'has a match'


                if (!item.isLetter && itemDoesMatch) {

                    var letter = item.name.charAt(0).toUpperCase();
                    //console.info('name ', item.name,'   char code: ',item.name.charCodeAt(0));
                    //if ( item.name.charCodeAt(0) < 65 || item.name.charCodeAt(0) > 90)
                    if ( item.name.charCodeAt(0) < 65)
                        letter = "#";

                    letterHasMatch[letter] = true;
                }

                return itemDoesMatch;
            }).filter(function(item) {
                //Finally, re-filter all of the letters and take out ones that don't
                //have a match
                if(item.isLetter && !letterHasMatch[item.letter])
                    return false;

                return true;
            });
        };

        $scope.clearSearch = function () {
            $scope.view.search = '';
        };
    }

    if ($state.current.name == 'menu.artist-discover') {
        if($localStorage.lastUpdate != $scope.view.currentDate)
        {
            VersionService.resource.get().$promise.then(function(response){
                if(response.data.version != $localStorage.version)
                {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Nueva actualización',
                        template: '¿Desea descargar los nuevos datos?'
                    });

                    confirmPopup.then(function(confirm) {
                        if(confirm)
                        {
                            DBService.init(true);
                            self.getArtists(false);
                            $localStorage.version = response.data.version;
                            $localStorage.lastUpdate = $filter('date')(new Date(), 'yyyy-MM-dd');
                        }else
                        {
                            self.getArtists(false);
                            $localStorage.lastUpdate = $filter('date')(new Date(), 'yyyy-MM-dd');
                        }
                    });
                }else{
                    self.getArtists(false);
                }
            },function(error) {
                self.getArtists(false);
            });
        }else{
            self.getArtists(false);
        }



        $scope.playTrack = function(artist) {
            $rootScope.$broadcast('music:clear', true);
            if($scope.view.isPause && $scope.view.currentTrack.spotify_id == artist.spotify_id)
            {
                MusicService.play();
            }else{
                SpotifyService.getTopTracks(artist.spotify_id).then(function(tracks){
                    var track = {};
                    track.spotify_id = artist.spotify_id;
                    track.artist  = tracks[0].artists[0].name;
                    track.name = tracks[0].name;
                    track.url = tracks[0].preview_url;
                    MusicService.clear();
                    MusicService.add(track, false);
                    MusicService.play();
                });
            }

        };

        $scope.pauseTrack = function(){
            MusicService.pause();
        };


        $scope.$on('music:play', function(event, args) {
            $scope.view.isPlaying = true;
            $scope.view.isPause = false;
            $scope.view.currentTrack = args;
        });

        $scope.$on('music:pause', function(event, args) {
            $scope.view.isPlaying = false;
            $scope.view.isPause = true;
            $scope.view.currentTrack = args;
        });

    }

    if ($state.current.name == 'menu.artist-detail') {
        ArtistService.getById($stateParams.id).then(function(artist){
            $scope.view.artist = artist;
            $scope.view.ready = true;
        });


        $scope.playTrack = function(artist) {
            $rootScope.$broadcast('music:clear', true);
            if($scope.view.isPause && $scope.view.currentTrack.spotify_id == artist.spotify_id)
            {
                MusicService.play();
            }else{
                SpotifyService.getTopTracks(artist.spotify_id).then(function(tracks){
                    var track = {};
                    track.spotify_id = artist.spotify_id;
                    track.artist  = tracks[0].artists[0].name;
                    track.name = tracks[0].name;
                    track.url = tracks[0].preview_url;
                    MusicService.clear();
                    MusicService.add(track, false);
                    MusicService.play();
                });
            }

        };

        //$scope.showShareMenu = function() {
        //
        //    $ionicActionSheet.show({
        //        titleText: 'Share',
        //        buttons: [
        //            {text: "Share on Facebook"},
        //            {text: "Share on Twitter"},
        //            {text: "Send email"}
        //        ],
        //        cancelText: 'Cancel',
        //        cancel: function () {
        //            console.log('CANCELLED');
        //        },
        //        buttonClicked: function (index) {
        //            console.log('BUTTON CLICKED', index);
        //            return true;
        //        }
        //    });
        //};
        $scope.shareAnywhere = function(artist) {
            //console.info('artist', artist);
            var name = artist.name;
            var image = $scope.view.server_image+"artists/"+artist.id+"/cover/"+artist.image_cover;
            $cordovaSocialSharing.share("Te recomiendo "+name+" en el #FestivalDeLesArts", "Festival de les arts", image, "http://www.festivaldelesarts.com/");
        };

    }


});