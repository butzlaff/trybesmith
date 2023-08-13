import { Router } from 'express';
import UserController from '../controller/user.controller';

const userRouter = Router();

userRouter.post('/', UserController.loginAuth);

export default userRouter;