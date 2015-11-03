var fakeJsonDataApiUrl = "https://infinite-tor-4806.herokuapp.com";
var requestClient = require("request");
var config = require("../config");
var Order = require("../models/order").Order;

exports.getRestaurants = function(req, res, next){
  requestClient(fakeJsonDataApiUrl, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.send(body);
      next();
    }
  });
};

exports.getRestaurantDetails = function(restaurantId, next){
  api.restaurant_details({rid: restaurantId, function(err, details){
    if(err){
      console.log(err);
    }
    next(err, details);
  }});
}

exports.createOrder = function(user, food, next) {
  var order = new Order({
    user: user,
    food: food
  });
  
  console.log("Order being processed by order service:");
  console.log(order);
  
  order.save(function(err, savedOrder){
    if(!err){
      return next(null, savedOrder._id);
    }
    next(err);
  });
}