const request = require('supertest');
const app = require('../server');
const mockData = require('./mockData');

describe('API Test for /v1/fileReader', () => {
  test('post method', async () => {
    const response = await request(app).post('/v1/fileReader').set('Accept', 'application/json')
      .send(mockData.sentData);
    expect(response.body.statusCode).toBe(200);
  });
});
