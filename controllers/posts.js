import Post from "../models/Posts.js";
import User from "../models/User.js";


// CREATE
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();
        const post = await Post.find();

        res.status(201).json(post); // updates newsfeed with this post added
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
} 

export const postComment = async (req,res) => {
    try {
        const { userId } = req.body;
        const { name } = req.body;
        const { postId } = req.body;
        const { commentPost } = req.body;
        
        

        const post = await Post.findById(postId);
        if (!post) res.status(404).json({message:postId + " post doesn't exist."});

        // console.log(post.comments);
        
        
        

        const newComment = [userId, name, commentPost];

        // console.log(newComment);

        post.comments.push(newComment);
        // await post.save();
        // console.log(post.comments);

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { comments: post.comments },
            { new: true }, 
        )

        // console.log(updatedPost);
        res.status(201).json(updatedPost);
    }catch (error) {
        res.status(404).json(error.message);
    }
}

// READ
export const getFeedPosts = async (req,res) => {
    try {
        
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find( { userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// UPDATE
export const likePosts = async (req,res) => {
    try {

        // console.log(req.body);
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // likes is a map that grabs a userid

        if (isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true); // adds into likes, which is a map
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }, 
        )

        // console.log(updatedPost);

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET POST BY ID
export const getPostById = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (post) {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }



}

