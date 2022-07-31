import { randIdGen } from "../helper/randomIdGenerator"
import { ChatDetails, ChatEditDoc } from "./Interfaces/Chat"
import { Users } from "./Users"

export class Chats {
    private _from: string
    private _to: string
    private _chatId: string
    private _message: {value: string | number, type: string, sent_by: string, edited: boolean, deleted: boolean }
    private _timestamp: Date
    private user = new Users();



    create = (chatDetails: ChatDetails) => {
        this._chatId = randIdGen();
        this._from = chatDetails.from
        this._to = chatDetails.to
        this._message = chatDetails.message
        this._timestamp = new Date();

        let userDetails = this.user.getUserById(chatDetails.from);
        if (userDetails) {
            let userChats = userDetails.chats
           
            if (userChats[chatDetails.to]) {
                
                userChats[chatDetails.to] = [
                    ...userChats[chatDetails.to],
                    {
                        chatId: this._chatId,
                        from: chatDetails.from,
                        to: chatDetails.to,
                        message:chatDetails.message,
                        timestamp: this._timestamp
                    }
                ]
    
            } else {
                userChats = {
                    ...userChats,
                    [chatDetails.to]: [{
                        chatId: this._chatId,
                        from: chatDetails.from,
                        to: chatDetails.to,
                        message:chatDetails.message,
                        timestamp: this._timestamp
                    }]
                }
            }
            userDetails = {
                ...userDetails,
                chats: userChats
            }
            this.user.setUserDataByUserId(chatDetails.from, userDetails)
        }
        
    }


    edit = (chatDetails: ChatEditDoc) => {

        
        let userDetails = this.user.getUserById(chatDetails.from);
        if (userDetails) {
            let userChats = userDetails.chats;
            if (userChats[chatDetails.to]) {
                userChats[chatDetails.to].forEach(chat => {
                    if (chat.chatId === chatDetails.chatId) {
                        if (chatDetails.edited) chat.message.edited = chatDetails.edited;
                        if (chatDetails.updatedMessage) {
                            chat.message.value = chatDetails.updatedMessage;
                            chat.message.type = typeof chatDetails.updatedMessage;
                        }
                        if (chatDetails.deleted) chat.message.deleted = chatDetails.deleted
                    }
                })
                userDetails = {
                    ...userDetails,
                    chats: userChats
                }
                this.user.setUserDataByUserId(chatDetails.from, userDetails)
            }
        }
    }

};