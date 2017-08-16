angular.module('MyService',[])
	.service('urlService', function(){
     	this.getCommonUrl = function(){
        return "http://localhost:8080/DamageEstimating-1.0-SNAPSHOT";
     }
})

     
   