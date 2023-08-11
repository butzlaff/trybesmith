import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/', (_req, res) => res.status(200).json({ message: 'Order created' }));

export default orderRouter;