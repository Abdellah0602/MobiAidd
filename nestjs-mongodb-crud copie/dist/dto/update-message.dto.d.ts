export declare enum MessageStatusDto {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read"
}
export declare class UpdateMessageDto {
    sender?: string;
    recipient?: string;
    content?: string;
    createdAt?: string;
    status?: MessageStatusDto;
}
