import { Box, Typography, useTheme } from "@mui/material";



const CommentsWidget = ({comments}) => {

    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;

    return (
        <Box mt="0.5rem">
            { comments.map((comment, i) => (
                <Box display="flex">
                    <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}>
                        <span style={{fontWeight: 'bold'}}>{comment[0]}</span> <span>{comment[1]}</span>
                    </Typography>
                </Box>
            ))}
        </Box>
        
        
    )

}

export default CommentsWidget;