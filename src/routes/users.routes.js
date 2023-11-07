import { Router } from "express";
import { getUser } from "../controllers/User/getUser.controllers.js";
import { postUser } from "../controllers/User/postUser.controllers.js";
import { passportError, authoritation } from "../utils/messageErrors.js";


const userRouter = Router();

userRouter.get('/', passportError('jwt'), authoritation('admin'), getUser);
userRouter.post('/', passportError('jwt'), authoritation('admin'), postUser);

export default userRouter;