
// this will hold both the msgPreviewWidget and the msgLogWidget side by side. 
import MsgPreviewWidget from "scenes/widgets/MsgPreviewWidget";
import MsgLogsWidget from "scenes/widgets/MsgLogsWidget";


const MessagesWidget = ({}) => {




    return (
        <>
        <div style={{height: "700px", width: "1300px", backgroundColor: "#202020", margin: "auto", marginTop: "50px", borderRadius: "10px", display: "flex"}}>
            <div style={{overflow: "auto"}}>
                <MsgPreviewWidget />
            </div>
            <div style={{width: "100%"}}>
                <MsgLogsWidget />
            </div>
        </div>
            
        
        </>
    );





}

export default MessagesWidget;