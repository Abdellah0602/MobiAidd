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
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_trip_dto_1 = require("../dto/create-trip.dto");
const update_trip_dto_1 = require("../dto/update-trip.dto");
const trip_service_1 = require("../trip/trip.service");
let TripController = class TripController {
    constructor(tripService) {
        this.tripService = tripService;
    }
    async createTrip(response, req, createTripDto) {
        const userId = req.user.userId;
        try {
            console.log('Début de la route POST createTrip');
            const tripData = Object.assign(Object.assign({}, createTripDto), { userId });
            const newTrip = await this.tripService.createTrip(userId, tripData);
            console.log('Le trajet a été créé avec succès:', newTrip);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Trip has been created successfully',
                newTrip,
            });
        }
        catch (err) {
            console.error('Erreur dans la route POST createTrip:', err);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Trip not created!',
                error: 'Bad Request',
            });
        }
    }
    async updateTrip(response, tripId, updateTripDto) {
        try {
            const existingTrip = await this.tripService.updateTrip(tripId, updateTripDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Trip has been successfully updated',
                existingTrip,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getTrips(response) {
        try {
            const tripData = await this.tripService.getAllTrips();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All trips data found successfully',
                tripData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getTrip(response, tripId) {
        try {
            const existingTrip = await this.tripService.getTrip(tripId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Trip found successfully',
                existingTrip,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteTrip(response, tripId) {
        try {
            const deletedTrip = await this.tripService.deleteTrip(tripId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Trip deleted successfully',
                deletedTrip,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "createTrip", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_trip_dto_1.UpdateTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "updateTrip", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getTrips", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getTrip", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "deleteTrip", null);
exports.TripController = TripController = __decorate([
    (0, common_1.Controller)('trip'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
//# sourceMappingURL=trip.controller.js.map