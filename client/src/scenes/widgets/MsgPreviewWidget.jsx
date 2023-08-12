
import { useNavigate } from "react-router-dom";
import MsgPreviews from "./MsgPreviews";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


// fetches the messages to populate the preview list
const MsgPreviewWidget = ({}) => {
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const { inbox } = useSelector((state) => state.user);
    
    console.log(inbox);


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
            {inbox.map((msg) => (
                <div onClick={() => {setSelectedMsg(msg.id); navigate(`/messages/${msg.id}`)}}>
                    <MsgPreviews selected={selectedMsg} id={msg.id} senderName={"Ringo Starr"} senderMessage={msg.messages[1].content}/>
                </div>    
            ))}
            
        
        </>
    )




}

export default MsgPreviewWidget;