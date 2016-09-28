'use strict';
app.factory('UserService', function ($rootScope, $resource, GLOBAL, $localStorage, $ionicPopup, DeviceService, $q, $state) {

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

    function notificationActive(){
        return isLogged() ? getUser().notification : false;
    }

    function setUser(user){
        $localStorage.user = user;
        registerNotifications();
    }

    function logout(){
        var data = {};
        data.access_token = $localStorage.user.access_token;
        data.device_token = $localStorage.device_token;
        data.os = $localStorage.os;
        unRegisterDevice(data).then(function(response){
            $localStorage.user = {};
            $state.go("base.login");
        });
    }

    function validateEmail(email) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    }

    function unRegisterDevice(data) {
        var deferred = $q.defer();
        var deviceResource = new DeviceService.resource();
        deviceResource.$unRegister({access_token: data.access_token, device_token: data.device_token }, function (response){
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }


    function registerDevice(data) {
        var deferred = $q.defer();
        var deviceResource = new DeviceService.resource();
        deviceResource.access_token = data.access_token;
        deviceResource.device_token = data.device_token;
        deviceResource.os = data.os;

        deviceResource.$register(function (response){
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        });

        return deferred.promise;
    }


    function registerNotifications() {
        if (window.PushNotification) {
            var PushNotification = window.PushNotification;
            var push = PushNotification.init({
                android: {
                    senderID: "32315875068",
                    icon: "icon",
                    iconColor: "lightgrey"
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                }
            });

            if (getUser().device_token === null || getUser().device_token === undefined && (push !== null) ) {
                push.on('registration', function (data) {
                    // android by default
                    var os = '0';
                    if (ionic.Platform.isIOS())
                        os = '1';

                    $localStorage.device_token = data.registrationId;
                    $localStorage.os = os;
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
        unRegisterDevice:unRegisterDevice,
        notificationActive: notificationActive
    };
});