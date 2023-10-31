import { Router } from "express";
import { getUser, postUser } from "../controllers/user.controllers.js";
import { passportError, authoritation } from "../utils/messageErrors.js";


const userRouter = Router();

userRouter.get('/', passportError('jwt'), authoritation('admin'), getUser);
userRouter.post('/', passportError('jwt'), authoritation('admin'), postUser);

export default userRouter;