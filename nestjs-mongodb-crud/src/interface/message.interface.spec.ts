import { IMessage } from './message.interface';

describe('IMessage Interface', () => {
    it('should have a sender property of type string', () => {
        const message: IMessage = {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            content: 'Hello, World!',
            createdAt: new Date(),
            status: 'sent',
        } as IMessage;

        expect(typeof message.sender).toBe('string');
    });

    it('should have a recipient property of type string', () => {
        const message: IMessage = {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            content: 'Hello, World!',
            createdAt: new Date(),
            status: 'sent',
        } as IMessage;

        expect(typeof message.recipient).toBe('string');
    });

    it('should have a content property of type string', () => {
        const message: IMessage = {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            content: 'Hello, World!',
            createdAt: new Date(),
            status: 'sent',
        } as IMessage;

        expect(typeof message.content).toBe('string');
    });

    it('should have a createdAt property of type Date', () => {
        const message: IMessage = {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            content: 'Hello, World!',
            createdAt: new Date(),
            status: 'sent',
        } as IMessage;

        expect(message.createdAt).toBeInstanceOf(Date);
    });

    it('should have a status property of type string', () => {
        const message: IMessage = {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            content: 'Hello, World!',
            createdAt: new Date(),
            status: 'sent',
        } as IMessage;

        expect(typeof message.status).toBe('string');
    });
});