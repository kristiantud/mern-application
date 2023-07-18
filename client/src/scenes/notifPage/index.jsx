import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import NotifsWidget from "scenes/widgets/NotifsWidget";


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
            <Box>
                { dataReturned ? (
                    notifications.map(
                        (notification) => (                        
                            <h3>{notification}</h3>
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