import { Request, Response } from 'express';
import ProductService from '../service/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function insertProduct(req: Request, res: Response) : Promise<Response> {
  const { name, price, orderId } = req.body;
  const { status, data } = await ProductService.createProduct({ name, price, orderId });
  return res.status(mapStatusHTTP(status)).json(data);
}

async function listAll(_req: Request, res: Response) : Promise<Response> {
  const { status, data } = await ProductService.listAll();
  return res.status(mapStatusHTTP(status)).json(data);
}

export default { insertProduct, listAll };