app.filter('parseDate', function ($filter) {
    return function(text, type){
        if(typeof text === "undefined")
            return text;
        else{
            var  date = new Date(text.replace(/-/g,"/"));
            return $filter('date')(date, type);
        }
    }
});