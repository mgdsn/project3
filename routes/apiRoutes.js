//var db = require("./models");
const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
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
        res.status(200).send("Successfully updated.");
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

      let allmatched = result.liked.concat(result.rejected);

      let logender = result.gender.toLowerCase();

      let genquery = logender + 'match';

      User.findOne({
        subculture: result.subculture,
        _id: { $ne: result._id },
        age: { $gte: result.minage, $lte: result.maxage },
        gender: { $in: gendermatches},
        zip:{ $in: result.zipdist},
        email: { $nin: allmatched },
        [genquery]: true

    }).then(function(result) {
      if (result){
      res.status(200).send(result);
    } else {
      res.status(404).send("No result");
  }
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
  

  app.post("/api/updatedislike", withAuth, function(req, res) {
    User.findOneAndUpdate({ "email": req.email }, 
    { "$push": { "rejected": req.body.useremail, 
    }}).exec(function(err, data){
    if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
      res.status(200).send("Successfully updated rejected.");
    }
    });
  });


  app.post("/api/updatelike", withAuth, function(req, res) {
    User.findOneAndUpdate({ "email": req.email }, 
    { "$push": { "liked": req.body.useremail, 
    }}).exec(function(err, data){
    if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
      res.status(200).send("Successfully updated liked.");
    }
    });
  });


  app.post("/api/updatechats", withAuth, function(req, res) {
    let message = req.body.displayName + ": " + req.body.message
    Chat.findOneAndUpdate({ "users": {$all:  [req.email, req.body.patchEmail ]}}, 
    { "$push": { "messages": message, 
    }}).exec(function(err, data){
      console.log(data);
    if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
      res.status(200).send("Successfully updated chats.");
    }
    });
  });

  app.post("/api/getmessages", withAuth, function(req, res) {
    Chat.findOne({
      "users": {$all:  [req.email, req.body.patchEmail ]}
  }).then(function(result) {
    console.log(result)
      res.status(200).send(result);
  
  
  })
  });
 


  app.post("/api/checkmatch", withAuth, function(req, res) {
    User.findOne({
      email: req.body.useremail,
  }).then(function(result) {
    if (result.liked.includes(req.email)){
      res.status(200).send("It's a match");
      const chat = new Chat({ users: [req.email, req.body.useremail] });
      chat.save(function(err) {
 
      })


    } else{
      res.status(404).send("No result");
    }
  


  })
  });

  app.get("/api/getmatches", withAuth, function(req, res) {
    User.find({
      liked: {$in: req.email}
    }).then(function(result) {
      User.findOne({
        email: req.email,
    }).then(function(result2) {
      let matchArray = [];
      
    
      result.forEach(element => {
        if(result2.liked.includes(element.email)){
          matchArray.push(element);
        }

      });

      if (matchArray){
      res.status(200).send(matchArray);
    } else {
      res.status(404).send("No result");
  }
  });
});
});

};