const Post = require("../models/postModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const newPostData = {
    caption: req.body.caption,
    image: {
      public_id: "sample public Id",
      url: "sample image",
    },
    owner: req.user._id,
  };

  const post = await Post.create(newPostData);

  const user = await User.findById(req.user._id);

  user.posts.push(post._id);

  await user.save();

  res.status(201).json({
    success: true,
    post,
  });
});

//update status post -- Admin
exports.updateStatusPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post is not exist!", 404));
  }

  if (post.status === "Confirmed") {
    return next(new ErrorHandler("Post is confirmed", 400));
  }

  post.status = req.body.status;

  if (req.body.status === "Confirmed") {
    post.deliveredAt = Date.now();
  }

  await post.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    post,
  });
});

//Like and unlike post
exports.likeAndUnlikePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found!", 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  } else {
    post.likes.push(req.user._id);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  }

  post.likes.push(req.user._id);

  await post.save();
});

//Delete Post
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized!", 401));
  }

  await post.remove();

  const user = await User.findById(req.user._id);

  const index = user.posts.indexOf(req.params.id);
  user.posts.splice(index, 1);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Post deleted!",
  });
});

exports.updateCaption = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found!", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  post.caption = req.body.caption;
  await post.save();

  res.status(200).json({
    success: true,
    post,
  });
});

// Add comment
exports.commentOnPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found!", 404));
  }

  let commentIndex = -1;
  arr = [1, 2, 3, 4, 5];

  //Check if comment already exists
  post.comments.forEach((item, index) => {
    if (item.user.toString() === req.user._id.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex !== -1) {
    post.comments[commentIndex].comment = req.body.comment;

    await post.save();

    return res.status(200).json({
      success: true,
      post,
    });

  } else {
    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();
    return res.status(200).json({
      success: true,
      post,
    });
  }
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler('Post not found!', 404));
  }

  // Checking if owner wants to delete
  if (post.owner.toString() === req.user._id.toString()) {
    if (req.body.commentId == undefined) {
      return next(new ErrorHandler('Comment Id is required!', 400));
    }

    post.comments.forEach((item, index) => {
      if (item._id.toString() === req.body.commentId.toString()) {
        return post.comments.splice(index, 1);
      }
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Your comment has deleted!',
    });
  } else {
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        return post.comments.splice(index, 1);
      }
    });
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Your comment is deleted!'
    })

  }
})
