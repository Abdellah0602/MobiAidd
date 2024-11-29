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
exports.CreateTripDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class DepartureDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DepartureDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DepartureDto.prototype, "longitude", void 0);
class DestinationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DestinationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DestinationDto.prototype, "longitude", void 0);
class DetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailsDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailsDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DepartureDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DepartureDto),
    __metadata("design:type", DepartureDto)
], DetailsDto.prototype, "departure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DestinationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DestinationDto),
    __metadata("design:type", DestinationDto)
], DetailsDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailsDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-05T14:00:00.000Z', description: 'Departure date and time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DetailsDto.prototype, "departureDateTime", void 0);
class CreateTripDto {
}
exports.CreateTripDto = CreateTripDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "volunteerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        description: 'Array of polyline strings',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTripDto.prototype, "polylines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DetailsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DetailsDto),
    __metadata("design:type", DetailsDto)
], CreateTripDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTripDto.prototype, "reviews", void 0);
//# sourceMappingURL=create-trip.dto.js.map