const express = require('express');
const mongo = require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017';
const router = express.Router()


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

module.exports = router
