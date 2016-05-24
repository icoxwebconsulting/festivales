app.controller('LoginController', function ($scope, $state, $http, $q, $ionicActionSheet, $ionicLoading, GLOBAL, $ionicPopup, $cordovaOauth, UserService) {

    $scope.init = function () {
        $scope.view = {};
        $scope.view.show = 'sign_in';
        $scope.view.show_login = 'options';
        $scope.view.user = new UserService.resource();
        $scope.view.loginEmail = false;
    };

    $scope.init();


    $scope.later = function () {
        $state.go('menu.artist-discover');
    };

    //$scope.loginFacebook = function () {
    //    $cordovaOauth.facebook(GLOBAL.facebook.client_id, ["email"]).then(function (result) {
    //        $ionicLoading.show({
    //            template: 'Verificando ...'
    //        });
    //
    //        $http.get("https://graph.facebook.com/"+GLOBAL.facebook.api_version+"/me", {
    //            params: {
    //                access_token: result.access_token,
    //                fields: "id,email,name",
    //                format: "json"
    //            }
    //        }).then(function (result) {
    //            $scope.view.user.email = result.data.email;
    //            $scope.view.user.name = result.data.name;
    //            $scope.view.user.social = true;
    //            $scope.view.user.$login(function (response) {
    //                UserService.setUser(response);
    //                $state.go("menu.artist-discover");
    //                $ionicLoading.hide();
    //            }, function (error) {
    //                $ionicLoading.hide();
    //                $ionicPopup.alert({
    //                    title: error.data.message
    //                });
    //            });
    //        }, function () {
    //            $ionicLoading.hide();
    //
    //            $ionicPopup.alert({
    //                title: 'Error Intente Nuevamente'
    //            });
    //        });
    //    }, function () {
    //        $ionicLoading.hide();
    //
    //        $ionicPopup.alert({
    //            title: 'Error Intente Nuevamente'
    //        });
    //    });
    //};


    $scope.toggleLoginEmail = function () {
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
        }
    };


    var fbLoginSuccess = function (response) {
        if (!response.authResponse) {
            fbLoginError("Cannot find the authResponse");
            return;
        }

        var authResponse = response.authResponse;

        getFacebookProfileInfo(authResponse)
            .then(function (profileInfo) {
                $scope.view.user.email = profileInfo.email;
                $scope.view.user.name = profileInfo.name;
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
            }, function (fail) {
                // Fail get profile info
                console.log('profile info fail', fail);
            });
    };

    // This is the fail callback from the login method
    var fbLoginError = function (error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
            function (response) {
                console.log(response);
                info.resolve(response);
            },
            function (response) {
                console.log(response);
                info.reject(response);
            }
        );
        return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.loginFacebook = function () {
        facebookConnectPlugin.getLoginStatus(function (success) {
            if (success.status === 'connected') {
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                console.log('getLoginStatus', success.status);


                getFacebookProfileInfo(success.authResponse)
                    .then(function (profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        $scope.view.user.email = profileInfo.email;
                        $scope.view.user.name = profileInfo.name;
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
                    }, function (fail) {
                        // Fail get profile info
                        console.log('profile info fail', fail);
                    });
            } else {
                // If (success.status === 'not_authorized') the user is logged in to Facebook,
                // but has not authenticated your app
                // Else the person is not logged into Facebook,
                // so we're not sure if they are logged into this app or not.

                console.log('getLoginStatus', success.status);

                $ionicLoading.show({
                    template: 'Iniciando ...'
                });

                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        });
    };


});