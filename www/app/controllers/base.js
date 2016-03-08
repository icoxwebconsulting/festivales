app.controller('BaseController', function ($scope, $state) {
    $scope.state = $state;
    $scope.view = {};
    $scope.view.navigation = false;
});