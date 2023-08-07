
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const msgs = [1,2,3,4,5,6,7];
    const [selected, setSelected] = useState('');


    const msgSelected = (index) => {
        console.log(index);
    }

    return (
        <>
            {msgs.map((msgIndex) => (
                selected === msgIndex ? (<MsgPreviews selected={true} id={msgIndex} />
                ) : (
                <MsgPreviews selected={false} id={msgIndex} />)
                
            ))}
            
        
        </>
    )




}

export default MsgPreviewWidget;