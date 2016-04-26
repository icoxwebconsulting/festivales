app.controller('LoginController', function ($scope, $state, $http, $ionicLoading, GLOBAL, $ionicPopup, $cordovaOauth, UserService) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.show = 'sign_in';
        $scope.view.show_login = 'options';
        $scope.view.user = new UserService.resource();
        $scope.view.loginEmail = false;

    };

    $scope.init();


    $scope.later = function(){
      $state.go('menu.artist-discover');
    };

    $scope.loginFacebook = function () {
        $cordovaOauth.facebook(GLOBAL.facebook.client_id, ["email"]).then(function (result) {
            $ionicLoading.show({
                template: 'Verificando ...'
            });

            $http.get("https://graph.facebook.com/"+GLOBAL.facebook.api_version+"/me", {
                params: {
                    access_token: result.access_token,
                    fields: "id,email,name",
                    format: "json"
                }
            }).then(function (result) {
                console.info('result', result);
                $scope.view.user.email = result.data.email;
                $scope.view.user.name = result.data.name;
                $scope.view.user.social = true;
                $scope.view.user.$login(function (response) {
                    UserService.setUser(response);
                    $state.go("menu.artist-discover");
                    $ionicLoading.hide();
                }, function (error) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: error.data.message
                    });
                });
            }, function () {
                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: 'Error Intente Nuevamente'
                });
            });
        }, function () {
            $ionicLoading.hide();

            $ionicPopup.alert({
                title: 'Error Intente Nuevamente'
            });
        });
    };


    $scope.toggleLoginEmail = function ()
    {
        $scope.view.loginEmail = !$scope.view.loginEmail;
    };



    $scope.login = function () {
        if (!$scope.view.user.email || !UserService.validateEmail($scope.view.user.email)) {
            $ionicPopup.alert({
                title: "Ingrese un email valido"
            });
        }
        else if (!$scope.view.user.password) {
            $ionicPopup.alert({
                title: "Ingrese su contraseña"
            });
        }
        else {
            $ionicLoading.show({
                template: 'Iniciando...'
            });

            $scope.view.user.$login(function (response){
                UserService.setUser(response);
                $state.go("menu.artist-discover");
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: error.data.message
                });
            });
        }
    };




});