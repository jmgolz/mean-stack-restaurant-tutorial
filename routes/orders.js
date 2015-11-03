var express = require('express');
var router = express.Router();
var restricts = require("../auth/restricts");

var fakeJsonDataApiUrl = "https://infinite-tor-4806.herokuapp.com";
var requestClient = require("request");
var orderService = require("../services/order-service");



/* GET home page. */
router.get('/', restricts, function(req, res, next) {
  var vm = {
      title: 'Place an order',
      orderId: req.session.orderId,
      firstName: req.user ? req.user.firstName : null
  };
  res.render('orders/index', vm);
});

router.get('/api', restricts, function(req, res, next) {
  orderService.getRestaurants(req, res, next);
});

router.post('/api/create-order', restricts, function(req, res, next) {
    console.log("full initially sent object");
    console.log(req);
    
    orderService.createOrder(req.user._doc, req.body, function(err, orderId){
      if(err){
        return res.status(500).json({error: 'Failed to create order :('});
      }
      req.session.order_id = orderId;
      res.json({success: true});
    });
});

router.get('/menu/:restaurantId', function(req, res, next){
  orderService.getRestaurantDetails(req.params.restaurantId, function(err, details){
    if(err){
      return res.status(500).json({error: "Failed to retrieve details"});
    }
    res.json(details);
  });
})
  

module.exports = router;
