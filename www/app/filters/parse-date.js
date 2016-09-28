app.filter('parseDate', function ($filter, amMoment) {
    return function(text, type){
        if(typeof text === "undefined")
            return text;
        else{
            var dt  = text.split(/\-|\s/);
            var dateString = dt.slice(0,3).join('-') + ' ' + dt[3];
            //var date = new Date(dateString.replace(' ', 'T'));
            //console.info('moment', );
            //var date = amMoment.applyTimezone(dateString, 'Europe/Madrid').format(type);

            return $filter('amDateFormat')(dateString, type, null, 'Europe/Madrid');
        }
    }
});