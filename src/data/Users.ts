import { UserDetails, UserDoc } from "./Interfaces/User";
import { LIGHT_MODE } from "../constants/systemChoice";
import { randIdGen } from "../helper/randomIdGenerator";
import { ChatDoc } from "./Interfaces/Chat";

export class Users {
    private _user_id: string;
    // private _name: string;
    private _mobile: string;
    private _email: string;
    private _password: string;
    private _chats: {[key: string]: ChatDoc[] | []};
    private _sysytemChoice: string;
    // private _pinned: boolean

    // private getUserName = (): string => this._name;
    private getEmailId = (): string => this._email;
    private getUserId = (): string => this._user_id;
    private getSystemChoice = (): string => this._sysytemChoice;
    private getChats = (): {[key: string]: ChatDoc[] | []} => this._chats;
    
    private getUserDetails = (): UserDoc => {
        return {
            // name: this.getUserName(),
            userId: this.getUserId(),
            mobile: this._mobile,
            email: this.getEmailId(),
            password: this._password,
            // pinned: this._pinned,
            systemChoice: this.getSystemChoice(),
            chats: this.getChats()
        }
    }

    public getUserById = (userId: string) => {
        const users = this.getLocalUsers();
        const userById = users.filter(user => user.userId === userId)
        if (userById && userById.length) return userById[0]
    }

    public getLocalUsers = (): UserDoc[] | [] => {
        const users = localStorage.getItem("users");
        return users ? JSON.parse(users) : [];
    }

    public setUserDataByUserId = (userId: string, userDetails: UserDoc): void => {
        let allUsers = this.getLocalUsers();
        if (allUsers && allUsers.length) {
            const updatedUsers = allUsers.map((user) => {
                if (user.userId === userId) {
                    return {...user, ...userDetails}
                }
                return user
            })
            allUsers = updatedUsers;
            const stringifiedUpdatedValues = JSON.stringify(allUsers);
            localStorage.setItem("users", stringifiedUpdatedValues);
        }
    }

    public setUserData = (userDetails: UserDoc): void => {
        let allUsers = this.getLocalUsers();
        allUsers = [
            ...allUsers,
           userDetails
        ];
        const allUsersStringified = JSON.stringify(allUsers);
        localStorage.setItem("users", allUsersStringified);
    }

    public create = (user: UserDetails): void => {
        this._user_id = randIdGen();
        // this._name = user.name;
        this._mobile = user.mobile;
        this._email = user.email;
        this._password = user.password;
        this._chats = {};
        this._sysytemChoice = user.systemChoice || LIGHT_MODE;
        const userDetails = this.getUserDetails();

        this.setUserData(userDetails);
    }

    public setLoggedInUser = ({ userId }: {userId: string}) => {
        localStorage.setItem("userId", userId);
    }

};


