import { expect } from 'chai';
import sinon from 'sinon';
import LoginService from '../../../src/service/login.service';
import UserModel from '../../../src/database/models/user.model';
import { user } from '../../mocks/user.mock';

describe('Test the LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Test the login behavior', function () {
    it('should return status "INVALID_DATA" and a error message', async function () {
      const login = {
        username: '',
        password: 'teste',
      }

      const response = await LoginService.loginAuth(login);

      expect(response.status).to.equal('INVALID_DATA');
      expect(response.data).to.deep.equal({ message: "\"username\" and \"password\" are required" });
    });
    it('should return status "UNAUTHORIZED" and a error message', async function () {
      const { username, password } = user;
      const foundUser = UserModel.build(user);
      const response = await LoginService.loginAuth({ username, password });
      
      sinon.stub(UserModel, 'findOne').resolves(foundUser);
      
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.data).to.deep.equal({ message: "Username or password invalid" });
    });
    it('should return status "SUCCESSFUL" and a token', async function () {
      const { username, password } = user;

      const foundUser = UserModel.build(user);
      
      sinon.stub(UserModel, 'findOne').resolves(foundUser);

      const response = await LoginService.loginAuth({ username, password: 'terrível' });
      
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.data).to.have.key('token');
    });
  });
});
