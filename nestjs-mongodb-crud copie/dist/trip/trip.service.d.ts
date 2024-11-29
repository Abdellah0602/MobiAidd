import { CreateTripDto } from '../dto/create-trip.dto';
import { ITrip } from '../interface/trip.interface';
import { Model } from 'mongoose';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
export declare class TripService {
    private readonly tripModel;
    private httpService;
    private readonly userService;
    constructor(tripModel: Model<ITrip>, httpService: HttpService, userService: UserService);
    createTrip(userId: string, createTripDto: CreateTripDto): Promise<ITrip>;
    updateTrip(tripId: string, updateTripDto: UpdateTripDto): Promise<ITrip>;
    getAllTrips(): Promise<ITrip[]>;
    getTrip(tripId: string): Promise<ITrip>;
    deleteTrip(tripId: string): Promise<ITrip>;
    getDirections(departure: {
        latitude: string;
        longitude: string;
    }, destination: {
        latitude: string;
        longitude: string;
    }): Promise<any>;
}
