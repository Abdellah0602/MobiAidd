"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_controller_1 = require("./user/user.controller");
const trip_controller_1 = require("./trip/trip.controller");
const axios_1 = require("@nestjs/axios");
const user_schema_1 = require("./user/schema/user.schema");
const trip_schema_1 = require("./trip/schema/trip.schema");
const user_service_1 = require("./user/user.service");
const trip_service_1 = require("./trip/trip.service");
const matchmaking_service_1 = require("./algorithme/matchmaking/matchmaking.service");
const matchmaking_controller_1 = require("./algorithme/matchmaking/matchmaking.controller");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("./auth/local.strategy");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const message_schema_1 = require("./message/schema/message.schema");
const message_controller_1 = require("./message/message.controller");
const message_service_1 = require("./message/message.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: 30 * 24 * 60 * 60 },
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://root:abdellah@mobiaidcluster.a2xgeg3.mongodb.net/?retryWrites=true&w=majority&appName=MobiAidCluster'),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Trip', schema: trip_schema_1.TripSchema },
                { name: 'Message', schema: message_schema_1.MessageSchema }
            ]),
        ],
        controllers: [user_controller_1.UserController, trip_controller_1.TripController, matchmaking_controller_1.MatchmakingController, auth_controller_1.AuthController, message_controller_1.MessageController],
        providers: [user_service_1.UserService, trip_service_1.TripService, matchmaking_service_1.MatchmakingService, auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, message_service_1.MessageService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map