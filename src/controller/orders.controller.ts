import { Request, Response } from 'express';
import OrderService from '../service/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listAll(_req: Request, res: Response): Promise<Response> {
  const { status, data } = await OrderService.listAll();
  return res.status(mapStatusHTTP(status)).json(data);
}

export default { listAll };