import "./Messages.css"
import NavBar from "./NavBar";
export const Conversation = () =>{
    return(
        <div className="conversation">
            <span className="conversationName">Skeeyee</span>
        </div>
    )

}
export const Message = ({own}) => {
    return (
    <div className={own ? "message own": "message" }>
        <div className="messageTop">
            <p className="messageText">Skeeeeeyyeeeeeeee</p>
        </div>
    <div className="messageBottom">Sent moments ago</div>
    </div>
    )
}
const Messages = () => {
    return (
        <>
            <NavBar />
            <h1>Messages</h1>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Find Friends" className="chatMenuInput"></input>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                    </div>
                </div>
                <div className="chatBox"> 
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>                            <Message/>
                            <Message own={true}/>
                            <Message/>
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="send message..."></textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                </div>
                {/* <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        online
                    </div>
                </div> */}
            </div>
        </>
    )
}

 export default Messages