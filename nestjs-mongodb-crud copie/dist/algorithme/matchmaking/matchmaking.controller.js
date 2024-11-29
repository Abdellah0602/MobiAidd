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
exports.MatchmakingController = void 0;
const common_1 = require("@nestjs/common");
const matchmaking_service_1 = require("./matchmaking.service");
const passport_1 = require("@nestjs/passport");
let MatchmakingController = class MatchmakingController {
    constructor(matchmakingService) {
        this.matchmakingService = matchmakingService;
    }
    async findMatches(response, req) {
        const userId = req.user.userId;
        try {
            const matchesWithNames = await this.matchmakingService.findMatches(userId);
            console.log(matchesWithNames);
            response.status(200).json(matchesWithNames);
        }
        catch (error) {
            response.status(500).json({ message: 'Une erreur est survenue lors de la recherche des correspondances.', error: error.toString() });
        }
    }
};
exports.MatchmakingController = MatchmakingController;
__decorate([
    (0, common_1.Get)('/find-matches'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchmakingController.prototype, "findMatches", null);
exports.MatchmakingController = MatchmakingController = __decorate([
    (0, common_1.Controller)('matchmaking'),
    __metadata("design:paramtypes", [matchmaking_service_1.MatchmakingService])
], MatchmakingController);
//# sourceMappingURL=matchmaking.controller.js.map