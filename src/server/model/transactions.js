var bcrypt = require('bcrypt-nodejs');

module.exports = function users(database) {
    
    function getAllTx(cb) {
        database.getAllTx(cb);
    };
    
    function newTx(instrument_id, count, cb) {
        database.newInstrument(instrument_id, count, cb);
    };
    function  uploadTx(cb){
        database.uploadData(cb);
    };

    function updateTx(inst_id,count,cb){
        console.log('reacherd in models');
        database.updateTx([count,inst_id],cb);
    };

    function getInstrumentById(id, cb) {
        
        if (id) {
            database.getInstrumentById(id, cb);
        }  else {
            cb('You need to provide instrument_id', null);
        };
    };
    
    return {
        getInstrumentById: getInstrumentById,
        getAllTx: getAllTx,
        newTx:newTx,
        uploadTx:uploadTx,
        updateTx:updateTx

    }
};
