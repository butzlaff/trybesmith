import express, { Request, Response } from 'express';
import router from './routes';

const app = express();

app.use(express.json());

app.use('/user', router.userRouter);

app.use('/products', router.productRouter);

app.use('/orders', router.orderRouter);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Aplicação está funcionando!');
});

export default app;
