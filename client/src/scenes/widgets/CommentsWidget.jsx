import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";





const CommentsWidget = ({comments}) => {

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
        </Box>
        
        
    )

}

export default CommentsWidget;