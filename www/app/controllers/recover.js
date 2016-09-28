app.controller('RecoverController', function ($scope, $state, $ionicLoading, $ionicPopup, UserService) {


    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.user = new UserService.resource();
    };

    $scope.init();

    $scope.recoverPassword = function () {
        if (!$scope.view.user.email || !UserService.validateEmail($scope.view.user.email)) {
            $ionicPopup.alert({
                title: "Ingrese un email valido"
            });
        }
        else {
            $ionicLoading.show({
                template: 'Recuperando contraseña...'
            });

            $scope.view.user.$recoverPassword(function (response) {
                $ionicPopup.alert({
                    title: "La nueva contraseña ha sido enviada a su email"
                });
                $state.go("base.login");
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