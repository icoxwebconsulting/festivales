app.controller('BaseController', function ($scope, $state) {


    $scope.init = function()
    {
        $scope.state = $state;
        $scope.view = {};
        $scope.view.navigation = false;
        $scope.view.show = 'sign_in';
    };

    $scope.init();


    $scope.login = function(){
        $scope.view.show = 'sign_in';
        $state.go('base.login');
    };

    $scope.register = function(){
        $state.go('base.register');
        $scope.view.show = 'sign_up';
    };
});