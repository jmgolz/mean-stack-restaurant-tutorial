(function(){
   'use strict';
   
   angular.module('app').controller('MenuController', MenuController);
   
   MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope'];
   
   function MenuController(api, $routeParams, ngDialog, $scope){
       var vm = this;
       
       api.getRestaurantDetails($routeParams.restaurantId).then(function(data){
           vm.restaurant = data;
       });
       
       vm.viewItem = function(item){
          vm.activeItem = item;
          
          //Disabled because in this tutorial, we are only
          //using a text string, the incoming item is not an object.
          //vm.activeItem.options = [];
          
          ngDialog.open({
             template: 'item.html',
             className: 'ngdialog-theme-default',
             scope: $scope
          });
       }
   }
})();