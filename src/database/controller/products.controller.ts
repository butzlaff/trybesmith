import { Request, Response } from 'express';

async function insertProduct(req: Request, res: Response): Promise<Response> {
  console.log(req.body);
  return res.status(200).json({ message: 'Product created' });
}

export default { insertProduct };