import { MatchmakingService } from './matchmaking.service';
import { Response } from 'express';
export declare class MatchmakingController {
    private readonly matchmakingService;
    constructor(matchmakingService: MatchmakingService);
    findMatches(response: Response, req: any): Promise<void>;
}
