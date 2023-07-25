import Navbar from "scenes/navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import PostWidget from "scenes/widgets/PostWidget";




const Post = ({}) => {

    const { postId } = useParams();
    const token = useSelector((state) => state.token);
    let [dataReceived, setDataReceived] = useState(false);
    const [ post, setPost ] = useState({});
    const {picturePath} = useSelector((state) => state.user)


    // console.log(postId);
    const getPostData = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
            method: "GET", 
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();
        // console.log(data);
        if (data) {
            setDataReceived(true);
            console.log("Received")
            setPost(data);
        }

        console.log(data);
    }

    useEffect(() => {
        getPostData();
        
    },[])


    return (
        
        <>
            <Navbar />
            <Box width="600px" m="auto">
                
                {dataReceived && <PostWidget 
                    key={post._id}
                    postId={post._id}
                    postUserId={post.userId}
                    name={`${post.firstName} ${post.lastName}`}
                    description={post.description}
                    location={post.location}
                    picturePath={post.picturePath}
                    userPicturePath={post.userPicturePath}
                    likes={post.likes}
                    comments={post.comments}
                    mainUserPicturePath={picturePath}
                />}
            </Box>
        </>
        
        


    )






}

export default Post;