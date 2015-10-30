(function(){
   'use strict';
   angular.module('app').factory('api', apiFactory);
   
   apiFactory.$inject = ['$http'];
   
   function apiFactory($http){
       return {
           getRestaurants : getRestaurants,
           getRestaurantDetails : getRestaurantDetails
       };
       
    function getRestaurants(){
        return $http.get('/orders/api').then(function(response){
            return response.data;
         });
     };
     
     function getRestaurantDetails(restaurantId){
         return $http.get('/orders/api').then(function(response) {
             var restaurantsObject = response.data;
             var restaurantFound = null;
             
             for(var i in restaurantsObject){
                 if(restaurantsObject[i].id == restaurantId){
                    restaurantFound = restaurantsObject[i];
                 }
             }
             return restaurantFound;
         });
     };
   };
})();