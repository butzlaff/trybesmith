import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import LoginController from '../../../src/controller/user.controller';
import LoginService from '../../../src/service/login.service';

chai.use(sinonChai);

describe('Test the LoginService', function () {
  const req = {} as Request;
  const res = {} as Response;
  
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('Test the login behavior', function () {
    it('should return status 400 and error message for "INVALID_DATA"', async function () {
      req.body = {
        email: 'teste@test.com',
        password: '123456'
      };
      sinon.stub(LoginService, 'loginAuth').resolves({ status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } })
      await LoginController.loginAuth(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({message: '"username" and "password" are required' });
    });
    it('should return status 401 and error message for "UNAUTHORIZED"', async function () {
      req.body = {
        email: 'teste@test.com',
        password: '123456'
      };
      sinon.stub(LoginService, 'loginAuth').resolves({ status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } })
      await LoginController.loginAuth(req, res);
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
    });
  });
});
