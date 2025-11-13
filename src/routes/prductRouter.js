import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../controllers/prductController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireBodyFields, validateNumeric, validateIdParam } from '../middlewares/validators.js';

const productRouter = express.Router();

productRouter.get('/', asyncHandler(getAllProducts)); // 과제 6: 실패 시 500 처리됨
productRouter.get('/:id',
  validateIdParam('id'),           // 과제 7: id 포맷 유효성
  asyncHandler(getProductById)
);
productRouter.post('/',
  requireBodyFields(['name', 'price']), // 과제 5: 필수값 400
  validateNumeric('price'),             // 과제 5: price 숫자 검증
  asyncHandler(createProduct)
);

export default productRouter;
