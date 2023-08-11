import { Request, Response, Router } from 'express';

const userRouter = Router();

userRouter.get('/', (_req: Request, res: Response) => res
  .status(200).json({ message: 'User created' }));

export default userRouter;