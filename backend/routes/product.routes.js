import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);   // ✅ UPDATE ROUTE
router.delete('/:id', deleteProduct); // ✅ DELETE ROUTE

export default router;
