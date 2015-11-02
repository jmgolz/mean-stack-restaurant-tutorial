(function(){
   'use strict';
   
   angular.module('app').controller('MenuController', MenuController);
   
   MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope', '$location'];
   
   function MenuController(api, $routeParams, ngDialog, $scope, $location){
       var vm = this;
       
       vm.items = [];
       
       api.getRestaurantDetails($routeParams.restaurantId).then(function(data){
           vm.restaurant = data;
       });
       
       vm.viewItem = function(item){
          //vm.activeItem = item;
          vm.activeItem = {
              name: item,
              options: ['test','test2','test3','test4'],
              selectedItems: []
          };

          ngDialog.open({
             template: 'item.html',
             className: 'ngdialog-theme-default',
             scope: $scope
          });
          
          vm.toggleOption = function(option){
            var index = vm.activeItem.selectedItems.indexOf(option);
            if(index > -1){
                vm.activeItem.selectedItems.splice(index, 1);
                return;
            }
            vm.activeItem.selectedItems.push(option);
          };
          
          vm.addItem = function(item){
              var newItem = { 
                  item: item.name,
                  options: []
              };
              
              if(item.selectedItems.length > 0){
                  item.selectedItems.map(function(item){
                      newItem.options.push(item);
                  });
              }
              
              vm.items.push(newItem);
              ngDialog.close();
              console.log(vm.items);
          };
          
          vm.cancel = function(){
              ngDialog.close();
          };
          
          vm.checkout = function(){
              $location.url('/payment');
          };
       }
   }
})();