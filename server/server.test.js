const { app } = require('./server');
const path = require('path');
const request = require('supertest');
const rimraf = require('rimraf');

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

describe('Upload dataset endpoint ', () => {
  const filePath = path.resolve(__dirname, 'testFiles/test.csv');
  const errorFilePath = path.resolve(__dirname, 'testFiles/test.txt');

  afterAll(() => {
    // Delete uploaded test files
    // rimraf requires a callback, here we provide an empty
    rimraf(path.resolve(__dirname, 'uploads/'), () => {});
  });

  test('POST /api/v1/uploadData - upload a new CSV file successfully', () => {
    return request(app)
      .post('/api/v1/uploadData')
      .attach('file', filePath)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.error).toBeFalsy();
        expect(response.body.success).toBe('File successfully uploaded!');
      });
  });

  test('POST /api/v1/uploadData - Upload fails', () => {
    return request(app)
      .post('/api/v1/uploadData')
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe('File required!');
      });
  });

  test('POST /api/v1/uploadData - Upload fails with wrong type of file', () => {
    return request(app)
      .post('/api/v1/uploadData')
      .attach('file', errorFilePath)
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
      });
  });
});

describe('Upload dataset name endpoint', () => {
  const datasetName = { name: 'test' };
  test('POST /api/v1/setDataName - recieve a new dataset name', () => {
    return request(app)
      .post('/api/v1/setDataName')
      .send(datasetName)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.error).toBeFalsy();
        expect(response.body.success).toBe('Dataset name has been received!');
      });
  });

  test('POST /api/v1/setDataName - 400 response with empty body', () => {
    return request(app)
      .post('/api/v1/setDataName')
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe('Failed to receive dataset name.');
      });
  });

  test('POST /api/v1/setDataName - 400 response with name containing non-alphanumerics', () => {
    return request(app)
      .post('/api/v1/setDataName')
      .send({ name: 'abcd$' })
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe(
          'Dataset name can only contain alphanumeric characters.'
        );
      });
  });

  test('POST /api/v1/setDataName - 400 response with name of length > 31 chars', () => {
    return request(app)
      .post('/api/v1/setDataName')
      .send({ name: 'abcdefghijklmnopqrstuvwxyz123456' })
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe(
          'Dataset name can contain at-most 31 characters.'
        );
      });
  });
});
