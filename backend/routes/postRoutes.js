const express = require("express");
const { route } = require("express/lib/application");
const {
  createPost,
  updateStatusPost,
  likeAndUnlikePost,
  deletePost,
  updateCaption,
  commentOnPost,
  deleteComment
} = require("../controllers/postController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/post/upload").post(isAuthenticatedUser, createPost);
router
  .route("/post/:id")
  .get(isAuthenticatedUser, likeAndUnlikePost)
  .delete(isAuthenticatedUser, deletePost)
  .put(isAuthenticatedUser, updateCaption);
router
  .route("/admin/post/:id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateStatusPost);
router
  .route("/post/comment/:id")
  .put(isAuthenticatedUser, commentOnPost)
  .delete(isAuthenticatedUser, deleteComment);

module.exports = router;
