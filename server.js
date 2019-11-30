const express = require('express');
const http = require('http');
const url = require('url');



const app = express();

app.use(express.json());
app.use('/', express.static('static'));

const port = process.argv[2] || 3000;
 

app.listen(port, () => console.log(`Listening on port ${port}`));

