app.controller('InfoController', function($scope, $state) {

    $scope.init = function()
    {
        $scope.view = {};
    };

    $scope.init();

    $scope.go = function(state){
        $state.go(state);
    };

});
