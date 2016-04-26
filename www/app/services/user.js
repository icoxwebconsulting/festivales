'use strict';
app.factory('UserService', function ($rootScope, $resource, GLOBAL, $localStorage, $ionicPopup) {

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
        //registerNotifications();
    }

    function logout(){
        $localStorage.user = {};
    }

    function validateEmail(email) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    }


    function registerDevice(data) {
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: SERVER_CONF.HOST + 'device.json',
            data: serialize(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (rsp) {
            if (rsp.success) {
                deferred.resolve(rsp);
            }
            else
                deferred.reject(rsp);
        }).error(function () {
            deferred.reject({message: "El servidor no responde intente mas tarde"});
        });

        return deferred.promise;
    }


    function registerNotifications() {
        if (window.PushNotification) {
            var PushNotification = window.PushNotification;

            var push = PushNotification.init({
                android: {
                    senderID: "140186210091",
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

            if (getUser().device_token === null || getUser().device_token === undefined) {
                push.on('registration', function (data) {
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
                console.log('error', e);
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
        registerNotifications:registerNotifications
    };
});