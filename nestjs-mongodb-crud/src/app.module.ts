import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { TripController } from './trip/trip.controller';
import { HttpModule } from '@nestjs/axios';
import { UserSchema } from './user/schema/user.schema';
import { TripSchema } from './trip/schema/trip.schema';
import { UserService } from './user/user.service';
import { TripService } from './trip/trip.service';
import { MatchmakingService } from './algorithme/matchmaking/matchmaking.service';
import { MatchmakingController } from './algorithme/matchmaking/matchmaking.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { MessageSchema } from './message/schema/message.schema';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';




@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use an environment variable for the secret in production
      signOptions: { expiresIn: 30 * 24 * 60 * 60 } ,
      }),
    MongooseModule.forRoot('mongodb+srv://root:abdellah@mobiaidcluster.a2xgeg3.mongodb.net/?retryWrites=true&w=majority&appName=MobiAidCluster'), //'mongodb+srv://root:abdellah@mobiaidcluster.a2xgeg3.mongodb.net/?retryWrites=true&w=majority'mongodb://root:abdellah@127.0.0.1:27017/mobiaid
  MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Trip', schema: TripSchema },
    { name: 'Message', schema: MessageSchema }
  ]),

],
controllers: [UserController, TripController, MatchmakingController, AuthController,MessageController],
providers: [UserService, TripService, MatchmakingService, AuthService, LocalStrategy, JwtStrategy, MessageService],
})
export class AppModule { }