import { Router } from 'express';

const productRouter = Router();

productRouter.get('/', (_req, res) => res.status(200).json({ message: 'Product created' }));

export default productRouter;