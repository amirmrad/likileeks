const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const dburl = process.env.DB_URL;

router.get('/posts', (req, res) => {
  // replace with query
  res.json(posts)
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
  obj.upVote = 0;
  obj.downVote = 0;
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
