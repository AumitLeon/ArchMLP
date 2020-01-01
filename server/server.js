const express = require('express');
const path = require('path'); // eslint-disable-line global-require
const multer = require('multer');
const mkdirp = require('mkdirp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const log4js = require('log4js');
const bodyParser = require('body-parser');

// Node logger config
log4js.configure({
  appenders: { console: { type: 'file', filename: 'logs/console.log' } },
  categories: { default: { appenders: ['console'], level: 'debug' } }
});
const logger = log4js.getLogger('console');

// multer config
const UPLOAD_PATH = 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `${UPLOAD_PATH}/`;
    mkdirp(dir, err => cb(err, dir));
  },
  filename: (req, file, cb) => {
    // Remove extension, add time stamp, readd extension
    cb(null, `${file.originalname.slice(0, -4)}-${Date.now()}.csv`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    logger.info('Attempting to validate file');
    // Successful validation
    if (mimetype && extname) {
      logger.info('File validation successful.');
      return cb(null, true);
    }
    // File validation error
    logger.error('File validation failed.');
    req.fileValidationError = `File upload only supports the following filetypes - ${filetypes}`;
    return cb(null, false, req.fileValidationError);
  }
}).single('file');

// Rate limiting config
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 50 // 50 requests per IP within 15 minute window
});

// logging config
// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
});

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// Middleware
// rate limiting middleware
// only apply to requests that begin with /api/
app.use('/api/v1/uploadData', apiLimiter);

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// body parser middleware
app.use(bodyParser.json());

// State variables
let dataName; // dataset name
let file; // uploaded dataset

// POST route for uploading new file using upload (multer middleware)
app.post('/api/v1/uploadData', upload, (req, res, next) => {
  logger.info('User requested /api/v1/uploadData');
  try {
    if (req.fileValidationError) {
      logger.error(req.fileValidationError);
      res.status(400).send({ error: req.fileValidationError });
      next(req.fileValidationError);
    } else {
      logger.info(`File ${req.file.originalname} uploaded successfuly.`);
      file = req.file;
      res.status(200).send({ success: 'File successfully uploaded!' });
    }
  } catch (err) {
    logger.error('File missing from request.');
    res.status(400).send({ error: 'File required!' });
  }
});

// POST route for setting dataset name
app.post('/api/v1/setDataName', (req, res, next) => {
  logger.info('User requested /api/v1/setDataName');
  if (req.body.name) {
    logger.info(`Dataset name ${req.body.name} received.`);
    if (req.body.name.match(/^[a-z0-9]+$/i) && req.body.name.length <= 31) {
      dataName = req.body.name;
      logger.info(`Dataset name ${dataName} validation successful.`);
      res.status(200).send({ success: 'Dataset name has been received!' });
    } else if (req.body.name.match(/^[a-z0-9]+$/i) === null) {
      logger.error(`Dataset name ${dataName} has non-alphanumeric characters.`);
      res
        .status(400)
        .send({
          error: 'Dataset name can only contain alphanumeric characters'
        });
    } else if (req.body.name.length > 31) {
      logger.error(`Dataset name ${dataName} has length greater than 31.`);
      res
        .status(400)
        .send({ error: 'Dataset name can contain at-most 31 characters.' });
    }
  } else {
    logger.error('Dataset name not received');
    res.status(400).send({ error: 'Failed to receive dataset name.' });
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = {
  app
};
