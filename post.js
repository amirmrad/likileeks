const express = require('express');
const mongo = require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017';
const router = express.Router()

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
