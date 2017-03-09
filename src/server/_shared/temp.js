var fs = require('fs');
var path = require('path');
var _ =require('underscore');
var objectRead = function(){
var o = {};

var data = fs.readFileSync(path.resolve('./../database/filllist'), 'utf8')
	
    var raw_transactions = _.compact(data.split('\n'));
    var counter = 0;
		var plusCnt=0,minusCount =0;
		console.log(raw_transactions);
    raw_transactions.map(function(transaction){
    	// console.log(counter++);

    	fields = _.compact(transaction.split('|'));
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
		if(o[obj.instr]){
			var prev = o[obj.instr];
				o[obj.instr] = obj;

			if(obj.buyOrSell=2){
				minusCount+=1;
				// console.log('minus ',minusCount);
				obj.currentVal = prev.currentVal-obj.quantity;
			}else{
				plusCnt+=1;
				// console.log('plus ',plusCnt);
				obj.currentVal = prev.currentVal+obj.quantity;
			}
			
		}else{
			obj.currentVal = 0; //counter to track current quantity
			if(obj.buyOrSell==2){
				minusCount+=1;
				// console.log('minus ',minusCount);
				obj.currentVal = -obj.quantity;
			}else{
				plusCnt+=1;
				// console.log('plus ',plusCnt);
				obj.currentVal = obj.quantity;
			}
			o[obj.instr] = obj;

		}

    	// var getReqFields = fields.map(function(field){
    		// var 
    	// });

    });
    // console.log(o);



            // console.log(o);
return o;

};

module.exports = objectRead;