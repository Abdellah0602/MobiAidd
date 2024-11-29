"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_message_dto_1 = require("../dto/create-message.dto");
const update_message_dto_1 = require("../dto/update-message.dto");
const message_service_1 = require("../message/message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async createMessage(response, req, createMessageDto) {
        const userId = req.user.userId;
        try {
            console.log('Début de la route POST createMessage');
            const messageData = Object.assign(Object.assign({}, createMessageDto), { sender: userId });
            const newMessage = await this.messageService.createMessage(userId, messageData);
            console.log('Message créé avec succès:', newMessage);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Message has been created successfully',
                newMessage,
            });
        }
        catch (err) {
            console.error('Erreur lors de la création du message:', err);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Message not created!',
                error: 'Bad Request',
            });
        }
    }
    async updateMessage(response, req, messageId, updateMessageDto) {
        const userId = req.user.userId;
        try {
            const updatedMessage = await this.messageService.updateMessage(userId, messageId, updateMessageDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Message has been successfully updated',
                updatedMessage,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getMessages(response, req) {
        const userId = req.user.userId;
        try {
            const messagesData = await this.messageService.getAllMessages(userId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All messages data found successfully',
                messagesData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getMessage(response, messageId, req) {
        const userId = req.user.userId;
        try {
            const existingMessage = await this.messageService.getMessageById(userId, messageId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Message found successfully',
                existingMessage,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteMessage(response, req, messageId) {
        const userId = req.user.userId;
        try {
            const deletedMessage = await this.messageService.deleteMessage(userId, messageId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Message deleted successfully',
                deletedMessage,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getMessagesByUserId(response, userId) {
        try {
            const userMessages = await this.messageService.getMessagesByUserId(userId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Messages found successfully',
                userMessages,
            });
        }
        catch (err) {
            console.error('Erreur lors de la récupération des messages de l\'utilisateur:', err);
            return response.status(common_1.HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                message: 'Error: Messages not found!',
                error: 'Not Found',
            });
        }
    }
    async getUsersWithLastMessage(req, response) {
        const userId = req.user.userId;
        if (!userId) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Utilisateur non authentifié.',
            });
        }
        try {
            const messages = await this.messageService.getMessagesByUserId(userId);
            if (!messages || messages.length === 0) {
                return response.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Aucun message trouvé pour cet utilisateur.',
                });
            }
            const usersWithLastMessage = [];
            const usersMap = new Map();
            for (const message of messages) {
                const otherUserId = message.sender === userId ? message.recipient : message.sender;
                if (!usersMap.has(otherUserId)) {
                    usersMap.set(otherUserId, {
                        userId: otherUserId,
                        lastMessage: message,
                    });
                }
                else {
                    const currentLastMessage = usersMap.get(otherUserId).lastMessage;
                    if (message.createdAt > currentLastMessage.createdAt) {
                        usersMap.set(otherUserId, {
                            userId: otherUserId,
                            lastMessage: message,
                        });
                    }
                }
            }
            const usersArray = Array.from(usersMap.values());
            usersArray.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Utilisateurs récupérés avec succès.',
                data: usersArray,
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
            });
        }
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Get)('/userMessage/:userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesByUserId", null);
__decorate([
    (0, common_1.Get)('users/last-message'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getUsersWithLastMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map