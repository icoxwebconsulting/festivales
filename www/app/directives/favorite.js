app.directive('favorite', ['FavoriteService','UserService','$ionicPopup','$state', function (FavoriteService, UserService, $ionicPopup,$state) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<button data-ng-click="change(data.status)" class="button button-clear favorite"><img ng-src="img/favorite/{{data.status}}.png"> </button>',
        scope: {
            'artist': '='
        },
        link: function($scope, elem, attrs) {

            $scope.data = {'artist':$scope.artist};
            console.info('in', $scope.data.artist);

            if(UserService.isLogged())
            {
                if(typeof $scope.data.artist != "undefined")
                {
                    FavoriteService.getArtistById($scope.data.artist.id).then(function(response){
                        if(typeof response.artist_id === "undefined")
                            $scope.data.status = 'off';
                        else
                            $scope.data.status = 'on';
                    });
                }
            }else{
                $scope.data.status = 'off';
            }



            function remove(artistId){
                FavoriteService.remove(artistId);
                $scope.data.status = 'off';
                $scope.$emit('favorite:change', true);
            }

            function add(artistId){
                FavoriteService.add(artistId);
                $scope.data.status = 'on';
                $scope.$emit('favorite:change', true);
            }

            $scope.change = function(status){
                if(UserService.isLogged())
                {
                    if(status == 'on')
                        remove($scope.data.artist.id);
                    else
                        add($scope.data.artist.id);
                }
                else{
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Iniciar sesión',
                        template: 'Para agregar favoritos debes estar logeado'
                    });

                    confirmPopup.then(function(response) {
                        if(response)
                            $state.go("base.login");
                    });
                }



            }




        }
    };
}]);