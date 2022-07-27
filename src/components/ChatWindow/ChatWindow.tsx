import React, { useState, useEffect } from "react";
import { User } from "../../data/User";


const loggedInuser = localStorage.getItem("userId")
const user = new User();

const ChatWindow = (props: ChatWindowProps) => {
    const { selectedUser, loggedInUser } = props;


    const [message, setMessage] = useState("")

    useEffect(() => {
        console.log("Hello")
        if (loggedInUser && selectedUser) getLoggedInUserChats({ loggedInUser, selectedUser });   
    }, [selectedUser])


    const getLoggedInUserChats = ({ loggedInUser, selectedUser }: ChatWindowProps) => {
        const allUsers = user.getLocalUsers();
        if (allUsers && allUsers.length > 0) {
            const loggedInUserDetails = allUsers.filter((user) => user.userId === loggedInUser);
            console.log({ loggedInUserDetails });
        }
    }

    const sendMessage = (e: React.FormEvent<MouseEvent>) => {
        e.preventDefault();
        const payload = {
            from: loggedInUser,
            to: selectedUser,
            message: { value: message, type:typeof message  },
            timestamp: new Date()
        }
    };

    const createChatPayload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const message = e.target.value;
        if (message && message.length) {
            setMessage(message);
        }
    }

    return (
        <>
            {
                selectedUser && loggedInuser
                ? <div className="box is-flex is-flex-direction-column is-justify-content-space-between" style={{ height: "100%" }}>
                    <div>
                        Chat Entered will be displayed here
                    </div>
                    <form className="is-flex is-justify-content-space-between">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter a message"
                            onChange={createChatPayload}
                            // style={{
                            //     width: "80%"
                            // }}
                        />
                        <button
                        className="button is-primary"
                        // style={{
                        //     width: "20%"
                        // }}
                        // onClick={signupHandler}
                        // disabled={email.error || password.error || rePassword.error || mobile.error || userExists.exists}
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


ChatWindow.defaultProps = {
    selectedUser: "",
    loggedInUser: ""
}

interface ChatWindowProps {
    selectedUser: string,
    loggedInUser: string
}