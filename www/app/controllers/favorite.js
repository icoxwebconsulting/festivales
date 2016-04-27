app.controller('FavoriteController', function($scope) {

    $scope.init = function()
    {
        $scope.view = {};
        $scope.view.scheduleActive = false;
    };

    $scope.$on('schedule:change', function(event, args) {
        $scope.view.scheduleActive = args;
    });

});
