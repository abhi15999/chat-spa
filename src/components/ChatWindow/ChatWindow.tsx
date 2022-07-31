import React, { useState, useEffect } from "react";
import { Chats } from "../../data/Chats";
import { ChatDoc } from "../../data/Interfaces/Chat";
import { Users } from "../../data/Users";
import Chat from "../Chat/Chat";


const loggedInuser = localStorage.getItem("userId")
const user = new Users();
const chat = new Chats();

const ChatWindow = (props: ChatWindowProps) => {
    const { selectedUser, loggedInUser } = props;

    const [message, setMessage] = useState<string>("")
    const [loggedInUserChats, setLoggedInUserChats] = useState<ChatDoc[] | []>([]);

    useEffect(() => {
        if (loggedInUser && selectedUser) {
            setMessage("")
            setLoggedInUserChats([])
            getLoggedInUserChats({ loggedInUser, selectedUser });   
        }
    }, [selectedUser, loggedInUser])


    const getLoggedInUserChats = ({ loggedInUser, selectedUser }: ChatWindowProps) => {
        const allUsers = user.getLocalUsers();
        // debugger;
        if (allUsers && allUsers.length > 0) {
            // debugger;
            const loggedInUserDetails = allUsers.filter((user) => user.userId === loggedInUser && user.chats[selectedUser] && user.chats[selectedUser].length);
            // debugger;
            if (loggedInUserDetails.length) {
                const { chats } = loggedInUserDetails[0];
                const chatsWithSelectedUser = [...chats[selectedUser]];
                // debugger;
                setLoggedInUserChats(chatsWithSelectedUser);
            }
            
        }
    }

    const createChat = ({ sentBy }: {sentBy: string}) => {
        const payload = {
            from: loggedInUser,
            to: selectedUser,
            message: { sent_by: sentBy ,value: message, type:typeof message, edited: false, deleted: false  },
        }

        chat.create(payload);
        
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createChat({ sentBy: loggedInUser });
        setTimeout(() => {
            createChat({ sentBy: selectedUser})
            setMessage("")
            getLoggedInUserChats({ loggedInUser, selectedUser });  
        }, 3000);

    };

    const messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const message = e.target.value;
        setMessage(message);
    }

    return (
        <>
            {
                selectedUser && loggedInuser
                ? 
                <div className="box is-flex is-flex-direction-column is-justify-content-space-between" style={{ height: "100%", overflowY: "auto" }}>
                    
                    <div>
                        {
                            loggedInUserChats && loggedInUserChats.map((chat, key) => <Chat key={key} chat={chat} />)  
                        }
                    </div>
                    <form className="is-flex is-justify-content-space-between">
                        <input
                            className="input"
                            type="text"
                            value={message}
                            placeholder="Enter a message"
                            onChange={messageHandler}
                        />
                        <button
                        className="button is-primary"
                        onClick={(e) => { 
                            onSubmit(e);
                            setMessage("")
                            getLoggedInUserChats({ loggedInUser, selectedUser });  
                        }}
                        disabled={!message.length}
                        >
                            Enter
                        </button>
                    </form>
                </div>
                : <h1>Select a Chat from the list or login again</h1>
            }
        </>
    )
};  

export default ChatWindow;


// ChatWindow.defaultProps = {
//     selectedUser: "",
//     loggedInUser: ""
// }

interface ChatWindowProps {
    selectedUser: string,
    loggedInUser: string
}