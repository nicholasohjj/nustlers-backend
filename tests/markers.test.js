const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
require('dotenv').config();

const newMarker =   {
    "coordinate": {
      "latitude": 1.3047284337522933, 
      "longitude": 103.77255425620469
    },
    "title": "Waa Cow!",
    "description": "Waa Cow! is a arestaurant located at the first level.",
    "image": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Waa-Cow-1-1024x684.jpg"

  }


test('/ returns "Hello world"', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect('"Hello World!"')
    }
)

test('markers are returned as json', async () => {
    try {
        const response = await api.get('/markers/');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error:', error.response.body);
        } else {
          console.error('Error in test:', error);
        }
        throw error; // Re-throw the error to fail the test
      }
    });

test('a valid marker can be added ', async () => {
    await api
        .post('/markers')
        .send(newMarker)
        .expect(200)
        .expect('Content-Type', /application\/json/)
}
)