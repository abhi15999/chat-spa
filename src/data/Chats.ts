import { ChatDetails, ChatDoc } from "./Interfaces/Chat"
import { User } from "./User"

export class Chats {
    private _from: string
    private _to: string
    private _message: {value: string | number, type: string }
    private _timestamp: Date
    private user = new User();


    getChatDetails = (userId: string) => {
        const getUser = this.user.getUserById(userId);
    }

    create = (chatDetails: ChatDetails) => {
        this._from = chatDetails.from
        this._to = chatDetails.to
        this._message = chatDetails.message
        this._timestamp = new Date();
    }


};