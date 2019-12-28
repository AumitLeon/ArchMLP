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
    cb(null, file.originalname + '-' + Date.now() + '.csv');
  }
});
const upload = multer({ storage: storage });

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
app.post('/api/uploadData', upload.single('file'), (req, res) => {
  try {
    console.log(req.file.originalname);
    res.status(200).send({ success: 'File successfully uploaded!' });
  } catch (err) {
    console.log(req.body);
    res.status(400).send({ err });
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
