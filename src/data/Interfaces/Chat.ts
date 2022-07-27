export interface ChatDetails {
    from: string,
    to: string,
    message: {
        value: string | number,
        type: string
    }
}

export interface ChatDoc extends ChatDetails {
    timestamp: Date
}