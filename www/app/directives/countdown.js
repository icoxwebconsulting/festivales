app.directive('countdown', ['TimeService', '$interval', function (TimeService, $interval) {
    return {
        restrict: 'A',
        scope: { date: '@' },
        link: function (scope, element) {
            var future;
            future = new Date(scope.date);
            $interval(function () {
                var diff;
                diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                return element.text(TimeService.dhms(diff));
            }, 1000);
        }
    };
}]);