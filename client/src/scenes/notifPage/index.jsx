import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import NotifsWidget from "scenes/widgets/NotifsWidget";

// this will fetch all of the notifications that the user gets from interactions with other people
const Notifications = ({}) => {

    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    let [notifications, setNotifications] = useState("none");
    // const notifications = useSelector((state) => state.user.notifications);

    

    useEffect(() => {
        const getNotifs = async () => {
            const response = await fetch (`http://localhost:3001/users/${_id}/notifications`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            })
    
            const data = await response.json();
            setNotifications(data);
            
            
            // const data = await response.json();
            // setNotifications(data);  
        }
        getNotifs();
      }, []); //eslint-disable-ine react-hooks/exhaustive-deps


    return (
        <>
            <Navbar />
            <Box>
                {console.log(notifications)}
                {notifications.map(
                    (notification) => (
                        
                        <h3>{notification}</h3>
                    )
                )}
            </Box>
        </>
    )


}

export default Notifications;