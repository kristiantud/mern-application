
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const msgs = [1,2,3,4,5,6,7];
    const [selectedMsg, setSelectedMsg] = useState(-1);


    

    return (
        <>
            {msgs.map((msgIndex) => (
                <div onClick={() => {setSelectedMsg(msgIndex)}}>
                    <MsgPreviews selected={selectedMsg} id={msgIndex} />
                </div>
                
                
                
            ))}
            
        
        </>
    )




}

export default MsgPreviewWidget;