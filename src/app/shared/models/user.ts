export interface User {
    id: number,
    email: string,
    password: string,
    name?: string,
    image?: string,
    message?: string,
    created_at: Date,
    updated_at?: Date
}
