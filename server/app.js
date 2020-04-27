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
app.use(busBoyBodyParser({ limit: '15mb' }));

mongoose.connect(url, connectOptions)
.then(() => console.log(`Database connected`))
.then(() => app.listen(port, () => console.log(`Server is ready on port ${port}`)))
.catch((err) => console.log(`Start error: ${err}`))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const apiRouter = require('./api/v1/api');
app.use('/api/v1', apiRouter);