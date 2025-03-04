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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var bcrypt = require('bcrypt');
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        this.userModel = userModel;
    }
    UserService.prototype.createUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPassword, userToSave, savedUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log('Début du processus de création d\'utilisateur...');
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(createUserDto.password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        userToSave = __assign(__assign({}, createUserDto), { password: hashedPassword });
                        return [4 /*yield*/, this.userModel.create(userToSave)];
                    case 3:
                        savedUser = _a.sent();
                        console.log('Utilisateur créé avec succès:', savedUser);
                        return [2 /*return*/, savedUser];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Erreur lors de la création de l\'utilisateur:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (userId, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true })];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser) {
                            throw new common_1.NotFoundException("User #".concat(userId, " not found"));
                        }
                        return [2 /*return*/, existingUser];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error_2);
                        throw error_2; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.find()];
                    case 1:
                        userData = _a.sent();
                        if (!userData || userData.length === 0) {
                            throw new common_1.NotFoundException('Users data not found!');
                        }
                        return [2 /*return*/, userData];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erreur lors de la récupération des utilisateurs:', error_3);
                        throw error_3; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.findById(userId)];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser) {
                            throw new common_1.NotFoundException("User #".concat(userId, " not found"));
                        }
                        return [2 /*return*/, existingUser];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur lors de la récupération de l\'utilisateur:', error_4);
                        throw error_4; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.findByIdAndDelete(userId)];
                    case 1:
                        deletedUser = _a.sent();
                        if (!deletedUser) {
                            throw new common_1.NotFoundException("User #".concat(userId, " not found"));
                        }
                        // Transformez le document supprimé en type IUser
                        return [2 /*return*/, deletedUser];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur lors de la suppression de l\'utilisateur:', error_5);
                        throw error_5; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with email ".concat(email, " not found."));
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.getUserTypeById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userModel.findById(userId).select('typeUser').exec()];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, (_a = user === null || user === void 0 ? void 0 : user.typeUser) === null || _a === void 0 ? void 0 : _a.role];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)('User')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
