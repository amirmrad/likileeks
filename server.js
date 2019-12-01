const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./user')
const postRoute = require('./post')
dotenv.config();

const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/', express.static('static'));

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on port ${port}`));
