import { expect } from 'chai';
import sinon from 'sinon';
import LoginService from '../../../src/service/login.service';

describe('Test the LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Test the login behavior', function () {
    it('should return status 200 and a token', async function () {
      const login = {
        username: '',
        password: 'teste',
      }

      const response = await LoginService.loginAuth(login);
      expect(response.status).to.equal('INVALID_DATA');
      expect(response.data).to.deep.equal({ message: "\"username\" and \"password\" are required" });
    });
  });
});
