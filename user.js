const express = require('express');
const mongo = require('mongodb').MongoClient;
const dburl = 'mongodb://user:likileaks@localhost:27017/likileaks';
const router = express.Router()
const _ = require('lodash')


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
    userCol.findOne({username : username}, (err, result) => {
      if (err) {
        console.log(err)
        res.send(404);
      } else {
        if (result) {
          console.log(result);
          res.json(_.omit(result, ['_id']));
        } else {
          res.send(404);
        }
      }
    })
  })
})

module.exports = router
