import { useState, useEffect } from "react";
import { UserList } from "../../constants/UserList";
import { Users } from "../../data/Users";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import Navbar from "../Navbar/Navbar";


const user = new Users();

const Dashboard = () => {
  const userId  = localStorage.getItem("userId");
  const [ selectedUser, setSelectedUser ] = useState("");
  useEffect(() => {
    if (userId && !selectedUser.length) defaultOpenChatByUserId(userId)
  });

  const defaultOpenChatByUserId = (userId: string) => {
    const userById = user.getUserById(userId);
    if (userById && userById.chats) {
      const keysOfUsers = Object.keys(userById.chats)
      keysOfUsers && keysOfUsers.length ? setSelectedUser(keysOfUsers[0]) : setSelectedUser("")
    } 
  }

  return (
    userId && typeof userId === "string" ? <div className="container is-widescreen" style={{ height: "100vh" }} >
      <div style={{ height: "10%" }}><Navbar /></div>
      <div className="columns is-fullheight-with-navbar" style={{ height: "80%" }}>
        <div className="column is-3" style={{ overflowY: "auto" }}>
            <ChatList
              chats={UserList}
              selectUser={(user: string) => setSelectedUser(user)}
            />
        </div>
        <div className="column">
          <ChatWindow loggedInUser={userId} selectedUser={selectedUser} />
        </div>
      </div>
    </div>
    : <div>Please Login</div>
  );
};

export default Dashboard;
