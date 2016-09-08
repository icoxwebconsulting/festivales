'use strict';
app.factory('DBService', function ($q, DB_CONFIG) {
    var self = this;
    self.db = null;
<<<<<<< HEAD
    
    self.initTables = function(drop){
        //self.query('DROP TABLE IF EXISTS artists');
=======

    self.initTables = function(drop){
>>>>>>> 60192b96cc9270f34bf63fc02142ac5cc6a486fb
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
            if(drop && table.erasable)
                self.query('DROP TABLE IF EXISTS '+table.name);

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
        });
    };
    
    self.init = function(drop) {
        if(window.sqlitePlugin)
        {
            // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, location: 1});
            self.initTables(drop);
        }else{
            setTimeout(function(){
                self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, location: 1});
                self.initTables(drop);
            },500);
        }
    };

    /*self.init = function(drop) {
            self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, location: 1});
            //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

            //self.query('DROP TABLE IF EXISTS artists');
            angular.forEach(DB_CONFIG.tables, function(table) {
                var columns = [];
                if(drop && table.erasable)
                    self.query('DROP TABLE IF EXISTS '+table.name);

                angular.forEach(table.columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
                });

               var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
               //var query = 'CREATE TABLE ' + table.name + ' (' + columns.join(',') + ')';
               self.query(query);
               //console.log('Table ' + table.name + ' initialized');
            });
    };*/

    self.init = function(drop) {

        if(window.sqlitePlugin)
        {
            // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name+' db', 2 * 1024 * 1024);
            self.initTables(drop);
        }else{
            setTimeout(function(){
                self.db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name+' db', 2 * 1024 * 1024);
                self.initTables(drop);
            },500);
        }
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        if(self.db == null)
        {
            self.init();
            setTimeout(function(){
                self.db.transaction(function(transaction) {
                    transaction.executeSql(query, bindings, function(transaction, result) {
                        deferred.resolve(result);
                    }, function(transaction, error) {
                        //console.info('error db', error);
                        deferred.reject(error);
                    });
                });
            },500);
        }else{
            self.db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(transaction, result) {
                    deferred.resolve(result);
                }, function(transaction, error) {
                    //console.info('error db', error);
                    deferred.reject(error);
                });
            });
        }

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