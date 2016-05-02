'use strict';
app.factory('UserService', function ($rootScope, $resource, GLOBAL, $localStorage, $ionicPopup, DeviceService, $q) {

    var resource = $resource(GLOBAL.api.url + GLOBAL.api.version + '/users', {}, {
        'register': {
            method: 'POST',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/users/'
        },
        'login': {
            method: 'POST',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/authentications/'
        },
        'updatePassword': {
            method: 'PUT',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/user/'
        },
        'recoverPassword': {
            method: 'PUT',
            isArray: false,
            url: GLOBAL.api.url + GLOBAL.api.version + '/authentication/'
        }
    });

    function isLogged(){

        if(typeof $localStorage.user === "undefined")
            return false;
        else
            return (typeof $localStorage.user.access_token === "undefined") ? false : true;
    }

    function getUser(){
        return $localStorage.user;
    }

    function getUserId(){
        return isLogged() ? getUser().id : 0;
    }

    function setUser(user){
        $localStorage.user = user;
        registerNotifications();
    }

    function logout(){
        $localStorage.user = {};
        unRegisterDevice();
    }

    function validateEmail(email) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    }

    function unRegisterDevice() {
        var deferred = $q.defer();

        $scope.device = new DeviceService.resource();
        $scope.device.$register(function (response){
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }


    function registerDevice(data) {
        console.info('register device');
        var deferred = $q.defer();
        $scope.device = new DeviceService.resource();
        $scope.access_token = data.access_token;
        $scope.device_token = data.device_token;
        $scope.device.os = data.os;

        $scope.device.$register(function (response){
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });

        return deferred.promise;
    }


    function registerNotifications() {
        if (window.PushNotification) {
            var PushNotification = window.PushNotification;

            console.info('push notification',PushNotification);

            var push = PushNotification.init({
                android: {
                    senderID: "les-arts",
                    icon: "festival",
                    iconColor: "lightgrey"
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                },
                windows: {}
            });

            console.info('getUser()', getUser());
            if (getUser().device_token === null || getUser().device_token === undefined && (push !== null) ) {
                console.info('entro en device');
                push.on('registration', function (data) {
                    console.info('data registration', data);
                    // android by default
                    var os = '0';
                    if (ionic.Platform.isIOS())
                        os = '1';

                    $localStorage.device_token = data.registrationId;
                    registerDevice({
                        access_token: getUser().access_token,
                        os: os,
                        device_token: data.registrationId
                    });
                });
            }

            push.on('notification', function (data) {
                $ionicPopup.alert({
                    title: data.title,
                    template: data.message
                });
            });

            push.on('error', function (e) {
                // e.message
                console.log('notification error', e);
            });
        }
    }

    return {
        resource: resource,
        isLogged: isLogged,
        validateEmail: validateEmail,
        getUser: getUser,
        getUserId:getUserId,
        setUser: setUser,
        logout: logout,
        registerNotifications:registerNotifications,
        registerDevice:registerDevice,
        unRegisterDevice:unRegisterDevice
    };
});