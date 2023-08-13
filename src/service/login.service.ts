import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import { Login } from '../types/Login';
import jwtUtil from '../utils/jwtUtil';

async function loginAuth({ username, password }: Login): Promise<ServiceResponse<Token>> {
  if (!username || !password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  
  const foundUser = await UserModel.findOne({ where: { username } });
  // const pass = await bcrypt.compare(password, foundUser.dataValues.password);
  if (!foundUser || !bcrypt.compareSync(password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  // console.log(pass);
  const { id } = foundUser.dataValues;
  
  const token = jwtUtil.sign({ id, username });
  
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  loginAuth,
};