import React, { useEffect, useState } from "react";
import { Chats } from "../../data/Chats";
import { ChatDoc, ChatEditDoc } from "../../data/Interfaces/Chat";
import Modal from "../Modal/Modal";

const Chat = ({ chat }: ChatProps): JSX.Element => {
  const userId = localStorage.getItem("userId");

  //   const [onHover, setOnHover] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  // const [chatDetails, setChatDetails] = useState<ChatDoc>({ from:"", to: "", message: { type: "", value: "", edited: false, deleted: false, sent_by: ""}, chatId: "", timestamp: new Date() })
  const [chatDetails, setChatDetails] = useState(chat);
  const [chatMessage, setChatMessage] = useState<string | number>(chatDetails.message.value)
  const [chatEdited, setChatEdited] = useState<boolean>(chatDetails.message.edited);
  const [chatDelete, setChatDelete] = useState<{ deleted: boolean, confirmationModal: boolean }>({ deleted: chatDetails.message.deleted, confirmationModal: false });

  useEffect(() => {
    setChatDetails(chat)
    setChatMessage(chat.message.value)
    setChatEdited(chat.message.edited)
    setChatDelete({confirmationModal:false, deleted: chat.message.deleted })
  }, [chat])

  const editHandler = () => {
    setEdit(true);
  };

  const editMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  }

  const cancelEditMessage = () => {
    setChatMessage(chatDetails.message.value);
    setEdit(false);
  }

  const editMessage = (payload: ChatEditDoc) => {
    const CHAT = new Chats();
    try {
      CHAT.edit(payload);
    } catch (err) {
      console.error(err);
    }
  }

  const confirmEditMessageHandler = () => {
    const payload = {
      chatId: chatDetails.chatId,
      updatedMessage: chatMessage,
      from: chatDetails.from,
      to: chatDetails.to,
      edited: true
    }
    editMessage(payload);
    setChatEdited(true)
    setEdit(false);
  };

  const deleteModalClose = () => setChatDelete({...chatDelete, confirmationModal: false});
  const deleteModalOpen = () => setChatDelete({...chatDelete, confirmationModal: true});

  const deleteHandler = () => {
    const payload = {
      chatId: chatDetails.chatId,
      from: chatDetails.from,
      to: chatDetails.to,
      deleted: true
    }
    editMessage(payload);
    setChatDelete({ ...chatDelete, deleted: true, confirmationModal:false })
  };  


  //   const toggleOnHover = () => setOnHover(!onHover)

  //   const onMouseOverHandler = () => toggleOnHover();

  //   const onMouseOutHandler = () => toggleOnHover();

  return (
    <>
       {
         !edit
           ? <p
                // onMouseOver={toggleOnHover} onMouseOut={toggleOnHover}
                className={`box is-flex ${
                  chatDetails.message.sent_by === userId
                    ? "is-justify-content-flex-end has-background-primary-light"
                    : "is-justify-content-flex-start has-background-danger-light"
                }`}
            >
                {!chatDelete.deleted ? (<span>{chatMessage}</span>) : (<span>This message was deleted </span>)}
                {!chatDelete.deleted && chatEdited ? <span>(edited)</span> : null}
                {!chatDelete.deleted && chatDetails.message.sent_by === userId ? (
                  <>
                    <button
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={editHandler}
                    >
                    <i className="fas fa-edit" />
                    </button>
                    <button
                    style={{
                        cursor: "pointer",
                    }}
                    className="js-modal-trigger"
                    data-target="confirmation-modal"
                    onClick={deleteModalOpen}
                    >
                    <i className="fas fa-trash-alt" />
                    </button>
                  </>
                ) : null}
            </p>
            : <div className="is-flex is-justify-content-flex-end is-align-items-center" >
                    <input value={chatMessage} onChange={editMessageHandler} />
                    <span style={{ cursor: "pointer" }} onClick={confirmEditMessageHandler}><i className="fas fa-check-circle" aria-hidden="true"/> </span>
                    <span style={{ cursor: "pointer" }} onClick={cancelEditMessage}><i className="fas fa-times" /></span>
                </div>
       }
       {
        chatDelete.confirmationModal && <Modal heading="Delete Message" message="Do you wish to delete the message. This process is irreversible. Do you wish to continue ?" onCancel={deleteModalClose} onSuccess={deleteHandler} />
       } 

    </>
  );
};

export default Chat;

interface ChatProps {
  chat: ChatDoc;
}
