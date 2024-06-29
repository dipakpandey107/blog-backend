// const express = require('express');
// const {
//   createPost,
//   getPosts,
//   getPostById,
//   updatePost,
//   deletePost,
// } = require('../controllers/postController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/', authMiddleware, createPost);
// router.get('/', getPosts);
// router.get('/:id', getPostById);
// router.put('/:id', authMiddleware, updatePost);
// router.delete('/:id', authMiddleware, deletePost);

// module.exports = router;


const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateObjectId = require('../middlewares/validateObjectId'); // Ensure this path is correct
const upload = require('../middlewares/multerConfig');
const router = express.Router();

router.post('/', authMiddleware, upload.single('featuredImage'), createPost);
router.get('/', getPosts);
router.get('/:id', validateObjectId, getPostById);
router.put('/:id', authMiddleware, validateObjectId, upload.single('featuredImage'), updatePost);
router.delete('/:id', authMiddleware, validateObjectId, deletePost);

module.exports = router;
