'use strict';
app.factory('TimeService', function ($rootScope, GLOBAL, $http, $q, $localStorage) {
    return {
        dhms: function (t) {
            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            var hoursTotal = hours + (days * 24);

            if(days > 0)
            {
                var response = [
                    days + ' días -',
                    hours + ' horas'
                ]
            }else{
                var response = [
                    hours + ' horas'
                ]
            }

            return response.join(' ');
        }
    };
});