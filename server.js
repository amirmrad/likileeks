const express = require('express');
const mongo = require('mongodb').MongoClient;
const http = require('http');
const url = require('url');
const fs = require('fs');
const dburl = 'mongodb://localhost:27017';

// mongo.connect(dburl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }, (err, client) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//     const db = client.db('likileaks')
//     const userCol = db.collection('user')
//     userCol.insertOne({name: 'Amir', age: 24}, (err, result) => {
//       if (err) {
//         console.log(err)
//       }
//     })
// })



const posts = [];
const users = [];

const app = express();

app.use(express.json());
app.use('/', express.static('static'));

app.get('/posts', (req, res) => {
  res.json(posts)
})

app.post('/createUser', (req, res) => {
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

app.get('/downVote', (req, res) => {
  const id = req.query.id
  posts.filter(x => x.id === id).forEach(post => {
    post.downVote++
  })
  res.send(200)
})


app.get('/upVote', (req, res) => {
  const id = req.query.id
  posts.filter(x => x.id === id).forEach(post => {
    post.upVote++
  })
  res.send(200)
})

app.post('/newPost', (req, res) => {
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
      const userCol = db.collection('user')
      userCol.insertOne(obj, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
  })
  res.send(200);
  console.log(posts)
})

const port = process.argv[2] || 3000;
 

app.listen(port, () => console.log(`Listening on port ${port}`));

