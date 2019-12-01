const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('./auth');
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

router.get('/posts', (req, res) => {
  const username = req.query.username
  const p = req.query.page
  const page = p ? p : 0
  const option = username ? {author: username} : {}
  con(dburl, (db) => {
    const postCol = db.collection('post')
    postCol.find(option, {projection: {_id: 0}}).skip(p * 10).limit(10).toArray((err, result) => {
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
  const id = req.query.id;
  con(dburl, (db) => {
    const userCol = db.collection('post')
    userCol.update({id : id}, {$inc : {downVote : 1}}, (err, result) => {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        if (result) {
          res.json({message : "success"})
          return
        }
        res.send(200)
      }
    })
  })
})

router.get('/upVote', (req, res) => {
  const id = req.query.id;
  con(dburl, (db) => {
    const userCol = db.collection('post')
    userCol.update({id : id}, {$inc : {upVote : 1}}, (err, result) => {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        if (result) {
          res.json({message : "success"})
          return
        }
        res.send(200)
      }
    })
  })
})

router.post('/newPost', auth, (req, res) => {
  const obj = req.body
  obj.upVote = 0.0;
  obj.downVote = 0.0;
  obj.tags = obj.description.split(/([.,!?:;'\"-]|\s)+/)
                              .filter(str => str.startsWith("#"))
                              .map(str => str.substring(1))
  con(dburl, (db) => {
    const userCol = db.collection('post')
    userCol.insertOne(obj, (err, result) => {
      if (err) {
        console.log(err)
        res.send(404)
        return
      }
      if (result) {
        res.send(200)
        return
      }
      res.send(404)
    })
  })
  // res.send(200)
});

module.exports = router
