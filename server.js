const express = require('express');
const http = require('http');
const url = require('url');
const fs = require('fs');



const app = express();

app.use(express.json());
app.use('/', express.static('static'));

app.post('/newPost', (req, res) => {
  const obj = req.body
  const data = JSON.stringify(obj);
  fs.writeFileSync('news.json', data)
})

const port = process.argv[2] || 3000;
 

app.listen(port, () => console.log(`Listening on port ${port}`));

