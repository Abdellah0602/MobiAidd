"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Departure = /** @class */ (function () {
    function Departure() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], Departure.prototype, "latitude", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], Departure.prototype, "longitude", void 0);
    return Departure;
}());
var Destination = /** @class */ (function () {
    function Destination() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], Destination.prototype, "latitude", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], Destination.prototype, "longitude", void 0);
    return Destination;
}());
var Review = /** @class */ (function () {
    function Review() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], Review.prototype, "note", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ required: false }),
        __metadata("design:type", String)
    ], Review.prototype, "comment", void 0);
    return Review;
}());
var Details = /** @class */ (function () {
    function Details() {
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
    return Details;
}());
var Trip = /** @class */ (function (_super) {
    __extends(Trip, _super);
    function Trip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    Trip = __decorate([
        (0, mongoose_1.Schema)()
    ], Trip);
    return Trip;
}(mongoose_2.Document));
exports.Trip = Trip;
exports.TripSchema = mongoose_1.SchemaFactory.createForClass(Trip);
