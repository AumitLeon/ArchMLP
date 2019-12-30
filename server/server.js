const express = require('express');
const path = require('path'); // eslint-disable-line global-require
const multer = require('multer');
const mkdirp = require('mkdirp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

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

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(
      new Error(
        `Error: File upload only supports the following filetypes - ${filetypes}`
      )
    );
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
  path: path.join(__dirname, 'log')
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

// POST route for uploading new file using upload (multer middleware)
app.post('/api/v1/uploadData', upload, (req, res, next) => {
  try {
    if (req.file.originalname) {
      res.status(200).send({ success: 'File successfully uploaded!' });
    }
  } catch (err) {
    next(err);
    res.status(400).send({ error: 'Failed to upload file.' });
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
