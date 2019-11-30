const express = require('express');
const http = require('http');
const url = require('url');
const fs = require('fs');

const posts = [];



const app = express();

app.use(express.json());
app.use('/', express.static('static'));

app.get('/posts', (req, res) => {
  res.json(posts)
})

app.post('/newPost', (req, res) => {
  const obj = req.body
  posts.push(obj);
  console.log(posts);
  // const data = JSON.stringify(obj);
  // fs.writeFileSync('news.json', data)
  res.send(200);
})

const port = process.argv[2] || 3000;
 

app.listen(port, () => console.log(`Listening on port ${port}`));

