import { useState, useEffect } from "react";
import { UserList } from "../../constants/UserList";
import { Users } from "../../data/Users";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import Navbar from "../Navbar/Navbar";

const user = new Users();

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    if (userId && !selectedUser.length) defaultOpenChatByUserId(userId);
  });

  const defaultOpenChatByUserId = (userId: string) => {
    const userById = user.getUserById(userId);
    if (userById && userById.chats) {
      const keysOfUsers = Object.keys(userById.chats);
      keysOfUsers && keysOfUsers.length
        ? setSelectedUser(keysOfUsers[0])
        : setSelectedUser("");
    }
  };

  return userId && typeof userId === "string" ? (
      <div className="container is-fluid">
        <div className="block">
          <Navbar />
        </div>
          <div className="columns is-fullheight">
            <div className="column" style={{ overflowY: "auto", background:"#ffffd5" }}>
              <ChatList
                chats={UserList}
                selectUser={(user: string) => setSelectedUser(user)}
              />
            </div>
            <div className="column is-9-desktop is-12-mobile is-fullheight">
              <ChatWindow loggedInUser={userId} selectedUser={selectedUser} />
            </div>
          </div>
      </div>
  ) : (
    <div>Please Login</div>
  );
};

export default Dashboard;
