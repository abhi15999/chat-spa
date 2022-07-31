export interface ChatDetails {
    from: string,
    to: string,
    message: {
        sent_by: string,
        value: string | number,
        type: string,
        deleted: boolean,
        edited: boolean
    }
}

export interface ChatDoc extends ChatDetails {
    chatId: string
    timestamp: Date
}

export interface ChatEditDoc {
    chatId: string,
    updatedMessage?: string | number,
    from: string,
    to: string,
    deleted?: boolean,
    edited?: boolean
}