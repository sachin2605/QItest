(function () {
    var loginFactory =   function ($http)  {
        var factory = {};

        factory.postUser = function (email, password) {
            return $http.post('/api/login/', {email: email, password: password});
        }
        factory.getInstrument = function(){
        	return $http.get('/tx/instrument');
        }
        factory.getInstrumentById = function(id){
        	return $http.get('/tx/instrument/'+id);
        }
        factory.postTx = function(tx){
            return $http.post('/tx/uploadOne',{tx:tx});
        }
        return factory;
    };

 angular.module("appMyEAN").factory('loginFactory',loginFactory);
}());