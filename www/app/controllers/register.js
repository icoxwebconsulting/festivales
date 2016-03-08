app.controller('RegisterController', function ($scope, $state, $ionicLoading, $ionicPopup) {

    $scope.data = {
        privacy_police: false
    };
    $scope.error = false;

    $scope.signUp = function () {
        $scope.error = false;

        if (!$scope.data.email) {
            $ionicPopup.alert({
                title: "Ingrese su E-mail"
            });
        }
        else if (!$scope.data.password) {
            $ionicPopup.alert({
                title: "Ingrese su Contraseña"
            });
        }
        else if ($scope.data.password !== $scope.data.repassword) {
            $ionicPopup.alert({
                title: "Confirme su Contraseña"
            });
        }
        else {
            $ionicLoading.show({
                template: 'Creando Cuenta ...'
            });

            //user.signup($scope.data).then(function () {
            //    $ionicLoading.hide();
            //
            //    $state.go('base.account.login');
            //}, function (error) {
            //    $ionicLoading.hide();
            //
            //    $ionicPopup.alert({
            //        title: error.message
            //    });
            //});
        }
    };
});