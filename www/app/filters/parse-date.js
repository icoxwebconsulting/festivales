app.filter('parseDate', function ($filter) {
    return function(text, type){
        if(typeof text === "undefined")
            return text;
        else{
            var parts = text.match(/(\d+)/g);
            var date = new Date(parts[0], parts[1]-1, parts[2]);
            //var  date = new Date(text.replace(/-/g,"/"));
            return $filter('date')(date, type);
        }
    }
});