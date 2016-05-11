app.controller('FoodiesController', function ($rootScope, $scope,DBService,  $state, $filter, $ionicPopup, $ionicScrollDelegate, filterFilter, $anchorScroll, FoodiesService, SpotifyService, ScheduleService, GLOBAL, $ionicActionSheet, $ionicLoading, $stateParams, $cordovaSocialSharing, $localStorage) {

    $scope.init = function () {
        $scope.view = {};
        $scope.view.ready = false;
        $scope.view.server_image = GLOBAL.server.image;
        $scope.view.feast_id = GLOBAL.api.feast;
    };

    $scope.init();


    $scope.showDetail = function(id){
        if(id != null)
            $state.go('menu.foodies-detail', {'id': id});
        else
            return false;
    };

    self.sort = function(){
        var currentCharCode = ' '.charCodeAt(0) - 1;

        $scope.view.foodies
            .sort(function(a, b) {
                return a.name > b.name ? 1 : -1;
            })
            .forEach(function(item) {
                //Get the first letter of the last name, and if the last name changes
                //put the letter in the array
                var itemCharCode = item.name.toUpperCase().charCodeAt(0);
                if (itemCharCode < 65 ){
                    itemCharCode = 35;
                }

                var difference = itemCharCode - currentCharCode;


                for (var i = 1; i <= difference; i++) {
                    addLetter(currentCharCode + i);
                }
                currentCharCode = itemCharCode;
                foodies.push(item);
            });

        //If names ended before Z, add everything up to Z
        for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
            addLetter(i);
        }

        function addLetter(code) {
            var letter = String.fromCharCode(code);

            foodies.push({
                isLetter: true,
                letter: letter
            });

            letters.push(letter);
        }

    };

    self.getFoodies = function(sort){
        // Get all the foodies
        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        FoodiesService.resource.getAll().$promise.then(function(foodies){
            $scope.view.foodies = foodies.data;
            if(sort === true)
                self.sort();
            angular.forEach(foodies.data, function (value, key) {
                $localStorage.foodies[value.id] = value;
            });
            $ionicLoading.hide();
            $scope.view.ready = true;
        },function(error) {
            // console.info('error', error);
            $ionicLoading.hide();
            $scope.view.ready = true;
        });
    };



    if ($state.current.name == 'menu.foodies') {
        var letters = $scope.letters = [];
        var foodies = [];
        self.getFoodies(true);

        //Letters are shorter, everything else is 52 pixels
        $scope.getItemHeight = function(item) {
            return item.isLetter ? 35 : 100;
        };

        $scope.scrollTop = function() {
            $ionicScrollDelegate.scrollTop();
        };

        $scope.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };

        var letterHasMatch = {};
        $scope.getFoodiesList = function() {
            letterHasMatch = {};
            //Filter contacts by $scope.search.
            //Additionally, filter letters so that they only show if there
            //is one or more matching contact
            return foodies.filter(function(item) {
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


    if ($state.current.name == 'menu.foodies-detail') {
        var id = $stateParams.id;
        $scope.view.foodie = $localStorage.foodies[id];
        $scope.view.ready = true;

        $scope.shareAnywhere = function(foodies) {
            var name = foodies.name;
            var image = $scope.view.server_image+"foodies/"+foodies.id+"/cover/"+foodies.image_cover;
            $cordovaSocialSharing.share("Te recomiendo "+name+" en el #FestivalDeLesArts", "Festival de les arts", image, "http://www.festivaldelesarts.com/");
        };

    }


});