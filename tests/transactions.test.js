const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
require('dotenv').config();

const sampleTransaction = {
    location_id: "loc98765",
    stall_id: "stall54321",
    items: [
        {
            item_id: "item001",
            name: "Apple Juice",
            price: 3.50,
            quantity: 2,
            total_price: 7.00
        },
        {
            item_id: "item002",
            name: "Chocolate Cake",
            price: 4.75,
            quantity: 1,
            total_price: 4.75
        }
    ],
    queuer_id: "queuer12345",
    queuer_mobile: "912345678",
    buyer_id: "buyer67890",
    buyer_mobile: "987654321",
    status: {
        paid: false,
        collected: false,
        cancelled: false,
        refunded: false,
        completed: false,
        delivered: false
    },
    fee: 0.75,
    total_cost: 12.50,
    pick_up_point: [
        {
            id: "pickup001",
            name: "Main Entrance",
            location: {
                latitude: 1.290270,
                longitude: 103.851959
            }
        }
    ]
};

let transactionId = '';

test('/ returns "Hello world"', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect('"Hello World!"')
    }
)

test('transaction are returned as json', async () => {
    try {
        const response = await api.get('/transactions/');
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

test('a valid transaction can be added ', async () => {
    const response = await api
        .post('/transactions')
        .send(sampleTransaction)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // post request returns transaction id
    transactionId = response.body.transaction_id;
}
)

test('a valid transaction can be deleted ', async () => {
    await api
        .delete(`/transactions/${transactionId}`)
        .expect(200)
    }
)