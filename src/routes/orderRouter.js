import express from 'express';
import { getJoinedOrders, getUserOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get('/joined', getJoinedOrders);         // GET /orders/joined
orderRouter.get('/user/:userId', getUserOrders);     // GET /orders/user/:userId

export default orderRouter;
