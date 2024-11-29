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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MessageService = class MessageService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async createMessage(userId, createMessageDto) {
        try {
            const messageToCreate = {
                sender: userId,
                recipient: createMessageDto.recipient,
                content: createMessageDto.content,
                status: createMessageDto.status || 'sent',
            };
            const newMessage = new this.messageModel(messageToCreate);
            const savedMessage = await newMessage.save();
            return savedMessage;
        }
        catch (error) {
            console.error('Erreur lors de la création du message:', error);
            throw error;
        }
    }
    async getAllMessages(userId) {
        try {
            const messages = await this.messageModel.find({
                $or: [{ sender: userId }, { recipient: userId }],
            });
            if (!messages || messages.length === 0) {
                throw new common_1.NotFoundException('Aucun message trouvé pour cet utilisateur.');
            }
            return messages;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des messages:', error);
            throw error;
        }
    }
    async getMessageById(userId, messageId) {
        try {
            const message = await this.messageModel.findById(messageId);
            if (!message) {
                throw new common_1.NotFoundException(`Message #${messageId} non trouvé.`);
            }
            if (message.sender !== userId && message.recipient !== userId) {
                throw new common_1.UnauthorizedException('Accès interdit à ce message.');
            }
            return message;
        }
        catch (error) {
            console.error('Erreur lors de la récupération du message:', error);
            throw error;
        }
    }
    async updateMessage(userId, messageId, updateMessageDto) {
        try {
            const existingMessage = await this.messageModel.findById(messageId).lean();
            if (!existingMessage) {
                throw new common_1.NotFoundException(`Message #${messageId} non trouvé.`);
            }
            if (existingMessage.sender !== userId) {
                throw new common_1.UnauthorizedException('Vous ne pouvez pas modifier ce message.');
            }
            const updatedMessage = await this.messageModel.findByIdAndUpdate(messageId, updateMessageDto, { new: true }).exec();
            return updatedMessage;
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du message:', error);
            throw error;
        }
    }
    async deleteMessage(userId, messageId) {
        try {
            const existingMessage = await this.messageModel.findById(messageId);
            if (!existingMessage) {
                throw new common_1.NotFoundException(`Message #${messageId} non trouvé.`);
            }
            if (existingMessage.sender !== userId) {
                throw new common_1.UnauthorizedException('Vous ne pouvez pas supprimer ce message.');
            }
            const deletedMessage = await this.messageModel.findByIdAndDelete(messageId).lean();
            return deletedMessage;
        }
        catch (error) {
            console.error('Erreur lors de la suppression du message:', error);
            throw error;
        }
    }
    async getMessagesByUserId(userId) {
        try {
            const messages = await this.messageModel.find({
                $or: [{ sender: userId }, { recipient: userId }],
            }).lean();
            if (!messages || messages.length === 0) {
                throw new common_1.NotFoundException('Aucun message trouvé pour cet utilisateur.');
            }
            return messages;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des messages de l\'utilisateur:', error);
            throw error;
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageService);
//# sourceMappingURL=message.service.js.map