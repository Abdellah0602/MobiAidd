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
exports.TripController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var create_trip_dto_1 = require("../dto/create-trip.dto");
var update_trip_dto_1 = require("../dto/update-trip.dto");
var trip_service_1 = require("../trip/trip.service");
var TripController = /** @class */ (function () {
    function TripController(tripService) {
        this.tripService = tripService;
    }
    TripController.prototype.createTrip = function (response, req, createTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, tripData, newTrip, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('Début de la route POST createTrip');
                        tripData = __assign(__assign({}, createTripDto), { userId: userId });
                        return [4 /*yield*/, this.tripService.createTrip(userId, tripData)];
                    case 2:
                        newTrip = _a.sent();
                        console.log('Le trajet a été créé avec succès:', newTrip);
                        return [2 /*return*/, response.status(common_1.HttpStatus.CREATED).json({
                                message: 'Trip has been created successfully',
                                newTrip: newTrip,
                            })];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Erreur dans la route POST createTrip:', err_1);
                        return [2 /*return*/, response.status(common_1.HttpStatus.BAD_REQUEST).json({
                                statusCode: 400,
                                message: 'Error: Trip not created!',
                                error: 'Bad Request',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TripController.prototype.updateTrip = function (response, tripId, updateTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var existingTrip, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripService.updateTrip(tripId, updateTripDto)];
                    case 1:
                        existingTrip = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Trip has been successfully updated',
                                existingTrip: existingTrip,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, response.status(err_2.status).json(err_2.response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripController.prototype.getTrips = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var tripData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripService.getAllTrips()];
                    case 1:
                        tripData = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'All trips data found successfully',
                                tripData: tripData,
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, response.status(err_3.status).json(err_3.response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripController.prototype.getTrip = function (response, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var existingTrip, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripService.getTrip(tripId)];
                    case 1:
                        existingTrip = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Trip found successfully',
                                existingTrip: existingTrip,
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, response.status(err_4.status).json(err_4.response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TripController.prototype.deleteTrip = function (response, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedTrip, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripService.deleteTrip(tripId)];
                    case 1:
                        deletedTrip = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                message: 'Trip deleted successfully',
                                deletedTrip: deletedTrip,
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, response.status(err_5.status).json(err_5.response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    TripController = __decorate([
        (0, common_1.Controller)('trip'),
        __metadata("design:paramtypes", [trip_service_1.TripService])
    ], TripController);
    return TripController;
}());
exports.TripController = TripController;
