
import { useNavigate } from "react-router-dom";
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user)
    const msgs = [1,2,3,4,5,6,7]; // this will be replaced by msgs stored in the user (within the state) when the user first logs in
    const [selectedMsg, setSelectedMsg] = useState(-1);
    const navigate = useNavigate();
    const { messageId } = useParams();

    console.log(messageId);
    
    if (messageId !== undefined){
        // fetch the message content from the server
        const getMessage = async () => {
            const response = await fetch(`http://localhost:3001/users/${_id}/messages/${messageId}`, {
                method: "GET", 
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            const data = await response.json();

            console.log(data);
        }

        getMessage();
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