import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export declare enum MessageStatus {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read"
}
export declare class Message extends Document {
    sender: string;
    recipient: string;
    content: string;
    status: MessageStatus;
}
export declare const MessageSchema: MongooseSchema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message> & Message & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
