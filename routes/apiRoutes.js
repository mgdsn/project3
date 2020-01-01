//var db = require("./models");
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const withAuth = require('../middleware.js');

const secret = process.env.SECRET;

module.exports = function(app) {
  
  app.post("/api/register", function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    User.findOne({
        email: req.body.email
    }).then(function(result) {
      if (result !== null) {
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
    User.findOneAndUpdate({ "email": req.email }, 
    { "$set": { "zip": req.body.zip, 
    "displayname": req.body.displayname,
    "photo": req.body.photo,
    "distance": req.body.distance,
    "age": req.body.age,
    "minage": req.body.minage,
    "maxage": req.body.maxage,
    "gender": req.body.gender,
    "malematch": req.body.malematch,
    "femalematch": req.body.femalematch,
    "othermatch": req.body.othermatch,
    "subculture": req.body.subculture,
    "about": req.body.about
  }}).exec(function(err, data){
      if(err) {
          console.log(err);
          res.status(500).send(err);
      } else {
        res.status(200).send("Successfully updated profile.");
      }
   });
  });

  app.get("/api/getprofile", withAuth, function(req, res) {
    User.findOne({
        email: req.email
    }).then(function(result) {
      if (result.displayname !== null) {
        res.status(200).send(result);
      } else {
        res.status(500).send("No info");
      }
    });
  });

  app.post("/api/updatedist", withAuth, function(req, res) {
    User.findOneAndUpdate({ "email": req.email }, 
    { "$set": { "zipdist": req.body
  }}).exec(function(err, data){
      if(err) {
          console.log(err);
          res.status(500).send(err);
      } else {
        res.status(200).send("Successfully updated profile.");
      }
   });
  });

  app.get("/api/getpatch", withAuth, function(req, res) {
    User.findOne({
        email: req.email
    }).then(function(result) {

      let gendermatches = []

      if (result.malematch === true){
        gendermatches.push("Male")
      }

      if (result.femalematch === true){
        gendermatches.push("Female")
      }

      if (result.othermatch === true){
        gendermatches.push("Other")
      }

    



      User.findOne({
        subculture: result.subculture,
        _id: {$ne: result._id, $nin: [result.liked], $nin: [result.disliked]  },
        age: { $gte: result.minage, $lte: result.maxage },
        gender: {$in: gendermatches}



    }).then(function(result) {
      console.log(result)
      res.status(200).send(result);
  });
});
});




app.get("/api/getpatch2", withAuth, function(req, res) {
  User.findOne({
      email: req.email
  }).then(function(result) {

    fetch('https://www.zipcodeapi.com/rest/js-lqUSl36ZgsfowhwsX9xIhCleRx71J0eumdCiRIsGyz5x4nxjpjLtUdbZ803RpoDZ/info.json/97211/radians')
    .then(res => {

 console.log("this is res" + res);
 console.log("this is result" + result);



  }).then(function(result) {
    console.log(result)
    res.status(200).send(result);
});
});
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