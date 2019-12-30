# API Specification v1
Last Edited Time: Dec 30, 2019 5:03 AM

The ArchMLP API is responsible for handling *data transfer* between the various components in the system architecture. All API endpoints are tagged with begin with `/api/v1` to indicate that these are `v1` endpoints.

## Overview

|  Endpoint 	|   Type (HTTP verb)	| Params|  Description 
|---	|---	|---	|---
|  `api/v1/uploadData` 	|  **POST** 	| `File` object | Upload CSV file to the server.  		

## Document Upload

### POST: `api/v1/uploadData`

|  Status Code 	|   Type	|  Message 
|---	|---	|---	
|  200 (OK) 	|  **Success** 	| File successfully uploaded!  
|  400 (Bad Request) 	|  **Error** 	| File upload only supports the following filetypes - /csv/
|  400 (Bad Request) 	|  **Error** 	| File required!

```javascript
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
      res.status(200).send({ success: 'File successfully uploaded!' });
    }
  } catch (err) {
    logger.error('File missing from request.');
    res.status(400).send({ error: 'File required!' });
  }
});
```

The `uploadData` endpoint is responsible for uploading CSV files into the server. It uses the `upload` middleware, which is configured using [multer](https://www.npmjs.com/package/multer). The endpoint attempts to see if an uploaded file was successfully validated by the middleware by checking `req.fileValidationError`. The `fileValidationProperty` property is added to the `req` object through `multer`. If the upload is successful we send a `200` status code,  otherwise a `400` status code.

Multer is used as middleware to handle file upload and validation.

```javascript
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
    logger.info("Attempting to validate file")
    // Successful validation
    if (mimetype && extname) {
      logger.info("File validation successful.")
      return cb(null, true);
    }
    // File validation error
    logger.error("File validation failed.")
    req.fileValidationError = `File upload only supports the following filetypes - ${filetypes}`;
    return cb(null, false, req.fileValidationError);
  }
}).single('file');
```

The `multer` middleware is configured to accept a single CSV file per request. It checks that the extension of the file and mimetype are both consistent with that of CSV files. If not, the server will return an error. If a file is successfully accepted, it is renamed to `{original-name}-{time-stamp}.csv`, i.e if you upload `data.csv`, the file will be renamed to  `data-1577692525912.csv`, where the timestamp is `1577692525912`. We append the timestamp for logging purposes. Our configuration currently stores all uploaded CSV files in `uploads/`.

See [server/server.js](../../server/server.js) for the full server implementation and [server/server.test.js](../../server/server.test.js) for tests.