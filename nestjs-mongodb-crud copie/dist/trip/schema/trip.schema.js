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
exports.TripSchema = exports.Trip = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Departure {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Departure.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Departure.prototype, "longitude", void 0);
class Destination {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Destination.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Destination.prototype, "longitude", void 0);
class Review {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Review.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
class Details {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Details.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Details.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Departure }),
    __metadata("design:type", Departure)
], Details.prototype, "departure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Destination }),
    __metadata("design:type", Destination)
], Details.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Details.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Details.prototype, "departureDateTime", void 0);
let Trip = class Trip extends mongoose_2.Document {
};
exports.Trip = Trip;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Trip.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: false }),
    __metadata("design:type", String)
], Trip.prototype, "volunteerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Details }),
    __metadata("design:type", Details)
], Trip.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Trip.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Review }),
    __metadata("design:type", Review)
], Trip.prototype, "reviews", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Trip.prototype, "polylines", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Trip.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Trip.prototype, "updatedAt", void 0);
exports.Trip = Trip = __decorate([
    (0, mongoose_1.Schema)()
], Trip);
exports.TripSchema = mongoose_1.SchemaFactory.createForClass(Trip);
//# sourceMappingURL=trip.schema.js.map