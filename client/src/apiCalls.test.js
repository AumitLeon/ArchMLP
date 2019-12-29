import { upload } from './apiCalls';

describe('Test client side API calls', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Calls /api/v1/uploadData and returns a successful response', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

    //assert on the response
    upload({}).then(res => {
      expect(res.body.success).toEqual('12345');
    });
  });
});
