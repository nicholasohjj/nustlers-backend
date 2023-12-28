const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
require('dotenv').config();

const newMarker =  {
  "coordinate": {
  "latitude": 1.304058528310359,
  "longitude": 103.77410520887246
  },
  "image": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Hwangs-UTown-1024x684.jpg",
  "title": "Hwang’s Korean Restaurant",
  "operating_hours": {
  "term": "Mon-Sat, 10.30am-9.00pm; Sun closed",
  "vacation": "Mon-Sat, 10.30am-9.00pm; Sun closed"
  },
  "stalls": 0

  }

let markerId = '';

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

    const response = await api.get('/markers/');
    const contents = response.body;
    markerId = contents[contents.length - 1].id;
    }
)

test('a valid marker can be deleted ', async () => {
    await api
        .delete(`/markers/${markerId}`)
        .expect(200)
    }
)