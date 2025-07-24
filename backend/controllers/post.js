const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    console.log(req.body,req.session.userId)
    const { title, caption, platforms, date, time } = req.body;
    const imagePaths = req.files.map(file => file.filename);
    const userId = req.session.userId;
    console.log(req.body)
    const post = new Post({
      userId: userId,
      title,
      caption,
      platforms: JSON.parse(platforms),
      scheduledDate: date,
      scheduledTime: time,
      images: imagePaths,
    });
    console.log(post)
    await post.save();
    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ success: false, message: "Failed to create post." });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    console.log(posts)
    res.status(200).json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
