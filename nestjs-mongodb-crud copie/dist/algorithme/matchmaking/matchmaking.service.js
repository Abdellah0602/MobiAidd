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
var MatchmakingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_schema_1 = require("../../trip/schema/trip.schema");
const polyline = require("@mapbox/polyline");
const child_process_1 = require("child_process");
const common_2 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const path = require('path');
let MatchmakingService = MatchmakingService_1 = class MatchmakingService {
    constructor(tripModel, userService) {
        this.tripModel = tripModel;
        this.userService = userService;
        this.logger = new common_2.Logger(MatchmakingService_1.name);
    }
    async findMatches(userId) {
        const userTrips = await this.tripModel
            .find({ userId: userId })
            .sort({ createdAt: -1 })
            .exec();
        const lastTrip = userTrips[0];
        if (!lastTrip)
            return [];
        let matches = [];
        const lastTripDateTime = new Date(lastTrip.details.departureDateTime);
        const potentialMatches = await this.tripModel
            .find({
            status: 'Pending',
            _id: { $ne: lastTrip._id },
            volunteerId: { $exists: true, $ne: null },
            'details.departureDateTime': {
                $gte: new Date(lastTripDateTime.getTime() - 5 * 60000),
                $lte: new Date(lastTripDateTime.getTime() + 5 * 60000),
            },
        })
            .exec();
        for (const potentialMatch of potentialMatches) {
            const path1 = polyline.decode(lastTrip.polylines[0]);
            const path2 = polyline.decode(potentialMatch.polylines[0]);
            console.log(path1, path2);
            const chevauchement = await this.executePythonScript(path2, path1);
            console.log(chevauchement);
            if (chevauchement.chevauchement >= 70) {
                matches.push({
                    trip1: lastTrip._id,
                    trip2: potentialMatch._id,
                    chevauchement: chevauchement.chevauchement,
                });
            }
        }
        const matchesWithNames = await Promise.all(matches.map(async (match) => {
            const volunteerId = await this.tripModel.findById(match.trip2).select('volunteerId').exec();
            const volunteer = await this.userService.getUser(volunteerId.volunteerId);
            return {
                trip1: match.trip1,
                trip2: match.trip2,
                chevauchement: match.chevauchement,
                accompagnateur: volunteer.name,
                id: volunteer._id
            };
        }));
        return matchesWithNames;
    }
    executePythonScript(polyline1, polyline2) {
        return new Promise((resolve, reject) => {
            const scriptPath = 'src/algorithme/matchmaking/compare.py';
            console.log(polyline1);
            const process = (0, child_process_1.spawn)('python3', [scriptPath, JSON.stringify(polyline1), JSON.stringify(polyline2)]);
            let result = '';
            process.stdout.on('data', (data) => {
                result += data.toString();
            });
            process.stderr.on('data', (data) => {
                this.logger.error(`stderr: ${data}`);
            });
            process.on('close', (code) => {
                if (code === 0) {
                    try {
                        const parsedResult = JSON.parse(result);
                        resolve(parsedResult);
                    }
                    catch (error) {
                        this.logger.error('Failed to parse Python script output', error);
                        reject('Failed to parse Python script output');
                    }
                }
                else {
                    this.logger.error(`Python script exited with code ${code}`);
                    reject(`Python script exited with code ${code}`);
                }
            });
        });
    }
};
exports.MatchmakingService = MatchmakingService;
exports.MatchmakingService = MatchmakingService = MatchmakingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], MatchmakingService);
//# sourceMappingURL=matchmaking.service.js.map