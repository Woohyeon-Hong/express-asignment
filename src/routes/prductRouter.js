import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../controllers/prductController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', createProduct);

export default productRouter;
