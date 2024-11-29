import { Model } from 'mongoose';
import { TripDocument } from '../../trip/schema/trip.schema';
import { UserService } from '../../user/user.service';
export declare class MatchmakingService {
    private tripModel;
    private userService;
    private readonly logger;
    constructor(tripModel: Model<TripDocument>, userService: UserService);
    findMatches(userId: string): Promise<any[]>;
    private executePythonScript;
}
