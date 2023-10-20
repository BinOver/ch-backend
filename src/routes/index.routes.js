import { Router } from "express";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./users.routes.js";

const router = Router();

router.use('/api/product', productRouter);
router.use('/api/sessions', sessionRouter);
router.use('/api/user', userRouter);
router.use('/api/cart', cartRouter);

router.use("/api/login", sessionRouter);
router.use("/api/logout", sessionRouter);

export default router;