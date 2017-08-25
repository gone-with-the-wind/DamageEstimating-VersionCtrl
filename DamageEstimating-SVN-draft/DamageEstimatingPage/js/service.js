angular.module('MyService',[])
	.service('urlService', function(){
     	this.getCommonUrl = function(){
        return "http://116.62.174.175/DamageEstimating-1.0-SNAPSHOT/";
        // return "http://localhost:8080/DamageEstimating-1.0-SNAPSHOT/";
     }
})









 
.directive('popover', function () {  
    return {  
        restrict: 'A',  
        scope: {  
            popoverShow: '=',  
            popoverOptions: '@'  
        },  
        link: function (scope, element) {  
            element.popover(JSON.parse(scope.popoverOptions || '{ "placement": "top", "trigger": "manual" }'));  
            scope.$watch('popoverShow', function (show) {  
                if (show) {  
                    element.popover('show');  
                } else {  
                    element.popover('hide');  
                }  
            });  
        }  
    };  
});  

     
   