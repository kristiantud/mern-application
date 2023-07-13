import { ChatBubbleOutlineOutlined,
        FavoriteBorderOutlined,
        FavoriteOutlined,
        ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setPost } from "state";
import CommentsWidget from "./CommentsWidget";
import UserImage from "components/UserImage";
import { addData, getData } from "../../state/notifData";




const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    mainUserPicturePath
}) => {

    const [isComments, setIsComments] = useState(true);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserName = useSelector((state) => (state.user.firstName + " " + state.user.lastName));
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const allComments = Object.entries(comments);
    // console.log(allComments);
    // console.log(name + " " + picturePath + " " + userPicturePath);

    
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;


    const patchLike = async () => {
        const response = await fetch (`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId})
        });
        const updatedPost = await response.json();
        console.log(updatedPost);
        dispatch(setPost({ post: updatedPost }));
    }

   
    return (
        <WidgetWrapper m="2rem 0">
            <Friend 
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                loggedInUserId={loggedInUserId}
            />
            <Typography color={main} sx={{ mt:"1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem"}}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>
                            {likeCount}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{allComments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <>
                    {addData([postId,allComments])}
                    <CommentsWidget comments={allComments} 
                                    mainUserPicturePath={mainUserPicturePath}
                                    postId={postId}
                                    name={loggedInUserName}
                                    loggedInUserId={loggedInUserId}         
                    />
                    
                </>
                
                
                
                    /* {comments.map(() => (
                        <Box key={`${name}`}>
                            <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}>
                                {comments}
                            </Typography>
                        </Box>
                    ))} */
                    
                    
                    /* { allComments.map((comment,i) => (
                        <Box key={`${name}`} display="flex">
                            <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}>
                                <span style={{fontWeight: 'bold'}}>{comment[0]}</span> <span>{comment[1]}</span>
                            </Typography>
                        </Box>
                        
                    ))} */
                    
                    
                
            )}


        </WidgetWrapper>

    )
}

export default PostWidget;