import { Router } from 'express';
import productController from '../controller/products.controller';

const productRouter = Router();

// productRouter.get('/', (_req, res) => res.status(200).json({ message: 'OK' }));

productRouter.post('/', productController.insertProduct);

export default productRouter;