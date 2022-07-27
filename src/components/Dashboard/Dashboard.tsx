import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
const Dashboard = () => {

//   const [userId, setUserId] = useState();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [ selectedUser, setSelectedUser ] = useState("");
  useEffect(() => {
    if(userId !== localStorage.getItem("userId")) navigate("/login")
  });

  return (
    userId && typeof userId === "string" ? <div className="container is-widescreen" style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "10%" }}>Header Navbar, With settings</div>
      {/* <div className='is-flex' style={{ height: "80%", width: "100%" }}>
            <div style={{ width: "20%" }}>
                Chat List
            </div>

            <div style={{ width: "80%" }}>
                Chat Window
            </div>
        </div> */}
      <div className="columns is-fullheight-with-navbar" style={{ height: "80%" }}>
        <div className="column is-3 ">
            <ChatList
              userId={userId}
              selectedUser={(user: string) => setSelectedUser(user)}
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
