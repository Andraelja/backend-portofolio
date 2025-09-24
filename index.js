// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const router = require('./routes');
// const fileUpload = require('express-fileupload');

// const app = express();

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(express.static("public"));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use('/api', router);

// module.exports = app;
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route default
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// router API
app.use('/api', router);

// export app untuk Vercel
module.exports = app;
