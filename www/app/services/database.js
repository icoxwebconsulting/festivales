'use strict';
app.factory('DBService', function ($q, DB_CONFIG) {
    var self = this;
    self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, location: 1});

    self.init = function(drop) {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, location: 1});


        //self.query('DROP TABLE IF EXISTS artists');
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
            if(drop && table.erasable)
                self.query('DROP TABLE IF EXISTS '+table.name);

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
        });   
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                //console.info('error db', error);
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
});