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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = exports.MessageStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var MessageStatusDto;
(function (MessageStatusDto) {
    MessageStatusDto["SENT"] = "sent";
    MessageStatusDto["DELIVERED"] = "delivered";
    MessageStatusDto["READ"] = "read";
})(MessageStatusDto || (exports.MessageStatusDto = MessageStatusDto = {}));
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-05T14:00:00.000Z', description: 'Date de création du message' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateMessageDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Object.values(MessageStatusDto), default: MessageStatusDto.SENT }),
    (0, class_validator_1.IsEnum)(MessageStatusDto),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "status", void 0);
//# sourceMappingURL=create-message.dto.js.map