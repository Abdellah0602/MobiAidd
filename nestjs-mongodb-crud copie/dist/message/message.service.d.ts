import { Model } from 'mongoose';
import { IMessage } from '../interface/message.interface';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<IMessage>);
    createMessage(userId: string, createMessageDto: CreateMessageDto): Promise<IMessage>;
    getAllMessages(userId: string): Promise<IMessage[]>;
    getMessageById(userId: string, messageId: string): Promise<IMessage>;
    updateMessage(userId: string, messageId: string, updateMessageDto: UpdateMessageDto): Promise<IMessage>;
    deleteMessage(userId: string, messageId: string): Promise<IMessage>;
    getMessagesByUserId(userId: string): Promise<IMessage[]>;
}
