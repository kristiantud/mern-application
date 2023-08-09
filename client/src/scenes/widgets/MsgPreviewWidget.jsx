
import { useNavigate } from "react-router-dom";
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";
import { useParams } from "react-router-dom";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const msgs = [1,2,3,4,5,6,7]; // this will be replaced by msgs stored in the user (within the state) when the user first logs in
    const [selectedMsg, setSelectedMsg] = useState(-1);
    const navigate = useNavigate();
    const { messageId } = useParams();

    console.log(messageId);
    
    if (messageId !== undefined){
        // fetch the message content from the server
    }

    

    return (
        <>
            {msgs.map((msgIndex) => (
                <div onClick={() => {setSelectedMsg(msgIndex); navigate(`/messages/${msgIndex}`)}}>
                    <MsgPreviews selected={selectedMsg} id={msgIndex}/>
                </div>
                
                
                
            ))}
            
        
        </>
    )




}

export default MsgPreviewWidget;