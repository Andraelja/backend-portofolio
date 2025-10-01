const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes')
const fileUpload = require('express-fileupload')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"))

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/', router);

module.exports = app;
