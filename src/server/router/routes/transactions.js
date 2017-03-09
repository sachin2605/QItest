var path = require('path');
var _ = require('underscore');
module.exports = function routes(express, database) {

    var router = express.Router();
    var transactions = require('../../model/transactions')(database);
    console.log('here');
    router.route('/test')
        .all(function(req,res,next){
            console.log(path.resolve('./../database/filllist'));
            res.send('working');
        });

    router.route('/instrument/:id')
    .get(function(req,res,next){
        var id = req.params.id;
        transactions.getInstrumentById(id,function(err,result){
            if(err){
                console.log(err);
                res.sendStatus(404)
            }else{
                if(result.length==0){
                    res.sendStatus(404);
                }else{
                    res.send(result);
                }
            }
        });
    });

    router.route('/uploadOne')
        .post(function(req,res,next){
           if(req.body.tx) {
            console.log('dsadadsa');
                var tx = req.body.tx;
                fields = _.compact(tx.split('|'));
                var timestamp = _.first(fields).split(':')[0];
                fields[0]= _.first(fields).split(':')[1];
                var obj ={};
    
                fields.map(function(f){
                    var key = f.split('=')[0];
                    var val = parseInt(f.split('=')[1]);
                
                    if(key=='32'){
                            obj.quantity = val;
                    }else if(key=='48'){
                        obj.instr = val;
                    }else if(key =='54'){
                        obj.buyOrSell = val;
                    }
                
                });
                
                if(obj.buyOrSell==1){
                    obj.currentVal=obj.quantity;
                }else{
                    obj.currentVal=-obj.quantity
                }
                transactions.getInstrumentById(obj.instr,function(err,result){
                    if(err){
                        console.log(err);
                        res.sendStatus(404);
                    }else{
                     console.log('obj :',obj);
                        if(result.length==0){
                            transactions.newTx(obj.instr,obj.currentVal,function(err,r){
                                if(err){
                                        console.log(err);
                                        res.sendStatus(404);
                                    }else{
                                        // res.send('transaction Saved')
                                        res.send(r);
                                    }
                            });
                        }else{
                        console.log('no results');
                            
                                obj.currentVal = result.Count+obj.currentVal;
                                transactions.updateTx(obj.instr,obj.currentVal,function(err,r){
                                    if(err){
                                        console.log(err);
                                        res.sendStatus(404);
                                    }else{
                                        console.log('added new tx');
                                        res.send(r);
                                    }
    
                                }) ;
                        }
                    }
                });
            }else{
                res.sendStatus(404).send('undefinde tx valuse');
            }
    });
    router.route('/instrument')
    .get(function(req,res,next){
        transactions.getAllTx(function(err,result){
            if(err){
                console.log(err);
                res.sendStatus(500).send(err);
            }
            res.send(result)
        });
    });
    router.route('/upload')
    .get(function(req,res,next){
        transactions.uploadTx(function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send('uploa');

            }

        })
    });


    return router;
}