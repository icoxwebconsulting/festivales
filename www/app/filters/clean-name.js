app.filter('cleanName', function () {
    return function (text) {
        if(typeof text === "undefined")
            return text;
        else
            return text.replace("!", "");
    };
})