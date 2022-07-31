const ChatList = (props: ChatListProps) => {
    const { chats, selectUser } = props;
    return (
    <>
        <div>
            {
                chats && chats.map((chat) =>{
                    return (
                        <div onClick={() => selectUser(chat.userId)} key={chat.userId} className="box is-flex is-align-items-center is-justify-content-space-between" style={{ cursor: "pointer" }}>
                            <figure className="image is-64x64">
                                <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="Some Pic" />
                            </figure>

                            <div>
                                <p className="is-size-6">{chat.name}</p>                                
                            </div>
                        </div>

                    )
                })
            }
        </div>
    </>
    )

};

export default ChatList;



ChatList.defaultProps ={
    userId: "1001",
    chats: [{
        userId: "1002",
        name: "Dummy 1"
    },
    {
        userId: "1003",
        name: "Dummy 2"
    }],
}

interface ChatListProps {
    chats?: {userId: string, name: string }[],
    selectUser: Function
}