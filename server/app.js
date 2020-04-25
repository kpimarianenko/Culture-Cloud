const restful = require('node-restful');
const express = require('express');
const bodyParser = require('body-parser');
const busBoyBodyParser = require('busboy-body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const mongoose = restful.mongoose;
const config = require('./config');

const url = config.mongodb.url;
const port = config.mongodb.port;
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busBoyBodyParser({ limit: '10mb' }));

mongoose.connect(url, connectOptions)
    .then(() => console.log(`Database connected`))
    .then(() => app.listen(port, () => console.log(`Server is ready on port ${port}`)))
    .catch((err) => console.log(`Start error: ${err}`))