const request = require('supertest');
const app = require('../app');

const mongoose = require('mongoose');

// afterEach(() => {
//   return mongoose.connection.db.dropDatabase();
// });

describe('Users CRUD', () => {
  it('happy path', async () => {
    let userId;

    Create;
    //given
    await request(app)
      .post('./api/users')
      .send({
        name: 'Tom Cruise',
        email: 'tomcruise@gmail.com',
        password: '12345678',
      })
      //Then
      .then((res) => {
        expect(res.statusCode).toBe(201);

        // expect(res.body).toMatchObject({
        //   name: 'Tom Cruise',
        //   email: 'tomcruise@gmail.com',
        //   id: expect.any(String),
        //   createdAt: expect.any(String),
        //   updatedAt: expect.any(String),
        // });
        // expect(res.body.password).toBeundefined();

        // userId = res.body.id;
      });
  });
});
