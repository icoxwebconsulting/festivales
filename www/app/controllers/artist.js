app.controller('ArtistController', function ($scope, $state, $ionicScrollDelegate, filterFilter, $location, $anchorScroll, $ionicModal, ArtistService, GLOBAL, $ionicLoading, $stateParams) {

    $scope.init = function () {
        $scope.view = {};
        $scope.view.server_image = GLOBAL.server.image
    };

    $scope.init();

    $scope.showDetail = function(id){
        if(id > 0)
            $state.go('menu.artist-detail', {'id': id});
        else
            return false;
    };

    self.getArtists = function(sort){
        $scope.view.ready = false;
        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        // Get all the documents
        ArtistService.getAll().then(function(artists){

            if(artists.length > 0)
            {
                console.info('database', artists);
                $scope.view.artists = artists;
                if(sort === true)
                    self.sort();

                $ionicLoading.hide();
                $scope.view.ready = true;
            }
            else{
                ArtistService.resource.getAll().$promise.then(function(artists){
                    console.info('api', artists);
                    $scope.view.artists = artists.data;
                    if(sort === true)
                        self.sort();

                    angular.forEach(artists.data, function (value, key) {
                        ArtistService.add(value);
                    });
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
        $scope.getArtists = function() {
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
        self.getArtists(false);
    }

    if ($state.current.name == 'menu.artist-detail') {
        ArtistService.getById($stateParams.id).then(function(artist){
            $scope.view.artist = artist;
        });
    }


}).filter('parseName', function () {
    return function (text) {
        if(typeof text === "undefined")
            return text;
        else
            return text.replace("!", "");
    };
});