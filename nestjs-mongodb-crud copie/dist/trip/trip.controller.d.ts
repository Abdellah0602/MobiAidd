import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { TripService } from '../trip/trip.service';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    createTrip(response: any, req: any, createTripDto: CreateTripDto): Promise<any>;
    updateTrip(response: any, tripId: string, updateTripDto: UpdateTripDto): Promise<any>;
    getTrips(response: any): Promise<any>;
    getTrip(response: any, tripId: string): Promise<any>;
    deleteTrip(response: any, tripId: string): Promise<any>;
}
