app.controller('TicketController', function($scope, GLOBAL, $sce) {

    $scope.init = function()
    {
        var src = "https://www.ticketea.com/"+GLOBAL.festival.ticketea+"/custom/";

        $scope.view.festival = GLOBAL.festival;
        $scope.view.iframe = $sce.trustAsResourceUrl(src);
    };

    $scope.init();

});
