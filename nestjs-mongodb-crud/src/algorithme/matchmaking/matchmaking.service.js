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
exports.MatchmakingService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var trip_schema_1 = require("../../trip/schema/trip.schema");
var polyline = require("@mapbox/polyline");
var child_process_1 = require("child_process");
var common_2 = require("@nestjs/common");
var user_service_1 = require("../../user/user.service");
var path = require('path');
var MatchmakingService = /** @class */ (function () {
    function MatchmakingService(tripModel, userService) {
        this.tripModel = tripModel;
        this.userService = userService;
        this.logger = new common_2.Logger(MatchmakingService_1.name);
    }
    MatchmakingService_1 = MatchmakingService;
    MatchmakingService.prototype.findMatches = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userTrips, lastTrip, matches, lastTripDateTime, potentialMatches, _i, potentialMatches_1, potentialMatch, path1, path2, chevauchement, matchesWithNames;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tripModel
                            .find({ userId: userId })
                            .sort({ createdAt: -1 })
                            .exec()];
                    case 1:
                        userTrips = _a.sent();
                        lastTrip = userTrips[0];
                        if (!lastTrip)
                            return [2 /*return*/, []];
                        matches = [];
                        lastTripDateTime = new Date(lastTrip.details.departureDateTime);
                        return [4 /*yield*/, this.tripModel
                                .find({
                                status: 'Pending',
                                _id: { $ne: lastTrip._id },
                                volunteerId: { $exists: true, $ne: null },
                                'details.departureDateTime': {
                                    $gte: new Date(lastTripDateTime.getTime() - 5 * 60000),
                                    $lte: new Date(lastTripDateTime.getTime() + 5 * 60000),
                                },
                            })
                                .exec()];
                    case 2:
                        potentialMatches = _a.sent();
                        _i = 0, potentialMatches_1 = potentialMatches;
                        _a.label = 3;
                    case 3:
                        if (!(_i < potentialMatches_1.length)) return [3 /*break*/, 6];
                        potentialMatch = potentialMatches_1[_i];
                        path1 = polyline.decode(lastTrip.polylines[0]);
                        path2 = polyline.decode(potentialMatch.polylines[0]);
                        console.log(path1, path2);
                        return [4 /*yield*/, this.executePythonScript(path2, path1)];
                    case 4:
                        chevauchement = _a.sent();
                        console.log(chevauchement);
                        if (chevauchement.chevauchement >= 70) {
                            matches.push({
                                trip1: lastTrip._id,
                                trip2: potentialMatch._id,
                                chevauchement: chevauchement.chevauchement,
                            });
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, Promise.all(matches.map(function (match) { return __awaiter(_this, void 0, void 0, function () {
                            var volunteerId, volunteer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.tripModel.findById(match.trip2).select('volunteerId').exec()];
                                    case 1:
                                        volunteerId = _a.sent();
                                        return [4 /*yield*/, this.userService.getUser(volunteerId.volunteerId)];
                                    case 2:
                                        volunteer = _a.sent();
                                        return [2 /*return*/, {
                                                trip1: match.trip1,
                                                trip2: match.trip2,
                                                chevauchement: match.chevauchement,
                                                accompagnateur: volunteer.name,
                                                id: volunteer._id
                                            }];
                                }
                            });
                        }); }))];
                    case 7:
                        matchesWithNames = _a.sent();
                        return [2 /*return*/, matchesWithNames];
                }
            });
        });
    };
    MatchmakingService.prototype.executePythonScript = function (polyline1, polyline2) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Construire le chemin absolu vers le script Python
            var scriptPath = 'src/algorithme/matchmaking/compare.py';
            // Exécuter le script Python avec les polylines en argument
            console.log(polyline1);
            var process = (0, child_process_1.spawn)('python3', [scriptPath, JSON.stringify(polyline1), JSON.stringify(polyline2)]);
            var result = '';
            process.stdout.on('data', function (data) {
                result += data.toString();
            });
            process.stderr.on('data', function (data) {
                _this.logger.error("stderr: ".concat(data));
            });
            process.on('close', function (code) {
                if (code === 0) {
                    try {
                        var parsedResult = JSON.parse(result);
                        resolve(parsedResult);
                    }
                    catch (error) {
                        _this.logger.error('Failed to parse Python script output', error);
                        reject('Failed to parse Python script output');
                    }
                }
                else {
                    _this.logger.error("Python script exited with code ".concat(code));
                    reject("Python script exited with code ".concat(code));
                }
            });
        });
    };
    var MatchmakingService_1;
    MatchmakingService = MatchmakingService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
        __metadata("design:paramtypes", [mongoose_2.Model,
            user_service_1.UserService])
    ], MatchmakingService);
    return MatchmakingService;
}());
exports.MatchmakingService = MatchmakingService;
