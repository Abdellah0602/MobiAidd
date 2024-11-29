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
exports.TripService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var axios_1 = require("@nestjs/axios");
var user_service_1 = require("../user/user.service");
var TripService = /** @class */ (function () {
    function TripService(tripModel, httpService, userService) {
        this.tripModel = tripModel;
        this.httpService = httpService;
        this.userService = userService;
    }
    TripService.prototype.createTrip = function (userId, createTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userType, departureCoordinates, destinationCoordinates, directions, tripToCreate, newTrip, savedTrip, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userService.getUserTypeById(userId)];
                    case 1:
                        userType = _a.sent();
                        departureCoordinates = {
                            latitude: createTripDto.details.departure.latitude,
                            longitude: createTripDto.details.departure.longitude,
                        };
                        destinationCoordinates = {
                            latitude: createTripDto.details.destination.latitude,
                            longitude: createTripDto.details.destination.longitude,
                        };
                        return [4 /*yield*/, this.getDirections(departureCoordinates, destinationCoordinates)];
                    case 2:
                        directions = _a.sent();
                        tripToCreate = {
                            userId: userType === 'handicap' ? userId : undefined,
                            volunteerId: userType === 'helper' ? userId : undefined,
                            details: __assign(__assign({}, createTripDto.details), { departure: createTripDto.details.departure, destination: createTripDto.details.destination, departureDateTime: new Date(createTripDto.details.departureDateTime) }),
                            status: createTripDto.status,
                            reviews: createTripDto.reviews,
                            polylines: directions.stepsPolylinePoints,
                        };
                        newTrip = new this.tripModel(tripToCreate);
                        return [4 /*yield*/, newTrip.save()];
                    case 3:
                        savedTrip = _a.sent();
                        return [2 /*return*/, savedTrip];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Erreur lors de la création du trajet:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.updateTrip = function (tripId, updateTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var existingTrip, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripModel.findByIdAndUpdate(tripId, updateTripDto, { new: true })];
                    case 1:
                        existingTrip = _a.sent();
                        if (!existingTrip) {
                            throw new common_1.NotFoundException("Trip #".concat(tripId, " not found"));
                        }
                        return [2 /*return*/, existingTrip];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erreur lors de la mise à jour du trajet:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.getAllTrips = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tripData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripModel.find()];
                    case 1:
                        tripData = _a.sent();
                        if (!tripData || tripData.length === 0) {
                            throw new common_1.NotFoundException('trips data not found!');
                        }
                        return [2 /*return*/, tripData];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erreur lors de la récupération des le trajets:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.getTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var existingTrip, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripModel.findById(tripId)];
                    case 1:
                        existingTrip = _a.sent();
                        if (!existingTrip) {
                            throw new common_1.NotFoundException("trip #".concat(tripId, " not found"));
                        }
                        return [2 /*return*/, existingTrip];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur lors de la récupération de l\'le trajet:', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.deleteTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedTrip, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripModel.findByIdAndDelete(tripId).lean().exec()];
                    case 1:
                        deletedTrip = _a.sent();
                        if (!deletedTrip) {
                            throw new common_1.NotFoundException("trip #".concat(tripId, " not found"));
                        }
                        // Transformez le document supprimé en type Itrip
                        return [2 /*return*/, deletedTrip];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur lors de la suppression de l\'le trajet:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.getDirections = function (departure, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var apiKey, originQueryString, destinationQueryString, url, response, data, route, overview, stepsPolylinePoints, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiKey = 'AIzaSyCWb-K2A_6LEnwCFn6quFImX9MbMMQYNhE';
                        originQueryString = "".concat(departure.latitude, ",").concat(departure.longitude);
                        destinationQueryString = "".concat(destination.latitude, ",").concat(destination.longitude);
                        url = "https://maps.googleapis.com/maps/api/directions/json?origin=".concat(encodeURIComponent(originQueryString), "&destination=").concat(encodeURIComponent(destinationQueryString), "&mode=transit&key=").concat(apiKey);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpService.get(url).toPromise()];
                    case 2:
                        response = _a.sent();
                        data = response.data;
                        if (data.status === 'OK' && data.routes.length > 0) {
                            route = data.routes[0];
                            overview = route.overview_polyline;
                            stepsPolylinePoints = overview.points;
                            console.log(stepsPolylinePoints);
                            return [2 /*return*/, {
                                    stepsPolylinePoints: stepsPolylinePoints,
                                }];
                        }
                        else {
                            throw new Error("Google Directions API error: ".concat(data.status));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error('Erreur lors de la requête à l\'API Google Directions:', error_6);
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TripService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)('Trip')),
        __metadata("design:paramtypes", [mongoose_2.Model,
            axios_1.HttpService,
            user_service_1.UserService])
    ], TripService);
    return TripService;
}());
exports.TripService = TripService;
