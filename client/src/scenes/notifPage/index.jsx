import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
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

        
    
    useEffect(() => {
        getNotifs();
    }, [])
    


    
    return (
        <>
            <Navbar />
            <Box m="3rem 30rem">
                
                { dataReturned ? (
                    notifications.toReversed().map(
                        (notification) => (                  
                            <WidgetWrapper m="1.3rem 0">
                                <FlexBetween>
                                    <Box>
                                        {notification[2] = "comment" ? (<TextsmsOutlinedIcon />) : (<ThumbUpIcon />)}
                                    </Box>
                                    <Box>
                                        <Typography>
                                            <b>{notification[1]}</b> {notification[2] = "comment" ? (" commented on a post.") : (" liked your post.")} 
                                        </Typography>
                                        <Typography>
                                            "{notification[3]}"
                                        </Typography>
                                    </Box>
                                </FlexBetween>
                            </WidgetWrapper>
                        )
                    )
                ) : (
                    <h3>data is loading...</h3>
                )}
            </Box>

            
        </>
    )
    
    


}

export default Notifications;