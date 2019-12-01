const express = require('express');

const userRoute = require('./user')
const postRoute = require('./post')

const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/', express.static('static'));

const port = process.argv[2] || 3000;


app.listen(port, () => console.log(`Listening on port ${port}`));
