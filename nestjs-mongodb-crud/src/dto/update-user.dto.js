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
exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }) // Indique que ce champ n'est pas obligatoire dans le DTO
        ,
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(30),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "name", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "location", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsObject)(),
        __metadata("design:type", Object)
    ], UpdateUserDto.prototype, "typeUser", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "email", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsPhoneNumber)('FR', { message: 'Invalid phone number' }) // Utilisez le code de pays approprié
        ,
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "phone", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "profilePicture", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "password", void 0);
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
