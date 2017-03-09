(function () {
    var homeCtrl = function ($scope,$rootScope, $location, $cookieStore, $filter, $translate, $translatePartialLoader, loginFactory, menuFactory) {
        var vm = this;
        
        $translatePartialLoader.addPart('home');
        $translate.refresh();
        vm.loadById = function(){
             loginFactory.getInstrumentById(vm.instrumentSelected)
            .success(function(res){
                // if(res.length==0){
                //      console.log('res');
                //     $scope.instruments = [{'Id':'NA','Instrument_Id':'NA','Count':'null'}];
                // }else{
                    $scope.instruments = res;
                // }
            vm.instrumentSelected='';

            })
            .error(function(err){
                $scope.instruments = [{'Id':'NA','Instrument_Id':'NA','Count':'null'}];
                vm.instrumentSelected='';

                console.log(err);
            });
        };
        vm.load = function(){

             loginFactory.getInstrument()
            .success(function(res){
            // console.log(res[0]);
            $scope.instruments = res;
            vm.instrumentSelected='';
            })
            .error(function(err){
                $scope.instruments = [{'Id':'NA','Instrument_Id':'NA','Count':'null'}];
                console.log(err);
            });
        };
       
        
        // $http.get('/tx/instrument/', {email: email, password: password})
        vm.uploadTx = function(){
            console.log(vm.timeStampTransaction);
            loginFactory.postTx(vm.timeStampTransaction)
            .success(function(res){
                alert('Transaction Uploaded done');
            })
            .error(function(res){
                alert('Transaction Uploaded failed');
            });

        };
        vm.login = function () {
            loginFactory.postUser(vm.user.email, vm.user.password)
                    .success(function (res) {
                        var user = res;
                        if (user) {
                            $rootScope.name = user.email;
                            $rootScope.message = 'User is back';
                            $cookieStore.put('userData', user);
                            $location.path('/');
                            $rootScope.opcionesMenu = menuFactory.query();
                        } else {
                            $rootScope.message = 'Something is wrong';
                        }
                    })
                    .error(function (err) {
                        console.log('SessionId error: ' + err);
                    });
        };
    }
    angular.module('appMyEAN').controller('homeCtrl', homeCtrl);
}());