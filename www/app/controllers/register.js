app.controller('RegisterController', function ($scope, $state, $ionicLoading, $ionicPopup) {


    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.show = 'sign_up';
        $scope.view.show_login = 'options';
        $scope.data = {};
        $scope.error = false;
        $scope.view.loginEmail = false;
    };

    $scope.init();

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