export interface Message {
    id: number,
    id_send: number,
    id_receive: number,
    subject?: string,
    text: string,
    created_at: Date
}