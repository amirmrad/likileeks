const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router();
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();

const dburl = process.env.DB_URL;

router.post('/createUser', (req, res) => {
  const obj = req.body;
  // obj.loggedIn = true;
  mongo.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
      const db = client.db('likileaks')
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
  mongo.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('likileaks')
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
