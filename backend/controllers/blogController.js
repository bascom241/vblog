
const Blog = require('../models/blogModel');






exports.getPosts = async (req, res) => {

    try {
        const posts = await Blog.find();
        if (posts.length < 1) {
            return res.status(404).json({ message: 'No posts Found ' })
        } else {
            res.status(200).json({ message: 'success', posts })
            console.log(posts)
        }
    } catch {
        res.status(500).json({ message: 'ERROR' })
    }


}

exports.addPost = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: 'No file Uploaded' });
    }

    const imageUrl = req.file.path;  // Correctly define imageUrl

    const blog = new Blog({
        tittle: req.body.tittle,
        text: req.body.text,
        author: req.body.author,
        image: imageUrl,  // Use imageUrl here
        user: req.user.id
    });

    console.log(blog);
    try {
        await blog.save();
        res.status(200).json({ message: 'Blog saved successfully' });
        console.log(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error saving blog post', error: err.message });
        console.log(err.message);
    }
};


exports.getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Blog.findById(id);
        console.log(post)
        res.status(200).json({ message: 'sucess', post })
    } catch (e) {
        res.status(500).json({ message: 'Cant find post', error: e.message })
    }
}
exports.editPost = async (req, res) => {
    const postId = req.params.id;

    // Prepare the update data object
    const updateData = {
        name: req.body.name,
        date: Date.now(),
        text: req.body.text,
        author: req.body.author,
        tittle: req.body.tittle
    };

    // Check if an image file is provided
    if (req.file) {
        updateData.image = req.file.filename; // Add the image filename to the updateData object
    }

    try {
        if (!postId) {
            return res.status(404).json({ message: 'Post Not Found' });
        }

        const post = await Blog.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post Not Found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to edit this post' });
        }

        const updatedPost = await Blog.findByIdAndUpdate(postId, updateData, { new: true });

        res.status(200).json({ message: 'Update Successfully', post: updatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating post', error: err.message });
    }
};
exports.deleteAPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Blog.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post Not Found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post Deleted Successfully', post });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
};
