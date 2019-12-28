const express = require('express');
const path = require('path'); // eslint-disable-line global-require
const multer = require('multer');
const mkdirp = require('mkdirp');

// multer config
const UPLOAD_PATH = 'uploads';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = `${UPLOAD_PATH}/`;
    mkdirp(dir, err => cb(err, dir));
  },
  filename: function(req, file, cb) {
    // Remove extension, add time stamp, readd extension
    cb(null, file.originalname.slice(0, -4) + '-' + Date.now() + '.csv');
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      'Error: File upload only supports the following filetypes - ' + filetypes
    );
  }
});

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// POST route for uploading new file
app.post('/api/v1/uploadData', upload.single('file'), (req, res, next) => {
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
