app.controller('RegisterController', function ($scope, $state, $ionicLoading, $ionicPopup, UserService) {


    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.show = 'sign_up';
        $scope.view.show_login = 'options';
        $scope.view.user = new UserService.resource();
        $scope.view.loginEmail = false;
    };

    $scope.init();

    $scope.signUp = function () {
        if (!$scope.view.user.name) {
            $ionicPopup.alert({
                title: "Ingrese su nombre"
            });
        }
        else if (!$scope.view.user.email || !UserService.validateEmail($scope.view.user.email)) {
            $ionicPopup.alert({
                title: "Ingrese un email valido"
            });
        }
        else if (!$scope.view.user.password) {
            $ionicPopup.alert({
                title: "Ingrese su contraseña"
            });
        }
        else if ($scope.view.user.password.length < 8) {
            $ionicPopup.alert({
                title: "Las contraseña debe tener al menos 8 caracteres"
            });
        }
        else {
            $ionicLoading.show({
                template: 'Registrando Cuenta ...'
            });

            $scope.view.user.$register(function (response) {
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