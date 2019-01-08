// tslint:disable:import-name
import * as request from 'supertest';
import server from "../src/main";

describe('Node.js API tests', () => {

  afterAll(()=> {
    require('../src/main').stop();
  })

  it('server successfully calls "/" path', (done: any) => {

    request(server).get('/').then((res: any) => {

      expect(res.status).toEqual(200);
      done();
    });
  });

  // it('greets a user with message', (done: any) => {
  //   const authenticatedRequest = request.agent();

  //   authenticatedRequest
  //     .post('')
  //     .send()
  //     .end();

  //     request(server).get('/').then((res: any) => {

  //       expect(res.status).toEqual(200);
  //       done();
  //     });
  // });

  // it('greets a user with message 1', () => {
  //   expect(1).toBe(1);
  // });
});