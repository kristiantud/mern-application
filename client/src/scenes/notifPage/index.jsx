import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Divider, Grid } from "@mui/material";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FlexBetween from "components/FlexBetween";


// this will fetch all of the notifications that the user gets from interactions with other people
const Notifications = ({}) => {

    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    let [notifications, setNotifications] = useState(null);
    let [ dataReturned, setDataReturned ] = useState(false); 
    // const notifications = useSelector((state) => state.user.notifications);

    const getNotifs = async () => {
        const response = await fetch (`http://localhost:3001/users/${_id}/notifications`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })

        const data = await response.json();
        setNotifications(data);
        setDataReturned(true);
    

        
        // const data = await response.json();
        // setNotifications(data);  
    }

    const notificationsSeen = async () => {
        const response = await fetch (`http://localhost:3001/users/${_id}/notifications`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}`}
        })

        // console.log("done");
    }

        
    
    useEffect(() => {
        getNotifs();
        notificationsSeen();
    }, [])
    


    
    return (
        <>
            <Navbar />
            <Box width="500px" m="auto" mt="30px">
                <WidgetWrapper m="1.1rem 0">
                    { dataReturned ? (
                        notifications.toReversed().map(
                            (notification) => (   
                                <>
                                    <Grid container mb="1.5rem" >
                                        <Grid item xs={2} ml="10px">
                                            {notification[2] === "comment" ? (<TextsmsOutlinedIcon sx={{marginTop: "5px"}} fontSize="large" />) : (<ThumbUpIcon fontSize="large" />)}
                                        </Grid>
                                        <Grid item xs={9} sx={{marginTop: "5px"}}>
                                            <Typography>
                                                {/* {console.log(notification[2] + " so...." )} */}
                                                {/* {console.log(notification[3])} */}
                                                <b>{notification[1]}</b> {notification[2] === "comment" ? (" commented on a post.") : (" liked your post.")} 
                                            </Typography>
                                            {/* {notification[2] !== "like" && 
                                                (<Typography align="center" fontStyle="italic" sx={{color:"gray"}}>
                                                    "{notification[3]}"
                                                </Typography>)
                                            } */}
                                                
                                        </Grid>
                                    </Grid>
                                        
                                </>
                                   
                                        
                                        
                                 
                                
                                            
                                    
                                
                            )
                        )
                    ) : (
                        <h3>data is loading...</h3>
                    )}
                    
                </WidgetWrapper>
            </Box>

            
        </>
    )
    
    


}

export default Notifications;