import { Document } from 'mongoose';
export interface IMessage extends Document {
    sender: string;
    recipient: string;
    content: string;
    createdAt: Date;
    status: string;
}
