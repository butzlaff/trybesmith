import { Router } from 'express';
import OrderController from '../controller/orders.controller';

const orderRouter = Router();

orderRouter.get('/', OrderController.listAll);

export default orderRouter;