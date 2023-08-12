import { Typography, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const MsgPreviews = ({selected, id, senderName, senderMessage}) => {





    const navigate = useNavigate();

    


    return(
        <>
            
            {selected === id ? (
                <>
                    <div style={{padding: "30px 15px", backgroundColor: "#404040"}} class="msg-preview">
                        <Typography mb="5px" fontWeight={"bold"}>{senderName}</Typography>
                        <Typography>{senderMessage}</Typography>
                    
                    </div>
                    <Divider />
                </>
            ) : (
                <>
                    <div style={{padding: "30px 15px"}} class="msg-preview" >
                        <Typography mb="5px" fontWeight={"bold"}>{senderName}</Typography>
                        <Typography>{senderMessage}</Typography>
                    
                    </div>
                    <Divider />
                </>
                
            )}
            
        </>
    )


}

export default MsgPreviews;