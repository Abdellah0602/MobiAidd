import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageService } from '../message/message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(response: any, req: any, createMessageDto: CreateMessageDto): Promise<any>;
    updateMessage(response: any, req: any, messageId: string, updateMessageDto: UpdateMessageDto): Promise<any>;
    getMessages(response: any, req: any): Promise<any>;
    getMessage(response: any, messageId: string, req: any): Promise<any>;
    deleteMessage(response: any, req: any, messageId: string): Promise<any>;
    getMessagesByUserId(response: any, userId: string): Promise<any>;
    getUsersWithLastMessage(req: any, response: any): Promise<any>;
}
