import { Router } from 'express';
import productController from '../controller/products.controller';

const productRouter = Router();

productRouter.get('/', productController.listAll);

productRouter.post('/', productController.insertProduct);

export default productRouter;