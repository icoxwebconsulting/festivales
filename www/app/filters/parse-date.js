app.filter('parseDate', function ($filter) {
    return function(text, type){
        if(typeof text === "undefined")
            return text;
        else{
            var dt  = text.split(/\-|\s/);
            var dateString = dt.slice(0,3).join('-') + ' ' + dt[3];
            var date = new Date(dateString.replace(' ', 'T'));
            console.info('dt', dt, 'date', date);
            return $filter('date')(date, type);
        }
    }
});