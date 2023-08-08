
import { useNavigate } from "react-router-dom";
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const msgs = [1,2,3,4,5,6,7];
    const [selectedMsg, setSelectedMsg] = useState(-1);
    const navigate = useNavigate();

    

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