import { Box, Typography, useTheme, Button, InputBase } from "@mui/material";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";





const CommentsWidget = ({comments, mainUserPicturePath}) => {

    const { palette } = useTheme();
    // const primary = palette.primary.main;
    const main = palette.neutral.main;
    const token = useSelector((state) => state.token);


    return (
        <Box mt="0.5rem">
            {console.log(comments)}
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
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "0.4rem 2rem"
                    }} />      
                    <Button
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
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