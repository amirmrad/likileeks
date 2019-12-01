const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const dburl = process.env.DB_URL;



router.get('/posts', (req, res) => {
  mongo.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('likileaks')
    const postCol = db.collection('post')
    postCol.find({}, {projection: {_id: 0}}).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.send(404)
        return
      }
      res.json(result)
    })
  })
})

router.get('/downVote', (req, res) => {
  // update table
  
  res.send(200)
})


router.get('/upVote', (req, res) => {
  // update table
  
  res.send(200)
})

router.post('/newPost', (req, res) => {
  const obj = req.body
  obj.upVote = 0.0;
  obj.downVote = 0.0;
  obj.tags = obj.description.split(/([.,!?:;'\"-]|\s)+/)
                              .filter(str => str.startsWith("#"))
                              .map(str => str.substring(1))
  mongo.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
      const db = client.db('likileaks')
      const userCol = db.collection('post')
      userCol.insertOne(obj, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
  })
  res.send(200)
});

module.exports = router
