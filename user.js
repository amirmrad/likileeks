const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router();
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();

const dburl = process.env.DB_URL;

const con = (dburl, callback) => {
  mongo.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('likileaks')
    callback(db)
  })
}

router.post('/signIn', (req, res) => {
  const user = req.body;
  con(dburl, (db) => {
    const userCol = db.collection('user')
    userCol.findOne({username: user.username},{projection: {_id: 0, password: 1}}, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        if (user.password === result.password) {
          // generate token
          const token = jwt.sign({username: user.username}, process.env.myprivatekey)
          res.header("x-auth-token", token).json({message: "success"})
          return
        }
        res.send(401)
        return
      }
      res.send(404)
    })
  })
})

router.post('/createUser', (req, res) => {
  const obj = req.body;
  // obj.loggedIn = true;
  con(dburl, (db) => {
    const userCol = db.collection('user')
    userCol.insertOne(obj, (err, result) => {
      if (err) {
        console.log(err)
      }
    })
  })
  res.send(200);
})

router.get('/getUser', (req, res) => {
  const username = req.query.username;
  con(dburl, (db) => {
    const userCol = db.collection('user')
    userCol.findOne({username : username},{projection: {_id: 0, password: 0}}, (err, result) => {
      if (err) {
        console.log(err)
        res.send(404);
      } else {
        if (result) {
          console.log(result);
          res.json(result);
        } else {
          res.send(404);
        }
      }
    })
  })
})

module.exports = router
