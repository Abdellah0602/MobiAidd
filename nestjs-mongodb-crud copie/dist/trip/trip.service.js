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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("@nestjs/axios");
const user_service_1 = require("../user/user.service");
let TripService = class TripService {
    constructor(tripModel, httpService, userService) {
        this.tripModel = tripModel;
        this.httpService = httpService;
        this.userService = userService;
    }
    async createTrip(userId, createTripDto) {
        try {
            const userType = await this.userService.getUserTypeById(userId);
            const departureCoordinates = {
                latitude: createTripDto.details.departure.latitude,
                longitude: createTripDto.details.departure.longitude,
            };
            const destinationCoordinates = {
                latitude: createTripDto.details.destination.latitude,
                longitude: createTripDto.details.destination.longitude,
            };
            const directions = await this.getDirections(departureCoordinates, destinationCoordinates);
            const tripToCreate = {
                userId: userType === 'handicap' ? userId : undefined,
                volunteerId: userType === 'helper' ? userId : undefined,
                details: Object.assign(Object.assign({}, createTripDto.details), { departure: createTripDto.details.departure, destination: createTripDto.details.destination, departureDateTime: new Date(createTripDto.details.departureDateTime) }),
                status: createTripDto.status,
                reviews: createTripDto.reviews,
                polylines: directions.stepsPolylinePoints,
            };
            const newTrip = new this.tripModel(tripToCreate);
            const savedTrip = await newTrip.save();
            return savedTrip;
        }
        catch (error) {
            console.error('Erreur lors de la création du trajet:', error);
            throw error;
        }
    }
    async updateTrip(tripId, updateTripDto) {
        try {
            const existingTrip = await this.tripModel.findByIdAndUpdate(tripId, updateTripDto, { new: true });
            if (!existingTrip) {
                throw new common_1.NotFoundException(`Trip #${tripId} not found`);
            }
            return existingTrip;
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du trajet:', error);
            throw error;
        }
    }
    async getAllTrips() {
        try {
            const tripData = await this.tripModel.find();
            if (!tripData || tripData.length === 0) {
                throw new common_1.NotFoundException('trips data not found!');
            }
            return tripData;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des le trajets:', error);
            throw error;
        }
    }
    async getTrip(tripId) {
        try {
            const existingTrip = await this.tripModel.findById(tripId);
            if (!existingTrip) {
                throw new common_1.NotFoundException(`trip #${tripId} not found`);
            }
            return existingTrip;
        }
        catch (error) {
            console.error('Erreur lors de la récupération de l\'le trajet:', error);
            throw error;
        }
    }
    async deleteTrip(tripId) {
        try {
            const deletedTrip = await this.tripModel.findByIdAndDelete(tripId).lean().exec();
            if (!deletedTrip) {
                throw new common_1.NotFoundException(`trip #${tripId} not found`);
            }
            return deletedTrip;
        }
        catch (error) {
            console.error('Erreur lors de la suppression de l\'le trajet:', error);
            throw error;
        }
    }
    async getDirections(departure, destination) {
        const apiKey = 'AIzaSyCWb-K2A_6LEnwCFn6quFImX9MbMMQYNhE';
        const originQueryString = `${departure.latitude},${departure.longitude}`;
        const destinationQueryString = `${destination.latitude},${destination.longitude}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(originQueryString)}&destination=${encodeURIComponent(destinationQueryString)}&mode=transit&key=${apiKey}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            const data = response.data;
            if (data.status === 'OK' && data.routes.length > 0) {
                const route = data.routes[0];
                const overview = route.overview_polyline;
                const stepsPolylinePoints = overview.points;
                console.log(stepsPolylinePoints);
                return {
                    stepsPolylinePoints,
                };
            }
            else {
                throw new Error(`Google Directions API error: ${data.status}`);
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête à l\'API Google Directions:', error);
            throw error;
        }
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Trip')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService,
        user_service_1.UserService])
], TripService);
//# sourceMappingURL=trip.service.js.map