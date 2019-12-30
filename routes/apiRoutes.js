//var db = require("./models");
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const withAuth = require('../middleware.js');

const secret = process.env.SECRET;

module.exports = function(app) {
  

  app.get('/api/home', function(req, res) {
    res.send('Welcome!');
  });

  app.get('/api/secret', withAuth, function(req, res) {
    console.log(req.email);
    res.send('The password is potato');
  });
  
  app.post("/api/register", function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    User.findOne({
        email: req.body.email
    }).then(function(result) {
      if (result !== null) {
        console.log(result);
        res.send("A user with that email already exists.");
      } else {
        user.save(function(err) {
          if (err) {
            res.status(500)
              .send("Error registering new user please try again.");
          } else {
            res.status(200).send("You are now registered.");
          }
        });
      }
    });
  });

  app.post("/api/updateprofile", withAuth, function(req, res) {
    console.log ("this is email: " + req.email)
    console.log("this is body: ") + req.body
  });


  app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  });

  app.post('/api/logout', function(req, res) {
    res.cookie('token', { httpOnly: true })
      .sendStatus(200);
  });

  app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });
  




};