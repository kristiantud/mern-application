import { Typography, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const MsgPreviews = ({selected, id = ''}) => {





    const navigate = useNavigate();

    


    return(
        <>
            {selected ? (
                <>
                    <div style={{padding: "30px 15px", backgroundColor: "#404040"}} class="msg-preview" onClick={() => {console.log("clicked id: " + id)}}>
                        <Typography mb="5px" fontWeight={"bold"}>Robert Oppenheimer</Typography>
                        <Typography>Now I have become death, the destroyer of worlds...</Typography>
                    
                    </div>
                    <Divider />
                </>
            ) : (
                <>
                    <div style={{padding: "30px 15px"}} class="msg-preview" onClick={() => {console.log("clicked id: " + id)}}>
                        <Typography mb="5px" fontWeight={"bold"}>Robert Oppenheimer</Typography>
                        <Typography>Now I have become death, the destroyer of worlds...</Typography>
                    
                    </div>
                    <Divider />
                </>
                
            )}
            
        </>
    )


}

export default MsgPreviews;