import { Box, Typography, useTheme, Button, InputBase } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";





const CommentsWidget = ({comments, mainUserPicturePath}) => {

    const { palette } = useTheme();
    const [commentPost, setCommentPost] = useState("");
    // const primary = palette.primary.main;
    const main = palette.neutral.main;


    return (
        <Box mt="0.5rem">
            {/* {console.log(comments)} */}
            { comments.map((comment, i) => (
                <Box display="flex">
                    <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}>
                        <span style={{fontWeight: 'bold'}}>{comment[1][1]}</span> <span>{comment[1][2]}</span>
                        {console.log(comment)}
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