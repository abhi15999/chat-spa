export interface UserDoc {
    name?: string,
    password: string,
    email: string,
    systemChoice?: string,
    mobile: string,
    userId: string,
    chats?: string[]
}

export interface UserDetails {
    email: string,
    mobile: string,
    password: string,
    systemChoice?: string
}