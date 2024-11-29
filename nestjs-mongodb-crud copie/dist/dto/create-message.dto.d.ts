export declare enum MessageStatusDto {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read"
}
export declare class CreateMessageDto {
    sender: string;
    recipient: string;
    content: string;
    createdAt: Date;
    status: MessageStatusDto;
}
