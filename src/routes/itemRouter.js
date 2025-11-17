import express from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';

const itemsRouter = express.Router();

itemsRouter.post('/', createItem);       // POST   /api/items
itemsRouter.get('/', getAllItems);       // GET    /api/items
itemsRouter.get('/:id', getItemById);    // GET    /api/items/:id
itemsRouter.put('/:id', updateItem);     // PUT    /api/items/:id
itemsRouter.delete('/:id', deleteItem);  // DELETE /api/items/:id

export default itemsRouter;
