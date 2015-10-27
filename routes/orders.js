var express = require('express');
var router = express.Router();
var restricts = require("../auth/restricts");

/* GET home page. */
router.get('/', restricts, function(req, res, next) {
  var vm = {
      title: 'Place an order',
      firstName: req.user ? req.user.firstName : null
  };
  
  res.render('orders/index', vm);
});

module.exports = router;
