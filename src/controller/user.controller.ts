import { Request, Response } from 'express';
import LoginService from '../service/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function loginAuth(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;
  const { status, data } = await LoginService.loginAuth({ username, password });
  return res.status(mapStatusHTTP(status)).json(data);
}

export default { loginAuth };