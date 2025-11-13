import express from 'express';
import {
  getAllOrders,
  createOrder,
  getJoinedOrders,
  getUserOrders,
} from '../controllers/orderController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireBodyFields, validateIdParam } from '../middlewares/validators.js';

const orderRouter = express.Router();

orderRouter.get('/', asyncHandler(getAllOrders)); // 과제 2: 실패 시 500 처리됨

orderRouter.post('/',
  requireBodyFields(['user_id', 'product_id']), // 과제 1: 필수값 400
  asyncHandler(createOrder)                      // 존재여부 404는 컨트롤러에서
);

orderRouter.get('/joined', asyncHandler(getJoinedOrders)); // 과제 3: 빈 배열도 200

orderRouter.get('/user/:userId',
  validateIdParam('userId'), // 숫자 유효성
  asyncHandler(getUserOrders) // 과제 4: 없으면 404
);

export default orderRouter;
