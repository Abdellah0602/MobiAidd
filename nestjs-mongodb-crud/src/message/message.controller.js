"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var create_message_dto_1 = require("../dto/create-message.dto");
var update_message_dto_1 = require("../dto/update-message.dto");
var message_service_1 = require("../message/message.service");
var MessageController = /** @class */ (function () {
    function MessageController(messageService) {
        this.messageService = messageService;
    }
    // Créer un message (utilisateur connecté)
    MessageController.prototype.createMessage = function (response, req, createMessageDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, messageData, newMessage, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('Début de la route POST createMessage');
                        messageData = __assign(__assign({}, createMessageDto), { sender: userId });
                        return [4 /*yield*/, this.messageService.createMessage(userId, messageData)];
                    case 2:
                        newMessage = _a.sent();
                        console.log('Message créé avec succès:', newMessage);
                        return [2 /*return*/, response.status(common_1.HttpStatus.CREATED).json({
                                message: 'Message has been created successfully',
                                newMessage: newMessage,
                            })];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Erreur lors de la création du message:', err_1);
                        return [2 /*return*/, response.status(common_1.HttpStatus.BAD_REQUEST).json({
                                statusCode: 400,
                                message: 'Error: Message not created!',
                                error: 'Bad Request',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Mise à jour d'un message (uniquement par l'expéditeur)
    MessageController.prototype.updateMessage = function (response, req, messageId, updateMessageDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, updatedMessage, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.messageService.updateMessage(userId, messageId, updateMessageDto)];
                    case 2:
                        updatedMessage = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Message has been successfully updated',
                                updatedMessage: updatedMessage,
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, response.status(err_2.status).json(err_2.response)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Récupérer tous les messages
    MessageController.prototype.getMessages = function (response, req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, messagesData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.messageService.getAllMessages(userId)];
                    case 2:
                        messagesData = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'All messages data found successfully',
                                messagesData: messagesData,
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, response.status(err_3.status).json(err_3.response)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Récupérer un message spécifique
    MessageController.prototype.getMessage = function (response, messageId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, existingMessage, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.messageService.getMessageById(userId, messageId)];
                    case 2:
                        existingMessage = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Message found successfully',
                                existingMessage: existingMessage,
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, response.status(err_4.status).json(err_4.response)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Supprimer un message (uniquement par l'expéditeur)
    MessageController.prototype.deleteMessage = function (response, req, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, deletedMessage, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.messageService.deleteMessage(userId, messageId)];
                    case 2:
                        deletedMessage = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Message deleted successfully',
                                deletedMessage: deletedMessage,
                            })];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, response.status(err_5.status).json(err_5.response)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.prototype.getMessagesByUserId = function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userMessages, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.messageService.getMessagesByUserId(userId)];
                    case 1:
                        userMessages = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Messages found successfully',
                                userMessages: userMessages,
                            })];
                    case 2:
                        err_6 = _a.sent();
                        console.error('Erreur lors de la récupération des messages de l\'utilisateur:', err_6);
                        return [2 /*return*/, response.status(common_1.HttpStatus.NOT_FOUND).json({
                                statusCode: 404,
                                message: 'Error: Messages not found!',
                                error: 'Not Found',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.prototype.getUsersWithLastMessage = function (req, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, messages, usersWithLastMessage, usersMap, _i, messages_1, message, otherUserId, currentLastMessage, usersArray, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        if (!userId) {
                            return [2 /*return*/, response.status(common_1.HttpStatus.BAD_REQUEST).json({
                                    message: 'Utilisateur non authentifié.',
                                })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.messageService.getMessagesByUserId(userId)];
                    case 2:
                        messages = _a.sent();
                        // Si aucun message n'est trouvé
                        if (!messages || messages.length === 0) {
                            return [2 /*return*/, response.status(common_1.HttpStatus.NOT_FOUND).json({
                                    message: 'Aucun message trouvé pour cet utilisateur.',
                                })];
                        }
                        usersWithLastMessage = [];
                        usersMap = new Map();
                        // Parcourir tous les messages
                        for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                            message = messages_1[_i];
                            otherUserId = message.sender === userId ? message.recipient : message.sender;
                            if (!usersMap.has(otherUserId)) {
                                usersMap.set(otherUserId, {
                                    userId: otherUserId,
                                    lastMessage: message,
                                });
                            }
                            else {
                                currentLastMessage = usersMap.get(otherUserId).lastMessage;
                                if (message.createdAt > currentLastMessage.createdAt) {
                                    usersMap.set(otherUserId, {
                                        userId: otherUserId,
                                        lastMessage: message,
                                    });
                                }
                            }
                        }
                        usersArray = Array.from(usersMap.values());
                        // Trier par la date du dernier message
                        usersArray.sort(function (a, b) { return b.lastMessage.createdAt - a.lastMessage.createdAt; });
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Utilisateurs récupérés avec succès.',
                                data: usersArray,
                            })];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Erreur lors de la récupération des utilisateurs:', error_1);
                        return [2 /*return*/, response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                                message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
    MessageController = __decorate([
        (0, common_1.Controller)('message'),
        __metadata("design:paramtypes", [message_service_1.MessageService])
    ], MessageController);
    return MessageController;
}());
exports.MessageController = MessageController;
