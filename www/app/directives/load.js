app.directive('lazyLoad', ['$window', '$q', function ($window, $q) {
    function load_script() {
        var s = document.createElement('script'); // use global document since Angular's $document is weak
        s.src = '/www.ticketea.com/entradas-festival-les-arts-2016/buy?width=600px&height=600px';
        document.body.appendChild(s);
    }
    function lazyLoadApi(key) {
        var deferred = $q.defer();
        $window.initialize = function () {
            deferred.resolve();
        };
        // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
        if ($window.attachEvent) {
            $window.attachEvent('onload', load_script);
        } else {
            $window.addEventListener('load', load_script, false);
        }
        return deferred.promise;
    }
    return {
        restrict: 'E',
        link: function (scope, element, attrs) { // function content is optional
            // in this example, it shows how and when the promises are resolved
            if ($window.google && $window.google.maps) {
            } else {
                lazyLoadApi().then(function () {
                    if ($window.google && $window.google.maps) {
                        console.log('gmaps loaded');
                    } else {
                        console.log('gmaps not loaded');
                    }
                }, function () {
                    console.log('promise rejected');
                });
            }
        }
    };
}]);