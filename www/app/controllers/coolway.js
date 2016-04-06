app.controller('CoolwayController', function($scope, $cordovaAppAvailability) {

    $scope.init = function()
    {
        $scope.view = {};
    };

    $scope.init();

    $scope.openPage = function(type, url){

        var scheme;
        var link;

        if(type == 'BROWSER')
        {
            window.open(url, '_system', 'location=yes');
        }else{
            switch(type)
            {
                case 'FACEBOOK':
                    link = 'fb://profile/CoolwaySpain';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.facebook.katana';
                    else
                        scheme = 'fb://';
                    break;
                case 'TWITTER':
                    link = 'twitter://user?screen_name=coolwayspain';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.twitter.android';
                    else
                        scheme = 'twitter://';
                    break;
                case 'INSTAGRAM':
                    link = 'instagram://user?username=coolway_spain';
                    if(ionic.Platform.isAndroid())
                        scheme = 'com.instagram.android';
                    else
                        scheme = 'instagram://';
                    break;
            }

            appAvailability.check(
                scheme, // URI Scheme
                function() {  // Success callback
                    window.open(link, '_system', 'location=no');
                    console.log('Twitter is available');
                },
                function() {  // Error callback
                    window.open(url, '_system', 'location=yes');
                    console.log('Twitter is not available');
                }
            );
        }

    };

});
