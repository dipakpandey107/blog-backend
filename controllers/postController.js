const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const featuredImage = req.file ? req.file.path : null; 

  try {
    const post = new Post({
      title,
      content,
      authorId: req.user._id,
      category,
      featuredImage,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const featuredImage = req.file ? req.file.path : null; 

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    post.title = title;
    post.content = content;
    post.category = category;
    if (featuredImage) post.featuredImage = featuredImage;
    post.lastUpdated = Date.now();

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("authorId", "username");
    const totalPosts = await Post.countDocuments(query);
    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("authorId", "username");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("authorId", "username");
    const totalPosts = await Post.countDocuments();
    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
