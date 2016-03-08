app.controller('LoginController', function ($scope, $state, $http, $ionicLoading, $ionicPopup, $cordovaOauth) {



    $scope.init = function()
    {
        $scope.view = {};
        $scope.data = {};
        $scope.error = false;
        $scope.view.loginEmail = false;

    };

    $scope.init();

    $scope.loginFacebook = function () {
        $cordovaOauth.facebook("1671907443037216", ["email"]).then(function (result) {
            $ionicLoading.show({
                template: 'Verificando ...'
            });

        //    $http.get("https://graph.facebook.com/v2.2/me", {
        //        params: {
        //            access_token: result.access_token,
        //            fields: "id,email",
        //            format: "json"
        //        }
        //    }).then(function (result) {
        //        user.loginSocial(result.data.email, result.data.id).then(function () {
        //            $ionicLoading.hide();
        //
        //            $state.go('mainLayout.main');
        //        }, function (error) {
        //            $ionicLoading.hide();
        //
        //            $ionicPopup.alert({
        //                title: error.message
        //            });
        //        });
        //    }, function () {
        //        $ionicLoading.hide();
        //
        //        $ionicPopup.alert({
        //            title: 'Error Intente Nuevamente'
        //        });
        //    });
        //}, function () {
        //    $ionicLoading.hide();
        //
        //    $ionicPopup.alert({
        //        title: 'Error Intente Nuevamente'
        //    });
        });
    };

    $scope.loginGoogle = function () {
        $cordovaOauth.google("140186210091-bp9lgae3g52hvmro7gse1q2t20gba32v.apps.googleusercontent.com", ["email"]).then(function (result) {
            $ionicLoading.show({
                template: 'Verificando ...'
            });

        //    $http.get("https://www.googleapis.com/plus/v1/people/me", {
        //        params: {
        //            access_token: result.access_token,
        //            fields: "id,emails",
        //            format: "json"
        //        }
        //    }).then(function (result) {
        //        user.loginSocial(result.data.emails[0].value, result.data.id).then(function () {
        //            $ionicLoading.hide();
        //
        //            $state.go('mainLayout.main');
        //        }, function (error) {
        //            $ionicLoading.hide();
        //
        //            $ionicPopup.alert({
        //                title: error.message
        //            });
        //        });
        //    }, function () {
        //        $ionicLoading.hide();
        //
        //        $ionicPopup.alert({
        //            title: 'Error Intente Nuevamente'
        //        });
        //    });
        //}, function (error) {
        //    $ionicLoading.hide();
        //
        //    $ionicPopup.alert({
        //        title: 'Error Intente Nuevamente'
        //    });
        });
    };


    $scope.toggleLoginEmail = function ()
    {
        $scope.view.loginEmail = !$scope.view.loginEmail;
    };



    $scope.login = function () {
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
        else {
            $ionicLoading.show({
                template: 'Verificando ...'
            });

            //user.login($scope.data).then(function () {
            //    $ionicLoading.hide();
            //
            //    $state.go('mainLayout.main');
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