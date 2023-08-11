import { Request, Response } from 'express';
import ProductService from '../service/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function insertProduct(req: Request, res: Response) : Promise<Response> {
  const product = req.body;
  const { status, data } = await ProductService.createProduct(product);
  return res.status(mapStatusHTTP(status)).json(data);
}

export default { insertProduct };