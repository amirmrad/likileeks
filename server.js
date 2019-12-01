const express = require('express');

const userRoute = require('./user')
const postRoute = require('./post')

const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/', express.static('static'));

const port = process.argv[2] || 3000;



// const express = require('express');
// const http = require('http');
// const url = require('url');
// const fs = require('fs');
//
// const posts = [];
// const users = [];
//
//
// const app = express();
//
// app.use(express.json());
// app.use('/', express.static('static'));
//
// app.get('/posts', (req, res) => {
//   res.json(posts)
// })
//
// app.post('/createUser', (req, res) => {
//   const obj = req.body;
//   obj.loggedIn = true;
//   users.push(obj);
//   res.send(200);
// })
//
// app.get('/downVote', (req, res) => {
//   const id = req.query.id
//   posts.filter(x => x.id === id).forEach(post => {
//     post.downVote++
//   })
//   res.send(200)
// })
//
//
// app.get('/upVote', (req, res) => {
//   const id = req.query.id
//   posts.filter(x => x.id === id).forEach(post => {
//     post.upVote++
//   })
//   res.send(200)
// })
//
// app.post('/newPost', (req, res) => {
//   const obj = req.body
//   obj.upVote = 0;
//   obj.downVote = 0;
//   posts.push(obj);
//   res.send(200);
//   console.log(posts)
// })
//
// app.get('/users', (req, res) => {
//     res.json(users)
// })
//
// app.post('/newUser', (req, res) => {
//     const obj = req.body
//     posts.push(obj);
//     console.log(users);
//     // const data = JSON.stringify(obj);
//     // fs.writeFileSync('news.json', data)
//     res.send(200);
// })
//
// const port = process.argv[2] || 3000;
//

//
app.listen(port, () => console.log(`Listening on port ${port}`));
//
