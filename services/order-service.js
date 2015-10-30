var fakeJsonDataApiUrl = "https://infinite-tor-4806.herokuapp.com";
var requestClient = require("request");
var config = require("../config");

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