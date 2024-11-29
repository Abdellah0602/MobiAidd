"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var user_controller_1 = require("./user/user.controller");
var trip_controller_1 = require("./trip/trip.controller");
var axios_1 = require("@nestjs/axios");
var user_schema_1 = require("./user/schema/user.schema");
var trip_schema_1 = require("./trip/schema/trip.schema");
var user_service_1 = require("./user/user.service");
var trip_service_1 = require("./trip/trip.service");
var matchmaking_service_1 = require("./algorithme/matchmaking/matchmaking.service");
var matchmaking_controller_1 = require("./algorithme/matchmaking/matchmaking.controller");
var auth_service_1 = require("./auth/auth.service");
var auth_controller_1 = require("./auth/auth.controller");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var local_strategy_1 = require("./auth/local.strategy");
var jwt_strategy_1 = require("./auth/jwt.strategy");
var message_schema_1 = require("./message/schema/message.schema");
var message_controller_1 = require("./message/message.controller");
var message_service_1 = require("./message/message.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                axios_1.HttpModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: 'secretKey', // Use an environment variable for the secret in production
                    signOptions: { expiresIn: 30 * 24 * 60 * 60 },
                }),
                mongoose_1.MongooseModule.forRoot('mongodb+srv://root:abdellah@mobiaidcluster.a2xgeg3.mongodb.net/?retryWrites=true&w=majority&appName=MobiAidCluster'), //'mongodb+srv://root:abdellah@mobiaidcluster.a2xgeg3.mongodb.net/?retryWrites=true&w=majority'mongodb://root:abdellah@127.0.0.1:27017/mobiaid
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
    return AppModule;
}());
exports.AppModule = AppModule;
