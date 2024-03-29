import { Box, Typography, useTheme, Button, InputBase } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPost } from "state";
import { getData } from "../../state/notifData";






const CommentsWidget = ({comments, mainUserPicturePath, postId, name, loggedInUserId, postUserId}) => {

    const { palette } = useTheme();
    const [commentPost, setCommentPost] = useState("");
    const dispatch = useDispatch();
    // const primary = palette.primary.main;
    const main = palette.neutral.main;
    const token = useSelector((state) => state.token);
    

    const handleCommentPost = async () => {
        
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`,
                    "Content-Type" : "application/json"},
            body: JSON.stringify({ userId: loggedInUserId,
                        postId: postId,
                        name: name,
                        commentPost: commentPost})
                                    
        })
   
       // TODOs: 
       // create a query that would use the postId to check for an existing post,
       // when found, add the name and the commentPost to the comment section of that post

       // handle the response
       const updatedPost = await response.json();
    //    console.log(updatedPost);
       dispatch(setPost({ post: updatedPost }));
       

       // handle sending notifications to all users in the comments section
       // we need to notify: the person who posted (if !isMe), and everyone else in the getData that !isMe
    //    console.log(getData(postId));
       var userIds = [];
       var Ids = getData(postId);

       for (var x = 0; x < Ids.length; x++){
        if (Ids[x][0] !== loggedInUserId){
            if (!userIds.includes(Ids[x][0])){
                userIds.push(Ids[x][0]);
            }
        }
       }

       if (postUserId !== loggedInUserId){
            if (!userIds.includes(postUserId)){
                userIds.push(postUserId);
            }
       }

       const notifMap = new Map();
       const notifPackage = [postId,name,"comment",false,commentPost];
       setCommentPost(""); // clears the comment textbox
       for (var x = 0; x < userIds.length; x++){
            notifMap.set(userIds[x],notifPackage);
       }
       const notifObj = Object.fromEntries(notifMap);

    //    console.log(JSON.stringify(userIds));
    //    console.log(JSON.stringify(notifObj));

       await fetch(`http://localhost:3001/users/notifyComment`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"},
            body: JSON.stringify(notifObj)
                                    
        })

        


       

    //    console.log("all ids: " + userIds);
       // make a fetch call to server to add a notification to all the people in userIds only if userIds.length > 0


       
   } 


    return (
        <Box mt="0.5rem">
            {/* {console.log(comments)} */}
            { comments.map((comment, i) => (
                <Box display="flex">
                    <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}>
                        <span style={{fontWeight: 'bold'}}>{comment[1][1]}</span> <span>{comment[1][2]}</span>
                        {/* {console.log(comment)} */}
                    </Typography>
                </Box>
            ))}

                <FlexBetween gap="1rem" mt="20px" mb="15px">
                    <UserImage image={mainUserPicturePath} size="45px" />
                    <InputBase placeholder="Add a comment..."
                        onChange={(e) => setCommentPost(e.target.value)}
                        value={commentPost}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "0.4rem 2rem"
                        }} />      
                    <Button
                        onClick={handleCommentPost}
                        disabled={!commentPost}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "2rem",
                            height: "40px"
                        }}
                    >
                        Post
                    </Button>
                </FlexBetween>

                
        </Box>
        
        
        
    )

}

export default CommentsWidget;