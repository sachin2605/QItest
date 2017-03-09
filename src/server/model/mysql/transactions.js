var mysql = require('mysql');
var path = require('path');
console.log(path.resolve('./server/_shared/temp'));
// console.log(r());
module.exports = function users (config) {
    
    
    function newInstrument(Instrument_Id, count, cb) {
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.dbname
        });
        
        connection.connect();
        
        connection.beginTransaction(function (err) {
            
            if (err) {
                return cb(err, null);
            } else {
                var valuesInstrument = {
                    Instrument_Id: Instrument_Id,
                    Count: count
                };
                
                var insertInstrument = 'INSERT INTO `' + config.prefix + 'Instrument` SET ?';
              
                connection.query(insertInstrument, valuesInstrument, function (err, result) {
                    if (err) {
                        connection.rollback();
                        return cb(err, null);
                    } else {
                        //Set default role to view
                        return cb(null,result);
                    };
                });
            }
        }); //transaction
    };
    function updateTx(values,cb){
        var insertInstrument = 'UPDATE Instrument SET Count = ? WHERE Id = ?';
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.dbname
        });
        connection.connect();
        connection.query(insertInstrument,[values], function (err, result) {
            if (err) {
                connection.rollback();
                console.log(err);
                return cb(err, null);
            } else {
                //Set default role to view
                 console.log(result);
                return cb(null,result);
            };
            connection.end();
        });
    };
    
    function uploadData(cb){

		var r = require(path.resolve('./server/_shared/temp'));
		var objects = r();
		var values = [];
		var insertInstrument = 'INSERT INTO Instrument (`Instrument_Id`,`Count`) VALUES ?';
		Object.keys(objects).map(function(obj){
			values.push([objects[obj].instr,objects[obj].currentVal]);
		});

		var connection = mysql.createConnection({
	        host: config.host,
	        user: config.user,
	        password: config.password,
	        database: config.dbname
	    });
	 	connection.connect();
		connection.query(insertInstrument,[values], function (err, result) {
	        if (err) {
	            connection.rollback();
	            console.log(err);
	            return cb(err, null);
	        } else {
	            //Set default role to view
	             console.log(result);
	            return cb(null,result);
	        };
	        connection.end();
	    });

   };
    
    function getStoredPass(email, cb){
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.dbname
        });
        
        connection.connect();
              
        var queryString = 'SELECT Password FROM `' + config.prefix + 'Users` WHERE Email = ?';
        
        connection.query(queryString, [email], function (err, rows) {
            if (err) {
                return cb(err, null);
            } else {
                connection.end();
                if (rows.length === 0) {
                    return cb(null, '');
                } else {
                    return cb(null, rows[0].Password);
                };
            };
        });
    };

    function getInstrumentById(instrument_id, cb){
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.dbname
        });
        
        connection.connect();
              
        var queryString = 'SELECT Id, Instrument_Id, Count FROM `' + config.prefix + 'Instrument` WHERE Instrument_Id = ?';
        
        connection.query(queryString, instrument_id, function (err, rows) {
            if (err) {
                return cb(err, null);
            } else {
                connection.end();
                return cb(null,rows);
            };
        });
    };

    function getAllTx(cb){
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.dbname
        });
        
        connection.connect();
              
        var queryString = 'SELECT Id, Instrument_Id, Count FROM `' + config.prefix + 'Instrument`';
        
        connection.query(queryString, function (err, rows) {
            if (err) {
                return cb(err, null);
            } else {
                connection.end();
                return cb(null,rows);
            };
        });
    };



    
    
    return {
        getAllTx: getAllTx,
        getInstrumentById: getInstrumentById,
        newInstrument:newInstrument,
        uploadData:uploadData,
        updateTx:updateTx
    };
};
