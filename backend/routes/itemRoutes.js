const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

// Search must come before /:id to avoid conflict
router.get('/search', searchItems);

// Item CRUD
router.route('/').get(getAllItems).post(protect, createItem);
router
  .route('/:id')
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
