const express = require('express');
const helmet = require('helmet');
const http = require('http');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./Config');
const routes = require('./Routes');
const response = require('./Lib/response');

const app = express();
const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
app.disable('x-powered-by');
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(helmet.noCache());
app.use(bodyParser.json({
  limit: '50mb',
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.get('/reader', (req, res) => {
  res.render('reader');
});
app.use('/v1', routes.v1Routes);

app.use((err, req, res, next) => {
  let errorData;
  if (err.isJoi) {
    errorData = { message: err.details[0].message };
  } else {
    errorData = {};
  }
  response.sendError(errorData, res);
});

const server = http.createServer(app).listen(config.PORT, () => {
  console.log('server is running at ', config.PORT);
});

module.exports = app;
