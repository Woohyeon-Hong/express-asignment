// routes/productRouter.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);             // GET    /products
router.get('/:id', getProductById);          // GET    /products/:id
router.post('/', createProduct);             // POST   /products
router.put('/:id', replaceProduct);          // PUT    /products/:id
router.patch('/:id', updateProduct);         // PATCH  /products/:id
router.delete('/:id', deleteProduct);        // DELETE /products/:id

export default router;
