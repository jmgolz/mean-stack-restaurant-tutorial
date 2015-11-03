(function(){
   'use strict';
   angular.module('app').factory('api', apiFactory);
   
   apiFactory.$inject = ['$http'];
   
   function apiFactory($http){
       return {
           getRestaurants : getRestaurants,
           getRestaurantDetails : getRestaurantDetails,
           createOrder : createOrder
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
     
     function createOrder(food){
         console.log("processing food in API service:");
         console.log(food);
         return $http.post('/orders/api/create-order', food).then(function(response){
             return response.data;
         });
     };
   };
})();