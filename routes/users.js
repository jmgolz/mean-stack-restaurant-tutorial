var passport = require("passport");
var express = require('express');
var router = express.Router();
var userService = require("../services/user-service");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/create', function(req, res, next) {
  var vm = { title : "Create an account" };
  res.render('users/create', vm);
});

/* POST create account. */
router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err){
    if(err){
        var vm = { 
          title : "Create an account", 
          input: req.body,
          error: err
        };
        delete vm.input.password;
        return res.render('users/create', vm);
      };
      
      req.login(req.body, function(err){
        res.redirect('/orders');  
      });
  });
});

router.post('/login', passport.authenticate('local'),  function(req, res, next) {
  res.redirect('/orders');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;